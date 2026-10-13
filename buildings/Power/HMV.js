export default {
  id: "HMV",
  category: "Power",
  tier: 3,
  cost: 125000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "ConnectorA",
      kind: "mv",
      color: "A",
      maxAmount: 120000,
      transferAmount: 25000,
      siteOffset: {
        y: -0.2500152587890625,
        x: 0.350006103515625
      },
      gameOffset: {
        y: 19.774999618530273,
        x: 0.350006103515625,
        z: -0.2500152587890625
      }
    },
    {
      name: "ConnectorC",
      kind: "mv",
      color: "C",
      maxAmount: 60000,
      transferAmount: 5000,
      siteOffset: {
        y: -0.2500152587890625,
        x: 0.350006103515625
      },
      gameOffset: {
        y: 14.875,
        x: 0.350006103515625,
        z: -0.2500152587890625
      }
    },
    {
      name: "ConnectorB",
      kind: "mv",
      color: "B",
      maxAmount: 120000,
      transferAmount: 25000,
      siteOffset: {
        y: -0.25,
        x: -4.25
      },
      gameOffset: {
        y: 19.774999618530273,
        x: -4.25,
        z: -0.25
      }
    },
    {
      name: "ConnectorD",
      kind: "mv",
      color: "D",
      maxAmount: 60000,
      transferAmount: 5000,
      siteOffset: {
        y: -0.25,
        x: -4.25
      },
      gameOffset: {
        y: 14.875,
        x: -4.25,
        z: -0.25
      }
    }
  ],
  data: []
};
