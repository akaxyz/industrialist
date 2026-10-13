export default {
  id: "RustyFluidPipeAndItemIntersection",
  category: "Pipes",
  cost: 250,
  base: {
    height: 6,
    offset: {
      y: -1,
      x: -1
    },
    width: 6
  },
  nodes: [
    {
      name: "PipeA",
      kind: "fluid",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 0.78753662109375,
        x: -1.01251220703125
      },
      gameOffset: {
        y: 1.4202489852905273,
        x: -1.01251220703125,
        z: 0.78753662109375
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -1.01251220703125,
        x: -1.06256103515625
      },
      gameOffset: {
        y: 2.3687517642974854,
        x: -1.06256103515625,
        z: -1.01251220703125
      }
    }
  ],
  data: []
};
