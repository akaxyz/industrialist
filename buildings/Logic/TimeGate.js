export default {
  id: "TimeGate",
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
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.9249267578125,
        x: 0
      },
      gameOffset: {
        y: 0.7749999761581421,
        x: 0,
        z: 1.9249267578125
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
        y: 0.7749999761581421,
        x: 0,
        z: -1.92498779296875
      }
    }
  ],
  data: {
    To: 19,
    From: 6
  },
  updateEvery: 5,
  script: (nodes, data, simData) => {
    const [input, output] = nodes;
    const clockTime = simData.time;

    if (input.hasPower(1) && typeof clockTime === "number") {
      const active = data.From < data.To
        ? data.From < clockTime && clockTime < data.To
        : data.To >= clockTime || clockTime >= data.From;

      if (active) output.add(1000);
    }

    input.remove(input.getBuffer());
  },
};
