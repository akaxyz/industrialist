export default {
  id: "WaterTreatmentPlant",
  category: "Power",
  tier: 4,
  cost: 700001,
  base: {
    height: 60,
    offset: {
      y: 28,
      x: 0
    },
    width: 60
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 5000000,
      transferAmount: 0,
      siteOffset: {
        y: 21.85003662109375,
        x: 0
      },
      gameOffset: {
        y: 34.80137634277344,
        x: 0,
        z: 21.85003662109375
      }
    },
    {
      name: "LargeInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 2000,
      siteOffset: {
        y: -1.458099365234375,
        x: 0.00006103515625
      },
      gameOffset: {
        y: 4.324867248535156,
        x: 0.00006103515625,
        z: -1.458099365234375
      },
      tip: "Input for normal Water (or Contaminated Water). Reminder that this is a large pipe, you can use the smaller one to the side too."
    },
    {
      name: "LiquidIn1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 300,
      transferAmount: 20,
      siteOffset: {
        y: -1.42333984375,
        x: 3.0001220703125
      },
      gameOffset: {
        y: 1.4469146728515625,
        x: 3.0001220703125,
        z: -1.42333984375
      },
      tip: "Input for Steam (Higher temperature = faster processing speed)"
    },
    {
      name: "LargeOutMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: 57.32275390625,
        x: -0.004764556884765625
      },
      gameOffset: {
        y: 4.39093017578125,
        x: -0.004764556884765625,
        z: 57.32275390625
      }
    },
    {
      name: "LiquidIn2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -1.42333984375,
        x: -2.9998779296875
      },
      gameOffset: {
        y: 1.4469146728515625,
        x: -2.9998779296875,
        z: -1.42333984375
      },
      tip: "Input for Water"
    },
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 57.45733642578125,
        x: -2.9998779296875
      },
      gameOffset: {
        y: 1.4723052978515625,
        x: -2.9998779296875,
        z: 57.45733642578125
      }
    }
  ],
  data: [],
  updateEvery: "30",
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(game.ReplicatedStorage.Modules.NextTicks).new();\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn1MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.LargeInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn2MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.LargeOutMainPipe);\nPipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal Piston1 = script.Parent.Piston1;\nlocal Piston2 = script.Parent.Piston2;\nlocal u6 = Piston1:GetPivot();\nlocal u7 = Piston2:GetPivot();\nlocal u8 = ModelTweenUtils.new(Piston1);\nlocal u9 = ModelTweenUtils.new(Piston2);\nlocal Bubbles1 = script.Parent.Bubbles1;\nlocal Bubbles2 = script.Parent.Bubbles2;\nlocal u10 = TweenInfo.new(2, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);\nlocal v11 = {};\nlocal Base = script.Parent.Base;\nlocal u12 = 0;\n\nlocal function movePiston(p13, p14, p15, p16, p17) -- Line: 38\n    -- upvalues: TweenService (copy), u12 (ref), Base (copy)\n    for _, child in pairs(p15:GetChildren()) do\n        child.Bubbles.Enabled = true;\n        TweenService:Create(child.Bubbles, p16, {\n            Rate = 7\n        }):Play();\n    end;\n\n    script.Parent.Base[\"PistonMove\" .. p17]:Play();\n    script.Parent.Base[\"PistonMove\" .. p17].Pitch = u12 * 1;\n    Base.Ambience.Pitch = u12 * 1;\n    p13:newTween(p16, p14 - p14.RightVector * 2.5):Play();\nend;\n\nlocal function moveBackPiston(p18, p19, p20, p21, p22) -- Line: 52\n    -- upvalues: u12 (ref)\n    for _, child in pairs(p20:GetChildren()) do\n        child.Bubbles.Enabled = false;\n    end;\n\n    script.Parent.Base[\"PistonMove2\" .. p22]:Play();\n    script.Parent.Base[\"PistonMove2\" .. p22].Pitch = u12 * 1;\n    p18:newTween(p21, p19):Play();\nend;\n\nfunction v11.localUpdate() -- Line: 63\n    -- upvalues: State (copy), u12 (ref), Base (copy), u10 (ref), movePiston (copy), u8 (copy), u6 (copy), Bubbles1 (copy), u9 (copy), u7 (copy), Bubbles2 (copy), moveBackPiston (copy)\n    if State.Value == \"\" then\n        u12 = 100000;\n        Base.Ambience:Stop();\n\n        return;\n    end;\n\n    if u12 ~= 0 and u12 ~= 100000 then\n        u12 = tonumber(State.Value);\n\n        return;\n    end;\n\n    u12 = tonumber(State.Value) or 1;\n    Base.Ambience:Play();\n\n    while State.Value ~= \"\" do\n        u10 = TweenInfo.new(1.8 / u12, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);\n        movePiston(u8, u6, Bubbles1, u10, \"1\");\n        task.wait(1 / u12);\n        movePiston(u9, u7, Bubbles2, u10, \"2\");\n        task.wait(1 / u12);\n        moveBackPiston(u8, u6, Bubbles1, u10, \"1\");\n        task.wait(1 / u12);\n        moveBackPiston(u9, u7, Bubbles2, u10, \"2\");\n        task.wait(1 / u12);\n    end;\n\n    u12 = 100000;\nend;\n\nfunction v11.tick() -- Line: 94\n    -- upvalues: u3 (copy), u2 (copy), State (copy), u1 (copy), u4 (copy), u5 (copy)\n    local v23 = u3:getItem();\n    local v24 = u3:getBuffer();\n    local v25 = u2:getItem();\n    local v26 = u2:getBuffer();\n    local v27 = v23 ~= \"Condensate\" and (v23 ~= \"Water\" and v23 ~= \"Contaminated Water\") and 0 or v24;\n    local v28 = v25 ~= \"Condensate\" and (v25 ~= \"Water\" and v25 ~= \"Contaminated Water\") and 0 or v26;\n    local v29;\n\n    if v27 < v28 then\n        v29 = 2;\n    else\n        v28 = v27;\n        v29 = 1;\n    end;\n\n    if v28 == 0 then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v30 = u1:getTemp() * 1.1;\n    local v31 = math.clamp(36000 / v30, 90, 270);\n    local v32 = math.abs(v30);\n    local v33 = math.sqrt(v32) / 10;\n    local v34 = math.clamp(v28, 0, v33 ^ 2 * 16);\n\n    if not u1:hasAmountOf(\"Steam\", v31) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u4:canHoldXMoreOf(\"Distilled Water\", v34) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u5:hasPower(2000000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u5:removePower(2000000);\n    local v35 = math.floor(v33 * 100 + 0.5) / 100;\n    local v36 = tostring(v35);\n\n    if State.Value ~= v36 then\n        State.Value = v36;\n    end;\n\n    if v29 == 1 then\n        u3:removeItem(v34);\n    elseif v29 == 2 then\n        u2:removeItem(v34);\n    end;\n\n    u1:removeItem(v31);\n    u4:setUsedTemperature(v30 * 0.15);\n    u4:addItemAmount(\"Distilled Water\", v34);\nend;\n\nreturn v11;"
};
