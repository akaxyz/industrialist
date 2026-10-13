export default {
  id: "NORGate",
  category: "Logic",
  cost: 5000,
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
        y: 1.9249801635742188,
        x: 0.7999267578125
      },
      gameOffset: {
        y: 0.7749977111816406,
        x: 0.7999267578125,
        z: 1.9249801635742188
      }
    },
    {
      name: "In1MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.9249801635742188,
        x: -0.800048828125
      },
      gameOffset: {
        y: 0.7749977111816406,
        x: -0.800048828125,
        z: 1.9249801635742188
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
        y: 0.7749977111816406,
        x: 0,
        z: -1.92498779296875
      }
    },
    {
      name: "SupplyMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0,
        x: -1.5
      },
      gameOffset: {
        y: 1.0999937057495117,
        x: -1.5,
        z: 0
      },
      tip: "Power supply for the gate"
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes) => {
    const [inputA, inputB, output, supply] = nodes;
    const amountA = inputA.getBuffer();
    const amountB = inputB.getBuffer();

    if (amountA < 1 && amountB < 1) {
      const supplyAmount = supply.getBuffer();
      output.add(supplyAmount);
      supply.remove(supplyAmount);
      return;
    }

    inputA.remove(amountA);
    inputB.remove(amountB);
  },
};
