export default {
  id: "MVBattery",
  category: "Power",
  tier: 2,
  cost: 240,
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
      maxAmount: 10000000,
      transferAmount: 6250,
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
