export default {
  id: "IngotMolder",
  category: "Factories",
  cost: 150,
  base: {
    height: 8,
    offset: {
      y: 2.00006103515625,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 650,
      transferAmount: 0,
      siteOffset: {
        y: 4.72589111328125,
        x: 0.819091796875
      },
      gameOffset: {
        y: 2.1008188724517822,
        x: 0.819091796875,
        z: 4.72589111328125
      }
    },
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -0.00787353515625,
        x: -2
      },
      gameOffset: {
        y: 0.9249989986419678,
        x: -2,
        z: -0.00787353515625
      },
      tip: "Output for metal ingots"
    },
    {
      name: "InputMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 3.9920654296875,
        x: -1.99993896484375
      },
      gameOffset: {
        y: 0.9249989986419678,
        x: -1.99993896484375,
        z: 3.9920654296875
      },
      tip: "Input for liquid metals/liquid sulfur"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InputMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = { { { \"Liquid Copper\", 2 }, { \"Copper Ingot\", 1 } }, { { \"Liquid Sulfur\", 2 }, { \"Sulfur\", 1 } }, { { \"Liquid Iron\", 2 }, { \"Iron Ingot\", 1 } }, { { \"Liquid Gold\", 2 }, { \"Gold Ingot\", 1 } }, { { \"Molten Ferroaluminium Alloy\", 2 }, { \"Ferroaluminium Alloy Ingot\", 1 } }, { { \"Molten Purple Gold\", 2 }, { \"Purple Gold Ingot\", 1 } }, { { \"Liquid Aluminium\", 2 }, { \"Aluminium Ingot\", 1 } }, { { \"Liquid Glass\", 2 }, { \"Glass\", 1 } }, { { \"Liquid Lead\", 4 }, { \"Lead Ingot\", 2 } }, { { \"Liquid Brass\", 4 }, { \"Brass Ingot\", 2 } } };\nlocal u5 = require(game.ReplicatedStorage.Modules.NextTicks).new();\nlocal v6 = {};\nlocal State = script.Parent.State;\n\nfunction v6.tick() -- Line: 59\n    -- upvalues: u5 (copy), u4 (copy), u2 (copy), u1 (copy), u3 (copy), State (copy)\n    if u5:tickIsBusy() then\n        return;\n    end;\n\n    for i, v in pairs(u4) do\n        if u2:hasAmountOf(v[1][1], v[1][2] * 2) and (u1:canHoldXMoreOf(v[2][1], v[2][2] * 2) and u3:hasPower(600)) then\n            u2:removeItem(v[1][2] * 2);\n            u3:removePower(600);\n            State.Value = i;\n            u5:nextTicks(4, function(p7) -- Line: 71\n                -- upvalues: State (ref), u1 (ref), v (copy)\n                if p7 == 1 then\n                    State.Value = \"\";\n                    u1:addItem(v[2][2] * 2, v[2][1]);\n                end;\n            end);\n\n            return;\n        end;\n    end;\nend;\n\nreturn v6;"
};
