import {
  addBuilding,
  addConnection,
} from "./sim/addToBlueprint.js";
import {
  addBuildingToSim,
  addConnectionToSim,
  removeConnectionFromSim,
  blueprintToSim,
} from "./sim/blueprintToSim.js";
import { simPause, simStart, simStepToNextTransfer } from "./sim/sim.js";
import {
  createAbstractCircuit,
  isAbstractLogicEndpoint,
  validateNodeConfiguration,
  validateAbstractCircuit,
} from "./abstractCircuit.js";
import {
  analyzePhysicalCircuit,
  generatePhysicalLayout,
} from "./abstractConversions.js";

import * as canvas from "./ui/canvas/canvas.js";
import * as placement from "./ui/canvas/placement.js";
import { populateBuildingPanel } from "./ui/buildingpanel/buildingPanel.js";

const blueprint = {
  buildings: [],
  pipes: [],
  wires: [],
  simData: {
    nodes: [],
    tick: 1,
    time: null,
    pollution: null,
    windSpeed: null,
  },
};

let sim = blueprintToSim(blueprint);

populateBuildingPanel();

const blueprintToSimButton = document.getElementById("blueprintToSim-button");
const generatePhysicalButton = document.getElementById("generate-physical-button");
const pauseButton = document.getElementById("pause-button");
const stepButton = document.getElementById("step-button");
const properties = document.getElementById("properties");
const buildingPanel = document.getElementById("building-panel");
const buildingSearch = document.getElementById("building-search");
const abstractTools = document.getElementById("abstract-tools");
const abstractConnectionList = document.getElementById("abstract-connection-list");
const propertiesTitle = document.getElementById("properties-title");
const physicalViewButton = document.getElementById("physical-view-button");
const abstractViewButton = document.getElementById("abstract-view-button");
const abstractViewStatus = document.getElementById("abstract-view-status");
const abstractViewMessage = document.getElementById("abstract-view-message");
const fileMenuButton = document.getElementById("file-menu-button");
const fileMenu = document.getElementById("file-menu");
const importBlueprintButton = document.getElementById("import-blueprint-button");
const exportBlueprintButton = document.getElementById("export-blueprint-button");
const importProjectButton = document.getElementById("import-project-button");
const exportProjectButton = document.getElementById("export-project-button");
const blueprintFileInput = document.getElementById("blueprint-file-input");

let simulationTimer = null;
let selectedEntity = null;
let editorMode = "physical";
let abstractCircuit = createAbstractCircuit();
let abstractSim = blueprintToSim(abstractCircuit);
let abstractCircuitReady = false;
let abstractDirty = false;
let selectedAbstractWireKey = null;
let preserveAbstractOnNextOpen = false;
let requestedImportFormat = "physical";
const selectedRuntimeValues = new Map();

function getActiveSim() {
  return editorMode === "abstract" ? abstractSim : sim;
}

