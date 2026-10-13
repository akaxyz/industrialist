export default {
  id: "NOTGate",
  category: "Logic",
  cost: 1250,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.7750000357627869,
        x: 0,
        z: 1.92498779296875
      }
    },
    {
      name: "SupplyMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0.050048828125,
        x: -1.5
      },
      gameOffset: {
        y: 1.0999999046325684,
        x: -1.5,
        z: 0.050048828125
      },
      tip: "Power Supply"
    },
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0,
        z: -1.92498779296875
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes) => {
    const [input, supply, output] = nodes;

    if (input.getBuffer() >= 1) {
      input.remove(input.getBuffer());
      return;
    }

    if (supply.getBuffer() >= 1000) {
      output.add(1000);
      supply.remove(1000);
    }
  },
};
