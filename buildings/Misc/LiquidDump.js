export default {
  id: "LiquidDump",
  category: "Misc",
  tier: "2",
  cost: 500,
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
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 30,
      transferAmount: 5,
      siteOffset: {
        y: -1,
        x: -1.149993896484375
      },
      gameOffset: {
        y: 1.4495000839233398,
        x: -1.149993896484375,
        z: -1
      }
    },
    {
      name: "In2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 30,
      transferAmount: 5,
      siteOffset: {
        y: 1,
        x: -1.149993896484375
      },
      gameOffset: {
        y: 1.4495000839233398,
        x: -1.149993896484375,
        z: 1
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal _ = game.ReplicatedStorage.Pollution;\nlocal Achievements = require(ReplicatedStorage.Modules.Achievements);\nlocal Waste = require(ReplicatedStorage.Modules.Waste);\n\nreturn {\n    localUpdate = function() -- Line: 18, Name: localUpdate\n    end,\n\n    tick = function() -- Line: 20, Name: tick\n        -- upvalues: u1 (copy), Achievements (copy), Waste (copy), u2 (copy)\n        local v3 = u1:getBuffer();\n        local v4 = u1:getItem();\n\n        if v3 ~= 0 then\n            if v4 ~= \"Residue\" and (v4 ~= \"Water\" and (v4 ~= \"Filtered Water\" and (v4 ~= \"Distilled Water\" and v4 == \"Liquid Gold\"))) then\n                Achievements.giveBadge(1640952538292011);\n            end;\n\n            Waste.disposeOf(v4, v3);\n            u1:removeItem(v3);\n        end;\n\n        local v5 = u2:getBuffer();\n        local v6 = u2:getItem();\n\n        if v5 ~= 0 then\n            if v6 ~= \"Residue\" and (v6 ~= \"Water\" and v4 == \"Liquid Gold\") then\n                Achievements.giveBadge(1640952538292011);\n            end;\n\n            Waste.disposeOf(v6, v5);\n            u2:removeItem(v5);\n        end;\n    end\n};"
};
