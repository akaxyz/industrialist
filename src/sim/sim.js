import { Pipe } from "./nodeClasses.js";

function transfer(nodeA) {
  if (nodeA instanceof Pipe) {
    nodeA.temp -= nodeA.diffuseTemp(21, 5);
  }

  const n = nodeA.connections.length;
  if (n === 0) return;

  const transferSplit = nodeA.amount / n;

  for (const nodeB of nodeA.connections) {
    const transferAmount = Math.min(transferSplit, nodeA.transferRate);

    if (nodeB instanceof Pipe) {
      if (transferAmount <= 0.0001 || !nodeB.isEmptyOrHas(nodeA.item)) continue;

      const previous = nodeB.amount;
      nodeB.setUsedTemperature(nodeA.temp);
      nodeB.addItemAmount(nodeA.item, transferAmount);
      const acceptedAmount = nodeB.amount - previous;
      nodeA.remove(acceptedAmount);
      nodeA.setFlow(nodeA.getFlow() + acceptedAmount);
      nodeB.setFlow(nodeB.getFlow() + acceptedAmount);
      continue;
    }

    const acceptedAmount = nodeB.add(transferAmount);
    nodeA.remove(acceptedAmount);
  }
}

export function simStep(sim) {
  for (const building of sim.buildings) {
    if (typeof building.script === "function" && sim.simData.tick % building.tick === 0) {
      building.script(building.nodes, building.data, sim.simData);
    }
  }

  for (const node of sim.nodes) {
    if (sim.simData.tick % 5 === 0) {
      transfer(node);
    }
  }

  sim.simData.tick++;
  return sim;
}

export function simStart(sim) {
  return setInterval(() => simStep(sim), 1000 / 30);
}

export function simPause(timer) {
  clearInterval(timer);
}

export function simStepToNextTransfer(sim) {
  const steps = ((5 - (sim.simData.tick % 5)) % 5) + 1;
  for (let index = 0; index < steps; index++) {
    simStep(sim);
  }
  return sim;
}
