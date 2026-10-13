export default {
  id: "IndustrialHVBattery",
  category: "Power",
  tier: 3,
  cost: 25000,
  base: {
    height: 18,
    offset: {
      y: -1,
      x: 5.99749755859375
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      maxAmount: 4000000000,
      transferAmount: 1000000,
      siteOffset: {
        y: -1,
        x: 3.127471923828125
      },
      gameOffset: {
        y: 12.841798782348633,
        x: 3.127471923828125,
        z: -1
      }
    }
  ],
  data: []
};
