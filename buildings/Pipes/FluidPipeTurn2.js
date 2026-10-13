export default {
  id: "FluidPipeTurn2",
  category: "Pipes",
  tier: 3,
  cost: 100,
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
        y: 0.000030517578125,
        x: 0
      },
      gameOffset: {
        y: 1.4169960021972656,
        x: 0,
        z: 0.000030517578125
      }
    }
  ],
  data: []
};
