export default {
  id: "ConveyorIntersectionLeft",
  category: "Pipes",
  cost: 2,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: -1
    },
    width: 6
  },
  nodes: [
    {
      name: "MainInputPipe",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1,
        x: -3.54998779296875
      },
      gameOffset: {
        y: 1.451995849609375,
        x: -3.54998779296875,
        z: 1
      }
    },
    {
      name: "OutputPipe1",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1,
        x: 1.5
      },
      gameOffset: {
        y: 1.4000015258789062,
        x: 1.5,
        z: 1
      }
    },
    {
      name: "OutputPipe2",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -1,
        x: 1.5
      },
      gameOffset: {
        y: 1.4000015258789062,
        x: 1.5,
        z: -1
      }
    },
    {
      name: "MainInputPipe2",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -1,
        x: -3.54998779296875
      },
      gameOffset: {
        y: 1.451995849609375,
        x: -3.54998779296875,
        z: -1
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainInputPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainInputPipe2);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutputPipe1);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutputPipe2);\n\nreturn {\n    tick = function() -- Line: 14, Name: tick\n        -- upvalues: u1 (copy), u3 (copy), u2 (copy), u4 (copy)\n        if u1:hasAmount(1) and u3:canHoldXMoreOf(u1:getItem(), 1) then\n            u3:addItem(1, u1:getItem());\n            u1:removeItem(1);\n        end;\n\n        if u2:hasAmount(1) and u4:canHoldXMoreOf(u2:getItem(), 1) then\n            u4:addItem(1, u2:getItem());\n            u2:removeItem(1);\n        end;\n    end\n};"
};
