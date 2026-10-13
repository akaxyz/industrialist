export default {
  id: "LogicRandom",
  category: "Logic",
  cost: 1500,
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
        y: 0.7749996185302734,
        x: 0,
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
        y: 0.7749996185302734,
        x: 0,
        z: -1.92498779296875
      }
    }
  ],
  data: {
    Chance: 2
  },
  updateEvery: 5,
  script: (nodes, data) => {
    const [input, output] = nodes;
    const chance = Math.max(1, Math.round(data.Chance));

    if (input.getBuffer() >= 1 && Math.floor(Math.random() * chance) + 1 === 1) {
      output.add(1000);
    }

    input.remove(input.getBuffer());
  },
};
