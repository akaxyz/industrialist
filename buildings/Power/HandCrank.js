export default {
  id: "HandCrank",
  category: "Power",
  cost: 100,
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
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: 1.722991943359375,
        x: -1.7216796875
      },
      gameOffset: {
        y: 3.7124738693237305,
        x: -1.7216796875,
        z: 1.722991943359375
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal v2 = {};\nlocal u3 = 0;\nlocal u4 = false;\nscript.Parent.Base.ProximityPrompt.Enabled = true;\nscript.Parent.Base.ProximityPrompt.PromptButtonHoldBegan:Connect(function() -- Line: 15\n    -- upvalues: u4 (ref)\n    u4 = true;\nend);\nscript.Parent.Base.ProximityPrompt.PromptButtonHoldEnded:Connect(function() -- Line: 18\n    -- upvalues: u4 (ref)\n    u4 = false;\nend);\nlocal u5 = {\n    script.Parent.Gear1,\n    script.Parent.Gear2,\n    script.Parent.Gear3,\n    script.Parent.Gear4\n};\n\nfunction v2.localStart() -- Line: 29\n    -- upvalues: u5 (copy)\n    local State = script.Parent.State;\n\n    while task.wait(0.03333333333333333) do\n        local v6 = tonumber(State.Value);\n\n        if script.Parent.Base[\"HumN 205\"].Playing == false then\n            script.Parent.Base[\"HumN 205\"]:Play();\n        end;\n\n        script.Parent.Base[\"HumN 205\"].Volume = v6 / 106;\n        script.Parent.Base[\"HumN 205\"].Pitch = v6 / 106 / 4 + 0.85;\n        local v7 = v6 * 360 / 60 / 30;\n        script.Parent.Crank:PivotTo(script.Parent.Crank:GetPivot() * CFrame.Angles(math.rad(v7), 0, 0));\n        script.Parent.CenterGear:PivotTo(script.Parent.CenterGear.CFrame * CFrame.Angles(0, math.rad(v7), 0));\n\n        for _, v in pairs(u5) do\n            v:PivotTo(v.CFrame * CFrame.Angles(0, math.rad(-v7 * 2), 0));\n        end;\n    end;\nend;\n\nfunction v2.localUpdate() -- Line: 50\nend;\n\nfunction v2.tick() -- Line: 54\n    -- upvalues: u4 (ref), u3 (ref), u1 (copy)\n    if u4 then\n        u3 = math.clamp(u3 + 2, 0, 106);\n    end;\n\n    if tonumber(script.Parent.State.Value) ~= u3 then\n        script.Parent.State.Value = u3;\n    end;\n\n    if u1:canHoldXMore(50) and u3 >= 1 then\n        u3 = math.clamp(u3 - 1, 0, 106);\n        u1:addPower(50);\n    end;\nend;\n\nreturn v2;"
};
