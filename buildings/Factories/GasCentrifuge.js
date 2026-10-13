export default {
  id: "GasCentrifuge",
  category: "Factories",
  tier: 4,
  cost: 3000000,
  base: {
    height: 28,
    offset: {
      y: 0,
      x: 14
    },
    width: 32
  },
  nodes: [
    {
      name: "OutEnrichedMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 2.999755859375,
        x: -1.8734130859375
      },
      gameOffset: {
        y: 1.495861291885376,
        x: -1.8734130859375,
        z: 2.999755859375
      },
      tip: "Output for enriched resources"
    },
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -3.000244140625,
        x: -1.8734130859375
      },
      gameOffset: {
        y: 1.495861291885376,
        x: -1.8734130859375,
        z: -3.000244140625
      }
    },
    {
      name: "OutWasteMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -1.000244140625,
        x: -1.8734130859375
      },
      gameOffset: {
        y: 1.495861291885376,
        x: -1.8734130859375,
        z: -1.000244140625
      },
      tip: "Waste output"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1500000,
      transferAmount: 0,
      siteOffset: {
        y: 11.4915771484375,
        x: 0.19036865234375
      },
      gameOffset: {
        y: 14.989532470703125,
        x: 0.19036865234375,
        z: 11.4915771484375
      }
    },
    {
      name: "RecycleMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 0.999755859375,
        x: -1.8734130859375
      },
      gameOffset: {
        y: 1.495861291885376,
        x: -1.8734130859375,
        z: 0.999755859375
      },
      tip: "Output for recycled material (Unenriched UF6 Gas, Slightly Enriched UF6 Gas)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutWasteMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutEnrichedMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.RecycleMainPipe);\nlocal State = script.Parent.State;\nlocal u6 = { { { \"Unenriched UF6 Gas\", 0.5 }, { \"Depleted UF6 Waste\", 0.1 }, { \"Slightly Enriched UF6 Gas\", 0.1 }, { \"Unenriched UF6 Gas\", 0.25 } }, { { \"Slightly Enriched UF6 Gas\", 0.5 }, { \"Depleted UF6 Waste\", 0.1 }, { \"Enriched UF6 Gas\", 0.05 }, { \"Slightly Enriched UF6 Gas\", 0.3 } } };\n\nreturn {\n    localUpdate = function() -- Line: 35, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value == \"\" and script.Parent.Base.Centrifuge.Playing == true then\n            script.Parent.Base.Centrifuge.Playing = false;\n\n            return;\n        end;\n\n        if State.Value == \"Work\" and script.Parent.Base.Centrifuge.Playing == false then\n            script.Parent.Base.Centrifuge.Playing = true;\n        end;\n    end,\n\n    tick = function() -- Line: 48, Name: tick\n        -- upvalues: u1 (copy), State (copy), u6 (copy), u2 (copy), u3 (copy), u4 (copy), u5 (copy)\n        if not u1:hasPower(1000000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        for _, v in pairs(u6) do\n            if u2:hasAmountOf(v[1][1], v[1][2]) and (u3:canHoldXMoreOf(v[2][1], v[2][2]) and (u4:canHoldXMoreOf(v[3][1], v[3][2]) and u5:canHoldXMoreOf(v[4][1], v[4][2]))) then\n                State.Value = \"Work\";\n                u1:removePower(1000000);\n                u2:removeItem(v[1][2]);\n                u3:addItemAmount(v[2][1], v[2][2]);\n                u4:addItemAmount(v[3][1], v[3][2]);\n                u5:addItemAmount(v[4][1], v[4][2]);\n\n                return;\n            end;\n        end;\n\n        State.Value = \"\";\n    end\n};"
};
