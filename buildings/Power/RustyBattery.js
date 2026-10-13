export default {
  id: "RustyBattery",
  category: "Power",
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
      name: "Connector",
      kind: "mv",
      maxAmount: 1000000,
      transferAmount: 1250,
      siteOffset: {
        y: -1.1500091552734375,
        x: 1.0499982833862305
      },
      gameOffset: {
        y: 2.100004196166992,
        x: 1.0499982833862305,
        z: -1.1500091552734375
      }
    }
  ],
  data: []
};
