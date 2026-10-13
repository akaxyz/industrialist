export default {
  id: "ShortLargeFluidPipe",
  category: "Pipes",
  tier: 4,
  cost: 12500,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "PipeA",
      kind: "largefluid",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: -0.00006103515625,
        x: 0
      },
      gameOffset: {
        y: 4.3249969482421875,
        x: 0,
        z: -0.00006103515625
      }
    }
  ],
  data: []
};
