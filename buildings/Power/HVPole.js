export default {
  id: "HVPole",
  category: "Power",
  tier: 4,
  cost: 2500000,
  base: {
    height: 20,
    offset: {
      y: 8,
      x: 8
    },
    width: 20
  },
  nodes: [
    {
      name: "ConnectorB",
      kind: "hv",
      color: "B",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: -12.241340637207031,
        x: 8.002151489257812
      },
      gameOffset: {
        y: 54.25308609008789,
        x: 8.002151489257812,
        z: -12.241340637207031
      },
      wireRange: 300
    },
    {
      name: "ConnectorA",
      kind: "hv",
      color: "A",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 28.241317749023438,
        x: 7.9978485107421875
      },
      gameOffset: {
        y: 54.25308609008789,
        x: 7.9978485107421875,
        z: 28.241317749023438
      },
      wireRange: 300
    },
    {
      name: "ConnectorC",
      kind: "hv",
      color: "C",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 28.241317749023438,
        x: 7.9978485107421875
      },
      gameOffset: {
        y: 33.97557830810547,
        x: 7.9978485107421875,
        z: 28.241317749023438
      },
      wireRange: 300
    },
    {
      name: "ConnectorD",
      kind: "hv",
      color: "D",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: -12.241340637207031,
        x: 8.002151489257812
      },
      gameOffset: {
        y: 33.97557830810547,
        x: 8.002151489257812,
        z: -12.241340637207031
      },
      wireRange: 300
    },
    {
      name: "ConnectorE",
      kind: "hv",
      color: "E",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 26.849853515625,
        x: 7.9978485107421875
      },
      gameOffset: {
        y: 53.89018630981445,
        x: 7.9978485107421875,
        z: 26.849853515625
      },
      wireRange: 300
    },
    {
      name: "ConnectorF",
      kind: "hv",
      color: "F",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: -10.849861145019531,
        x: 8.002151489257812
      },
      gameOffset: {
        y: 53.89018630981445,
        x: 8.002151489257812,
        z: -10.849861145019531
      },
      wireRange: 300
    },
    {
      name: "ConnectorG",
      kind: "hv",
      color: "G",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: -10.849861145019531,
        x: 8.002151489257812
      },
      gameOffset: {
        y: 33.609588623046875,
        x: 8.002151489257812,
        z: -10.849861145019531
      },
      wireRange: 300
    },
    {
      name: "ConnectorH",
      kind: "hv",
      color: "H",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 26.849853515625,
        x: 7.9978485107421875
      },
      gameOffset: {
        y: 33.609588623046875,
        x: 7.9978485107421875,
        z: 26.849853515625
      },
      wireRange: 300
    }
  ],
  data: []
};
