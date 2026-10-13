import registry from "../../registry.js";
import {
  getEventCanvasPosition,
  getCanvas,
  getMouseCanvasPosition,
  getMouseWorldPosition,
  worldToScreen,
  getZoom,
  PIXELS_PER_STUD,
} from "./canvas.js";

const GRID_SIZE = 2;

let placement = null;
let nextBuildingId = 0;
let selectedNodeId = null;
let selectedBuildingId = null;
let hoveredNodeId = null;

export function startPlacement(type, definition) {
  placement = {
    type,
    definition,
    template: type === "D-Latch",
    rotation: 90,
  };
}

export function startDLatchPlacement() {
  startPlacement("D-Latch", registry.SevenSegmentDisplay);
}

export function cancelPlacement() {
  placement = null;
}

export function clearSelection() {
  cancelPlacement();
  selectedNodeId = null;
  selectedBuildingId = null;
  hoveredNodeId = null;
}

function snap(value) {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

function getPlacementRoot() {
  const mouse = getMouseWorldPosition();

  return {
    x: snap(mouse.x),
    y: snap(mouse.y),
  };
}

function getNodeId(building, node) {
  return `${building.id}.${node.name}`;
}

function getBuildingNodes(building, definition) {
  const physicalNodes = definition.nodes ?? [];
  if (building.template !== "D-Latch") return physicalNodes;

  return [
    ...physicalNodes,
    ...["D", "WE", "Q"]
      .map((name) => getTemplatePort(building, name))
      .filter(Boolean),
  ];
}

function rotateOffset(offset, rotation = 0) {
  const x = offset.x ?? 0;
  const y = offset.y ?? 0;
  const normalizedRotation = ((rotation % 360) + 360) % 360;

  if (normalizedRotation === 90) return { x: -y, y: x };
  if (normalizedRotation === 180) return { x: -x, y: -y };
  if (normalizedRotation === 270) return { x: y, y: -x };
  return { x, y };
}

function getNodePosition(root, node, rotation = 0) {
  const offset = rotateOffset(node.siteOffset ?? {}, rotation);
  return worldToScreen(root.x + offset.x, root.y + offset.y);
}

function findNodeAt(event, blueprint) {
  const click = getEventCanvasPosition(event);
  const hitRadius = Math.max(5, 0.18 * PIXELS_PER_STUD * getZoom() + 2);
  let closest = null;

  for (const building of blueprint.buildings) {
    const definition = registry[building.name];
    if (!definition) continue;

    const root = building.positionSite ?? { x: 0, y: 0 };

    for (const node of getBuildingNodes(building, definition)) {
      const position = getNodePosition(root, node, building.rotation);
      const distance = Math.hypot(click.x - position.x, click.y - position.y);

      if (distance <= hitRadius && (!closest || distance < closest.distance)) {
        closest = { building, node, id: getNodeId(building, node), distance };
      }
    }
  }

  return closest;
}

function getBuildingBounds(building, definition) {
  const base = definition.base ?? {};
  const rotation = building.rotation ?? 0;
  const offset = rotateOffset(base.offset ?? {}, rotation);
  const swapsDimensions = rotation % 180 !== 0;
  const buildingWidth = swapsDimensions ? base.height ?? 0 : base.width ?? 0;
  const buildingHeight = swapsDimensions ? base.width ?? 0 : base.height ?? 0;
  const root = building.positionSite ?? { x: 0, y: 0 };
  const topLeft = worldToScreen(
    root.x + offset.x - buildingWidth / 2,
    root.y + offset.y - buildingHeight / 2,
  );
  const bottomRight = worldToScreen(
    root.x + offset.x + buildingWidth / 2,
    root.y + offset.y + buildingHeight / 2,
  );

  return {
    left: Math.min(topLeft.x, bottomRight.x),
    right: Math.max(topLeft.x, bottomRight.x),
    top: Math.min(topLeft.y, bottomRight.y),
    bottom: Math.max(topLeft.y, bottomRight.y),
  };
}

function findBuildingAt(event, blueprint) {
  const click = getEventCanvasPosition(event);

  for (const building of [...blueprint.buildings].reverse()) {
    const definition = registry[building.name];
    if (!definition) continue;

    const bounds = getBuildingBounds(building, definition);
    if (
      click.x >= bounds.left && click.x <= bounds.right &&
      click.y >= bounds.top && click.y <= bounds.bottom
    ) {
      return { building, definition };
    }
  }

  return null;
}

export function handleClick(event, blueprint, addBuilding, addConnection, onSelect, sim) {
  if (!placement) {
    const clickedNode = findNodeAt(event, blueprint);

    if (clickedNode) {
      if (selectedNodeId && selectedNodeId !== clickedNode.id) {
        const previousNode = findNodeById(selectedNodeId, blueprint);
        let sourceId = selectedNodeId;
        let targetId = clickedNode.id;

        if (previousNode?.node.direction === "input" && clickedNode.node.direction === "output") {
          sourceId = clickedNode.id;
          targetId = selectedNodeId;
        }

        const change = addConnection(sourceId, targetId);
        if (change) {
          if (event.shiftKey) {
            const source = findNodeById(selectedNodeId, blueprint);
            onSelect(source ? {
              type: "node",
              id: selectedNodeId,
              building: source.building,
              definition: source.node,
              runtime: sim?.nodes.find((node) => node.id === selectedNodeId),
            } : null);
          } else {
            selectedNodeId = null;
            selectedBuildingId = null;
            onSelect(null);
          }
          return;
        }
      }

      selectedNodeId = clickedNode.id;
      selectedBuildingId = null;
      onSelect({
        type: "node",
        id: clickedNode.id,
        building: clickedNode.building,
        definition: clickedNode.node,
        runtime: sim?.nodes.find((node) => node.id === clickedNode.id),
      });
      return;
    }

    const clickedBuilding = findBuildingAt(event, blueprint);
    selectedNodeId = null;
    selectedBuildingId = clickedBuilding?.building.id ?? null;

    if (clickedBuilding) {
      onSelect({
        type: "building",
        building: clickedBuilding.building,
        definition: clickedBuilding.definition,
      });
    } else {
      onSelect(null);
    }
    return;
  }

  const root = getPlacementRoot();

  while (blueprint.buildings.some((building) => String(building.id) === String(nextBuildingId))) {
    nextBuildingId++;
  }
  const id = nextBuildingId++;

  addBuilding(blueprint, placement.type, id, root, placement.rotation);

  if (!event.shiftKey) {
    cancelPlacement();
  }
}

export function handleMouseMove(event, blueprint) {
  hoveredNodeId = findNodeAt(event, blueprint)?.id ?? null;
}

function findNodeById(id, blueprint) {
  for (const building of blueprint.buildings) {
    const definition = registry[building.name];
    const node = getBuildingNodes(building, definition)
      .find((entry) => getNodeId(building, entry) === id);
    if (node) return { building, node };
  }

  return null;
}

function drawNodeTooltip(ctx, blueprint, sim) {
  if (!hoveredNodeId) return;

  const match = findNodeById(hoveredNodeId, blueprint);
  const runtimeNode = sim?.nodes.find((node) => node.id === hoveredNodeId);
  if (!match || !runtimeNode) return;

  const rows = match.node.kind === "item" || match.node.kind === "fluid" || match.node.kind === "largefluid"
    ? [
        match.node.name,
        `${runtimeNode.item || "None"} ${runtimeNode.amount}/${runtimeNode.max} ${runtimeNode.temp}°C`,
        `Transfer: ${runtimeNode.transferRate}`,
      ]
    : [
        match.node.name,
        `${runtimeNode.amount}/${runtimeNode.max}MF`,
        `Transfer: ${runtimeNode.transferRate}`,
      ];

  const padding = 7;
  const lineHeight = 16;
  ctx.font = "12px Segoe UI, sans-serif";
  const width = Math.max(...rows.map((row) => ctx.measureText(row).width)) + padding * 2;
  const height = rows.length * lineHeight + padding * 2;
  const mouse = getMouseCanvasPosition();
  const canvasBounds = getCanvas().getBoundingClientRect();
  const x = mouse.x + width + 12 > canvasBounds.width ? mouse.x - width - 12 : mouse.x + 12;
  const y = mouse.y + height + 12 > canvasBounds.height ? mouse.y - height - 12 : mouse.y + 12;

  ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "top";

  rows.forEach((row, index) => {
    ctx.fillText(row, x + padding, y + padding + index * lineHeight);
  });
}

export function handleKeyDown(event, blueprint, sim, onSelect) {
  if (event.key === "Escape") {
    cancelPlacement();
  } else if (
    event.key.toLowerCase() === "q" &&
    !event.repeat &&
    !placement &&
    selectedBuildingId !== null &&
    !(event.target instanceof HTMLElement && (
      event.target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)
    ))
  ) {
    const deletedNodeIds = new Set(
      sim.nodes
        .filter((node) => node.id.startsWith(`${selectedBuildingId}.`))
        .map((node) => node.id),
    );
    blueprint.buildings = blueprint.buildings.filter(
      (building) => String(building.id) !== String(selectedBuildingId),
    );
    blueprint.wires = blueprint.wires.filter(
      (wire) => !deletedNodeIds.has(wire.A) && !deletedNodeIds.has(wire.B),
    );
    blueprint.pipes = blueprint.pipes.filter(
      (pipe) => !deletedNodeIds.has(pipe.A) && !deletedNodeIds.has(pipe.B),
    );
    sim.nodes = sim.nodes.filter((node) => !deletedNodeIds.has(node.id));
    for (const node of sim.nodes) {
      node.connections = node.connections.filter((connection) => !deletedNodeIds.has(connection.id));
    }
    sim.buildings = sim.buildings.filter(
      (building) => String(building.id) !== String(selectedBuildingId),
    );
    selectedNodeId = null;
    selectedBuildingId = null;
    onSelect(null);
    event.preventDefault();
  } else if (placement && event.key.toLowerCase() === "r" && !event.repeat) {
    placement.rotation = (placement.rotation + 90) % 360;
    event.preventDefault();
  }
}

