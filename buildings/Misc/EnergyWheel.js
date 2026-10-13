export default {
  id: "EnergyWheel",
  category: "Misc",
  cost: 4415,
  base: {
    height: 24,
    offset: {
      y: -10,
      x: 7
    },
    width: 18
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 100000,
      siteOffset: {
        y: -3.0750732421875,
        x: -0.68359375
      },
      gameOffset: {
        y: 7.02075719833374,
        x: -0.68359375,
        z: -3.0750732421875
      }
    }
  ],
  data: [],
  updateEvery: 1,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal v2 = {};\nlocal _ = script.Parent.State;\nlocal Hitbox = script.Parent.Hitbox;\nlocal Wheel = script.Parent.Wheel;\nlocal Spin = script.Parent.Base.Spin;\nlocal u3 = OverlapParams.new();\nu3.FilterDescendantsInstances = { script.Parent };\nu3.FilterType = Enum.RaycastFilterType.Exclude;\n\nfunction v2.localUpdate() -- Line: 19\nend;\n\nlocal u4 = 0;\n\nfunction v2.localStart() -- Line: 25\n    -- upvalues: Wheel (copy), Spin (copy)\n    game:GetService(\"RunService\").RenderStepped:Connect(function() -- Line: 26\n        -- upvalues: Wheel (ref), Spin (ref)\n        if script.Parent == nil then\n            return;\n        end;\n\n        local v5 = tonumber(script.Parent.State.Value) or 0;\n\n        for _, child in pairs(Wheel.Treadmill:GetChildren()) do\n            child.AssemblyLinearVelocity = child.CFrame.LookVector * v5;\n        end;\n\n        script.Parent.Wheel:PivotTo(script.Parent.Wheel:GetPivot() * CFrame.Angles(math.rad(-3.141592653589793 * v5 / 180), 0, 0));\n\n        if Spin.Playing == false then\n            Spin:Play();\n        end;\n\n        Spin.Volume = v5 / 16 * 0.5;\n        Spin.PlaybackSpeed = 0.8 + v5 / 16 * 0.1;\n    end);\nend;\n\nfunction v2.tick() -- Line: 48\n    -- upvalues: Hitbox (copy), u3 (copy), u4 (ref), u1 (copy)\n    local v6 = workspace:GetPartBoundsInBox(Hitbox.CFrame, Hitbox.Size, u3);\n    local v7 = {};\n\n    for _, v in pairs(v6) do\n        if v.Parent:FindFirstChild(\"Humanoid\") then\n            local Parent = v.Parent;\n\n            if not table.find(v7, Parent) then\n                local v8 = Hitbox.Position + Parent.Humanoid.MoveDirection * 10;\n\n                if (v8 - script.Parent.Front.Position).Magnitude < (v8 - script.Parent.Back.Position).Magnitude then\n                    u4 = math.clamp(u4 + 0.013, -60, 60);\n                else\n                    u4 = math.clamp(u4 - 0.013, -60, 60);\n                end;\n            end;\n        end;\n    end;\n\n    script.Parent.State.Value = u4;\n    local v9 = math.clamp(#v7, 1, 99) * 0.01;\n    local v10 = math.clamp(#v7, 1, 99) * 1000;\n    local v11 = u1:getMax() - u1:getBuffer();\n    local v12 = math.clamp(v10, 0, v11) / v10;\n\n    if u1:canHoldXMore(v10) and u4 ~= 0 then\n        if u4 < 0 then\n            u4 = math.clamp(u4 + v9 * v12, -500, 0);\n            u1:addPower(v10 * v12);\n\n            return;\n        end;\n\n        if u4 > 0 then\n            u4 = math.clamp(u4 - v9 * v12, 0, 500);\n            u1:addPower(v10 * v12);\n        end;\n    end;\nend;\n\nreturn v2;"
};
