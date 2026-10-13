export default {
  id: "PowerRateCalculator3",
  category: "Power",
  tier: 4,
  cost: 5000000,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 1000000000,
      transferAmount: 0,
      siteOffset: {
        y: 4.22607421875,
        x: -7.8631591796875
      },
      gameOffset: {
        y: 12.218587875366211,
        x: -7.8631591796875,
        z: 4.22607421875
      },
      wireRange: 90
    },
    {
      name: "OutMainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 1000000000,
      transferAmount: 17000000,
      siteOffset: {
        y: -1.23529052734375,
        x: -7.8631591796875
      },
      gameOffset: {
        y: 12.218587875366211,
        x: -7.8631591796875,
        z: -1.23529052734375
      },
      wireRange: 90
    }
  ],
  data: {
    State: "1",
    Switched: false
  },
  updateEvery: 6,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = require(game:GetService(\"ReplicatedStorage\").FormatNumber.Main).NumberFormatter.with();\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal u2 = workspace:GetAttribute(\"Difficulty\");\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector, true);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.OutMainConnector, true);\nlocal v5 = {\n    localUpdate = function() -- Line: 16, Name: localUpdate\n    end\n};\nlocal State = script.Parent.ModelData.State;\nlocal u6 = 0;\nlocal u7 = 0;\nlocal u8 = 0;\nlocal _ = script.Parent.ModelData.Switched.Value;\nlocal u9 = true;\nscript.Parent.LeverOFF.ProximityPrompt.Triggered:Connect(function() -- Line: 25\n    -- upvalues: State (copy), u9 (ref)\n    if State.Value ~= \"1\" then\n        if State.Value == \"0\" then\n            State.Value = \"1\";\n            script.Parent.LeverOFF[\"Eletcric Switch\"]:Play();\n            u9 = true;\n        end;\n\n        return;\n    end;\n\n    State.Value = \"0\";\n    script.Parent.LeverOFF[\"Eletcric Switch\"]:Play();\n    u9 = true;\nend);\n\nfunction v5.tick() -- Line: 37\n    -- upvalues: u2 (copy), u3 (copy), State (copy), u9 (ref), u4 (copy), u6 (ref), u7 (ref), Achievements (copy), u8 (ref), u1 (copy)\n    script.Parent.LeverOFF.ProximityPrompt.Enabled = true;\n\n    if u2 >= 4 then\n        u3:removePower(u3:getBuffer());\n    elseif State.Value == \"1\" then\n        if u9 then\n            script.Parent.LeverON.Transparency = 0;\n            script.Parent.LeverOFF.Transparency = 1;\n            script.Parent.LeverOFF.ProximityPrompt.ObjectText = \"POWER FLOWING\";\n            u9 = false;\n        end;\n\n        if u4:canHoldXMore(u3:getBuffer()) and u3:getBuffer() <= 100000000 then\n            u4:addPower((u3:removePower(u3:getBuffer())));\n        elseif u4:canHoldXMore(100000000) and u3:getBuffer() > 100000000 then\n            u4:addPower((u3:removePower(100000000)));\n        end;\n    elseif State.Value == \"0\" and u9 then\n        script.Parent.LeverON.Transparency = 1;\n        script.Parent.LeverOFF.Transparency = 0;\n        script.Parent.LeverOFF.ProximityPrompt.ObjectText = \"POWER NOT FLOWING\";\n        u9 = false;\n    end;\n\n    u6 = u6 + u3:getFlow();\n    u3:setFlow(0);\n\n    if u7 > 2500000 then\n        Achievements.giveBadge(2151505005);\n    end;\n\n    u8 = u8 + 1;\n\n    if u8 == 5 then\n        u8 = 0;\n        u7 = (u7 + u6) / 2;\n        u6 = 0;\n    end;\n\n    script.Parent.Screen.SurfaceGui.TextLabel.Text = u1:Format((math.floor(u7))) .. \"MF/s\";\nend;\n\nreturn v5;"
};
