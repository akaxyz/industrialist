export default {
  id: "LithiumOreDrill",
  category: "Extractors",
  tier: 3,
  cost: 250000,
  base: {
    height: 8,
    offset: {
      y: 0,
      x: 8
    },
    width: 20
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 10000000,
      transferAmount: 0,
      siteOffset: {
        y: 2.00250244140625,
        x: 3.6274948120117188
      },
      gameOffset: {
        y: 10.725784301757812,
        x: 3.6274948120117188,
        z: 2.00250244140625
      }
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -1,
        x: -1.587005615234375
      },
      gameOffset: {
        y: 1.9379997253417969,
        x: -1.587005615234375,
        z: -1
      }
    },
    {
      name: "InFluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: 1,
        x: -1.587005615234375
      },
      gameOffset: {
        y: 1.9669990539550781,
        x: -1.587005615234375,
        z: 1
      },
      tip: "Input for Machine Oil"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\ngame:GetService(\"TweenService\");\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InFluidMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal State = script.Parent.State;\n\nreturn {\n    localUpdate = function() -- Line: 19, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value == \"\" then\n            script.Parent.Base[\"Conveyor Belt 1 (SFX)\"]:Stop();\n\n            return;\n        end;\n\n        if State.Value == \"Running\" then\n            script.Parent.Base[\"Conveyor Belt 1 (SFX)\"]:Play();\n        end;\n    end,\n\n    tick = function() -- Line: 27, Name: tick\n        -- upvalues: u1 (copy), u3 (copy), State (copy), u4 (copy), u2 (copy)\n        if u1:tickIsBusy() then\n            return;\n        end;\n\n        if not u3:hasAmountOf(\"Machine Oil\", 2) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u4:canHoldXMoreOf(\"Lithium Ore\", 10) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u2:hasPower(5000000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        u3:removeItem(2);\n        State.Value = \"Running\";\n        u1:nextTicks(10, function(p5) -- Line: 34\n            -- upvalues: u2 (ref), u4 (ref)\n            u2:removePower(1000000);\n            u4:addItemAmount(\"Lithium Ore\", 1);\n        end);\n    end\n};"
};
