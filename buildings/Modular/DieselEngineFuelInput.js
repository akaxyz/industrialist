export default {
  id: "DieselEngineFuelInput",
  category: "Modular",
  tier: 2,
  cost: 4500,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 3,
      transferAmount: 3,
      siteOffset: {
        y: -1.446197509765625,
        x: -0.94683837890625
      },
      gameOffset: {
        y: 1.589738130569458,
        x: -0.94683837890625,
        z: -1.446197509765625
      }
    }
  ],
  data: {
    Ratio: 0,
    Fuel: 0
  },
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal CrudeDiesel = Items.CrudeDiesel;\nlocal PoorQualityDiesel = Items.PoorQualityDiesel;\nlocal Diesel = Items.Diesel;\nlocal RefinedDiesel = Items.RefinedDiesel;\nlocal v1 = {};\nlocal Fuel = script.Parent.ModelData.Fuel;\nlocal Ratio = script.Parent.ModelData.Ratio;\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\n\nfunction v1.tick() -- Line: 18\n    -- upvalues: Fuel (copy), u2 (copy), CrudeDiesel (copy), Ratio (copy), PoorQualityDiesel (copy), Diesel (copy), RefinedDiesel (copy)\n    if Fuel.Value < 5000 then\n        if u2:hasAmountOf(CrudeDiesel.DisplayName, 0.1) then\n            local v3 = Fuel;\n            v3.Value = v3.Value + 300;\n            Ratio.Value = 300;\n            u2:removeItem(0.1);\n\n            return;\n        end;\n\n        if u2:hasAmountOf(PoorQualityDiesel.DisplayName, 0.1) then\n            local v4 = Fuel;\n            v4.Value = v4.Value + 420;\n            Ratio.Value = 420;\n            u2:removeItem(0.1);\n\n            return;\n        end;\n\n        if u2:hasAmountOf(Diesel.DisplayName, 0.1) then\n            local v5 = Fuel;\n            v5.Value = v5.Value + 540;\n            Ratio.Value = 540;\n            u2:removeItem(0.1);\n\n            return;\n        end;\n\n        if u2:hasAmountOf(RefinedDiesel.DisplayName, 0.1) then\n            local v6 = Fuel;\n            v6.Value = v6.Value + 690;\n            Ratio.Value = 690;\n            u2:removeItem(0.1);\n        end;\n    end;\nend;\n\nreturn v1;"
};
