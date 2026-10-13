export default {
  id: "RealDevSolarPanel",
  category: "Power",
  tier: 4,
  cost: 5000,
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
      direction: "input",
      maxAmount: 600000000000,
      transferAmount: 50000000000,
      siteOffset: {
        y: -1.550004005432129,
        x: 1.54998779296875
      },
      gameOffset: {
        y: 0.8250036239624023,
        x: 1.54998779296875,
        z: -1.550004005432129
      },
      wireRange: 500
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.Connector);\nlocal v2 = {};\nlocal _ = game.Lighting;\ngame.ReplicatedStorage.Pollution:GetAttribute(\"Max\");\nlocal _ = game.ReplicatedStorage.Raining;\n\nfunction v2.tick() -- Line: 13\n    -- upvalues: u1 (copy)\n    u1:removePower(u1:getBuffer());\nend;\n\nreturn v2;"
};
