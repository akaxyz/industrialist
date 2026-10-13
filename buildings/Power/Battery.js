export default {
  id: "Battery",
  category: "Power",
  cost: 2000,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "Connector",
      kind: "mv",
      maxAmount: 600000,
      transferAmount: 1250,
      siteOffset: {
        y: 5.149997711181641,
        x: -2.1499977111816406
      },
      gameOffset: {
        y: 3.9749984741210938,
        x: -2.1499977111816406,
        z: 5.149997711181641
      }
    }
  ],
  data: []
};
