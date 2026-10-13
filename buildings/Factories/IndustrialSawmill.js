export default {
  id: "IndustrialSawmill",
  category: "Factories",
  tier: 3,
  cost: 75000,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: -4
    },
    width: 28
  },
  nodes: [
    {
      name: "LiquidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 400,
      transferAmount: 20,
      siteOffset: {
        y: 0.44769287109375,
        x: 5.01007080078125
      },
      gameOffset: {
        y: 2.0320658683776855,
        x: 5.01007080078125,
        z: 0.44769287109375
      },
      tip: "Input for Steam"
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: 1.145751953125,
        x: -5.0399169921875
      },
      gameOffset: {
        y: 1.8847804069519043,
        x: -5.0399169921875,
        z: 1.145751953125
      },
      tip: "Input for Oak Log/Half Cut Oak Log/Chunk Plank"
    },
    {
      name: "OutItemMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: -7,
        x: -17.57952880859375
      },
      gameOffset: {
        y: 1.625,
        x: -17.57952880859375,
        z: -7
      },
      tip: "Outputs \"more cut\" version of wood, all the way up to planks"
    }
  ],
  data: [],
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal ModelTweenUtils = require(ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.LiquidInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutItemMainPipe);\nlocal u4 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal v5 = {};\nlocal u6 = 0;\nlocal u7 = ModelTweenUtils.new(script.Parent.Crankshaft);\nlocal u8 = u7:GetPivot();\nModelTweenUtils.new(script.Parent.Sawmill):GetPivot();\nlocal u9 = ModelTweenUtils.new(script.Parent.Sawmill);\nlocal u10 = u9:GetPivot();\nlocal u11 = ModelTweenUtils.new(script.Parent.Piston);\nlocal u12 = u11:GetPivot();\nlocal u13 = false;\nlocal State = script.Parent.State;\n\nfunction v5.localUpdate() -- Line: 32\n    -- upvalues: State (copy), u13 (ref), u7 (copy), u8 (copy), u9 (copy), u10 (copy), u11 (copy), u12 (copy)\n    if State.Value == \"\" then\n        if State.Value == \"\" then\n            u13 = false;\n        end;\n\n        return;\n    end;\n\n    for _, child in pairs(script.Parent.Piston.Models:GetChildren()) do\n        if child.Name == State.Value then\n            for _, child2 in pairs(child:GetChildren()) do\n                child2.Transparency = 0;\n            end;\n        else\n            for _, child2 in pairs(child:GetChildren()) do\n                child2.Transparency = 1;\n            end;\n        end;\n    end;\n\n    u13 = true;\n    local u14 = 1;\n    local u15 = 0;\n    local u16 = tick();\n    task.spawn(function() -- Line: 53\n        -- upvalues: u13 (ref), u15 (ref), u14 (ref), u7 (ref), u8 (ref), u9 (ref), u10 (ref), u16 (copy)\n        while task.wait(0.03333333333333333) and u13 do\n            u15 = u15 + u14 / 30 * 360;\n            u7:PivotTo(u8 * CFrame.Angles(math.rad(u15), 0, 0));\n            u9:PivotTo(u10 * CFrame.Angles(math.rad(u15), 0, 0));\n\n            if tick() - u16 < 5.6 then\n                u14 = math.clamp(u14 * 1.1, 0, 100);\n            else\n                u14 = math.clamp(u14 / 1.2, 0, 100);\n            end;\n        end;\n    end);\n    task.wait(1);\n    u11:newTween(TweenInfo.new(4), u12 - u11:GetPivot().RightVector * 3):Play();\n    task.wait(0.1);\n    script.Parent.TurbineSteamVent.Attachment.ParticleEmitter.Enabled = true;\n    script.Parent.Base[\"Medium Pressure Air Release 4 (SFX)\"]:Play();\n    task.wait(3.5);\n    script.Parent.TurbineSteamVent.Attachment.ParticleEmitter.Enabled = false;\n    task.wait(1);\n\n    for _, child in pairs(script.Parent.Piston.Models:GetChildren()) do\n        for _, child2 in pairs(child:GetChildren()) do\n            child2.Transparency = 1;\n        end;\n    end;\n\n    u11:newTween(TweenInfo.new(4), u12):Play();\n    script.Parent.Base[\"Idle steam loop\"]:Play();\n    script.Parent.PistonSteamVent.Attachment.ParticleEmitter.Enabled = true;\n    task.wait(4);\n    script.Parent.Base[\"Idle steam loop\"]:Stop();\n    script.Parent.PistonSteamVent.Attachment.ParticleEmitter.Enabled = false;\nend;\n\nlocal u17 = script.Parent.Base[\"Turbine [fixed?]\"];\nlocal u18 = { { { \"Oak Log\", 8 }, { \"Cut Oak Log\", 16 } }, { { \"Cut Oak Log\", 8 }, { \"Chunk Plank\", 8 } }, { { \"Chunk Plank\", 8 }, { \"Planks\", 24 } }, { { \"Iron Ingot\", 3 }, { \"Iron Plate\", 12 } } };\n\nfunction v5.tick() -- Line: 113\n    -- upvalues: u6 (ref), u17 (copy), u2 (copy), u4 (copy), u18 (copy), u1 (copy), u3 (copy), State (copy)\n    if u6 > 1 and script.Parent.Base[\"Turbine [fixed?]\"].Playing == false then\n        u17:Play();\n    elseif u6 < 1 and script.Parent.Base[\"Turbine [fixed?]\"].Playing == true then\n        u17:Stop();\n    end;\n\n    if u6 < 3600 then\n        local v19 = math.clamp(3600 - u6, 0, 100);\n\n        if u2:hasAmountOf(\"Steam\", v19 * 0.1) then\n            u2:removeItem(v19 * 0.1);\n            u6 = u6 + v19;\n        end;\n    end;\n\n    u6 = math.clamp(u6 - 10, 0, 3600);\n\n    if u6 > 1 then\n        u17.Pitch = u6 / 3600 * 0.4;\n        u17.Volume = math.clamp(u6 / 3600, 0, 0.2);\n    end;\n\n    if u4:tickIsBusy() then\n        return;\n    end;\n\n    if u6 > 3500 then\n        for _, v in pairs(u18) do\n            if u1:hasAmountOf(v[1][1], v[1][2]) and u3:canHoldXMoreOf(v[2][1], v[2][2]) then\n                u1:removeItem(v[1][2]);\n                State.Value = v[1][1];\n                u4:nextTicks(60, function(p20) -- Line: 143\n                    -- upvalues: u6 (ref), u3 (ref), v (copy), State (ref)\n                    u6 = u6 - 40;\n\n                    if p20 == 1 then\n                        u3:addItemAmount(v[2][1], v[2][2]);\n                        State.Value = \"\";\n                    end;\n                end);\n            end;\n        end;\n    end;\nend;\n\nreturn v5;"
};
