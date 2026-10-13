export default {
  id: "LargeFluidPipeIntersection",
  category: "Pipes",
  tier: 4,
  cost: 200000,
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
        y: -0.4998779296875,
        x: 0.499755859375
      },
      gameOffset: {
        y: 4.324981689453125,
        x: 0.499755859375,
        z: -0.4998779296875
      }
    },
    {
      name: "MainPipe",
      kind: "largefluid",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: 0.5001220703125,
        x: -0.500244140625
      },
      gameOffset: {
        y: 4.324981689453125,
        x: -0.500244140625,
        z: 0.5001220703125
      }
    }
  ],
  data: []
};
