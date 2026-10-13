export default {
  id: "LogicPulse",
  category: "Logic",
  cost: 2000,
  base: {
    height: 2,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 1000,
      transferAmount: 0,
      siteOffset: {
        y: 0.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.774998664855957,
        x: 0,
        z: 0.92498779296875
      }
    },
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -0.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.774998664855957,
        x: 0,
        z: -0.92498779296875
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes, data) => {
    const [input, output] = nodes;
    const hasSignal = input.hasPower(1);

    if (hasSignal && !data.wasPowered) {
      output.add(1000);
      data.wasPowered = true;
    } else if (!hasSignal) {
      data.wasPowered = false;
    }

    input.remove(1000);
  },
};
