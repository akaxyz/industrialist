export default {
  id: "LargeFluidPipeTurn",
  category: "Pipes",
  tier: 4,
  cost: 25000,
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
      kind: "largefluid",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: 0.03778076171875,
        x: -0.009765625
      },
      gameOffset: {
        y: 4.3247528076171875,
        x: -0.009765625,
        z: 0.03778076171875
      }
    }
  ],
  data: []
};
