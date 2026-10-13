export default {
  id: "HVBattery",
  category: "Power",
  tier: 3,
  cost: 17500,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: 4.000030517578125
    },
    width: 12
  },
  nodes: [
    {
      name: "Connector",
      kind: "mv",
      maxAmount: 1000000000,
      transferAmount: 500000,
      siteOffset: {
        y: 0.5,
        x: 0.550079345703125
      },
      gameOffset: {
        y: 1.5249998569488525,
        x: 0.550079345703125,
        z: 0.5
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.Connector);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal _ = ReplicatedStorage.Expenses;\n\nreturn {\n    tick = function() -- Line: 13, Name: tick\n        -- upvalues: u1 (copy), Achievements (copy)\n        local v2 = u1:getBuffer();\n        local v3 = math.floor(v2);\n        local v4 = u1:getMax();\n\n        if v3 == math.floor(v4) then\n            Achievements.giveBadge(2151379289);\n        end;\n    end\n};"
};