function drawBuilding(
  ctx,
  definition,
  root,
  fillColor,
  strokeColor,
  buildingId = null,
  rotation = 0,
  runtimeNodes = new Map(),
  connectedNodeIds = new Set(),
  template = null,
) {
  const base = definition.base ?? {};
  const baseOffset = rotateOffset(base.offset ?? {}, rotation);
  const swapsDimensions = rotation % 180 !== 0;
  const widthInStuds = swapsDimensions ? base.height ?? 0 : base.width ?? 0;
  const heightInStuds = swapsDimensions ? base.width ?? 0 : base.height ?? 0;
  const topLeft = worldToScreen(
    root.x + baseOffset.x - widthInStuds / 2,
    root.y + baseOffset.y - heightInStuds / 2,
  );
  const zoom = getZoom();

  const width = widthInStuds * PIXELS_PER_STUD * zoom;
  const height = heightInStuds * PIXELS_PER_STUD * zoom;

  ctx.fillStyle = fillColor;
  ctx.fillRect(topLeft.x, topLeft.y, width, height);

  const isSelected = buildingId !== null && String(buildingId) === String(selectedBuildingId);
  ctx.strokeStyle = isSelected ? "#c2410c" : strokeColor;
  ctx.lineWidth = isSelected ? 3 : 2;

  ctx.strokeRect(topLeft.x, topLeft.y, width, height);

  const building = buildingId === null ? { id: "", template } : { id: buildingId, template };
  for (const node of getBuildingNodes(building, definition)) {
    const position = getNodePosition(root, node, rotation);
    const radius = Math.max(4, 0.18 * PIXELS_PER_STUD * zoom);
    const nodeId = `${buildingId}.${node.name}`;
    const isSelected =
      buildingId !== null && nodeId === selectedNodeId;
    const isConnected = connectedNodeIds.has(nodeId);
    const isOccupied = (runtimeNodes.get(nodeId)?.amount ?? 0) >= 1;

    const color = { input: "#FF0", output: "#A0A" }[node.direction] ?? "#00F";

    if (isSelected || isConnected) {
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius + (isSelected ? 7 : 5), 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? "rgba(255, 145, 0, 0.5)" : "rgba(20, 184, 166, 0.35)";
      ctx.fill();
      ctx.strokeStyle = isSelected ? "#c2410c" : "#0f766e";
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (!isOccupied) {
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = "#333333";
      ctx.fill();
    }
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    if (node.templateEndpoints) {
      ctx.fillStyle = "#111827";
      ctx.font = `${Math.max(9, 10 * zoom)}px Segoe UI, sans-serif`;
      ctx.textAlign = node.direction === "output" ? "left" : "right";
      ctx.textBaseline = "middle";
      ctx.fillText(
        node.name,
        position.x + (node.direction === "output" ? radius + 4 : -radius - 4),
        position.y,
      );
    }
  }
}

export function render(ctx, blueprint = null, sim = null, options = {}) {
  if (blueprint) {
    const runtimeNodes = new Map(sim?.nodes.map((node) => [node.id, node]) ?? []);
    const connectedNodeIds = new Set();
    if (hoveredNodeId) {
      for (const connection of [...blueprint.wires, ...blueprint.pipes]) {
        if (connection.A === hoveredNodeId) connectedNodeIds.add(connection.B);
        if (connection.B === hoveredNodeId) connectedNodeIds.add(connection.A);
      }
    }

    for (const wire of blueprint.wires) {
      const source = findNodeById(wire.A, blueprint);
      const target = findNodeById(wire.B, blueprint);
      if (!source || !target) continue;

      const sourceRoot = source.building.positionSite ?? { x: 0, y: 0 };
      const targetRoot = target.building.positionSite ?? { x: 0, y: 0 };
      const start = getNodePosition(sourceRoot, source.node, source.building.rotation);
      const end = getNodePosition(targetRoot, target.node, target.building.rotation);

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = "#168a77";
      ctx.lineWidth = 3;
      ctx.stroke();

      const arrowX = start.x + (end.x - start.x) * 0.72;
      const arrowY = start.y + (end.y - start.y) * 0.72;
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      const arrowSize = 10;
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
        arrowY - arrowSize * Math.sin(angle - Math.PI / 6),
      );
      ctx.lineTo(
        arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
        arrowY - arrowSize * Math.sin(angle + Math.PI / 6),
      );
      ctx.closePath();
      ctx.fillStyle = "#168a77";
      ctx.fill();

      if (options.showWireWeights && Number.isFinite(wire.weight)) {
        const labelX = (start.x + end.x) / 2;
        const labelY = (start.y + end.y) / 2;
        const label = String(wire.weight);
        ctx.font = "11px Segoe UI, sans-serif";
        const labelWidth = ctx.measureText(label).width + 8;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillRect(labelX - labelWidth / 2, labelY - 9, labelWidth, 18);
        ctx.fillStyle = "#0f172a";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, labelX, labelY);
      }
    }

    for (const building of blueprint.buildings) {
      const definition = registry[building.name];
      if (!definition) continue;

      const root = building.positionSite ?? { x: 0, y: 0 };
      drawBuilding(
        ctx,
        definition,
        root,
        "rgba(120, 180, 255, 0.3)",
        "#7aa7ff",
        building.id,
        building.rotation,
        runtimeNodes,
        connectedNodeIds,
        building.template,
      );
    }

    drawNodeTooltip(ctx, blueprint, sim);
  }

  if (!placement) return;

  const { definition } = placement;
  const root = getPlacementRoot();
  drawBuilding(
    ctx,
    definition,
    root,
    "rgba(100, 150, 255, 0.25)",
    "#6699ff",
    null,
    placement.rotation,
    new Map(),
    new Set(),
    placement.template ? "D-Latch" : null,
  );
}
