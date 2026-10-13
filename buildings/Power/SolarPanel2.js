export default {
  id: "SolarPanel2",
  category: "Power",
  tier: 2,
  cost: 1500,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "Connector",
      kind: "mv",
      direction: "output",
      maxAmount: 50000,
      transferAmount: 10000,
      siteOffset: {
        y: 1.949951171875,
        x: -3.649993896484375
      },
      gameOffset: {
        y: 1.0500011444091797,
        x: -3.649993896484375,
        z: 1.949951171875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.Connector);\nlocal SunEnergy = ReplicatedStorage.SunEnergy;\nlocal u2 = 0;\n\nreturn {\n    tick = function() -- Line: 13, Name: tick\n        -- upvalues: u2 (ref), SunEnergy (copy), u1 (copy)\n        u2 = 3.2 * SunEnergy.Value;\n        u1:addPower(u2);\n    end\n};"
};
