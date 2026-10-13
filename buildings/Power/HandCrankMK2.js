export default {
  id: "HandCrankMK2",
  category: "Power",
  cost: 200000,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 1000000,
      siteOffset: {
        y: 6,
        x: 6
      },
      gameOffset: {
        y: 12.70789623260498,
        x: 6,
        z: 6
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal v2 = {};\nlocal u3 = 0;\nlocal u4 = {\n    script.Parent.Gear1,\n    script.Parent.Gear2,\n    script.Parent.Gear3,\n    script.Parent.Gear4\n};\nlocal u5 = {};\n\nif game.Players.LocalPlayer == nil then\n    for _, child in pairs(script.Parent.Crank.Handles:GetChildren()) do\n        child.ProximityPrompt.Triggered:Connect(function(p6) -- Line: 24\n            -- upvalues: child (copy)\n            local Character = p6.Character;\n\n            if Character.ConnectedTo.Value ~= nil then\n                return;\n            end;\n\n            Character:PivotTo((child.CFrame + child.CFrame.LookVector * 1 - Vector3.new(0, 0.1, 0)) * CFrame.Angles(0, 3.141592653589793, 0));\n            child.WeldConstraint.Part0 = child;\n            child.WeldConstraint.Part1 = Character.HumanoidRootPart;\n            child.Owner.Value = Character;\n            child.ProximityPrompt.Enabled = false;\n            Character.ConnectedTo.Value = child;\n        end);\n    end;\nend;\n\nif game.Players.LocalPlayer == nil then\n    script.PlayerData.OnServerEvent:Connect(function(p7, p8) -- Line: 42\n        -- upvalues: u3 (ref), u5 (copy)\n        if p8 then\n            if p7.Character.ConnectedTo.Value.Parent.Parent.Parent == script.Parent then\n                p7.Character.ConnectedTo.Value.ProximityPrompt.Enabled = true;\n                p7.Character.ConnectedTo.Value.WeldConstraint.Part1 = nil;\n                p7.Character.ConnectedTo.Value.Owner.Value = nil;\n                local LookVector = p7.Character.ConnectedTo.Value.CFrame.LookVector;\n                local v9 = Vector3.new(LookVector.X, 0.2, LookVector.Z);\n                p7.Character.ConnectedTo.Value = nil;\n                game.ReplicatedStorage.ApplyImpulse:FireClient(p7, v9 * u3 ^ 2);\n            end;\n        else\n            u5[p7.Name] = tick();\n        end;\n    end);\nend;\n\nfunction v2.localUpdate() -- Line: 85\nend;\n\nfunction v2.tick() -- Line: 90\n    -- upvalues: u3 (ref), u4 (copy), u5 (copy), u1 (copy)\n    for _, child in pairs(script.Parent.Crank.Handles:GetChildren()) do\n        if child.Owner.Value == nil or child.Owner.Value.Parent == nil then\n            child.ProximityPrompt.Enabled = true;\n        end;\n    end;\n\n    if tonumber(script.Parent.State.Value) ~= u3 then\n        script.Parent.State.Value = u3;\n    end;\n\n    if script.Parent.Base[\"HumN 205\"].Playing == false then\n        script.Parent.Base[\"HumN 205\"]:Play();\n    end;\n\n    script.Parent.Base[\"HumN 205\"].Volume = u3 / 232 * 4;\n    script.Parent.Base[\"HumN 205\"].Pitch = u3 / 232 / 4 + 0.6;\n    local v10 = u3 * 360 / 60 / 30;\n    script.Parent.Crank:PivotTo(script.Parent.Crank:GetPivot() * CFrame.Angles(math.rad(v10), 0, 0));\n    script.Parent.CenterGear:PivotTo(script.Parent.CenterGear.CFrame * CFrame.Angles(0, math.rad(v10), 0));\n\n    for _, v in pairs(u4) do\n        v:PivotTo(v.CFrame * CFrame.Angles(0, math.rad(-v10 * 2), 0));\n    end;\n\n    local v11 = 0;\n\n    for i, v in pairs(u5) do\n        if tick() - v >= 1 then\n            u5[i] = nil;\n        else\n            v11 = v11 + 1;\n            u3 = math.clamp(u3 + 0.01, 0, 232);\n        end;\n    end;\n\n    for i = 1, v11 do\n        script.Parent.Lights[i].Material = Enum.Material.Neon;\n    end;\n\n    for i = 1, 4 - v11 do\n        script.Parent.Lights[4 - i + 1].Material = Enum.Material.Glass;\n    end;\n\n    local v12 = v11 == 0 and 0 or 1;\n\n    if u1:canHoldXMore(45271) and v12 <= u3 then\n        local v13 = math.clamp(0.1, 0, u3 - v12);\n        u3 = math.clamp(u3 - v13, 0, 232);\n        u1:addPower(v13 / 0.1 * 45271);\n    end;\nend;\n\nreturn v2;"
};
