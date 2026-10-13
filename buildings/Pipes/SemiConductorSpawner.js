export default {
  id: "SemiConductorSpawner",
  category: "Pipes",
  tier: 2,
  cost: 2.6561398887587478e+95,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "Pipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 1,
        x: 0
      },
      gameOffset: {
        y: 1.516998291015625,
        x: 0,
        z: 1
      }
    },
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1.5999755859375,
        x: 0
      },
      gameOffset: {
        y: 1.4669914245605469,
        x: 0,
        z: -1.5999755859375
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1,
        x: 0
      },
      gameOffset: {
        y: 1.4669914245605469,
        x: 0,
        z: -1
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nPipeUtilsV2.loadConnector(script.Parent.Pipe);\nPipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\n\nreturn {\n    tick = function() -- Line: 13, Name: tick\n        -- upvalues: u1 (copy)\n        if u1:canHoldXMoreOf(\"Semiconductor\", 1) then\n            u1:addItemAmount(\"Semiconductor\", 1);\n        end;\n    end\n};"
};
