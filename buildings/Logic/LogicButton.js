export default {
  id: "LogicButton",
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
      name: "MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.925048828125,
        x: 0
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0,
        z: 1.925048828125
      }
    },
    {
      name: "MainConnector2",
      kind: "logic",
      direction: "output",
      maxAmount: 2000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.925048828125,
        x: 0
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0,
        z: -1.925048828125
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes, data) => {
    const [input, output] = nodes;
    if (!data.pressed) return;

    data.pressed = false;
    if (input.getBuffer() < 1000) return;

    output.add(1000);
    input.remove(1000);
  },
};
