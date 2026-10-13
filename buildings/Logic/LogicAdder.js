export default {
  id: "LogicAdder",
  category: "Logic",
  cost: 50000,
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
      name: "In1MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.925048828125,
        x: -0.8000030517578125
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: -0.8000030517578125,
        z: 1.925048828125
      },
      tip: "Bit 1"
    },
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.92498779296875,
        x: -0.8000030517578125
      },
      gameOffset: {
        y: 0.7749997973442078,
        x: -0.8000030517578125,
        z: -1.92498779296875
      },
      tip: "Sum (outputs if only one input is powered)"
    },
    {
      name: "In2MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.925048828125,
        x: 0.8000030517578125
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0.8000030517578125,
        z: 1.925048828125
      },
      tip: "Bit 2"
    },
    {
      name: "CarryMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.92498779296875,
        x: 0.8000030517578125
      },
      gameOffset: {
        y: 0.7749997973442078,
        x: 0.8000030517578125,
        z: -1.92498779296875
      },
      tip: "Carry bit (outputs if both inputs are powered)"
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes) => {
    const inputA = nodes[0];
    const output = nodes[1];
    const inputB = nodes[2];
    const carry = nodes[3];
    const hasA = inputA.hasPower(1);
    const hasB = inputB.hasPower(1);

    if (hasA && hasB) {
      output.remove(2000);
      carry.add(1000);
    } else if (hasA || hasB) {
      output.add(1000);
      carry.remove(1000);
    } else {
      output.remove(2000);
      carry.remove(2000);
    }

    inputA.remove(inputA.getBuffer());
    inputB.remove(inputB.getBuffer());
  },
};
