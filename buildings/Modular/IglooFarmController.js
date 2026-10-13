export default {
  id: "IglooFarmController",
  category: "Modular",
  cost: 1500,
  base: {
    height: 8,
    offset: {
      y: 0,
      x: 0
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 0.0469970703125,
        x: -3.5198974609375
      },
      gameOffset: {
        y: 1.9540001153945923,
        x: -3.5198974609375,
        z: 0.0469970703125
      }
    }
  ],
  data: []
};
