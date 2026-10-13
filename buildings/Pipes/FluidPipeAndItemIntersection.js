export default {
  id: "FluidPipeAndItemIntersection",
  category: "Pipes",
  tier: 3,
  cost: 5000,
  base: {
    height: 2,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "PipeA",
      kind: "fluid",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 0.38751220703125,
        x: -0.38751220703125
      },
      gameOffset: {
        y: 1.5187492370605469,
        x: -0.38751220703125,
        z: 0.38751220703125
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -0.38751220703125,
        x: 0.38751220703125
      },
      gameOffset: {
        y: 1.5187492370605469,
        x: 0.38751220703125,
        z: -0.38751220703125
      }
    }
  ],
  data: []
};
