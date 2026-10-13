import registry from "./registry.js";

export const ABSTRACT_CIRCUIT_VERSION = 2;

export function createAbstractCircuit() {
  return {
    version: ABSTRACT_CIRCUIT_VERSION,
    buildings: [],
    wires: [],
    pipes: [],
  };
}

export function validateNodeConfiguration(building) {
  if (
    building.nodeConfig !== undefined &&
    (!building.nodeConfig || typeof building.nodeConfig !== "object" || Array.isArray(building.nodeConfig))
  ) {
    throw new Error(`Building ${building.id} has invalid node configuration.`);
  }
  for (const [nodeName, config] of Object.entries(building.nodeConfig ?? {})) {
    if (registry[building.name] && !registry[building.name].nodes?.some(
      (node) => node.name === nodeName,
    )) {
      throw new Error(`Unknown node configuration ${building.id}.${nodeName}.`);
    }
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error(`Node configuration for ${building.id}.${nodeName} must be an object.`);
    }
    for (const key of ["maxBuffer", "transferRate"]) {
      if (
        config[key] !== undefined &&
        (!Number.isFinite(config[key]) || config[key] < 0)
      ) {
        throw new Error(`${building.id}.${nodeName} ${key} must be finite and non-negative.`);
      }
    }
  }
}

export function isAbstractLogicEndpoint(circuit, id) {
  const building = circuit.buildings.find((entry) => id.startsWith(`${entry.id}.`));
  if (!building) return false;
  const nodeName = id.slice(`${building.id}.`.length);
  if (building.template === "D-Latch" && ["D", "WE", "Q"].includes(nodeName)) return true;
  return registry[building.name]?.nodes?.some(
    (node) => node.name === nodeName && node.kind === "logic",
  ) ?? false;
}

export function validateAbstractCircuit(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("The abstract circuit must be an object.");
  }
  if (value.version !== ABSTRACT_CIRCUIT_VERSION) {
    throw new Error(`Unsupported abstract circuit version: ${value.version}.`);
  }
  if (!Array.isArray(value.buildings) || !Array.isArray(value.wires)) {
    throw new Error('The abstract circuit must include "buildings" and "wires" arrays.');
  }

  const buildingIds = new Set();
  const buildings = value.buildings.map((building) => {
    if (
      !building ||
      typeof building !== "object" ||
      (typeof building.id !== "string" && typeof building.id !== "number") ||
      typeof building.name !== "string"
    ) {
      throw new Error("Each abstract building must have a string name and a string or number ID.");
    }
    validateNodeConfiguration(building);
    const id = String(building.id);
    if (buildingIds.has(id)) {
      throw new Error(`Duplicate abstract building ID: ${id}.`);
    }
    buildingIds.add(id);
    return {
      ...building,
      positionSite: building.positionSite ? { ...building.positionSite } : undefined,
      positionGame: building.positionGame ? { ...building.positionGame } : undefined,
      data: building.data && typeof building.data === "object" ? { ...building.data } : {},
    };
  });

  const wires = value.wires.map((wire) => {
    if (
      !wire ||
      typeof wire !== "object" ||
      typeof wire.A !== "string" ||
      typeof wire.B !== "string" ||
      !Number.isFinite(wire.weight) ||
      wire.weight < 0
    ) {
      throw new Error("Each abstract wire must have string endpoints and a finite non-negative weight.");
    }
    const fromExists = buildings.some((building) => wire.A.startsWith(`${building.id}.`));
    const toExists = buildings.some((building) => wire.B.startsWith(`${building.id}.`));
    if (!fromExists || !toExists) throw new Error("An abstract wire refers to a missing building.");
    for (const endpoint of [wire.A, wire.B]) {
      if (!isAbstractLogicEndpoint({ buildings }, endpoint)) {
        throw new Error(`Abstract wire endpoint ${endpoint} is not a logic node.`);
      }
    }
    return { ...wire };
  });

  return {
    version: ABSTRACT_CIRCUIT_VERSION,
    buildings,
    wires,
    pipes: [],
  };
}
