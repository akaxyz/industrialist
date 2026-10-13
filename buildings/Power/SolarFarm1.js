export default {
  id: "SolarFarm1",
  category: "Power",
  tier: 3,
  cost: 200000,
  base: {
    height: 40,
    offset: {
      y: 18,
      x: -16
    },
    width: 36
  },
  nodes: [
    {
      name: "ConnectorA",
      kind: "mv",
      color: "A",
      maxAmount: 1000000,
      transferAmount: 250000,
      siteOffset: {
        y: 18.0498046875,
        x: -13.6497802734375
      },
      gameOffset: {
        y: 19.77476692199707,
        x: -13.6497802734375,
        z: 18.0498046875
      },
      wireRange: 90
    },
    {
      name: "ConnectorB",
      kind: "mv",
      color: "B",
      maxAmount: 1000000,
      transferAmount: 250000,
      siteOffset: {
        y: 18.0498046875,
        x: -18.24981689453125
      },
      gameOffset: {
        y: 19.77476692199707,
        x: -18.24981689453125,
        z: 18.0498046875
      },
      wireRange: 90
    },
    {
      name: "ConnectorC",
      kind: "mv",
      color: "C",
      maxAmount: 1000000,
      transferAmount: 250000,
      siteOffset: {
        y: 18.0498046875,
        x: -13.6497802734375
      },
      gameOffset: {
        y: 14.874763488769531,
        x: -13.6497802734375,
        z: 18.0498046875
      },
      wireRange: 90
    },
    {
      name: "ConnectorD",
      kind: "mv",
      color: "D",
      maxAmount: 1000000,
      transferAmount: 250000,
      siteOffset: {
        y: 18.0498046875,
        x: -18.24981689453125
      },
      gameOffset: {
        y: 14.874763488769531,
        x: -18.24981689453125,
        z: 18.0498046875
      },
      wireRange: 90
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.ConnectorA);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.ConnectorB);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.ConnectorC);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.ConnectorD);\nlocal SunEnergy = ReplicatedStorage.SunEnergy;\nlocal v5 = {};\nlocal u6 = 0;\n\nfunction v5.tick() -- Line: 16\n    -- upvalues: u6 (ref), SunEnergy (copy), u1 (copy), u2 (copy), u3 (copy), u4 (copy)\n    u6 = SunEnergy.Value * 1440 * 0.3;\n\n    if u1:canHoldXMore(u6 / 4) then\n        u1:addPower(u6 / 4);\n    end;\n\n    if u2:canHoldXMore(u6 / 4) then\n        u2:addPower(u6 / 4);\n    end;\n\n    if u3:canHoldXMore(u6 / 4) then\n        u3:addPower(u6 / 4);\n    end;\n\n    if u4:canHoldXMore(u6 / 4) then\n        u4:addPower(u6 / 4);\n    end;\nend;\n\nreturn v5;"
};
