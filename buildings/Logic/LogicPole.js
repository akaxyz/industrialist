export default {
  id: "LogicPole",
  category: "Logic",
  cost: 1000,
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
      name: "MainConnector",
      kind: "logic",
      maxAmount: 5000,
      transferAmount: 10000,
      siteOffset: {
        y: -0.00018310546875,
        x: 0.00018310546875
      },
      gameOffset: {
        y: 11.172182083129883,
        x: 0.00018310546875,
        z: -0.00018310546875
      },
      wireRange: 90
    }
  ],
  data: []
};