function formatPropertyValue(value) {
  if (value === "") return "None";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

function mergeBuildingData(definitionData, buildingData, runtimeData) {
  const sources = [definitionData, buildingData, runtimeData].filter((value) => value !== undefined);
  if (sources.some(Array.isArray)) return sources.at(-1);
  return Object.assign({}, ...sources.filter(
    (value) => value && typeof value === "object",
  ));
}

function createTypedInput(value, onValue) {
  const isObject = value !== null && typeof value === "object";
  const input = document.createElement(isObject ? "textarea" : "input");
  input.className = `property-input${isObject ? " property-json-input" : ""}`;
  if (isObject) {
    input.value = JSON.stringify(value, null, 2);
    input.addEventListener("change", () => {
      try {
        onValue(JSON.parse(input.value));
        input.setCustomValidity("");
      } catch (error) {
        input.setCustomValidity(`Enter valid JSON: ${error.message}`);
        input.reportValidity();
      }
    });
  } else if (typeof value === "boolean") {
    input.type = "checkbox";
    input.checked = value;
    input.addEventListener("change", () => onValue(input.checked));
  } else {
    input.type = typeof value === "number" ? "number" : "text";
    input.value = value == null ? "" : String(value);
    if (input.type === "number") input.step = "any";
    input.addEventListener("change", () => {
      if (input.type === "number" && input.value.trim() === "") return;
      const nextValue = input.type === "number" ? Number(input.value) : input.value;
      if (input.type === "number" && !Number.isFinite(nextValue)) {
        input.setCustomValidity("Enter a finite number.");
        input.reportValidity();
        return;
      }
      input.setCustomValidity("");
      try {
        onValue(nextValue);
      } catch (error) {
        input.setCustomValidity(error.message);
        input.reportValidity();
      }
    });
  }
  return input;
}

function renderSelectedEntity(entity) {
  selectedEntity = entity;
  selectedRuntimeValues.clear();
  properties.replaceChildren();
  if (!entity) return;

  const title = document.createElement("h3");
  title.className = "property-title";
  title.textContent = entity.type === "node"
    ? entity.definition.name
    : entity.definition.name ?? entity.building.name;
  properties.appendChild(title);

  const definitionDetails = { ...entity.definition };
  delete definitionDetails.nodes;
  delete definitionDetails.script;
  delete definitionDetails.connections;

  let details;
  if (entity.type === "node") {
    delete definitionDetails.maxAmount;
    delete definitionDetails.maxBuffer;
    delete definitionDetails.transferAmount;
    delete definitionDetails.transferRate;
    const runtimeDetails = Object.fromEntries(
      Object.entries(entity.runtime ?? {}).filter(([key]) => key !== "connections"),
    );
    delete runtimeDetails.max;
    details = {
      id: entity.id,
      building: entity.building.name,
      ...definitionDetails,
      ...runtimeDetails,
      maxBuffer: entity.runtime?.max ?? entity.definition.maxBuffer ?? entity.definition.maxAmount ?? 0,
      transferRate:
        entity.runtime?.transferRate ??
        entity.definition.transferRate ??
        entity.definition.transferAmount ??
        0,
    };
  } else {
  details = {
    ...definitionDetails,
    ...entity.building,
    data: mergeBuildingData(
      entity.definition.data,
      entity.building.data,
      getActiveSim().buildings.find(
        (building) => String(building.id) === String(entity.building.id),
      )?.data,
    ),
  };
  }

  for (const [key, value] of Object.entries(details)) {
    if (key.toLowerCase() === "connections") continue;
    if (typeof value === "function") continue;

    const row = document.createElement("div");
    row.className = "property-row";

    const label = document.createElement("span");
    label.className = "property-label";
    label.textContent = key;

    const isNodeConfig =
      entity.type === "node" &&
      !entity.definition.templateEndpoints &&
      (
        key === "maxBuffer" ||
        key === "transferRate" ||
        (editorMode === "physical" && ["amount", "item", "temp"].includes(key))
      );
    const isBuildingConfig =
      entity.type === "building" && ["rotation", "positionSite"].includes(key);
    const isBuildingData = entity.type === "building" && key === "data";

    if (isNodeConfig) {
      const input = document.createElement("input");
      input.className = "property-input";
      input.type = key === "item" ? "text" : "number";
      input.value = value == null ? "" : String(value);
      if (input.type === "number") {
        input.step = "any";
        input.min = "0";
      }
      input.addEventListener("input", () => {
        if (input.type === "number" && input.value.trim() === "") return;
        const nextValue = input.type === "number" ? Number(input.value) : input.value;
        if (input.type === "number" && !Number.isFinite(nextValue)) return;
        if (input.type === "number" && nextValue < 0) {
          input.setCustomValidity("Value must be non-negative.");
          return;
        }
        input.setCustomValidity("");
        const nodeName = entity.definition.name;
        if (key === "maxBuffer" || key === "transferRate") {
          entity.building.nodeConfig ??= {};
          entity.building.nodeConfig[nodeName] ??= {};
          entity.building.nodeConfig[nodeName][key] = nextValue;
          if (editorMode === "abstract") abstractDirty = true;
          if (key === "maxBuffer") {
            if (typeof entity.runtime?.setMax === "function") entity.runtime.setMax(nextValue);
            else if (entity.runtime) entity.runtime.max = nextValue;
            if (entity.runtime) entity.runtime.amount = Math.min(entity.runtime.amount, nextValue);
            if (editorMode === "physical") {
              const saved = blueprint.simData.nodes?.find((entry) => entry.id === entity.id);
              if (saved && saved.amount > nextValue) saved.amount = nextValue;
            }
          } else if (entity.runtime) {
            entity.runtime.transferRate = nextValue;
          }
        } else if (entity.runtime) {
          entity.runtime[key] = nextValue;
          if (["amount", "item", "temp"].includes(key)) {
            blueprint.simData.nodes ??= [];
            let saved = blueprint.simData.nodes.find((entry) => entry.id === entity.id);
            if (!saved) {
              saved = { id: entity.id };
              blueprint.simData.nodes.push(saved);
            }
            saved[key] = nextValue;
          }
        }
      });
      row.append(label, input);
    } else if (isBuildingConfig) {
      const input = createTypedInput(value, (nextValue) => {
        if (key === "rotation") {
          if (typeof nextValue !== "number") {
            throw new Error("Rotation must be a number.");
          }
          entity.building.rotation = nextValue;
        } else {
          if (
            !nextValue ||
            typeof nextValue !== "object" ||
            !Number.isFinite(nextValue.x) ||
            !Number.isFinite(nextValue.y)
          ) {
            throw new Error("Position must have finite x and y values.");
          }
          entity.building.positionSite = nextValue;
        }
        if (editorMode === "abstract") abstractDirty = true;
      });
      row.append(label, input);
    } else if (isBuildingData) {
      const mergedData = value;
      if (
        mergedData &&
        typeof mergedData === "object" &&
        !Array.isArray(mergedData) &&
        Object.keys(mergedData).length > 0
      ) {
        properties.appendChild(row);
        for (const [dataKey, dataValue] of Object.entries(mergedData)) {
          const configRow = document.createElement("label");
          configRow.className = "property-row property-subrow";
          const configLabel = document.createElement("span");
          configLabel.className = "property-label";
          configLabel.textContent = dataKey;
          const input = createTypedInput(dataValue, (nextValue) => {
            entity.building.data ??= {};
            entity.building.data[dataKey] = nextValue;
            const runtimeBuilding = getActiveSim().buildings.find(
              (building) => String(building.id) === String(entity.building.id),
            );
            if (runtimeBuilding) runtimeBuilding.data[dataKey] = nextValue;
            if (editorMode === "abstract") abstractDirty = true;
          });
          configRow.append(configLabel, input);
          properties.appendChild(configRow);
        }
        continue;
      }
      const input = createTypedInput(value, (nextValue) => {
        entity.building.data = nextValue;
        const runtimeBuilding = getActiveSim().buildings.find(
          (building) => String(building.id) === String(entity.building.id),
        );
        if (runtimeBuilding) runtimeBuilding.data = nextValue;
        if (editorMode === "abstract") abstractDirty = true;
      });
      row.append(label, input);
    } else {
      const content = document.createElement("span");
      content.className = "property-value";
      content.textContent = formatPropertyValue(value);
      row.append(label, content);
    }
    properties.appendChild(row);

    if (entity.type === "node" && Object.hasOwn(entity.runtime ?? {}, key)) {
      selectedRuntimeValues.set(key, {
        element: row.querySelector("input") ?? row.querySelector(".property-value"),
        getValue: () => formatPropertyValue(
          key === "maxBuffer" ? entity.runtime.max : entity.runtime[key],
        ),
      });
    } else if (entity.type === "building" && key === "data") {
      // Building configuration controls are edited directly in the blueprint and runtime model.
    }
  }
}

function refreshSelectedRuntimeValues() {
  for (const { element, getValue } of selectedRuntimeValues.values()) {
    const value = getValue();
    if (!element || document.activeElement === element) continue;
    if (element instanceof HTMLInputElement) {
      if (element.value !== value) element.value = value;
    } else if (element.textContent !== value) {
      element.textContent = value;
    }
  }
}

function stopSimulation() {
  if (simulationTimer !== null) {
    simPause(simulationTimer);
    simulationTimer = null;
  }

  pauseButton.textContent = "▶ Run";
  stepButton.disabled = false;
}

function makePropertyInput(labelText, value, type, onInput) {
  const row = document.createElement("label");
  row.className = "property-row";

  const label = document.createElement("span");
  label.className = "property-label";
  label.textContent = labelText;

  const input = document.createElement("input");
  input.className = "property-input";
  input.type = type;
  input.value = String(value);
  if (type === "number") {
    input.min = "0";
    input.step = "any";
  }
  input.addEventListener("input", () => {
    if (type === "number" && input.value.trim() === "") return;
    onInput(input);
  });

  row.append(label, input);
  properties.appendChild(row);
}

function getAbstractWireKey(wire) {
  return `${wire.A}\u0000${wire.B}`;
}

function renderAbstractWireList() {
  abstractConnectionList.replaceChildren();
  if (abstractCircuit.wires.length === 0) {
    const empty = document.createElement("p");
    empty.className = "abstract-empty";
    empty.textContent = "No weighted connections yet.";
    abstractConnectionList.appendChild(empty);
    return;
  }

  for (const wire of abstractCircuit.wires) {
    const button = document.createElement("button");
    button.className = "abstract-connection-button";
    button.type = "button";
    button.setAttribute(
      "aria-pressed",
      String(selectedAbstractWireKey === getAbstractWireKey(wire)),
    );
    button.textContent = `${wire.A} → ${wire.B} · weight ${wire.weight}`;
    button.title = button.textContent;
    button.addEventListener("click", () => {
      selectedEntity = null;
      selectedAbstractWireKey = getAbstractWireKey(wire);
      renderAbstractWireProperties();
      renderAbstractWireList();
    });
    abstractConnectionList.appendChild(button);
  }
}

function renderAbstractWireProperties() {
  selectedRuntimeValues.clear();
  properties.replaceChildren();
  propertiesTitle.textContent = "Abstract properties";
  const wire = abstractCircuit.wires.find(
    (entry) => getAbstractWireKey(entry) === selectedAbstractWireKey,
  );
  if (!wire) {
    selectedAbstractWireKey = null;
    renderSelectedEntity(null);
    return;
  }

  const heading = document.createElement("h3");
  heading.className = "property-title";
  heading.textContent = "Weighted connection";
  properties.appendChild(heading);

  const endpoints = document.createElement("div");
  endpoints.className = "property-row";
  endpoints.textContent = `${wire.A} → ${wire.B}`;
  properties.appendChild(endpoints);
  makePropertyInput("Weight", wire.weight, "number", (input) => {
    const value = Number(input.value);
    if (Number.isFinite(value) && value >= 0) {
      wire.weight = value;
      abstractDirty = true;
      renderAbstractWireList();
    }
  });

  const removeButton = document.createElement("button");
  removeButton.className = "property-action-button property-row";
  removeButton.type = "button";
  removeButton.textContent = "Delete connection";
  removeButton.addEventListener("click", () => {
    removeConnectionFromSim(abstractSim, wire.A, wire.B);
    abstractCircuit.wires = abstractCircuit.wires.filter(
      (entry) => getAbstractWireKey(entry) !== selectedAbstractWireKey,
    );
    selectedAbstractWireKey = null;
    abstractDirty = true;
    renderAbstractWireList();
    renderSelectedEntity(null);
  });
  properties.appendChild(removeButton);
}

function analyzeCurrentPhysicalCircuit() {
  abstractCircuit = analyzePhysicalCircuit(blueprint);
  abstractSim = blueprintToSim(abstractCircuit);
  abstractCircuitReady = true;
  abstractDirty = false;
  abstractViewMessage.textContent =
    "Abstract circuit derived from physical logic. Direct wires start at weight 1; knot-based weight analysis and physical generation are still to be implemented.";
}

function setEditorMode(mode, preserveAbstract = false) {
  if (mode === editorMode && !preserveAbstract) return;
  if (
    mode === "abstract" &&
    editorMode !== "abstract" &&
    abstractDirty &&
    !preserveAbstract &&
    !preserveAbstractOnNextOpen
  ) {
    const reanalyze = confirm(
      "Re-analyze the physical circuit and discard this abstract draft? Choose Cancel to keep editing the draft.",
    );
    if (!reanalyze) preserveAbstract = true;
  }

  editorMode = mode;
  physicalViewButton.setAttribute("aria-pressed", String(mode === "physical"));
  abstractViewButton.setAttribute("aria-pressed", String(mode === "abstract"));
  buildingPanel.hidden = false;
  buildingSearch.hidden = mode === "abstract";
  abstractTools.hidden = mode !== "abstract";
  abstractViewStatus.hidden = mode !== "abstract";
  generatePhysicalButton.hidden = mode !== "abstract";

  if (mode === "abstract") {
    placement.clearSelection();
    renderSelectedEntity(null);
    propertiesTitle.textContent = "Abstract properties";
    selectedAbstractWireKey = null;
    if (preserveAbstractOnNextOpen) {
      preserveAbstract = true;
      preserveAbstractOnNextOpen = false;
    }
    if (!preserveAbstract) {
      abstractCircuit = createAbstractCircuit();
      abstractCircuitReady = false;
      abstractDirty = false;
      try {
        analyzeCurrentPhysicalCircuit();
      } catch (error) {
        abstractCircuit = createAbstractCircuit();
        abstractSim = blueprintToSim(abstractCircuit);
        abstractCircuitReady = true;
        abstractDirty = false;
        abstractViewMessage.textContent =
          `${error.message} The available building palette can be used to create a new abstract draft.`;
      }
    }
    generatePhysicalButton.disabled = true;
    generatePhysicalButton.title = "Physical generation requires the signal-lowering algorithm.";
    renderAbstractWireList();
  } else {
    placement.clearSelection();
    propertiesTitle.textContent = "Properties";
    selectedAbstractWireKey = null;
    if (selectedEntity) renderSelectedEntity(selectedEntity);
    else properties.replaceChildren();
  }
}

function setFileMenuOpen(isOpen) {
  fileMenu.hidden = !isOpen;
  fileMenuButton.setAttribute("aria-expanded", String(isOpen));
}

function validateBlueprint(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("The file must contain a blueprint object.");
  }
  if (!Array.isArray(data.buildings)) {
    throw new Error('The blueprint must include a "buildings" array.');
  }
  for (const building of data.buildings) {
    if (
      !building ||
      typeof building !== "object" ||
      typeof building.name !== "string" ||
      (typeof building.id !== "string" && typeof building.id !== "number")
    ) {
      throw new Error("Each building must have a name and a string or number ID.");
    }
    validateNodeConfiguration(building);
  }

  for (const collectionName of ["pipes", "wires"]) {
    if (data[collectionName] === undefined) continue;
    if (!Array.isArray(data[collectionName])) {
      throw new Error(`The blueprint "${collectionName}" value must be an array.`);
    }
    for (const connection of data[collectionName]) {
      if (
        !connection ||
        typeof connection !== "object" ||
        typeof connection.A !== "string" ||
        typeof connection.B !== "string"
      ) {
        throw new Error(`Each entry in "${collectionName}" must have string A and B endpoints.`);
      }
    }
  }

  if (data.simData !== undefined) {
    if (!data.simData || typeof data.simData !== "object" || Array.isArray(data.simData)) {
      throw new Error('The blueprint "simData" value must be an object.');
    }
    if (data.simData.nodes !== undefined && !Array.isArray(data.simData.nodes)) {
      throw new Error('The blueprint "simData.nodes" value must be an array.');
    }
    if (
      data.simData.nodes?.some(
        (node) => !node || typeof node !== "object" || typeof node.id !== "string",
      )
    ) {
      throw new Error('Each entry in "simData.nodes" must have a string ID.');
    }
  }

  return {
    ...data,
    pipes: data.pipes ?? [],
    wires: data.wires ?? [],
    simData: data.simData ?? { nodes: [], tick: 1, time: null, pollution: null, windSpeed: null },
  };
}

