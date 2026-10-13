export default {
  id: "SmallMVPole1",
  category: "Power",
  tier: 2,
  cost: 40,
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
      kind: "mv",
      maxAmount: 50000,
      transferAmount: 4000,
      siteOffset: {
        y: -1.4364166259765625,
        x: 0.061859130859375
      },
      gameOffset: {
        y: 10.707763671875,
        x: 0.061859130859375,
        z: -1.4364166259765625
      }
    }
  ],
  data: []
};
