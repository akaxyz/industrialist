export default {
  id: "AdvancedPresentPackingMachine",
  category: "Factories",
  cost: 7500,
  base: {
    height: 40,
    offset: {
      y: 2,
      x: -10
    },
    width: 24
  },
  nodes: [
    {
      name: "LiquidPipeIn",
      kind: "fluid",
      direction: "input",
      maxAmount: 30,
      transferAmount: 1,
      siteOffset: {
        y: 6.9913330078125,
        x: 1.854583740234375
      },
      gameOffset: {
        y: 2.103188991546631,
        x: 1.854583740234375,
        z: 6.9913330078125
      },
      tip: "Input for machine oil [Optional]"
    },
    {
      name: "ItemPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 3,
      transferAmount: 1,
      siteOffset: {
        y: -1.0140380859375,
        x: 1.854583740234375
      },
      gameOffset: {
        y: 2.103188991546631,
        x: 1.854583740234375,
        z: -1.0140380859375
      },
      tip: "Any item, the higher the sell price the more snowflakes gained"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 300000,
      transferAmount: 0,
      siteOffset: {
        y: 19.93487548828125,
        x: -20.857208251953125
      },
      gameOffset: {
        y: 8.873600006103516,
        x: -20.857208251953125,
        z: 19.93487548828125
      }
    },
    {
      name: "BoxPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -3.0140380859375,
        x: 1.854583740234375
      },
      gameOffset: {
        y: 2.103188991546631,
        x: 1.854583740234375,
        z: -3.0140380859375
      },
      tip: "Presents box in"
    }
  ],
  data: [],
  updateEvery: 15,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal v1 = {};\nlocal TweenService = game:GetService(\"TweenService\");\nlocal State = script.Parent.State;\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u2 = {};\nlocal u3 = 0;\nlocal PresentBox = script.Parent.PresentBox;\nlocal PresentMoving = script.Parent.PresentMoving;\nlocal u4 = tick();\n\nlocal function spawnPresent(p5) -- Line: 20\n    -- upvalues: u3 (ref), u2 (copy), PresentBox (copy), PresentMoving (copy), ModelTweenUtils (copy), TweenService (copy), u4 (ref)\n    if u3 == 0 then\n        script.Parent.Base.Conveyor:Play();\n    end;\n\n    u3 = u3 + 1;\n    local v6 = u2[1];\n\n    if v6 == nil then\n        v6 = PresentBox:Clone();\n        v6.Parent = script.Parent;\n    else\n        table.remove(u2, 1);\n    end;\n\n    local v7 = BrickColor.random();\n    local v8 = BrickColor.random();\n\n    if p5 == true then\n        v8 = BrickColor.new(\"Ghost grey\");\n    end;\n\n    for _, child in pairs(v6.Ribbons:GetChildren()) do\n        child.Transparency = 1;\n        child.BrickColor = v8;\n    end;\n\n    v6.Box.BrickColor = BrickColor.new(\"White\");\n    v6.Lid.BrickColor = BrickColor.new(\"White\");\n    v6:PivotTo(PresentMoving.Start.CFrame);\n    local v9 = ModelTweenUtils.new(v6);\n    v9:newTween(TweenInfo.new(5 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.Junction.CFrame):Play();\n    task.wait(5.2 / script.Parent.Speed.Value);\n    v6.Box.BrickColor = v7;\n    v6.Lid.BrickColor = v7;\n\n    if p5 then\n        v9:newTween(TweenInfo.new(10 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.IncineratorTurn.CFrame):Play();\n        task.wait(10.1 / script.Parent.Speed.Value);\n\n        for _, child in pairs(v6.Ribbons:GetChildren()) do\n            child.Transparency = 0;\n        end;\n\n        v9:newTween(TweenInfo.new(10 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.Incinerator.CFrame):Play();\n        task.wait(8 / script.Parent.Speed.Value);\n        script.Parent.Fire.Color = script.Parent.Fire.Color:Lerp(Color3.fromRGB(75, 40, 21), 0.5);\n        TweenService:Create(script.Parent.Fire, TweenInfo.new(2 / script.Parent.Speed.Value, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 0, true), {\n            Color = Color3.fromRGB(209, 111, 58)\n        }):Play();\n        task.wait(1.6 / script.Parent.Speed.Value);\n        local v10 = tick();\n        u4 = v10;\n        script.Parent.Fire.Explosion:Play();\n        script.Parent.Fire.Attachment.ParticleEmitter.Rate = 30 * script.Parent.Speed.Value;\n        script.Parent.Fire.Attachment.ParticleEmitter.Enabled = true;\n        task.wait(1 / script.Parent.Speed.Value);\n\n        if u4 == v10 then\n            script.Parent.Fire.Attachment.ParticleEmitter.Enabled = false;\n        end;\n    else\n        v9:newTween(TweenInfo.new(2 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.NorthPole.CFrame):Play();\n        task.wait(2 / script.Parent.Speed.Value);\n        v9:newTween(TweenInfo.new(1 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.NorthPole2.CFrame):Play();\n        task.wait(1 / script.Parent.Speed.Value);\n        v9:newTween(TweenInfo.new(7 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.NorthPoleTurn.CFrame):Play();\n        task.wait(7.1 / script.Parent.Speed.Value);\n        v9:PivotTo(PresentMoving.NorthPoleTurnExit.CFrame);\n\n        for _, child in pairs(v6.Ribbons:GetChildren()) do\n            child.Transparency = 0;\n        end;\n\n        task.wait(0.2 / script.Parent.Speed.Value);\n        v9:newTween(TweenInfo.new(8 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.NorthPoleTop.CFrame):Play();\n        task.wait(8 / script.Parent.Speed.Value);\n        v9:newTween(TweenInfo.new(0.8 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.NorthPoleTopFlat.CFrame):Play();\n        task.wait(0.8 / script.Parent.Speed.Value);\n        v9:newTween(TweenInfo.new(2.6 / script.Parent.Speed.Value, Enum.EasingStyle.Linear), PresentMoving.NorthPoleGoal.CFrame):Play();\n        task.wait(1.6 / script.Parent.Speed.Value);\n        script.Parent.NorthPole.Color = script.Parent.NorthPole.Color:Lerp(Color3.fromRGB(32, 43, 57), 0.5);\n        TweenService:Create(script.Parent.NorthPole, TweenInfo.new(2 / script.Parent.Speed.Value, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 0, true), {\n            Color = Color3.fromRGB(102, 137, 181)\n        }):Play();\n        task.wait(1 / script.Parent.Speed.Value);\n        script.Parent.NorthPole.confirm_fixed:Play();\n    end;\n\n    u3 = u3 - 1;\n\n    if u3 == 0 then\n        script.Parent.Base.Conveyor:Stop();\n    end;\n\n    v9:dispose();\n    table.insert(u2, v6);\nend;\n\nfunction v1.localUpdate() -- Line: 114\n    -- upvalues: State (copy), spawnPresent (copy)\n    if State.Value == \"1\" then\n        spawnPresent(false);\n\n        return;\n    end;\n\n    if State.Value == \"-1\" then\n        spawnPresent(true);\n    end;\nend;\n\nlocal u11 = PipeUtilsV2.loadConnector(script.Parent.ItemPipeIn);\nlocal u12 = PipeUtilsV2.loadConnector(script.Parent.BoxPipeIn);\nlocal u13 = PipeUtilsV2.loadConnector(script.Parent.LiquidPipeIn);\nlocal u14 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Items = require(game.ReplicatedStorage.Modules.Enums.Items);\nlocal u15 = 0;\nlocal u16 = {};\n\nfunction v1.tick() -- Line: 133\n    -- upvalues: u16 (copy), u15 (ref), u11 (copy), u12 (copy), u14 (copy), Items (copy), u13 (copy)\n    for i, v in ipairs(u16) do\n        if tick() > v[1] then\n            table.remove(u16, i);\n            break;\n        end;\n    end;\n\n    script.Parent.State.Value = \"\";\n    u15 = u15 + script.Parent.Speed.Value;\n\n    if u11:getBuffer() == 0 then\n        u11:setItem(0, \"\");\n    end;\n\n    if u15 >= 8 then\n        if not u12:hasAmountOf(\"Present Box\", 1) then\n            return;\n        end;\n\n        if u11:getBuffer() < 1 then\n            return;\n        end;\n\n        if not u14:hasPower(100000) then\n            return;\n        end;\n\n        local v17 = u11:getItem();\n        local v18 = Items.findItemByDisplayName(v17).Price * 2.9;\n        local v19 = math.log10(v18);\n        local v20 = 20 - math.clamp(v19, 1, (1 / 0)) ^ 2;\n        local v21 = math.clamp(v20, 0, 100);\n        local v22, v23;\n\n        if u13:hasAmountOf(\"Machine Oil\", 2) then\n            v22 = 2;\n            v23 = 2;\n        else\n            v22 = 0;\n            v23 = 1;\n        end;\n\n        u13:removeItem(v22);\n        script.Parent.Speed.Value = v23;\n        u15 = 0;\n        u14:removePower(100000);\n        u12:removeItem(1);\n        u11:removeItem(1);\n\n        if math.random(0, 10000) / 100 < v21 then\n            script.Parent.State.Value = \"-1\";\n\n            return;\n        end;\n\n        script.Parent.State.Value = \"1\";\n        local v24 = { tick() + 20 / v23, 3 * v18 ^ 0.2 };\n        table.insert(u16, v24);\n    end;\nend;\n\nreturn v1;"
};
