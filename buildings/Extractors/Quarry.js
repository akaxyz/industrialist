export default {
  id: "Quarry",
  category: "Extractors",
  tier: 2,
  cost: 1500,
  base: {
    height: 48,
    offset: {
      y: -4,
      x: 21.999998092651367
    },
    width: 48
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -2.5894775390625,
        x: -1.2135009765625
      },
      gameOffset: {
        y: 6.763126373291016,
        x: -1.2135009765625,
        z: -2.5894775390625
      }
    },
    {
      name: "InFluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -0.99444580078125,
        x: -0.6644287109375
      },
      gameOffset: {
        y: 1.2800321578979492,
        x: -0.6644287109375,
        z: -0.99444580078125
      },
      tip: "Optional Water input for speed boost"
    },
    {
      name: "Out1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: 1.01373291015625,
        x: -0.914794921875
      },
      gameOffset: {
        y: 1.3899908065795898,
        x: -0.914794921875,
        z: 1.01373291015625
      },
      tip: "Output for Soil/Sand/Limestone"
    },
    {
      name: "Out2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: 3.01373291015625,
        x: -0.914794921875
      },
      gameOffset: {
        y: 1.389998435974121,
        x: -0.914794921875,
        z: 3.01373291015625
      },
      tip: "Output for Clay"
    }
  ],
  data: {
    Progress: 0,
    Mode: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\ngame:GetService(\"TweenService\");\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal ModelData = script.Parent.ModelData;\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InFluidMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal State = script.Parent.State;\nlocal v6 = {};\nlocal RotatingBody = script.Parent.RotatingBody;\nlocal Arm = RotatingBody.Arm;\nlocal BucketWheel = Arm.BucketWheel;\nlocal u7 = RotatingBody:GetPivot();\nlocal u8 = ModelTweenUtils.new(RotatingBody);\nlocal Limestone = script.Parent.Limestone;\nlocal Position = Limestone.Position;\n\nfunction v6.localStart() -- Line: 37\nend;\n\nlocal u9 = 0;\nlocal u10 = false;\nlocal u11 = {\n    {\n        Color3.fromRGB(100, 77, 60),\n        Enum.Material.Mud,\n        { \"Soil\", 3 },\n        { \"Clay\", 3 }\n    },\n    {\n        Color3.fromRGB(143, 126, 95),\n        Enum.Material.Sand,\n        { \"Sand\", 3 },\n        nil\n    },\n    {\n        Color3.fromRGB(206, 173, 148),\n        Enum.Material.Limestone,\n        { \"Limestone\", 3 }\n    }\n};\nlocal u12 = 0;\n\nfunction v6.localUpdate() -- Line: 52\n    -- upvalues: State (copy), Arm (copy), u10 (ref), BucketWheel (copy), u12 (ref), ModelData (copy), Limestone (copy), Position (copy), u8 (copy), u7 (copy), u9 (ref), RotatingBody (copy)\n    if State.Value == \"\" then\n        Arm.Arm.Particles2.ParticleEmitter.Enabled = false;\n        Arm.Arm.Beam.TextureSpeed = 0;\n        script.Parent.Base.EngineIdle:Stop();\n        u10 = false;\n\n        return;\n    end;\n\n    if u10 == false then\n        u10 = true;\n        script.Parent.Base.EngineIdle:Play();\n        task.spawn(function() -- Line: 66\n            -- upvalues: u10 (ref), BucketWheel (ref), u12 (ref), ModelData (ref), Limestone (ref), Position (ref)\n            while u10 do\n                task.wait(0.04);\n                BucketWheel:PivotTo(BucketWheel:GetPivot() * CFrame.Angles(0, 0, -0.031415926535897934));\n\n                if u12 % 25 == 0 then\n                    BucketWheel.Dirt:PivotTo(BucketWheel.Dirt:GetPivot() * CFrame.Angles(0, 0, 0.7853981633974483));\n                end;\n\n                u12 = u12 + 1;\n\n                if ModelData.Progress.Value < 1 then\n                    Limestone.Position = Position + Vector3.new(0, 4.48 * ModelData.Progress.Value, 0);\n                end;\n            end;\n        end);\n    end;\n\n    local v13 = math.random(-45, 45);\n    u8:newTween(TweenInfo.new(5, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut), u7 * CFrame.Angles(0, math.rad(v13), 0)):Play();\n    Arm.Arm.Particles2.ParticleEmitter.Enabled = false;\n    Arm.Arm.Beam.TextureSpeed = 0;\n    script.Parent.Base.Hydraulic:Play();\n    local v14 = (10 - u9) / 40;\n\n    for _ = 1, 40 do\n        u9 = u9 + v14;\n        Arm:PivotTo(RotatingBody.ReferencePivot:GetPivot() * CFrame.Angles(math.rad(u9), 0, 0));\n        task.wait(0.05);\n    end;\n\n    script.Parent.Base.AirBurst:Play();\n    task.wait(1);\n    local v15 = (15 - ModelData.Progress.Value * 5) / 40;\n    script.Parent.Base.Hydraulic2:Play();\n\n    for _ = 1, 40 do\n        u9 = u9 + v15;\n        Arm:PivotTo(RotatingBody.ReferencePivot:GetPivot() * CFrame.Angles(math.rad(u9), 0, 0));\n        task.wait(0.05);\n    end;\n\n    script.Parent.Base.AirBurst:Play();\n    Arm.Arm.Particles2.ParticleEmitter.Enabled = true;\n    Arm.Arm.Beam.TextureSpeed = 1;\n    Arm.Arm[\"electric-mining-drill-mk2\"]:Play();\n    local v16 = math.random(0, 1);\n    u8:newTween(TweenInfo.new(15, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut), u7 * CFrame.Angles(0, math.rad(v13 + 20 * (v16 == 0 and -1 or v16)), 0)):Play();\nend;\n\nif game.Players.LocalPlayer == nil then\n    local Screen = script.Parent.Screen;\n\n    local function selected() -- Line: 126\n        -- upvalues: Screen (copy), u11 (copy), ModelData (copy), BucketWheel (copy), Arm (copy), Limestone (copy), Position (copy)\n        Screen.Transparency = 1;\n        Screen.UI.Enabled = false;\n        local v17 = u11[ModelData.Mode.Value][1];\n        BucketWheel.Dirt.Color = v17;\n        Arm.Arm.Particles2.ParticleEmitter.Color = ColorSequence.new(v17:Lerp(Color3.fromRGB(0, 0, 0), 0.1), v17:Lerp(Color3.fromRGB(255, 255, 255), 0.1));\n        Arm.Arm.Beam.Color = ColorSequence.new(v17);\n        Limestone.Color = v17;\n        Limestone.Material = u11[ModelData.Mode.Value][2];\n\n        if ModelData.Progress.Value == 1 then\n            Limestone.Position = Position + Vector3.new(0, 4.48, 0);\n        end;\n    end;\n\n    if ModelData.Mode.Value == 0 then\n        Screen.Transparency = 0;\n        Screen.UI.Enabled = true;\n        Screen.UI.Frame.Buttons.Soil.MouseButton1Click:Connect(function() -- Line: 149\n            -- upvalues: ModelData (copy), selected (copy)\n            ModelData.Mode.Value = 1;\n            selected();\n        end);\n        Screen.UI.Frame.Buttons.Sand.MouseButton1Click:Connect(function() -- Line: 153\n            -- upvalues: ModelData (copy), selected (copy)\n            ModelData.Mode.Value = 2;\n            selected();\n        end);\n        Screen.UI.Frame.Buttons.Limestone.MouseButton1Click:Connect(function() -- Line: 157\n            -- upvalues: ModelData (copy), selected (copy)\n            ModelData.Mode.Value = 3;\n            selected();\n        end);\n    else\n        selected();\n    end;\nend;\n\nlocal u18 = 0;\nlocal u19 = 0;\n\nfunction v6.tick() -- Line: 168\n    -- upvalues: ModelData (copy), u1 (copy), u2 (copy), State (copy), u19 (ref), u4 (copy), u5 (copy), u11 (copy), u18 (ref), Pollution (copy), u3 (copy)\n    if ModelData.Mode.Value == 0 then\n        return;\n    end;\n\n    if u1:tickIsBusy() then\n        return;\n    end;\n\n    if not u2:hasPower(1000000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u19 = ModelData.Mode.Value;\n\n    if not u4:canHoldXMore(60) and (not u5:canHoldXMoreOf(60) or u11[u19][4] == nil) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u18 = u18 + 1;\n    u2:removePower(1000000);\n\n    if ModelData.Progress.Value < 1 then\n        State.Value = u18;\n        u1:nextTicks(20, function(p20) -- Line: 189\n            -- upvalues: ModelData (ref)\n            ModelData.Progress.Value = math.clamp(ModelData.Progress.Value + 0.01, 0, 1);\n        end);\n\n        return;\n    end;\n\n    State.Value = u18;\n    u1:nextTicks(20, function(p21) -- Line: 194\n        -- upvalues: Pollution (ref), u3 (ref), u4 (ref), u11 (ref), u19 (ref), u5 (ref)\n        local v22 = Pollution;\n        v22.Value = v22.Value + 70;\n        local v23;\n\n        if u3:hasAmountOf(\"Water\", 12) then\n            u3:removeItem(12);\n            v23 = 2;\n        else\n            v23 = 1;\n        end;\n\n        u4:addItemAmount(u11[u19][3][1], u11[u19][3][2] * v23);\n\n        if u11[u19][4] ~= nil then\n            u5:addItemAmount(u11[u19][4][1], u11[u19][4][2] * v23);\n        end;\n    end);\nend;\n\nreturn v6;"
};
