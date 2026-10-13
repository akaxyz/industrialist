export default {
  id: "ModularResearchDronePort",
  category: "Modular",
  cost: 750,
  base: {
    height: 24,
    offset: {
      y: -10,
      x: -6
    },
    width: 16
  },
  nodes: [
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: 1.574798583984375,
        x: -2.99981689453125
      },
      gameOffset: {
        y: 1.3250010013580322,
        x: -2.99981689453125,
        z: 1.574798583984375
      },
      tip: "Input for Machine Oil"
    },
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: 1.574798583984375,
        x: -0.99981689453125
      },
      gameOffset: {
        y: 1.3250010013580322,
        x: -0.99981689453125,
        z: 1.574798583984375
      },
      tip: "Input for Machine Oil"
    },
    {
      name: "In3MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: 1.574798583984375,
        x: 1.00018310546875
      },
      gameOffset: {
        y: 1.3250010013580322,
        x: 1.00018310546875,
        z: 1.574798583984375
      },
      tip: "Input for Machine Oil"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local v1 = {};\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.In3MainPipe);\n\nfunction script.Parent.GetData.OnInvoke(p5, p6, p7) -- Line: 13\n    -- upvalues: u2 (copy), u3 (copy), u4 (copy)\n    if p5 == 1 then\n        return {\n            { u2:getItem(), u2:getBuffer() },\n            { u3:getItem(), u3:getBuffer() },\n            { u4:getItem(), u4:getBuffer() }\n        };\n    end;\n\n    if p5 == 2 then\n        local v8 = u2;\n\n        if p6 == 2 then\n            v8 = u3;\n        elseif p6 == 3 then\n            v8 = u4;\n        end;\n\n        v8:removeItem(p7);\n    end;\nend;\n\nfunction v1.tick() -- Line: 33\nend;\n\nreturn v1;"
};
