export default {
  id: "4PanelSolar",
  category: "Power",
  tier: 4,
  cost: 500000,
  base: {
    height: 10,
    offset: {
      y: -3,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1500000,
      transferAmount: 300000,
      siteOffset: {
        y: 1.850006103515625,
        x: -0.237518310546875
      },
      gameOffset: {
        y: 2.300006866455078,
        x: -0.237518310546875,
        z: 1.850006103515625
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal v2 = {};\nlocal Lighting = game.Lighting;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u3 = Pollution:GetAttribute(\"Max\");\nlocal Raining = game.ReplicatedStorage.Raining;\n\nfunction v2.tick() -- Line: 13\n    -- upvalues: Pollution (copy), u3 (copy), Raining (copy), Lighting (copy), u1 (copy)\n    if Pollution.Value / u3 > 0.98 then\n        return;\n    end;\n\n    local v4 = math.clamp(1.1 - Pollution.Value / u3, 0, 1.1);\n    local v5 = Raining.Value and 0.01 or v4;\n    local ClockTime = Lighting.ClockTime;\n\n    if ClockTime > 6 and ClockTime < 7 then\n        u1:addPower((math.floor(100000 * v5)));\n\n        return;\n    end;\n\n    u1:addPower((math.floor(0 * v5)));\nend;\n\nreturn v2;"
};
