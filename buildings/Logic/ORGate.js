export default {
  id: "ORGate",
  category: "Logic",
  cost: 2000,
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
      name: "In2MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.92498779296875,
        x: 0.79998779296875
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0.79998779296875,
        z: 1.92498779296875
      }
    },
    {
      name: "In1MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.92498779296875,
        x: -0.79998779296875
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: -0.79998779296875,
        z: 1.92498779296875
      }
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
    const [inputA, inputB, output] = nodes;
    const amountA = inputA.getBuffer();
    const amountB = inputB.getBuffer();

    if (amountA >= 1 || amountB >= 1) {
      output.add(amountA + amountB);
      inputA.remove(amountA);
      inputB.remove(amountB);
    }
  },
};
