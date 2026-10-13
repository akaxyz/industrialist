export default {
  id: "TreeFarmWaterTank",
  category: "Modular",
  cost: 500,
  base: {
    height: 20,
    offset: {
      y: -7.999996185302734,
      x: -2
    },
    width: 7.999921798706055
  },
  nodes: [
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 2,
      siteOffset: {
        y: -1.0058555603027344,
        x: 1.889892578125
      },
      gameOffset: {
        y: 2.0530948638916016,
        x: 1.889892578125,
        z: -1.0058555603027344
      }
    }
  ],
  data: {
    Water: 0
  },
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Water = script.Parent.ModelData.Water;\nlocal v1 = {};\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\n\nfunction v1.tick() -- Line: 10\n    -- upvalues: Water (copy), u2 (copy)\n    if Water.Value < 100 and u2:hasAmountOf(\"Water\", 100) then\n        local v3 = Water;\n        v3.Value = v3.Value + 100;\n        u2:removeItem(100);\n    end;\nend;\n\nreturn v1;"
};
