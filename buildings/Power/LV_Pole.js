export default {
  id: "LV_Pole",
  category: "Power",
  cost: 5,
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
      name: "ConnectorA",
      kind: "mv",
      color: "A",
      maxAmount: 2500,
      transferAmount: 400,
      siteOffset: {
        y: 0.461151123046875,
        x: -1.1571862697601318
      },
      gameOffset: {
        y: 8.726763725280762,
        x: -1.1571862697601318,
        z: 0.461151123046875
      }
    },
    {
      name: "ConnectorB",
      kind: "mv",
      color: "B",
      maxAmount: 2500,
      transferAmount: 400,
      siteOffset: {
        y: 0.461151123046875,
        x: 1.1578140258789062
      },
      gameOffset: {
        y: 8.678763389587402,
        x: 1.1578140258789062,
        z: 0.461151123046875
      }
    }
  ],
  data: []
};
