export default {
  id: "Press",
  category: "Factories",
  cost: 409,
  base: {
    height: 8,
    offset: {
      y: 1.9999847412109375,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 3.9769668579101562,
        x: -2
      },
      gameOffset: {
        y: 0.9249992370605469,
        x: -2,
        z: 3.9769668579101562
      },
      tip: "Output for metal plates"
    },
    {
      name: "InputMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -0.0100250244140625,
        x: -1.99993896484375
      },
      gameOffset: {
        y: 0.9249992370605469,
        x: -1.99993896484375,
        z: -0.0100250244140625
      },
      tip: "Input for metal ingots"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 250000,
      transferAmount: 0,
      siteOffset: {
        y: -0.7257232666015625,
        x: -0.81903076171875
      },
      gameOffset: {
        y: 2.100818634033203,
        x: -0.81903076171875,
        z: -0.7257232666015625
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nrequire(ReplicatedStorage.Modules.Recipes);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InputMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Piston = script.Parent.Piston;\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u4 = TweenService:Create(Piston, TweenInfo.new(1, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Vector3.new(Piston.Position.X, Piston.Position.Y, Piston.Position.Z)\n});\nlocal u5 = TweenService:Create(Piston, TweenInfo.new(0.5, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), {\n    Position = Vector3.new(Piston.Position.X, Piston.Position.Y - 0.85, Piston.Position.Z)\n});\nlocal u6 = { { { \"Copper Ingot\", 1 }, { \"Copper Plate\", 1 }, 4000 }, { { \"Iron Ingot\", 1 }, { \"Iron Plate\", 1 }, 8000 }, { { \"Iron Plate\", 1 }, { \"Iron Plate²\", 0.25 }, 25000 }, { { \"Planks\", 1 }, { \"Plank²\", 0.25 }, 25000 }, { { \"Steel Ingot\", 1 }, { \"Steel Plate\", 1 }, 50000 } };\nlocal v7 = {};\nlocal State = script.Parent.State;\n\nfunction v7.localUpdate() -- Line: 54\n    -- upvalues: State (copy), u5 (copy), Piston (copy), u4 (copy)\n    if State.Value == \"1\" then\n        u5:Play();\n        task.wait(0.4);\n        Piston.Anvil:Play();\n        task.wait(2);\n        Piston.Retract:Play();\n        u4:Play();\n    end;\nend;\n\nlocal u8 = require(game.ReplicatedStorage.Modules.NextTicks).new();\nlocal Speed = script.Parent.Upgrades.Speed;\nlocal Power = script.Parent.Upgrades.Power;\n\nfunction v7.tick() -- Line: 70\n    -- upvalues: u8 (copy), u6 (copy), Speed (copy), u2 (copy), u1 (copy), u3 (copy), Power (copy), State (copy)\n    if u8:tickIsBusy() then\n        return;\n    end;\n\n    for _, v in pairs(u6) do\n        local Value = Speed.Value;\n\n        if u2:hasAmountOf(v[1][1], v[1][2] * Value) and (u1:canHoldXMoreOf(v[2][1], v[2][2] * Value) and u3:hasPower(v[3] * Value / Power.Value)) then\n            u2:removeItem(v[1][2] * Value);\n            u3:removePower(v[3] * Value / Power.Value);\n            State.Value = \"1\";\n            u8:nextTicks(4, function(p9) -- Line: 82\n                -- upvalues: State (ref), u1 (ref), v (copy), Value (copy)\n                if p9 == 1 then\n                    State.Value = \"0\";\n                    u1:addItemAmount(v[2][1], v[2][2] * Value);\n                end;\n            end);\n        end;\n    end;\nend;\n\nreturn v7;"
};
