export default {
  id: "MVPole2",
  category: "Power",
  tier: 2,
  cost: 80,
  base: {
    height: 4.000011444091797,
    offset: {
      y: 0,
      x: 0
    },
    width: 4.000011444091797
  },
  nodes: [
    {
      name: "ConnectorD",
      kind: "mv",
      color: "D",
      maxAmount: 30000,
      transferAmount: 5000,
      siteOffset: {
        y: -1.322805404663086,
        x: 0.023193359375
      },
      gameOffset: {
        y: 14.203763008117676,
        x: 0.023193359375,
        z: -1.322805404663086
      }
    },
    {
      name: "ConnectorC",
      kind: "mv",
      color: "C",
      maxAmount: 30000,
      transferAmount: 5000,
      siteOffset: {
        y: 1.283193588256836,
        x: 0.023193359375
      },
      gameOffset: {
        y: 14.203763008117676,
        x: 0.023193359375,
        z: 1.283193588256836
      }
    }
  ],
  data: []
};
