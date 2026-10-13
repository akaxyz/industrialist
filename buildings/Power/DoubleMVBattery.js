export default {
  id: "DoubleMVBattery",
  category: "Power",
  tier: 2,
  cost: 900,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "Connector",
      kind: "mv",
      maxAmount: 50000000,
      transferAmount: 25000,
      siteOffset: {
        y: 4.253578186035156,
        x: -1.7607154846191406
      },
      gameOffset: {
        y: 4.549999713897705,
        x: -1.7607154846191406,
        z: 4.253578186035156
      }
    }
  ],
  data: []
};
