export default {
  id: "Condenser",
  category: "Factories",
  tier: 3,
  cost: 75000,
  base: {
    height: 28,
    offset: {
      y: -12.0400390625,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "Out1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 2.010009765625,
        x: 1
      },
      gameOffset: {
        y: 1.9249954223632812,
        x: 1,
        z: 2.010009765625
      },
      tip: "Crude oil (either dump it or sell)"
    },
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -25.76995849609375,
        x: -1
      },
      gameOffset: {
        y: 2.1749868392944336,
        x: -1,
        z: -25.76995849609375
      },
      tip: "Raw gas in (to refine)"
    },
    {
      name: "Out2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 2.010009765625,
        x: -3
      },
      gameOffset: {
        y: 1.9249954223632812,
        x: -3,
        z: 2.010009765625
      },
      tip: "Water out (either dump it or use somewhere)"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -12.60235595703125,
        x: 1.8031768798828125
      },
      gameOffset: {
        y: 4.208806991577148,
        x: 1.8031768798828125,
        z: -12.60235595703125
      }
    },
    {
      name: "Out3MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 2.010009765625,
        x: -7
      },
      gameOffset: {
        y: 1.9249954223632812,
        x: -7,
        z: 2.010009765625
      },
      tip: "Water-free gas (put into gas refinery)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.Out3MainPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\n\nreturn {\n    localUpdate = function() -- Line: 16, Name: localUpdate\n    end,\n\n    tick = function() -- Line: 19, Name: tick\n        -- upvalues: u5 (copy), u1 (copy), u2 (copy), u3 (copy), u4 (copy)\n        if not (u5:hasPower(21000) and (u1:hasAmountOf(\"Raw Gas\", 60) and (u2:canHoldXMoreOf(\"Crude Oil\", 0.3) and (u3:canHoldXMoreOf(\"Water\", 1.5) and u4:canHoldXMoreOf(\"Water-Free Gas\", 30))))) then\n            return;\n        end;\n\n        u5:removePower(21000);\n        u1:removeItem(60);\n        u2:addItemAmount(\"Crude Oil\", 0.3);\n        u3:addItemAmount(\"Water\", 1.5);\n        u4:addItemAmount(\"Water-Free Gas\", 30);\n    end\n};"
};
