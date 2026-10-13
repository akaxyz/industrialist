export default {
  id: "WaterPump",
  category: "Extractors",
  tier: 1,
  cost: 60,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 15000,
      transferAmount: 0,
      siteOffset: {
        y: -1.49615478515625,
        x: 1.0076923370361328
      },
      gameOffset: {
        y: 4.375007152557373,
        x: 1.0076923370361328,
        z: -1.49615478515625
      }
    },
    {
      name: "FluidOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 10,
      transferAmount: 2,
      siteOffset: {
        y: -1.3284568786621094,
        x: 1.434988021850586
      },
      gameOffset: {
        y: 3.411000967025757,
        x: 1.434988021850586,
        z: -1.3284568786621094
      },
      tip: "Generates (and outputs) water when powered"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.PipeUtilsV2).loadConnector(script.Parent.FluidOutMainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal Water = Items.Water;\nlocal v3 = {};\nlocal _ = script.Parent.Base.Hum;\n\nfunction v3.tick() -- Line: 21\n    -- upvalues: u2 (copy), u1 (copy), Items (copy), Water (copy)\n    if u2:getBuffer() < 600 then\n        return;\n    end;\n\n    if u1:getBuffer() == u1:getMax() then\n        return;\n    end;\n\n    u2:removePower(600);\n    u1:addItem(1.35, Items.get(Water));\nend;\n\nreturn v3;"
};
