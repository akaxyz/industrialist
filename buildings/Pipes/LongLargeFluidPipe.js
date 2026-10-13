export default {
  id: "LongLargeFluidPipe",
  category: "Pipes",
  tier: 4,
  cost: 50000,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "PipeA",
      kind: "largefluid",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: -2,
        x: 0
      },
      gameOffset: {
        y: 4.3249969482421875,
        x: 0,
        z: -2
      }
    }
  ],
  data: []
};
