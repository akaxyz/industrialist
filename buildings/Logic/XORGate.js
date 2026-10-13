export default {
  id: "XORGate",
  category: "Logic",
  cost: 2500,
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
    },
    {
      name: "In2MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.92498779296875,
        x: 0.800018310546875
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0.800018310546875,
        z: 1.92498779296875
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes) => {
    const inputA = nodes[0];
    const output = nodes[1];
    const inputB = nodes[2];
    const amountA = inputA.getBuffer();
    const amountB = inputB.getBuffer();

    if (amountA >= 1 && amountB >= 1) {
      inputA.remove(amountA);
      inputB.remove(amountB);
      return;
    }

    if (amountA < 1 || amountB >= 1) {
      if (amountB >= 1 && amountA < 1) {
        output.add(amountB);
        inputB.remove(amountB);
      }
      return;
    }

    output.add(amountA);
    inputA.remove(amountA);
  },
};
