export default {
  id: "SmallItemStorageSilo",
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
      kind: "item",
      maxAmount: 250,
      transferAmount: 1,
      siteOffset: {
        y: -0.0030517578125,
        x: -0.0030670166015625
      },
      gameOffset: {
        y: 2.249998092651367,
        x: -0.0030670166015625,
        z: -0.0030517578125
      }
    }
  ],
  data: []
};
