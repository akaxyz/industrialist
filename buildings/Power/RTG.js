export default {
  id: "RTG",
  category: "Power",
  tier: 4,
  cost: 100000,
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
      maxAmount: 100,
      transferAmount: 1,
      siteOffset: {
        y: -1.0999755859375,
        x: -0.0169677734375
      },
      gameOffset: {
        y: 5.851306915283203,
        x: -0.0169677734375,
        z: -1.0999755859375
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u2 = require(ReplicatedStorage.Modules.ModelTweenUtils).new(script.Parent.Fuel);\nlocal State = script.Parent.State;\nlocal v9 = {\n    localUpdate = function() -- Line: 15, Name: localUpdate\n        -- upvalues: State (copy), TweenService (copy), u2 (copy)\n        if State.Value == \"On\" then\n            script.Parent.Base.ReactorSound:Play();\n\n            return;\n        end;\n\n        if State.Value == \"no\" then\n            script.Parent.Base.RodJump:Play();\n            script.Parent.Base[\"Radiation Alarm\"]:Play();\n            TweenService:Create(script.Parent.Base[\"Radiation Alarm\"], TweenInfo.new(3, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 0, true), {\n                Volume = 2\n            }):Play();\n            script.Parent.Base[\"Radiation Counter sound effect 2\"]:Play();\n            TweenService:Create(script.Parent.Base[\"Radiation Counter sound effect 2\"], TweenInfo.new(4, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, 0, true), {\n                Volume = 2\n            }):Play();\n            local v3 = tick();\n\n            while true do\n                local v4 = math.random(10, 30) / 100;\n\n                if tick() + v4 > v3 + 9 then\n                    break;\n                end;\n\n                local v5 = TweenInfo.new(v4, Enum.EasingStyle.Bounce, Enum.EasingDirection.InOut, 0, true, 0.01);\n                local v6 = u2:GetPivot();\n                local v7 = math.random(-5, 200) / 100;\n                local v8 = u2:newTween(v5, v6 + Vector3.new(0, v7, 0));\n                v8:Play();\n                v8.Completed:Wait();\n\n                if tick() > v3 + 9 then\n                    break;\n                end;\n            end;\n        end;\n    end\n};\n\nlocal function replaceTerrain(p10, p11, p12) -- Line: 48\n    local v13 = Vector3.new(1, 1, 1) * p12;\n    local v14 = Region3.new(p10 - v13 - Vector3.new(4, 4, 4), p10 + v13 + Vector3.new(4, 4, 4));\n    v14:ExpandToGrid(4);\n    local v15 = workspace.Terrain:WorldToCell(v14.CFrame.Position - v14.Size / 2);\n    local v16, v17 = workspace.Terrain:ReadVoxels(v14, 4);\n    local v18 = { #v17, #v17[1], #v17[1][1] };\n\n    for i = 1, v18[1] do\n        for i2 = 1, v18[2] do\n            for i3 = 1, v18[3] do\n                local v19 = v15 + Vector3.new(i, i2, i3);\n\n                if (p10 - workspace.Terrain:CellCenterToWorld(v19.X, v19.Y, v19.Z)).Magnitude < p12 then\n                    v16[i][i2][i3] = Enum.Material.Mud;\n                end;\n            end;\n        end;\n    end;\n\n    workspace.Terrain:WriteVoxels(v14, 4, v16, v17);\nend;\n\nlocal ExplodeMachine = game.ReplicatedStorage.Events.ExplodeMachine;\nlocal u20 = false;\n\nfunction v9.tick() -- Line: 80\n    -- upvalues: u20 (ref), u1 (copy), State (copy), ExplodeMachine (copy), replaceTerrain (copy)\n    if u20 == true then\n        return;\n    end;\n\n    u1:addPower(1);\n    State.Value = \"On\";\n\n    if u1:getBuffer() == u1:getMax() then\n        State.Value = \"no\";\n        u20 = true;\n        task.spawn(function() -- Line: 90\n            -- upvalues: ExplodeMachine (ref), replaceTerrain (ref)\n            task.wait(8.7);\n            ExplodeMachine:Fire(script.Parent, {\n                BlastRadius = 150,\n                BlastPressure = 50,\n                TimeScale = 0.5,\n                Size = 0.5,\n                YeetPlayers = 100000\n            });\n            pcall(function() -- Line: 108\n                for _, v in pairs(game.Players:GetPlayers()) do\n                    if v.Character == nil then\n                        return;\n                    end;\n\n                    local Magnitude = (v.Character.HumanoidRootPart.Position - script.Parent.Base.Position).Magnitude;\n                    local Unit = ((script.Parent.Base.Position - v.Character.HumanoidRootPart.Position).Unit + Vector3.new(0, 0.1, 0)).Unit;\n\n                    if Magnitude < 80 then\n                        game.ReplicatedStorage.ApplyImpulse:FireClient(v, -Unit * 100000 / Magnitude);\n                    end;\n                end;\n            end);\n            replaceTerrain(script.Parent.Base.Position, 0, 60);\n        end);\n    end;\nend;\n\nreturn v9;"
};
