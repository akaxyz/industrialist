export default {
  id: "LogicMemory",
  category: "Logic",
  cost: 10000,
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
        x: -0.8000030517578125
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: -0.8000030517578125,
        z: 1.92498779296875
      },
      tip: "Signal to keep outputting"
    },
    {
      name: "SupplyMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
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
      maxAmount: 1000,
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
    },
    {
      name: "ResetMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.92498779296875,
        x: 0.8000030517578125
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0.8000030517578125,
        z: 1.92498779296875
      },
      tip: "Signal to reset memory"
    }
  ],
  data: {
    signal: false
  },
  updateEvery: 5,
  script: (nodes, data) => {
    const [input, supply, output, reset] = nodes;

    if (input.hasPower(1)) data.signal = true;

    if (reset.hasPower(1)) {
      reset.remove(reset.getBuffer());
      data.signal = false;
    }

    if (data.signal) {
      const inputAmount = input.getBuffer();
      const supplyAmount = supply.getBuffer();
      output.add(inputAmount + supplyAmount);
      supply.remove(supplyAmount);
    }

    input.remove(input.getBuffer());
  },
};
