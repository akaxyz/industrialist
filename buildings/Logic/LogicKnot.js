export default {
  id: "LogicKnot",
  category: "Logic",
  cost: 10000,
  base: {
    height: 2,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "logic",
      maxAmount: 20000,
      transferAmount: 10000,
      siteOffset: {
        y: -0.00201416015625,
        x: -0.0020751953125
      },
      gameOffset: {
        y: 0.8999999165534973,
        x: -0.0020751953125,
        z: -0.00201416015625
      }
    }
  ],
  data: []
};
