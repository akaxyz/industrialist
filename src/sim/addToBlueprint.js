import registry from "../registry.js";

const PIPE_KINDS = new Set(["item", "fluid", "largefluid"]);

export function addBuilding(blueprint, name, id, pos, rotation = 0) {
  if (!registry[name]) {
    throw new Error(`Unknown building definition: ${name}`);
  }

  if (blueprint.buildings.some((building) => building.id === id)) {
    throw new Error(`Building ID already exists: ${id}`);
  }

  blueprint.buildings.push({
    id,
    name,
    xPos: pos?.x ?? null,
    zPos: pos?.z ?? null,
    rot: rotation,
    updateOrder: 2,
    configs: {},
  });
}

function resolveNode(blueprint, endpoint) {
  const separator = endpoint.indexOf(".");
  if (separator <= 0 || separator === endpoint.length - 1) {
    return { error: `Invalid node endpoint: ${endpoint}` };
  }

  const buildingId = endpoint.slice(0, separator);
  const nodeName = endpoint.slice(separator + 1);

  const building = blueprint.buildings.find((entry) => entry.id === buildingId);

  if (!building) {
    return { error: `Building not found: ${buildingId}` };
  }

  const buildingDef = registry[building.name];
  if (!buildingDef) {
    return { error: `Building definition not found: ${building.name}` };
  }

  const nodeDef = (buildingDef.nodes ?? []).find(
    (entry) => entry.name === nodeName,
  );

  if (!nodeDef) {
    return {
      error: `Node "${nodeName}" not found on building "${building.name}"`,
    };
  }

  return { building, buildingDef, nodeDef };
}

function getNodeWorldPosition(building, nodeDef) {
  if (building.xPos == null || building.zPos == null) {
    return null;
  }

  const offset = nodeDef.offset;
  if (
    !offset ||
    !Number.isFinite(offset.x) ||
    !Number.isFinite(offset.y) ||
    !Number.isFinite(offset.z)
  ) {
    return null;
  }

  const angle = ((building.rot ?? 0) * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: building.xPos + offset.x * cos + offset.z * sin,
    y: offset.y,
    z: building.zPos - offset.x * sin + offset.z * cos,
  };
}

export function validateConnection(blueprint, A, B) {
  if (A === B) {
    return { valid: false, reason: "A node cannot connect to itself." };
  }

  const a = resolveNode(blueprint, A);
  if (a.error) return { valid: false, reason: a.error };

  const b = resolveNode(blueprint, B);
  if (b.error) return { valid: false, reason: b.error };

  const { nodeDef: nodeA } = a;
  const { nodeDef: nodeB } = b;

  if (nodeA.kind !== nodeB.kind) {
    return { valid: false, reason: "Node types do not match." };
  }

  // Colorless nodes are treated as compatible with colored nodes.
  if (
    nodeA.color != null &&
    nodeB.color != null &&
    nodeA.color !== nodeB.color
  ) {
    return { valid: false, reason: "Node colors do not match." };
  }

  // Reject connections that violate the directional rules.
  if (nodeA.direction === "input" || nodeB.direction === "output") {
    return { valid: false, reason: "Connection direction is invalid." };
  }

  const connectionType = PIPE_KINDS.has(nodeA.kind) ? "pipes" : "wires";

  if (connectionType === "wires") {
    const positionA = getNodeWorldPosition(a.building, nodeA);
    const positionB = getNodeWorldPosition(b.building, nodeB);

    // If positions or offsets are unavailable, range cannot be verified.
    // Leave this for blueprint validation rather than rejecting the wire.
    if (positionA && positionB) {
      const dx = positionA.x - positionB.x;
      const dy = positionA.y - positionB.y;
      const dz = positionA.z - positionB.z;
      const distanceSquared = dx * dx + dy * dy + dz * dz;

      const maxRange = nodeA.wireRange;
      if (distanceSquared > maxRange * maxRange) {
        return { valid: false, reason: "Nodes are out of wire range." };
      }
    }
  }

  return {
    valid: true,
    connectionType,
    endpointA: a,
    endpointB: b,
  };
}

export function addConnection(blueprint, A, B) {
  const validation = validateConnection(blueprint, A, B);

  if (!validation.valid) {
    return { action: "rejected", reason: validation.reason };
  }

  const { connectionType } = validation;
  const connections = blueprint[connectionType];

  if (!Array.isArray(connections)) {
    throw new Error(`Blueprint is missing its "${connectionType}" array.`);
  }

  const existingIndex = connections.findIndex(
    (connection) =>
      (connection.A === A && connection.B === B) ||
      (connection.A === B && connection.B === A),
  );

  if (existingIndex !== -1) {
    connections.splice(existingIndex, 1);
    return { action: "removed", connectionType };
  }

  connections.push({ A, B });
  return { action: "added", connectionType };
}