fileMenuButton.addEventListener("click", () => {
  setFileMenuOpen(fileMenu.hidden);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".toolbar-menu-container")) setFileMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setFileMenuOpen(false);
});

importBlueprintButton.addEventListener("click", () => {
  setFileMenuOpen(false);
  requestedImportFormat = "physical";
  blueprintFileInput.click();
});

importProjectButton.addEventListener("click", () => {
  setFileMenuOpen(false);
  requestedImportFormat = "project";
  blueprintFileInput.click();
});

blueprintFileInput.addEventListener("change", async () => {
  const [file] = blueprintFileInput.files;
  if (!file) return;

  try {
    const parsed = JSON.parse(await file.text());
    const isProject = parsed?.format === "industrial-circuit-project";
    if (requestedImportFormat === "project" && !isProject) {
      throw new Error("The selected file is not an Industrialist Circuit Builder project.");
    }
    if (requestedImportFormat === "physical" && isProject) {
      throw new Error("Use Import project for project files.");
    }
    if (isProject && parsed.version !== 2) {
      throw new Error(`Unsupported project version: ${parsed.version}.`);
    }
    const importedBlueprint = validateBlueprint(isProject ? parsed.blueprint : parsed);
    const importedAbstract = isProject
      ? validateAbstractCircuit(parsed.abstractCircuit)
      : null;
    const importedSim = blueprintToSim(importedBlueprint);

    stopSimulation();
    Object.assign(blueprint, importedBlueprint);
    sim = importedSim;
    placement.clearSelection();
    renderSelectedEntity(null);
    abstractCircuit = importedAbstract ?? createAbstractCircuit();
    abstractSim = importedAbstract ? blueprintToSim(importedAbstract) : blueprintToSim(abstractCircuit);
    abstractDirty = false;
    abstractCircuitReady = Boolean(importedAbstract);
    preserveAbstractOnNextOpen = Boolean(importedAbstract);
    if (editorMode === "abstract") {
      if (importedAbstract) {
        setEditorMode("abstract", true);
        abstractViewMessage.textContent =
          "Project abstract draft restored. Physical circuit remains authoritative; generation is not yet available.";
      } else {
        setEditorMode("physical");
        setEditorMode("abstract");
      }
    }
  } catch (error) {
    alert(`Could not import blueprint: ${error.message}`);
  } finally {
    blueprintFileInput.value = "";
  }
});

