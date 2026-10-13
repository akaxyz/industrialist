export default {
  id: "BottlingPlant",
  category: "Factories",
  tier: 3,
  cost: 100000,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 50,
      transferAmount: 10,
      siteOffset: {
        y: 0.983245849609375,
        x: -1.70001220703125
      },
      gameOffset: {
        y: 1.6697998046875,
        x: -1.70001220703125,
        z: 0.983245849609375
      },
      tip: "Input for plastic bottles"
    },
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.01678466796875,
        x: 13.600006103515625
      },
      gameOffset: {
        y: 1.6697998046875,
        x: 13.600006103515625,
        z: 1.01678466796875
      },
      tip: "Water bottle output"
    },
    {
      name: "WaterInPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 50,
      transferAmount: 10,
      siteOffset: {
        y: 5.007476806640625,
        x: -1.857025146484375
      },
      gameOffset: {
        y: 2.1135501861572266,
        x: -1.857025146484375,
        z: 5.007476806640625
      },
      tip: "Input for REFINED WATER ONLY"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 9.385162353515625,
        x: 12.375518798828125
      },
      gameOffset: {
        y: 9.604350090026855,
        x: 12.375518798828125,
        z: 9.385162353515625
      }
    }
  ],
  data: [],
  updateEvery: 15,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.WaterInPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal v5 = {};\nlocal State = script.Parent.State;\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u6 = ModelTweenUtils.new(script.Parent.FirstStage);\nlocal u7 = ModelTweenUtils.new(script.Parent.SecondStage);\nlocal u8 = u6:GetPivot();\nlocal u9 = u7:GetPivot();\nlocal u10 = script.Parent.EndGoal:GetPivot();\n\nfunction v5.localUpdate() -- Line: 23\n    -- upvalues: State (copy), u6 (copy), u9 (copy), u8 (copy), u7 (copy), u10 (copy)\n    if State.Value == \"1\" then\n        script.Parent.Sound.Conveyor:Play();\n        u6:newTween(TweenInfo.new(1.5), u9):Play();\n        task.wait(1.5);\n        script.Parent.Sound.Water:Play();\n        task.wait(0.2);\n        script.Parent.Particles.ParticleEmitter:Emit(12);\n        task.wait(0.2);\n        u6:PivotTo(u8);\n        u7:newTween(TweenInfo.new(1.5), u10):Play();\n        task.wait(1.5);\n        u7:PivotTo(u9);\n        script.Parent.Sound.Conveyor:Stop();\n    end;\nend;\n\nlocal _ = game.ReplicatedStorage.Pollution;\nlocal u11 = {\n    [\"Filtered Water\"] = {\n        Amount = 8,\n        Make = { \"Water Bottle\", 1 },\n        PowerNeed = 100000\n    },\n    Residue = {\n        Amount = 8,\n        Make = { \"Residue Bottle\", 1 },\n        PowerNeed = 100000,\n        Badge = 2153448888\n    },\n    Water = {\n        Amount = 8,\n        Make = { \"Cheap Water Bottle\", 1 },\n        PowerNeed = 100000\n    },\n    [\"Refined Diesel\"] = {\n        Amount = 8,\n        Make = { \"Refined Diesel Bottle\", 1 },\n        PowerNeed = 100000\n    },\n    [\"Crude Oil\"] = {\n        Amount = 8,\n        Make = { \"Oil Bottle\", 1 },\n        PowerNeed = 100000\n    }\n};\nlocal u12 = require(game.ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v5.tick() -- Line: 78\n    -- upvalues: u12 (copy), u3 (copy), u1 (copy), u2 (copy), u11 (copy), u4 (copy), Achievements (copy), State (copy)\n    if u12:tickIsBusy() then\n        return;\n    end;\n\n    if not u3:canHoldXMore(1) then\n        return;\n    end;\n\n    if not u1:hasAmountOf(\"Plastic Bottle\", 1) then\n        return;\n    end;\n\n    local v13 = u2:getBuffer();\n    local v14 = u2:getItem();\n\n    for i, v in pairs(u11) do\n        if i == v14 then\n            if v13 < v.Amount then\n                return;\n            end;\n\n            if not u4:hasPower(v.PowerNeed) then\n                return;\n            end;\n\n            u4:removePower(v.PowerNeed);\n            u2:removeItem(v.Amount);\n            u1:removeItem(1);\n\n            if v.Badge ~= nil then\n                Achievements.giveBadge(v.Badge);\n            end;\n\n            State.Value = \"1\";\n            u12:nextTicks(7, function(p15) -- Line: 98\n                -- upvalues: u3 (ref), v (copy), State (ref)\n                if p15 == 1 then\n                    u3:addItemAmount(v.Make[1], v.Make[2]);\n                    State.Value = \"\";\n                end;\n            end);\n        end;\n    end;\nend;\n\nreturn v5;"
};
