export default {
  id: "HVPowerDump",
  category: "Power",
  tier: 4,
  cost: 25000,
  base: {
    height: 26,
    offset: {
      y: 23,
      x: 7
    },
    width: 58
  },
  nodes: [
    {
      name: "In4MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 17.80975341796875,
        x: 6.988311767578125
      },
      gameOffset: {
        y: 37.31268310546875,
        x: 6.988311767578125,
        z: 17.80975341796875
      }
    },
    {
      name: "In3MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 15.978729248046875,
        x: 6.988311767578125
      },
      gameOffset: {
        y: 36.912689208984375,
        x: 6.988311767578125,
        z: 15.978729248046875
      }
    },
    {
      name: "In8MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 28.292236328125,
        x: 6.988311767578125
      },
      gameOffset: {
        y: 37.31268310546875,
        x: 6.988311767578125,
        z: 28.292236328125
      }
    },
    {
      name: "In7MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 30.12841796875,
        x: 6.988311767578125
      },
      gameOffset: {
        y: 36.912689208984375,
        x: 6.988311767578125,
        z: 30.12841796875
      }
    },
    {
      name: "In6MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 11.6829833984375,
        x: 6.988311767578125
      },
      gameOffset: {
        y: 36.912689208984375,
        x: 6.988311767578125,
        z: 11.6829833984375
      }
    },
    {
      name: "In5MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 9.851043701171875,
        x: 6.988311767578125
      },
      gameOffset: {
        y: 37.34368133544922,
        x: 6.988311767578125,
        z: 9.851043701171875
      }
    },
    {
      name: "In2MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 34.42340087890625,
        x: 6.988311767578125
      },
      gameOffset: {
        y: 36.912689208984375,
        x: 6.988311767578125,
        z: 34.42340087890625
      }
    },
    {
      name: "In1MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 20000000,
      siteOffset: {
        y: 36.2308349609375,
        x: 6.988311767578125
      },
      gameOffset: {
        y: 37.34368133544922,
        x: 6.988311767578125,
        z: 36.2308349609375
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.In1MainConnector);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.In2MainConnector);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.In3MainConnector);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.In4MainConnector);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.In5MainConnector);\nlocal u6 = PowerUtilsV2.loadConnector(script.Parent.In6MainConnector);\nlocal u7 = PowerUtilsV2.loadConnector(script.Parent.In7MainConnector);\nlocal u8 = PowerUtilsV2.loadConnector(script.Parent.In8MainConnector);\nlocal v9 = {};\nlocal StartTracking = game.ReplicatedStorage.StartTracking;\n\nfunction v9.tick() -- Line: 18\n    -- upvalues: StartTracking (copy), u1 (copy), u2 (copy), u3 (copy), u4 (copy), u5 (copy), u6 (copy), u7 (copy), u8 (copy)\n    if StartTracking.Value then\n        shared.powerLost = shared.powerLost + u1:getBuffer() + u2:getBuffer() + u3:getBuffer() + u4:getBuffer() + u5:getBuffer() + u6:getBuffer() + u7:getBuffer() + u8:getBuffer();\n    end;\n\n    u1:removePower(u1:getBuffer());\n    u2:removePower(u2:getBuffer());\n    u3:removePower(u3:getBuffer());\n    u4:removePower(u4:getBuffer());\n    u5:removePower(u5:getBuffer());\n    u6:removePower(u6:getBuffer());\n    u7:removePower(u7:getBuffer());\n    u8:removePower(u8:getBuffer());\nend;\n\nreturn v9;"
};
