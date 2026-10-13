export default {
  id: "LNGPlant",
  category: "Factories",
  tier: 3,
  cost: 1250000,
  base: {
    height: 44,
    offset: {
      y: -19.999996185302734,
      x: 12
    },
    width: 28
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 2500000,
      transferAmount: 0,
      siteOffset: {
        y: -25.601009368896484,
        x: 11.125
      },
      gameOffset: {
        y: 3.986166000366211,
        x: 11.125,
        z: -25.601009368896484
      }
    },
    {
      name: "GasMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 100,
      transferAmount: 30,
      siteOffset: {
        y: -1.0000152587890625,
        x: -1.83001708984375
      },
      gameOffset: {
        y: 2.1249961853027344,
        x: -1.83001708984375,
        z: -1.0000152587890625
      },
      tip: "Refined Gas input"
    },
    {
      name: "LNGMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -3.0000152587890625,
        x: -1.83001708984375
      },
      gameOffset: {
        y: 2.1249961853027344,
        x: -1.83001708984375,
        z: -3.0000152587890625
      },
      tip: "LNG out (for selling probably)"
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.GasMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.LNGMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\n\nreturn {\n    localUpdate = function() -- Line: 16, Name: localUpdate\n    end,\n\n    tick = function() -- Line: 19, Name: tick\n        -- upvalues: u3 (copy), u1 (copy), u2 (copy)\n        if not (u3:hasPower(75000) and (u1:hasAmountOf(\"Refined Gas\", 4) and u2:canHoldXMoreOf(\"LNG\", 0.22))) then\n            return;\n        end;\n\n        u3:removePower(75000);\n        u1:removeItem(4);\n        u2:addItemAmount(\"LNG\", 0.22);\n        u2:setUsedTemperature(-170);\n    end\n};"
};
