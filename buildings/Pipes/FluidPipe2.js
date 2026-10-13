export default {
  id: "FluidPipe2",
  category: "Pipes",
  tier: 3,
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
        y: 0,
        x: 0
      },
      gameOffset: {
        y: 1.3669853210449219,
        x: 0,
        z: 0
      }
    }
  ],
  data: []
};