exportBlueprintButton.addEventListener("click", () => {
  setFileMenuOpen(false);
  const file = new Blob([`${JSON.stringify(blueprint, null, 2)}\n`], {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "blueprint.json";
  downloadLink.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
});

exportProjectButton.addEventListener("click", () => {
  setFileMenuOpen(false);
  let validatedAbstract;
  try {
    validatedAbstract = validateAbstractCircuit(abstractCircuit);
  } catch (error) {
    alert(`Could not export project: ${error.message}`);
    return;
  }
  const project = {
    format: "industrial-circuit-project",
    version: 2,
    blueprint,
    abstractCircuit: validatedAbstract,
  };
  const file = new Blob([`${JSON.stringify(project, null, 2)}\n`], {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "circuit-project.json";
  downloadLink.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
});

function addPlacedBuilding(targetBlueprint, name, id, position, rotation) {
  const isDLatch = name === "D-Latch";
  addBuilding(
    targetBlueprint,
    isDLatch ? "SevenSegmentDisplay" : name,
    id,
    position,
    rotation,
  );
  const building = targetBlueprint.buildings.at(-1);
  addBuildingToSim(sim, building);
  if (isDLatch) {
    building.template = "D-Latch";
    const wires = [
      { A: `${id}.Out2MainConnector`, B: `${id}.In2MainConnector` },
      { A: `${id}.Out2MainConnector`, B: `${id}.In1MainConnector` },
    ];
    for (const wire of wires) {
      targetBlueprint.wires.push(wire);
      addConnectionToSim(sim, wire.A, wire.B);
    }
  }
}

function addAbstractBuilding(targetBlueprint, name, id, position, rotation) {
  const isDLatch = name === "D-Latch";
  addBuilding(
    targetBlueprint,
    isDLatch ? "SevenSegmentDisplay" : name,
    id,
    position,
    rotation,
  );
  const building = targetBlueprint.buildings.at(-1);
  if (isDLatch) building.template = "D-Latch";
  addBuildingToSim(abstractSim, building);

  if (isDLatch) {
    for (const wire of [
      { A: `${id}.Out2MainConnector`, B: `${id}.In2MainConnector`, weight: 1 },
      { A: `${id}.Out2MainConnector`, B: `${id}.In1MainConnector`, weight: 1 },
    ]) {
      targetBlueprint.wires.push(wire);
      addConnectionToSim(abstractSim, wire.A, wire.B);
    }
  }
  abstractCircuitReady = true;
  abstractDirty = true;
  renderAbstractWireList();
}

function toggleSimConnection(sourceId, targetId) {
  const change = addConnection(blueprint, sourceId, targetId);
  if (!change) return;

  for (const previous of change.previous ?? []) {
    removeConnectionFromSim(sim, previous.A, previous.B);
  }
  for (const current of change.current ?? []) {
    addConnectionToSim(sim, current.A, current.B);
  }
}

function toggleAbstractConnection(sourceId, targetId) {
  if (
    !isAbstractLogicEndpoint(abstractCircuit, sourceId) ||
    !isAbstractLogicEndpoint(abstractCircuit, targetId)
  ) {
    abstractViewMessage.textContent = "Abstract weighted wires can connect logic nodes only.";
    return null;
  }
  const change = addConnection(abstractCircuit, sourceId, targetId);
  if (!change) return null;

  for (const previous of change.previous ?? []) {
    removeConnectionFromSim(abstractSim, previous.A, previous.B);
  }
  for (const current of change.current ?? []) {
    current.weight = 1;
    addConnectionToSim(abstractSim, current.A, current.B);
  }
  const lastConnection = change.current?.at(-1) ?? change.previous?.at(-1);
  selectedAbstractWireKey = lastConnection ? getAbstractWireKey(lastConnection) : null;
  abstractCircuitReady = true;
  abstractDirty = true;
  renderAbstractWireList();
  return change;
}

blueprintToSimButton.addEventListener("click", () => {
  stopSimulation();
  sim = blueprintToSim(blueprint);
});

physicalViewButton.addEventListener("click", () => {
  setEditorMode("physical");
});

abstractViewButton.addEventListener("click", () => {
  setEditorMode("abstract");
});

generatePhysicalButton.addEventListener("click", () => {
  if (!abstractCircuitReady) return;
  try {
    const generatedBlueprint = validateBlueprint(
      generatePhysicalLayout(blueprint, abstractCircuit),
    );
    const generatedSim = blueprintToSim(generatedBlueprint);
    Object.assign(blueprint, generatedBlueprint);
    stopSimulation();
    sim = generatedSim;
    abstractViewMessage.textContent = "Physical logic layout generated.";
  } catch (error) {
    abstractViewMessage.textContent = error.message;
  }
});

pauseButton.addEventListener("click", () => {
  if (simulationTimer !== null) {
    stopSimulation();
    return;
  }

  simulationTimer = simStart(sim);
  pauseButton.textContent = "⏸ Pause";
  stepButton.disabled = true;
});

stepButton.addEventListener("click", () => {
  if (simulationTimer === null) simStepToNextTransfer(sim);
});

canvas.getCanvas().addEventListener("click", (event) => {
  if (editorMode === "abstract") {
    placement.handleClick(
      event,
      abstractCircuit,
      addAbstractBuilding,
      toggleAbstractConnection,
      (entity) => {
        if (entity) {
          selectedAbstractWireKey = null;
          renderAbstractWireList();
          renderSelectedEntity(entity);
        } else if (selectedAbstractWireKey) {
          renderAbstractWireProperties();
        } else {
          renderSelectedEntity(null);
        }
      },
      abstractSim,
    );
    return;
  }
  placement.handleClick(
    event,
    blueprint,
    addPlacedBuilding,
    toggleSimConnection,
    renderSelectedEntity,
    sim,
  );
});

canvas.getCanvas().addEventListener("mousemove", (event) => {
  if (editorMode !== "physical") return;
  placement.handleMouseMove(event, blueprint);
});

window.addEventListener("keydown", (event) => {
  if (editorMode === "abstract") {
    const target = event.target;
    const editingText = target instanceof HTMLElement && (
      target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
    );
    if (
      !editingText &&
      !event.repeat &&
      ["Delete", "Backspace"].includes(event.key) &&
      selectedAbstractWireKey
    ) {
      const wire = abstractCircuit.wires.find(
        (entry) => getAbstractWireKey(entry) === selectedAbstractWireKey,
      );
      if (wire) {
        removeConnectionFromSim(abstractSim, wire.A, wire.B);
        abstractCircuit.wires = abstractCircuit.wires.filter(
          (entry) => getAbstractWireKey(entry) !== selectedAbstractWireKey,
        );
      }
      selectedAbstractWireKey = null;
      abstractDirty = true;
      renderAbstractWireList();
      renderSelectedEntity(null);
      event.preventDefault();
      return;
    }
    placement.handleKeyDown(
      event,
      abstractCircuit,
      abstractSim,
      (entity) => {
        if (entity) selectedAbstractWireKey = null;
        renderSelectedEntity(entity);
      },
    );
    renderAbstractWireList();
    return;
  }
  placement.handleKeyDown(event, blueprint, sim, renderSelectedEntity);
});

pauseButton.disabled = false;
stepButton.disabled = false;

function frame() {
  canvas.render();
  if (editorMode === "physical") {
    placement.render(canvas.getContext(), blueprint, sim);
  } else {
    placement.render(canvas.getContext(), abstractCircuit, abstractSim, {
      showWireWeights: true,
    });
  }
  refreshSelectedRuntimeValues();

  requestAnimationFrame(frame);
}

frame();
