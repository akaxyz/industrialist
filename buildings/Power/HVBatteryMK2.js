export default {
  id: "HVBatteryMK2",
  category: "Power",
  tier: 4,
  cost: 20000000,
  base: {
    height: 30,
    offset: {
      y: 1,
      x: -13
    },
    width: 30
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "hv",
      maxAmount: 1000000000000,
      transferAmount: 30000000,
      siteOffset: {
        y: 1,
        x: 0.70721435546875
      },
      gameOffset: {
        y: 6.438652038574219,
        x: 0.70721435546875,
        z: 1
      },
      wireRange: 90
    }
  ],
  data: [],
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal v2 = {\n    localUpdate = function() -- Line: 8, Name: localUpdate\n    end\n};\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal u3 = 0;\nlocal u4 = 0;\nlocal u5 = u1:getBuffer() / u1:getMax();\nlocal StartTracking = game.ReplicatedStorage.StartTracking;\n\nfunction v2.tick() -- Line: 20\n    -- upvalues: u5 (ref), u1 (copy), u4 (ref), u3 (ref), StartTracking (copy), Achievements (copy)\n    u5 = u1:getBuffer() / u1:getMax();\n    u4 = u1:getFlow();\n    u1:setFlow(0);\n\n    if u4 > 0 then\n        local v6 = math.exp(2 * (u5 - 1));\n        u3 = u4 * math.clamp(v6, 0, 1);\n        u1:removePower(u3);\n\n        if StartTracking.Value then\n            shared.powerLost = shared.powerLost + u3;\n        end;\n    end;\n\n    local v7 = u1:getBuffer();\n    local v8 = math.floor(v7);\n    local v9 = u1:getMax();\n\n    if math.floor(v9) * 0.99999 <= v8 then\n        Achievements.giveBadge(3030304417197250);\n    end;\nend;\n\nreturn v2;"
};
