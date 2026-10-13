export default {
  id: "FluidPipeTurn",
  category: "Pipes",
  cost: 2,
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
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 0,
        x: -0.000335693359375
      },
      gameOffset: {
        y: 1.4167022705078125,
        x: -0.000335693359375,
        z: 0
      }
    }
  ],
  data: []
};
