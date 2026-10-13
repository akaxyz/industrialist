export default {
  id: "ANDGate",
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
        y: 0.7750000357627869,
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
        y: 0.7750000357627869,
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
        y: 0.7750000357627869,
        x: 0,
        z: -1.92498779296875
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes) => {
    const [inputA, inputB, output] = nodes;

    if (inputA.getBuffer() < 1 || inputB.getBuffer() < 1) {
      inputA.remove(inputA.getBuffer());
      inputB.remove(inputB.getBuffer());
      return;
    }

    output.add(inputA.getBuffer() + inputB.getBuffer());
    inputA.remove(inputA.getBuffer());
    inputB.remove(inputB.getBuffer());
  },
};
