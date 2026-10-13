export default {
  id: "FestiveHMVT",
  category: "Power",
  tier: 3,
  cost: 10001,
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
      maxAmount: 1000000,
      transferAmount: 250000,
      siteOffset: {
        y: 0.04998779296875,
        x: 0.35003662109375
      },
      gameOffset: {
        y: 19.774995803833008,
        x: 0.35003662109375,
        z: 0.04998779296875
      },
      wireRange: 90
    },
    {
      name: "ConnectorB",
      kind: "mv",
      color: "B",
      maxAmount: 1000000,
      transferAmount: 250000,
      siteOffset: {
        y: 0.04998779296875,
        x: -4.25
      },
      gameOffset: {
        y: 19.774995803833008,
        x: -4.25,
        z: 0.04998779296875
      },
      wireRange: 90
    },
    {
      name: "ConnectorC",
      kind: "mv",
      color: "C",
      maxAmount: 1000000,
      transferAmount: 250000,
      siteOffset: {
        y: 0.04998779296875,
        x: 0.35003662109375
      },
      gameOffset: {
        y: 14.874987602233887,
        x: 0.35003662109375,
        z: 0.04998779296875
      },
      wireRange: 90
    },
    {
      name: "ConnectorD",
      kind: "mv",
      color: "D",
      maxAmount: 1000000,
      transferAmount: 250000,
      siteOffset: {
        y: 0.04998779296875,
        x: -4.25
      },
      gameOffset: {
        y: 14.874987602233887,
        x: -4.25,
        z: 0.04998779296875
      },
      wireRange: 90
    }
  ],
  data: []
};
