export default {
  id: "SmallFluidStorageSilo",
  category: "Tanks",
  cost: 100,
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
      name: "MainPipe",
      kind: "fluid",
      maxAmount: 500,
      transferAmount: 5,
      siteOffset: {
        y: -0.00305938720703125,
        x: -0.0030517578125
      },
      gameOffset: {
        y: 2.249990701675415,
        x: -0.0030517578125,
        z: -0.00305938720703125
      }
    }
  ],
  data: []
};
