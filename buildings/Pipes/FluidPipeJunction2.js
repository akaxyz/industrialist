export default {
  id: "FluidPipeJunction2",
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
        y: 0,
        x: 0
      },
      gameOffset: {
        y: 1.3669967651367188,
        x: 0,
        z: 0
      }
    }
  ],
  data: []
};
