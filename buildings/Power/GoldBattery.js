export default {
  id: "GoldBattery",
  category: "Power",
  tier: 3,
  cost: 30000,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "Connector",
      kind: "mv",
      maxAmount: 3000000000,
      transferAmount: 555555,
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
