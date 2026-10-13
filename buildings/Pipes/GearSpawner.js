export default {
  id: "GearSpawner",
  category: "Pipes",
  tier: 2,
  cost: 2.6561398887587478e+95,
  base: {
    height: 2,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 0,
        x: 0
      },
      gameOffset: {
        y: 1.4669914245605469,
        x: 0,
        z: 0
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PipeUtilsV2).loadConnector(script.Parent.MainPipeOut);\n\nreturn {\n    tick = function() -- Line: 11, Name: tick\n        -- upvalues: u1 (copy)\n        if u1:canHoldXMoreOf(script.Item.Value, 1) then\n            u1:addItemAmount(script.Item.Value, 1);\n        end;\n    end\n};"
};
