export default {
  id: "LogicRelay",
  category: "Logic",
  cost: 12500,
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
        y: 0.7749999165534973,
        x: 0,
        z: 1.92498779296875
      },
      tip: "Signal to switch the relay"
    },
    {
      name: "SupplyMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 8000,
      transferAmount: 0,
      siteOffset: {
        y: -0.050048828125,
        x: -1.5
      },
      gameOffset: {
        y: 1.0999999046325684,
        x: -1.5,
        z: -0.050048828125
      },
      tip: "Power Supply"
    },
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.7749997973442078,
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
      const supplyAmount = supply.getBuffer();
      output.add(Math.min(Math.max(supplyAmount, 0), 1000));
      input.remove(input.getBuffer());
      supply.remove(Math.min(Math.max(supply.getBuffer(), 0), 1000));
    }
  },
};
