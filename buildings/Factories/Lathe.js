export default {
  id: "Lathe",
  category: "Factories",
  tier: 4,
  cost: 5000000,
  base: {
    height: 34,
    offset: {
      y: -15,
      x: -6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 130000000,
      transferAmount: 0,
      siteOffset: {
        y: -4.09808349609375,
        x: -2.979248046875
      },
      gameOffset: {
        y: 11.87475872039795,
        x: -2.979248046875,
        z: -4.09808349609375
      }
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 300,
      transferAmount: 20,
      siteOffset: {
        y: -0.9998779296875,
        x: -13.39935302734375
      },
      gameOffset: {
        y: 1.851977825164795,
        x: -13.39935302734375,
        z: -0.9998779296875
      }
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 4000,
      transferAmount: 20,
      siteOffset: {
        y: 1.46923828125,
        x: -2.9974365234375
      },
      gameOffset: {
        y: 1.8543620109558105,
        x: -2.9974365234375,
        z: 1.46923828125
      },
      tip: "Input for Ingot (check recipes)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal _ = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\ngame:GetService(\"TweenService\");\nlocal State = script.Parent.State;\nlocal v5 = {};\nlocal u6 = { { 0, 0.15 }, { 0.4, 0.15 }, { 0.45, 0.3 }, { 1, 0.3 } };\nlocal u7 = { { 0, 0.5 }, { 1, 0.5 } };\nlocal SupportArm = script.Parent.SupportArm;\nlocal BladeArm = script.Parent.BladeArm;\nlocal Flywheel = script.Parent.Flywheel;\nlocal u8 = SupportArm:GetPivot();\nlocal Position = Flywheel.Metal.Position;\nlocal Base = script.Parent.Base;\nlocal TweenService = game:GetService(\"TweenService\");\n\nfunction v5.localUpdate() -- Line: 46\n    -- upvalues: State (copy), u6 (copy), u7 (copy), Flywheel (copy), Position (copy), Base (copy), TweenService (copy)\n    if State.Value ~= \"\" then\n        repeat\n            task.wait(0.1);\n        until script.FlywheelSpeed.Value == 0;\n\n        local v9 = u6;\n        local v10 = Color3.fromRGB(220, 112, 35);\n\n        if State.Value ~= \"1\" then\n            if State.Value == \"2\" then\n                v10 = Color3.fromRGB(220, 220, 220);\n            elseif State.Value == \"3\" then\n                v10 = Color3.fromRGB(168, 144, 127);\n            elseif State.Value == \"4\" then\n                v10 = Color3.fromRGB(89, 89, 89);\n            elseif State.Value == \"5\" then\n                v10 = Color3.fromRGB(74, 89, 79);\n            else\n                v10 = Color3.fromRGB(89, 89, 89);\n                v9 = u7;\n            end;\n        end;\n\n        for _, descendant in pairs(Flywheel.Extras:GetDescendants()) do\n            if descendant:IsA(\"BasePart\") then\n                descendant.Color = v10;\n            end;\n        end;\n\n        Flywheel.Metal.Color = v10;\n\n        for _, descendant in pairs(Flywheel.Extras.Drill:GetDescendants()) do\n            if descendant:IsA(\"BasePart\") then\n                descendant.Transparency = v9 == u6 and 0 or 1;\n            end;\n        end;\n\n        Flywheel.Extras.Rod.Transparency = v9 == u6 and 1 or 0;\n        Flywheel.Metal.Size = Vector3.new(16.3, 5, 5);\n        Flywheel.Metal.Position = Position;\n        Flywheel.Metal.Transparency = 0;\n        Base.Startup:Play();\n        Base.Startup.Volume = 1;\n        Base.Base:Play();\n        Base.Base.Volume = 0;\n        TweenService:Create(Base.Startup, TweenInfo.new(2, Enum.EasingStyle.Linear), {\n            Volume = 0\n        }):Play();\n        TweenService:Create(Base.Base, TweenInfo.new(2, Enum.EasingStyle.Linear), {\n            Volume = 0.5\n        }):Play();\n        TweenService:Create(script.Arm, TweenInfo.new(2, Enum.EasingStyle.Linear), {\n            Value = v9[1][1]\n        }):Play();\n        TweenService:Create(script.Blade, TweenInfo.new(2, Enum.EasingStyle.Linear), {\n            Value = v9[1][2]\n        }):Play();\n        TweenService:Create(script.FlywheelSpeed, TweenInfo.new(5, Enum.EasingStyle.Linear), {\n            Value = 1\n        }):Play();\n        task.wait(5);\n        local v11 = State:GetAttribute(\"Time\") - 18;\n        local v12 = 0;\n\n        for i, v in ipairs(v9) do\n            Base.Blade:Play();\n\n            if i ~= 1 then\n                local v13 = v[1] - v12;\n                v12 = v[1];\n                TweenService:Create(script.Arm, TweenInfo.new(v13 * v11, Enum.EasingStyle.Linear), {\n                    Value = v[1] * 15\n                }):Play();\n                TweenService:Create(script.Blade, TweenInfo.new(v13 * v11, Enum.EasingStyle.Linear), {\n                    Value = v[2] * 4\n                }):Play();\n                task.wait(v13 * v11);\n            end;\n        end;\n\n        Base.Blade:Stop();\n        TweenService:Create(Base.Base, TweenInfo.new(3, Enum.EasingStyle.Linear), {\n            Volume = 0\n        }):Play();\n        TweenService:Create(script.FlywheelSpeed, TweenInfo.new(5, Enum.EasingStyle.Linear), {\n            Value = 0\n        }):Play();\n        TweenService:Create(script.Blade, TweenInfo.new(1, Enum.EasingStyle.Linear), {\n            Value = 0\n        }):Play();\n        task.wait(1);\n\n        for _, descendant in pairs(Flywheel.Extras:GetDescendants()) do\n            if descendant:IsA(\"BasePart\") then\n                TweenService:Create(descendant, TweenInfo.new(4, Enum.EasingStyle.Linear), {\n                    Transparency = 1\n                }):Play();\n            end;\n        end;\n\n        TweenService:Create(script.Arm, TweenInfo.new(4, Enum.EasingStyle.Linear), {\n            Value = 0\n        }):Play();\n        task.wait(4);\n    end;\nend;\n\nfunction v5.localStart() -- Line: 133\n    -- upvalues: Base (copy), u8 (copy), SupportArm (copy), BladeArm (copy), Flywheel (copy), Position (copy)\n    local u14 = nil;\n    local u15 = 0;\n    local CurrentCamera = workspace.CurrentCamera;\n    u14 = game:GetService(\"RunService\").RenderStepped:Connect(function(p16) -- Line: 139\n        -- upvalues: u14 (ref), u15 (ref), CurrentCamera (copy), Base (ref), u8 (ref), SupportArm (ref), BladeArm (ref), Flywheel (ref), Position (ref)\n        if script.Parent == nil then\n            u14:Disconnect();\n\n            return;\n        end;\n\n        u15 = u15 + 1;\n        local Magnitude = (CurrentCamera.CFrame.Position - Base.Position).Magnitude;\n\n        if Magnitude >= 150 then\n            if Magnitude < 300 then\n                if u15 % 3 ~= 0 then\n                    return;\n                end;\n            elseif Magnitude < 400 and u15 % 10 ~= 0 then\n                return;\n            end;\n        end;\n\n        local v17 = u8 + u8.LookVector * script.Arm.Value;\n        SupportArm:PivotTo(v17);\n        BladeArm:PivotTo(v17 + v17.RightVector * script.Blade.Value);\n        Flywheel:PivotTo(Flywheel:GetPivot() * CFrame.Angles(script.FlywheelSpeed.Value, 0, 0));\n\n        if script.FlywheelSpeed.Value == 1 then\n            Flywheel.Metal.Size = Vector3.new(16.3 - script.Arm.Value, 5, 5);\n            Flywheel.Metal.Position = Position + u8.LookVector * script.Arm.Value * 0.5;\n        end;\n\n        if script.Blade.Value ~= 0 and script.FlywheelSpeed.Value == 1 then\n            BladeArm.Blade.Attachment.Sparks:Emit(BladeArm.Blade.Attachment.Sparks.Rate * p16);\n            BladeArm.Blade.Attachment.Sparks2:Emit(BladeArm.Blade.Attachment.Sparks2.Rate * p16);\n        end;\n    end);\nend;\n\nlocal u18 = { { { \"Copper Ingot\", 700 }, { \"Copper Drill Head\", 1 }, 60, 30000000, 1 }, { { \"Iron Ingot\", 2100 }, { \"Iron Drill Head\", 1 }, 160, 80000000, 3 }, { { \"Steel Ingot\", 3500 }, { \"Steel Drill Head\", 1 }, 200, 100000000, 4 }, { { \"Tungsten Carbide Plate\", 1275 }, { \"Tungsten Carbide Drill Head\", 1 }, 240, 120000000, 5 }, { { \"Steel Coil\", 60 }, { \"Steel Rod\", 60 }, 30, 3000000, 6 } };\n\nfunction v5.tick() -- Line: 224\n    -- upvalues: u1 (copy), u18 (copy), u2 (copy), u3 (copy), u4 (copy), State (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    for _, v in pairs(u18) do\n        if u2:hasAmountOf(v[1][1], v[1][2]) and (u3:canHoldXMoreOf(v[2][1], v[2][2]) and u4:hasPower(v[4])) then\n            u2:removeItem(v[1][2]);\n            State.Value = v[5];\n            State:SetAttribute(\"Time\", v[3]);\n            u4:removePower(v[4]);\n            u1:nextTicks(v[3], function(p19) -- Line: 237\n                -- upvalues: u3 (ref), v (copy), State (ref)\n                if p19 == 1 then\n                    u3:addItemAmount(v[2][1], v[2][2]);\n                    State.Value = \"\";\n                end;\n            end);\n\n            return;\n        end;\n    end;\nend;\n\nreturn v5;"
};
