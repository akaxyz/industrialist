export default {
  id: "RustyPipeIntersection",
  category: "Pipes",
  cost: 250,
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
      name: "PipeA",
      kind: "item",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1,
        x: 0
      },
      gameOffset: {
        y: 1.3388373851776123,
        x: 0,
        z: 1
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -0.050048828125,
        x: 1
      },
      gameOffset: {
        y: 1.3388373851776123,
        x: 1,
        z: -0.050048828125
      }
    }
  ],
  data: []
};
