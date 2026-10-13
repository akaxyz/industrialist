export default {
  id: "PressMK2",
  category: "Factories",
  tier: 3,
  cost: 333333,
  base: {
    height: 30,
    offset: {
      y: -13,
      x: 8
    },
    width: 20
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 5000000,
      transferAmount: 0,
      siteOffset: {
        y: -11.5811767578125,
        x: -0.01788330078125
      },
      gameOffset: {
        y: 6.989741802215576,
        x: -0.01788330078125,
        z: -11.5811767578125
      }
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 1.67498779296875,
        x: 3
      },
      gameOffset: {
        y: 1.5250005722045898,
        x: 3,
        z: 1.67498779296875
      }
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: -27.675048828125,
        x: 3
      },
      gameOffset: {
        y: 1.5250005722045898,
        x: 3,
        z: -27.675048828125
      }
    }
  ],
  data: [],
  updateEvery: 15,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\ngame:GetService(\"TweenService\");\nlocal State = script.Parent.State;\nlocal u5 = script.Parent[\"Hammer one\"];\nlocal u6 = script.Parent[\"Hammer two\"];\nlocal u7 = ModelTweenUtils.new(u5);\nlocal u8 = ModelTweenUtils.new(u6);\nlocal u9 = u5:GetPivot();\nlocal u10 = u6:GetPivot();\nlocal u11 = \"one\";\nlocal v12 = {\n    localUpdate = function() -- Line: 27, Name: localUpdate\n        -- upvalues: State (copy), u11 (ref), u7 (copy), u9 (copy), u5 (copy), u8 (copy), u10 (copy), u6 (copy)\n        if State.Value == \"hit\" then\n            if u11 == \"one\" then\n                u11 = \"two\";\n                u7:newTween(TweenInfo.new(0.5, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), u9 * CFrame.new(0, -2.95, 0)):Play();\n                task.wait(0.5);\n                u5.Primary.Anvil:Play();\n                task.wait(0.5);\n                u5.Primary.Retract:Play();\n                u7:newTween(TweenInfo.new(1, Enum.EasingStyle.Sine), u9):Play();\n\n                return;\n            end;\n\n            if u11 == \"two\" then\n                u11 = \"one\";\n                u8:newTween(TweenInfo.new(0.5, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), u10 * CFrame.new(0, -2.95, 0)):Play();\n                task.wait(0.5);\n                u6.Primary.Anvil:Play();\n                task.wait(0.5);\n                u6.Primary.Retract:Play();\n                u8:newTween(TweenInfo.new(1, Enum.EasingStyle.Sine), u10):Play();\n            end;\n        end;\n    end\n};\nlocal u13 = { { { \"Iron Ingot\", 20 }, { \"Iron Plate\", 20 }, 8, 50000 }, { { \"Steel Ingot\", 20 }, { \"Steel Plate\", 20 }, 8, 75000 }, { { \"Copper Ingot\", 20 }, { \"Copper Plate\", 20 }, 4, 25000 }, { { \"Iron Plate\", 6 }, { \"Iron Plate²\", 3 }, 4, 50000 }, { { \"Powdered Tungsten Carbide\", 3 }, { \"Tungsten Carbide Plate\", 1.5 }, 4, 250000 }, { { \"Steel Plate\", 20 }, { \"Gear\", 20 }, 4, 75000 } };\n\nfunction v12.tick() -- Line: 87\n    -- upvalues: u4 (copy), u13 (copy), u1 (copy), u2 (copy), u3 (copy), State (copy)\n    if u4:tickIsBusy() then\n        return;\n    end;\n\n    for _, v in pairs(u13) do\n        if u1:hasAmountOf(v[1][1], v[1][2]) and (u2:canHoldXMoreOf(v[2][1], v[2][2]) and u3:hasPower(v[4] * v[3])) then\n            u1:removeItem(v[1][2]);\n            u4:nextTicks(v[3] * 2, function(p14) -- Line: 96\n                -- upvalues: u2 (ref), v (copy), State (ref), u3 (ref)\n                if p14 == 1 then\n                    u2:addItemAmount(v[2][1], v[2][2]);\n                end;\n\n                if p14 % 2 == 0 then\n                    State.Value = \"hit\";\n                else\n                    State.Value = \"\";\n                end;\n\n                u3:removePower(v[4] * 0.5);\n            end);\n            break;\n        end;\n    end;\n\n    State.Value = \"\";\nend;\n\nreturn v12;"
};
