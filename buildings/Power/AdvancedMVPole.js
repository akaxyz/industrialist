export default {
  id: "AdvancedMVPole",
  category: "Power",
  tier: 2,
  cost: 300,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "ConnectorA",
      kind: "mv",
      color: "A",
      maxAmount: 50000,
      transferAmount: 6250,
      siteOffset: {
        y: -3.7831878662109375,
        x: -0.13018798828125
      },
      gameOffset: {
        y: 16.45075798034668,
        x: -0.13018798828125,
        z: -3.7831878662109375
      }
    },
    {
      name: "ConnectorC",
      kind: "mv",
      color: "C",
      maxAmount: 50000,
      transferAmount: 6250,
      siteOffset: {
        y: -3.7831878662109375,
        x: -0.13018798828125
      },
      gameOffset: {
        y: 13.414285659790039,
        x: -0.13018798828125,
        z: -3.7831878662109375
      }
    },
    {
      name: "ConnectorD",
      kind: "mv",
      color: "D",
      maxAmount: 50000,
      transferAmount: 6250,
      siteOffset: {
        y: -0.220184326171875,
        x: -0.13018798828125
      },
      gameOffset: {
        y: 13.414285659790039,
        x: -0.13018798828125,
        z: -0.220184326171875
      }
    },
    {
      name: "ConnectorB",
      kind: "mv",
      color: "B",
      maxAmount: 50000,
      transferAmount: 6250,
      siteOffset: {
        y: -0.220184326171875,
        x: -0.13018798828125
      },
      gameOffset: {
        y: 16.424734115600586,
        x: -0.13018798828125,
        z: -0.220184326171875
      }
    }
  ],
  data: []
};
