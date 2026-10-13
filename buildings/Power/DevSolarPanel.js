export default {
  id: "DevSolarPanel",
  category: "Power",
  cost: {
    m: null,
    t: "numeric",
    v: "inf"
  },
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
      name: "Connector",
      kind: "mv",
      direction: "output",
      maxAmount: 600000000000,
      transferAmount: 50000000000,
      siteOffset: {
        y: -1.5500030517578125,
        x: 1.54998779296875
      },
      gameOffset: {
        y: 0.8250017166137695,
        x: 1.54998779296875,
        z: -1.5500030517578125
      },
      wireRange: 500
    },
    {
      name: "HVConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 9424770000000,
      transferAmount: 200000000000,
      siteOffset: {
        y: 1.49957275390625,
        x: -1.4993896484375
      },
      gameOffset: {
        y: 3.8249874114990234,
        x: -1.4993896484375,
        z: 1.49957275390625
      },
      wireRange: 500
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.Connector);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.HVConnector);\nlocal v3 = {};\nlocal _ = game.Lighting;\ngame.ReplicatedStorage.Pollution:GetAttribute(\"Max\");\nlocal _ = game.ReplicatedStorage.Raining;\n\nfunction v3.tick() -- Line: 14\n    -- upvalues: u1 (copy), u2 (copy)\n    u1:addPower(30000000000);\n    u2:addPower(3141590000000);\nend;\n\nreturn v3;"
};
