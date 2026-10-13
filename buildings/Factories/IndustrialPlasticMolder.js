export default {
  id: "IndustrialPlasticMolder",
  category: "Factories",
  tier: 3,
  cost: 200000,
  base: {
    height: 10,
    offset: {
      y: -3,
      x: 10
    },
    width: 24
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 250000,
      transferAmount: 0,
      siteOffset: {
        y: -7.0150146484375,
        x: -0.803955078125
      },
      gameOffset: {
        y: 6.963931560516357,
        x: -0.803955078125,
        z: -7.0150146484375
      }
    },
    {
      name: "InItemMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -1,
        x: -1.52490234375
      },
      gameOffset: {
        y: 1.395714521408081,
        x: -1.52490234375,
        z: -1
      }
    },
    {
      name: "OutItemMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -3,
        x: -1.52490234375
      },
      gameOffset: {
        y: 1.395745038986206,
        x: -1.52490234375,
        z: -3
      }
    }
  ],
  data: {
    Type: "Bottle"
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal TweenService = game:GetService(\"TweenService\");\nlocal Blinds = script.Parent.Blinds;\nlocal Lever = script.Parent.Lever;\nlocal Mover = script.Parent.Mover;\nlocal u1 = ModelTweenUtils.new(Lever);\nlocal u2 = Lever:GetPivot();\nlocal u3 = ModelTweenUtils.new(Blinds);\nlocal u4 = ModelTweenUtils.new(Mover);\nlocal u5 = ModelTweenUtils.new(Mover.Bottles);\nlocal u6 = u5:GetPivot();\nlocal u7 = ModelTweenUtils.new(Mover.Casing);\nlocal u8 = u7:GetPivot();\nlocal u9 = u4:GetPivot();\nlocal State = script.Parent.State;\nlocal Type = script.Parent.ModelData.Type;\nlocal u10 = PipeUtilsV2.loadConnector(script.Parent.InItemMainPipe);\nlocal u11 = PipeUtilsV2.loadConnector(script.Parent.OutItemMainPipe);\nlocal u12 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nLever.MainPart.ProximityPrompt.Enabled = true;\n\nif game.Players.LocalPlayer == nil then\n    Lever.MainPart.ProximityPrompt.Triggered:Connect(function(p13) -- Line: 36\n        -- upvalues: State (copy), u11 (copy), Lever (copy), Type (copy)\n        if State.Value == \"Working\" then\n            return;\n        end;\n\n        if not u11:hasAmountOf(\"\", 0) then\n            return;\n        end;\n\n        Lever.MainPart.ProximityPrompt.Enabled = false;\n\n        if Type.Value == \"Bottle\" then\n            Type.Value = \"Casing\";\n            State.Value = \"toCasing\";\n            Lever.MainPart.ProximityPrompt.ObjectText = \"Casing\";\n        elseif Type.Value == \"Casing\" then\n            Type.Value = \"Bottle\";\n            State.Value = \"toBottle\";\n            Lever.MainPart.ProximityPrompt.ObjectText = \"Bottle\";\n        end;\n\n        task.wait(10);\n        State.Value = \"\";\n        Lever.MainPart.ProximityPrompt.Enabled = true;\n    end);\nend;\n\nlocal v15 = {\n    localUpdate = function() -- Line: 58, Name: localUpdate\n        -- upvalues: State (copy), u1 (copy), u2 (copy), u3 (copy), Blinds (copy), Mover (copy), u5 (copy), u6 (copy), u7 (copy), u8 (copy), TweenService (copy), u4 (copy), u9 (copy)\n        if State.Value ~= \"toCasing\" and State.Value ~= \"toBottle\" then\n            if State.Value ~= \"\" then\n                local Bottles = Mover.Bottles;\n                local v14 = u5;\n\n                if State.Value == \"Casing\" then\n                    Bottles = Mover.Casing;\n                    v14 = u7;\n                end;\n\n                script.Parent.Base.Piston1.Volume = 0.3;\n                script.Parent.Base.Piston1:Play();\n                TweenService:Create(script.Parent.Base.Piston1, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut), {\n                    Volume = 0\n                }):Play();\n                u4:newTween(TweenInfo.new(2, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut), u9 * CFrame.new(4, 0, 0)):Play();\n                task.wait(2.1);\n                script.Parent.Base.Injection:Play();\n                task.wait(1.9);\n\n                for _, child in pairs(Bottles:GetChildren()) do\n                    child.Transparency = 0.5;\n                end;\n\n                script.Parent.Base.Piston2.Volume = 0.3;\n                script.Parent.Base.Piston2:Play();\n                TweenService:Create(script.Parent.Base.Piston2, TweenInfo.new(3, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut), {\n                    Volume = 0\n                }):Play();\n                u4:newTween(TweenInfo.new(3, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut), u9):Play();\n                task.wait(3.2);\n                script.Parent.Base.Pneumatic:Play();\n                v14:newTween(TweenInfo.new(0.4, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), script.Parent.Frame1:GetPivot()):Play();\n                task.wait(0.08);\n                v14:newTween(TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.In), script.Parent.Frame2:GetPivot()):Play();\n                task.wait(1.4);\n\n                for _, child in pairs(Bottles:GetChildren()) do\n                    child.Transparency = 1;\n                end;\n\n                v14:PivotTo(u6);\n            end;\n\n            return;\n        end;\n\n        script.Parent.Base.Lever:Play();\n\n        if State.Value == \"toCasing\" then\n            u1:newTween(TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut), u2 * CFrame.Angles(-3.141592653589793, 0, 0)):Play();\n        else\n            u1:newTween(TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut), u2):Play();\n        end;\n\n        task.wait(1);\n        script.Parent.Base.Door:Play();\n        u3:newTween(TweenInfo.new(1.8), Blinds.PrimaryPart.CFrame * CFrame.new(0, 2, 0)):Play();\n        task.wait(2);\n        script.Parent.Base.Change:Play();\n\n        if State.Value == \"toCasing\" then\n            Mover.Decals.Bottles.Transparency = 1;\n            Mover.Decals.Casing.Transparency = 0;\n\n            for _, child in pairs(script.Parent.BottleStationary:GetChildren()) do\n                child.Transparency = 1;\n            end;\n\n            for _, child in pairs(script.Parent.CasingStationary:GetChildren()) do\n                child.Transparency = 0;\n            end;\n        else\n            Mover.Decals.Bottles.Transparency = 0;\n            Mover.Decals.Casing.Transparency = 1;\n\n            for _, child in pairs(script.Parent.CasingStationary:GetChildren()) do\n                child.Transparency = 1;\n            end;\n\n            for _, child in pairs(script.Parent.BottleStationary:GetChildren()) do\n                child.Transparency = 0;\n            end;\n        end;\n\n        task.wait(1);\n        script.Parent.Base.DoorAir:Play();\n        task.wait(1);\n        script.Parent.Base.DoorOpen:Play();\n        u3:newTween(TweenInfo.new(1.8), Blinds.PrimaryPart.CFrame * CFrame.new(0, -2, 0)):Play();\n        task.wait(1.8);\n    end\n};\n\nif game.Players.LocalPlayer ~= nil and Type.Value == \"Casing\" then\n    Mover.Decals.Bottles.Transparency = 1;\n    Mover.Decals.Casing.Transparency = 0;\n\n    for _, child in pairs(script.Parent.BottleStationary:GetChildren()) do\n        child.Transparency = 1;\n    end;\n\n    for _, child in pairs(script.Parent.CasingStationary:GetChildren()) do\n        child.Transparency = 0;\n    end;\n\n    u1:PivotTo(u2 * CFrame.Angles(-3.141592653589793, 0, 0));\nend;\n\nlocal u16 = require(game.ReplicatedStorage.Modules.NextTicks).new();\nlocal u17 = \"\";\n\nfunction v15.tick() -- Line: 167\n    -- upvalues: u16 (copy), u11 (copy), State (copy), u12 (copy), Type (copy), u10 (copy), u17 (ref)\n    if u16:tickIsBusy() then\n        return;\n    end;\n\n    if not u11:canHoldXMore(6) then\n        return;\n    end;\n\n    if State.Value ~= \"\" then\n        return;\n    end;\n\n    if not u12:hasPower(240000) then\n        return;\n    end;\n\n    local v18 = Type.Value == \"Casing\" and 2 or 1;\n\n    if u10:hasAmountOf(\"Plastic Pellets\", v18 * 60) then\n        u17 = \"Plastic Casing\";\n    else\n        if not u10:hasAmountOf(\"Hardened Plastic Pellets\", 60) or Type.Value ~= \"Casing\" then\n            return;\n        end;\n\n        u17 = \"Hardened Plastic Casing\";\n        v18 = 1;\n    end;\n\n    u10:removeItem(v18 * 60);\n    State.Value = Type.Value;\n    u16:nextTicks(12, function(p19) -- Line: 186\n        -- upvalues: u12 (ref), Type (ref), u11 (ref), u17 (ref), State (ref)\n        u12:removePower(20000);\n\n        if p19 == 1 then\n            if Type.Value == \"Casing\" then\n                u11:addItemAmount(u17, 6);\n            elseif Type.Value == \"Bottle\" then\n                u11:addItemAmount(\"Plastic Bottle\", 6);\n            end;\n\n            State.Value = \"\";\n        end;\n    end);\nend;\n\nreturn v15;"
};
