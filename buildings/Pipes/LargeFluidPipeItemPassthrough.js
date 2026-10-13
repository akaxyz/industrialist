export default {
  id: "LargeFluidPipeItemPassthrough",
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
    },
    {
      name: "MainAPipe",
      kind: "item",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -3,
        x: 0
      },
      gameOffset: {
        y: 2.4199981689453125,
        x: 0,
        z: -3
      }
    },
    {
      name: "MainBPipe",
      kind: "item",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1,
        x: 0
      },
      gameOffset: {
        y: 2.4199981689453125,
        x: 0,
        z: -1
      }
    }
  ],
  data: []
};
