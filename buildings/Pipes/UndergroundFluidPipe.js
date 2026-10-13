export default {
  id: "UndergroundFluidPipe",
  category: "Pipes",
  tier: 4,
  cost: 150,
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
      kind: "fluid",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 0.899993896484375,
        x: 0
      },
      gameOffset: {
        y: 1.3669891357421875,
        x: 0,
        z: 0.899993896484375
      }
    }
  ],
  data: []
};
