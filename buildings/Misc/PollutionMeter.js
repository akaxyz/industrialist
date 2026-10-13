export default {
  id: "PollutionMeter",
  category: "Misc",
  tier: "1",
  cost: 5000,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: -2,
        x: 2.000030517578125
      },
      gameOffset: {
        y: 2.3749866485595703,
        x: 2.000030517578125,
        z: -2
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.parent.MainConnector);\nlocal v2 = {\n    localUpdate = function() -- Line: 12, Name: localUpdate\n    end\n};\nlocal u3 = workspace:GetAttribute(\"Difficulty\");\nlocal u4 = 0;\nlocal u5 = 0;\n\nfunction v2.tick() -- Line: 18\n    -- upvalues: u4 (ref), u3 (copy), u5 (ref), u1 (copy)\n    u4 = u4 + 1;\n\n    if u3 == 5 and u4 % 30 == 0 then\n        math.randomseed(tick());\n        u5 = math.random(-400, 400);\n    end;\n\n    if not u1:hasPower(100) then\n        script.Parent.Pollution.SurfaceGui.TextLabel.Text = \"No Power\";\n\n        return;\n    end;\n\n    u1:removePower(100);\n\n    if u3 >= 5 then\n        script.Parent.Pollution.SurfaceGui.TextLabel.Text = u5 .. \"%\";\n\n        return;\n    end;\n\n    local TextLabel = script.Parent.Pollution.SurfaceGui.TextLabel;\n    local v6 = game.ReplicatedStorage.Pollution.Value / game.ReplicatedStorage.Pollution:GetAttribute(\"Max\") * 100;\n    TextLabel.Text = math.floor(v6) .. \"%\";\nend;\n\nreturn v2;"
};
