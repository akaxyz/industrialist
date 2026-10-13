export default {
  id: "OGResearchStation",
  category: "Misc",
  cost: 75,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: 1.349609375,
        x: -1.7359294891357422
      },
      gameOffset: {
        y: 5.088781833648682,
        x: -1.7359294891357422,
        z: 1.349609375
      }
    }
  ],
  data: []
};
