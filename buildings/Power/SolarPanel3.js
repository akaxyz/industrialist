export default {
  id: "SolarPanel3",
  category: "Power",
  tier: 3,
  cost: 5000,
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
      direction: "output",
      maxAmount: 100000,
      transferAmount: 50000,
      siteOffset: {
        y: 5.95001220703125,
        x: -3.6500244140625
      },
      gameOffset: {
        y: 1.049997329711914,
        x: -3.6500244140625,
        z: 5.95001220703125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.Connector);\nlocal SunEnergy = ReplicatedStorage.SunEnergy;\nlocal u2 = 0;\n\nreturn {\n    tick = function() -- Line: 13, Name: tick\n        -- upvalues: u2 (ref), SunEnergy (copy), u1 (copy)\n        u2 = 19.2 * SunEnergy.Value;\n        u1:addPower(u2);\n    end\n};"
};
