export default {
  id: "SmallFluidStorageSilo1",
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
        y: -0.003058910369873047,
        x: -0.0030517578125
      },
      gameOffset: {
        y: 2.2499942779541016,
        x: -0.0030517578125,
        z: -0.003058910369873047
      }
    }
  ],
  data: []
};
