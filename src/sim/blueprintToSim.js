import registry from "../registry.js";
import { Pipe, Power } from "./nodeClasses.js";

export function addBuildingToSim(sim, building) {
  const buildingDef = registry[building.name];
  if (!buildingDef) {
    console.warn("No building definition exists for ", building.name);
    return null;
  }

  const simBuilding = {
    id: building.id,
    name: building.name,
    data: { ...(buildingDef.data ?? {}), ...(building.data ?? {}) },
    nodes: [],
    updateRate: buildingDef.updateEvery ?? 1,
    script: buildingDef.script,
  };

  for (const nodeDef of buildingDef.nodes ?? []) {
    const NodeClass = ["item", "fluid", "largefluid"].includes(nodeDef.kind)
      ? Pipe
      : Power;

    const node = new NodeClass({
      id: `${building.id}.${nodeDef.name}`,
      maxBuffer: nodeDef.maxAmount ?? 0,
      transferRate: nodeDef.transferAmount ?? 0,
      amount: 0,
      connections: [],
      item: "",
      temp: 18,
      runTemp: 18,
    });

    simBuilding.nodes.push(node);
    sim.nodes.push(node);
  }

  sim.buildings.push(simBuilding);
  return simBuilding;
}

export function addConnectionToSim(sim, A, B) {
  const source = sim.nodes.find((node) => node.id === A);
  const dest = sim.nodes.find((node) => node.id === B);

  if (!source) {
    console.warn(`Failed to add connection to sim: Source ${A} not found.`);
    return;
  }

  if (!dest) {
    console.warn(
      `Failed to add connection to sim: Destination ${B} not found.`,
    );
    return;
  }

  if (source.connections.includes(dest)) {
    console.warn(
      `Failed to add connection to sim: Connection already exists with source ${A} and dest ${B}.`,
    );
    return;
  }

  if (dest.connections.includes(source)) {
    console.warn(
      `Failed to add connection to sim: Connection already exists with source ${B} and dest ${A}.`,
    );
    return;
  }

  source.connections.push(dest);
}

export function removeConnectionFromSim(sim, sourceId, targetId) {
  const source = sim.nodes.find((node) => node.id === sourceId);
  if (!source) {
    console.warn(
      "Failed to remove connection: Source node not found ",
      sourceId,
    );
    return;
  }

  source.connections = source.connections.filter(
    (node) => node.id !== targetId,
  );
}

export function blueprintToSim(blueprint, simData, nodeData) {
  const sim = {
    buildings: [],
    nodes: [],
    simData: {
      tick: simData.tick ?? 1,
      pollution: simData.pollution ?? 0,
      radiation: simData.radiation ?? null,
      windSpeed: simData.windSpeed ?? null,
      time: simData.time ?? null,
      weather: simData.weather ?? null,
    },
  };

  for (const building of blueprint.buildings ?? []) {
    addBuildingToSim(sim, building);
  }

  for (const connection of [
    ...(blueprint.pipes ?? []),
    ...(blueprint.wires ?? []),
  ]) {
    addConnectionToSim(sim, connection.A, connection.B);
  }

  for (const nodeProperties of nodeData ?? []) {
    const node = sim.nodes.find((entry) => entry.id === nodeProperties.id);
    if (!node) continue;

    node.amount = nodeProperties.amount ?? node.amount;
    node.item = nodeProperties.item ?? node.item;
    node.temp = nodeProperties.temp ?? node.temp;
  }

  return sim;
}
