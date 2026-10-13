export default {
  id: "Splitatron",
  category: "Pipes",
  cost: 2,
  base: {
    height: 4,
    offset: {
      y: 0.3499755859375,
      x: 0.1500244140625
    },
    width: 4
  },
  nodes: [
    {
      name: "MainInputPipe",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.3499755859375,
        x: -1.399993896484375
      },
      gameOffset: {
        y: 1.6520309448242188,
        x: -1.399993896484375,
        z: 1.3499755859375
      }
    },
    {
      name: "OutputPipe1",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -0.6500244140625,
        x: 1.550018310546875
      },
      gameOffset: {
        y: 1.6520309448242188,
        x: 1.550018310546875,
        z: -0.6500244140625
      }
    },
    {
      name: "OutputPipe2",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.3499755859375,
        x: 1.550018310546875
      },
      gameOffset: {
        y: 1.6520309448242188,
        x: 1.550018310546875,
        z: 1.3499755859375
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainInputPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutputPipe1);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutputPipe2);\nlocal v4 = {};\nlocal u5 = 1;\n\nfunction v4.tick() -- Line: 13\n    -- upvalues: u1 (copy), u5 (ref), u2 (copy), u3 (copy)\n    if u1:hasAmount(1) then\n        if u5 == 1 then\n            if u2:canHoldXMoreOf(u1:getItem(), 1) then\n                u2:addItem(1, u1:getItem());\n                u1:removeItem(1);\n                u5 = 2;\n            end;\n        elseif u5 == 2 and u3:canHoldXMoreOf(u1:getItem(), 1) then\n            u3:addItem(1, u1:getItem());\n            u1:removeItem(1);\n            u5 = 1;\n        end;\n    end;\nend;\n\nreturn v4;"
};
