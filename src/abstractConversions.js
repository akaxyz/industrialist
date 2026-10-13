import registry from "./registry.js";
import {
  createAbstractCircuit,
  validateAbstractCircuit,
} from "./abstractCircuit.js";

export function analyzePhysicalCircuit(blueprint) {
  if (!blueprint || !Array.isArray(blueprint.buildings) || !Array.isArray(blueprint.wires)) {
    throw new Error("A physical blueprint with buildings and wires is required for analysis.");
  }

  const buildings = blueprint.buildings.filter((building) =>
    (registry[building.name]?.nodes ?? []).some((node) => node.kind === "logic"),
  );
  if (buildings.some((building) => building.name === "LogicKnot")) {
    throw new Error(
      "Physical-to-abstract knot analysis is not implemented yet. The abstract view starts a new draft.",
    );
  }

  const getLogicNode = (id) => {
    const building = buildings.find((entry) => id.startsWith(`${entry.id}.`));
    if (!building) return null;
    const name = id.slice(`${building.id}.`.length);
    const node = registry[building.name]?.nodes?.find((entry) => entry.name === name);
    return node?.kind === "logic" ? { building, node } : null;
  };

  const wires = [];
  for (const wire of blueprint.wires) {
    const source = getLogicNode(wire.A);
    const target = getLogicNode(wire.B);
    if (!source && !target) continue;
    if (!source || !target) {
      throw new Error(`Cannot analyze mixed or unresolved logic wire ${wire.A} → ${wire.B}.`);
    }
    wires.push({ A: wire.A, B: wire.B, weight: 1 });
  }

  return validateAbstractCircuit({
    version: createAbstractCircuit().version,
    buildings,
    wires,
  });
}

export function generatePhysicalLayout(blueprint, abstractCircuit) {
  if (!blueprint || !Array.isArray(blueprint.buildings) || !Array.isArray(blueprint.wires)) {
    throw new Error("A physical blueprint with buildings and wires is required for generation.");
  }
  validateAbstractCircuit(abstractCircuit);
  throw new Error("Abstract-to-physical weight lowering is not implemented yet.");
}
