export default {
  id: "PowerDump",
  category: "Power",
  tier: 3,
  cost: 25000,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: -3
    },
    width: 10
  },
  nodes: [
    {
      name: "In1MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.8596649169921875,
        x: 0.49127197265625
      },
      gameOffset: {
        y: 6.1418938636779785,
        x: 0.49127197265625,
        z: -0.8596649169921875
      }
    },
    {
      name: "In2MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.8596954345703125,
        x: -1.6734619140625
      },
      gameOffset: {
        y: 6.141892433166504,
        x: -1.6734619140625,
        z: -0.8596954345703125
      }
    },
    {
      name: "In3MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.8596954345703125,
        x: -3.838134765625
      },
      gameOffset: {
        y: 6.141892433166504,
        x: -3.838134765625,
        z: -0.8596954345703125
      }
    },
    {
      name: "In4MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.8596649169921875,
        x: -6.00286865234375
      },
      gameOffset: {
        y: 6.141892433166504,
        x: -6.00286865234375,
        z: -0.8596649169921875
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.In1MainConnector);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.In2MainConnector);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.In3MainConnector);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.In4MainConnector);\nlocal v5 = {};\nlocal StartTracking = game.ReplicatedStorage.StartTracking;\n\nfunction v5.tick() -- Line: 15\n    -- upvalues: StartTracking (copy), u1 (copy), u2 (copy), u3 (copy), u4 (copy)\n    if StartTracking.Value then\n        shared.powerLost = shared.powerLost + u1:getBuffer() + u2:getBuffer() + u3:getBuffer() + u4:getBuffer();\n    end;\n\n    u1:removePower(u1:getBuffer());\n    u2:removePower(u2:getBuffer());\n    u3:removePower(u3:getBuffer());\n    u4:removePower(u4:getBuffer());\nend;\n\nreturn v5;"
};
