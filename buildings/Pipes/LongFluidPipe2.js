export default {
  id: "LongFluidPipe2",
  category: "Pipes",
  tier: 3,
  cost: 500,
  base: {
    height: 8,
    offset: {
      y: -2,
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
        y: -2,
        x: 0
      },
      gameOffset: {
        y: 1.3669891357421875,
        x: 0,
        z: -2
      }
    }
  ],
  data: []
};
