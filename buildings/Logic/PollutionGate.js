export default {
  id: "PollutionGate",
  category: "Logic",
  cost: 7500,
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
        y: -1.5,
        x: 1.925048828125
      },
      gameOffset: {
        y: 2.6749958992004395,
        x: 1.925048828125,
        z: -1.5
      }
    },
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.5,
        x: -1.92498779296875
      },
      gameOffset: {
        y: 2.6649937629699707,
        x: -1.92498779296875,
        z: -1.5
      }
    }
  ],
  data: {
    UpperMaximum: false,
    LowerMinimum: false,
    Minimum: 0,
    Maximum: 0
  },
  updateEvery: 5,
  script: (nodes, data, simData) => {
    const [input, output] = nodes;
    if (input.getBuffer() < 1) return;

    const pollution = simData.pollution / 500000;

    if (data.LowerMinimum && pollution < data.Minimum) {
      output.add(input.getBuffer());
      input.remove(input.getBuffer());
    }

    if (data.UpperMaximum && data.Maximum < pollution) {
      output.add(input.getBuffer());
      input.remove(input.getBuffer());
    }
  },
};
