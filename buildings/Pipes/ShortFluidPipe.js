export default {
  id: "ShortFluidPipe",
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
