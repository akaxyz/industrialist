export default {
  id: "SolarPanel",
  category: "Power",
  cost: 80,
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
      maxAmount: 1000,
      transferAmount: 100,
      siteOffset: {
        y: -1.949951171875,
        x: 0.5
      },
      gameOffset: {
        y: 0.900001049041748,
        x: 0.5,
        z: -1.949951171875
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.Connector);\nlocal v2 = {};\nlocal Lighting = game.Lighting;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u3 = Pollution:GetAttribute(\"Max\");\nlocal _ = game.ReplicatedStorage.Raining;\n\nfunction v2.tick() -- Line: 13\n    -- upvalues: Pollution (copy), u3 (copy), Lighting (copy), u1 (copy)\n    if Pollution.Value / u3 > 0.98 then\n        return;\n    end;\n\n    local v4 = math.clamp(1.1 - Pollution.Value / u3, 0, 1.1);\n    local ClockTime = Lighting.ClockTime;\n\n    if ClockTime > 6.5 and ClockTime < 17 then\n        u1:addPower((math.floor(8 * v4)));\n\n        return;\n    end;\n\n    if ClockTime > 6 and ClockTime < 17.5 then\n        u1:addPower((math.floor(7 * v4)));\n\n        return;\n    end;\n\n    if ClockTime > 5 and ClockTime < 17.6 then\n        u1:addPower((math.floor(6 * v4)));\n\n        return;\n    end;\n\n    if ClockTime > 4 and ClockTime < 21 then\n        u1:addPower((math.floor(5 * v4)));\n\n        return;\n    end;\n\n    u1:addPower((math.floor(4 * v4)));\nend;\n\nreturn v2;"
};
