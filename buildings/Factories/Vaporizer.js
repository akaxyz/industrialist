export default {
  id: "Vaporizer",
  category: "Factories",
  tier: 3,
  cost: 10000,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 240,
      transferAmount: 20,
      siteOffset: {
        y: 11.02142333984375,
        x: 1.47509765625
      },
      gameOffset: {
        y: 1.4047832489013672,
        x: 1.47509765625,
        z: 11.02142333984375
      }
    },
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 1.021240234375,
        x: 1.474853515625
      },
      gameOffset: {
        y: 1.4047470092773438,
        x: 1.474853515625,
        z: 1.021240234375
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 100000,
      transferAmount: 0,
      siteOffset: {
        y: 9.35723876953125,
        x: -9.120240211486816
      },
      gameOffset: {
        y: 5.521745681762695,
        x: -9.120240211486816,
        z: 9.35723876953125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal _ = ReplicatedStorage.Pollution;\nlocal State = script.Parent.State;\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal Base = script.Parent.Base;\n\nreturn {\n    localUpdate = function() -- Line: 20, Name: localUpdate\n        -- upvalues: State (copy), Base (copy)\n        if State.Value == \"1\" then\n            if Base.fan.Playing == false then\n                Base.fan:Play();\n            end;\n        elseif Base.fan.Playing == true then\n            Base.fan:Stop();\n        end;\n    end,\n\n    tick = function() -- Line: 32, Name: tick\n        -- upvalues: u1 (copy), State (copy), u2 (copy), u3 (copy)\n        if not u1:hasPower(15000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if u2:hasAmountOf(\"Liquid Nitrogen\", 4) and u3:canHoldXMoreOf(\"Nitrogen\", 120) then\n            u2:removeItem(4);\n            u3:addItemAmount(\"Nitrogen\", 120);\n        elseif u2:hasAmountOf(\"Liquid Oxygen\", 3) and u3:canHoldXMoreOf(\"Oxygen\", 90) then\n            u2:removeItem(3);\n            u3:addItemAmount(\"Oxygen\", 90);\n        else\n            if not (u2:hasAmountOf(\"Liquid Argon\", 3) and u3:canHoldXMoreOf(\"Argon\", 90)) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u2:removeItem(3);\n            u3:addItemAmount(\"Argon\", 90);\n        end;\n\n        State.Value = \"1\";\n        u1:removePower(15000);\n    end\n};"
};
