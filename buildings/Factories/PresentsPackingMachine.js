export default {
  id: "PresentsPackingMachine",
  category: "Factories",
  tier: 2,
  cost: 10000,
  base: {
    height: 14,
    offset: {
      y: -5,
      x: 7
    },
    width: 18
  },
  nodes: [
    {
      name: "ToyPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.302001953125,
        x: -1.00238037109375
      },
      gameOffset: {
        y: 1.432948112487793,
        x: -1.00238037109375,
        z: 1.302001953125
      },
      tip: "Toy in"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -9.0865478515625,
        x: 12.52587890625
      },
      gameOffset: {
        y: 10.770444869995117,
        x: 12.52587890625,
        z: -9.0865478515625
      }
    },
    {
      name: "PresentPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.302001953125,
        x: 0.99761962890625
      },
      gameOffset: {
        y: 1.432948112487793,
        x: 0.99761962890625,
        z: 1.302001953125
      },
      tip: "Presents box in"
    },
    {
      name: "LiquidPipeIn",
      kind: "fluid",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.37152099609375,
        x: 9
      },
      gameOffset: {
        y: 1.458099365234375,
        x: 9,
        z: 1.37152099609375
      },
      tip: "Water or Machine oil to boost the machines speed"
    },
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -9.01824951171875,
        x: 15.60516357421875
      },
      gameOffset: {
        y: 1.667098045349121,
        x: 15.60516357421875,
        z: -9.01824951171875
      },
      tip: "Presents output"
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.ToyPipeIn);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.PresentPipeIn);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.LiquidPipeIn);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal v6 = {};\nlocal State = script.Parent.State;\nlocal presentbox = script.Parent.presentbox;\nlocal u7 = require(game.ReplicatedStorage.Modules.ModelTweenUtils).new(script.Parent.presentbox);\nlocal u8 = presentbox:GetPivot();\nlocal CFrame = script.Parent.BoxPosition1.CFrame;\nlocal CFrame2 = script.Parent.BoxPosition2.CFrame;\n\nfunction v6.localUpdate() -- Line: 27\n    -- upvalues: State (copy), u7 (copy), CFrame (copy), presentbox (copy), CFrame2 (copy), u8 (copy)\n    if State.Value ~= \"\" then\n        local v9 = tonumber(State.Value);\n        script.Parent.Base.Conveyor:Play();\n        u7:newTween(TweenInfo.new(4 / v9), CFrame):Play();\n        task.wait(4.1 / v9);\n        local v10 = BrickColor.random();\n\n        for _, child in pairs(presentbox.Ribbons:GetChildren()) do\n            child.BrickColor = v10;\n        end;\n\n        task.wait(0.4 / v9);\n        task.wait(0.5 / v9);\n        u7:newTween(TweenInfo.new(4 / v9), CFrame2):Play();\n        task.wait(4.1 / v9);\n        u7:PivotTo(u8);\n\n        for _, child in pairs(presentbox.Ribbons:GetChildren()) do\n            child.BrickColor = BrickColor.White();\n        end;\n\n        local v11 = BrickColor.random();\n        presentbox.Box.BrickColor = v11;\n        presentbox.Lid.BrickColor = v11;\n        script.Parent.Base.Conveyor:Stop();\n    end;\nend;\n\nlocal _ = game.ReplicatedStorage.Pollution;\n\nfunction v6.tick() -- Line: 62\n    -- upvalues: State (copy), u3 (copy), u1 (copy), u5 (copy), u4 (copy), u2 (copy)\n    if State.Value ~= \"\" then\n        return;\n    end;\n\n    local u12 = 1;\n    local v13 = 0;\n\n    if u3:hasAmountOf(\"Filtered Water\", 4) then\n        v13 = 4;\n        u12 = 2;\n    elseif u3:hasAmountOf(\"Machine Oil\", 0.1) then\n        v13 = 0.1;\n        u12 = 8;\n    elseif u3:hasAmountOf(\"Water\", 4) then\n        v13 = 4;\n        u12 = 1.5;\n    end;\n\n    if not (u1:hasAmountOf(\"Toy\", 1) and (u5:hasPower(100000) and (u4:canHoldXMoreOf(\"Packed Present\", 1) and u2:hasAmountOf(\"Present Box\", 1)))) then\n        return;\n    end;\n\n    u1:removeItem(1);\n    u3:removeItem(v13);\n    u2:removeItem(1);\n    task.spawn(function() -- Line: 83\n        -- upvalues: State (ref), u12 (ref), u5 (ref), u4 (ref)\n        State.Value = tostring(u12);\n        u5:removePower(100000);\n        task.wait(11 / u12);\n        u4:addItemAmount(\"Packed Present\", 1);\n        State.Value = \"\";\n    end);\nend;\n\nreturn v6;"
};
