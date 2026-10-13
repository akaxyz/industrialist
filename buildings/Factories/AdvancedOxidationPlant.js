export default {
  id: "AdvancedOxidationPlant",
  category: "Factories",
  tier: 4,
  cost: 2000000,
  base: {
    height: 48,
    offset: {
      y: 0,
      x: -26
    },
    width: 56
  },
  nodes: [
    {
      name: "OutFluid2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -3.0050048828125,
        x: 1.63397216796875
      },
      gameOffset: {
        y: 1.4742136001586914,
        x: 1.63397216796875,
        z: -3.0050048828125
      },
      tip: "Output for Residue, Hydrogen"
    },
    {
      name: "OutItem2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -1.0107421875,
        x: 1.7877426147460938
      },
      gameOffset: {
        y: 1.5022783279418945,
        x: 1.7877426147460938,
        z: -1.0107421875
      },
      tip: "Output for Fission Byproduct"
    },
    {
      name: "OutFluid1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 2.9967041015625,
        x: 1.63397216796875
      },
      gameOffset: {
        y: 1.4933977127075195,
        x: 1.63397216796875,
        z: 2.9967041015625
      },
      tip: "Output for Ethanol, Acetic Acid, MEG, Liquid Sulfur, Sulfur Trioxide"
    },
    {
      name: "OutItem1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.01080322265625,
        x: 1.7877044677734375
      },
      gameOffset: {
        y: 1.5022706985473633,
        x: 1.7877044677734375,
        z: 1.01080322265625
      },
      tip: "Output for primary item of interest (Yellowcake, Mixed Fissile Oxides)"
    },
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 0,
      siteOffset: {
        y: -11.28106689453125,
        x: -10.24041748046875
      },
      gameOffset: {
        y: 36.833045959472656,
        x: -10.24041748046875,
        z: -11.28106689453125
      }
    },
    {
      name: "InFluid1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -19.02215576171875,
        x: -53.55413818359375
      },
      gameOffset: {
        y: 1.4664125442504883,
        x: -53.55413818359375,
        z: -19.02215576171875
      },
      tip: "Input for first liquid (Sulfuric Acid,  Ammonia, Tributyl Phosphate, Steam, Refined Gas, Ethanol, Ethylene, Hydrogen Sulfide, Sulfur Dioxide... Check recipes)"
    },
    {
      name: "InItem1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -17.00927734375,
        x: -53.5328369140625
      },
      gameOffset: {
        y: 1.466599464416504,
        x: -53.5328369140625,
        z: -17.00927734375
      },
      tip: "Input for primary item (Mixed Uranium Oxides, Mixed Fissile Nitrates)"
    },
    {
      name: "InItem2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 16.99456787109375,
        x: -53.6412353515625
      },
      gameOffset: {
        y: 1.4596681594848633,
        x: -53.6412353515625,
        z: 16.99456787109375
      },
      tip: "Input for secondary item (check recipes)"
    },
    {
      name: "InFluid2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 18.98052978515625,
        x: -53.59454345703125
      },
      gameOffset: {
        y: 1.4495973587036133,
        x: -53.59454345703125,
        z: 18.98052978515625
      },
      tip: "Input for secondary liquid (Oxygen, Ammonia... Check recipes)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = {\n    PipeUtilsV2.loadConnector(script.Parent.InItem1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.InItem2MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.InFluid1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.InFluid2MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.OutItem1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.OutItem2MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.OutFluid1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.OutFluid2MainPipe)\n};\nlocal v4 = {};\nlocal InternalRecipes = require(script.InternalRecipes);\nlocal u5 = nil;\nlocal u6 = 0;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nlocal function CheckRecipe(p7) -- Line: 28\n    -- upvalues: u3 (copy)\n    for i, v in u3 do\n        if p7[i] ~= nil then\n            if i <= 4 then\n                if not v:hasAmountOf(p7[i][1], p7[i][2]) then\n                    return false;\n                end;\n            elseif not v:canHoldXMoreOf(p7[i][1], p7[i][2]) then\n                return false;\n            end;\n        end;\n    end;\n\n    return true;\nend;\n\nlocal function ProcessRecipe(u8) -- Line: 46\n    -- upvalues: State (copy), u3 (copy), u1 (copy), Pollution (copy), u6 (ref)\n    State.Value = \"1\";\n\n    for i = 1, 4 do\n        if u8[i] ~= nil then\n            u3[i]:removeItem(u8[i][2]);\n        end;\n    end;\n\n    u1:nextTicks(u8[9], function(p9) -- Line: 54\n        -- upvalues: Pollution (ref), u6 (ref), u8 (copy), u3 (ref)\n        local v10 = Pollution;\n        v10.Value = v10.Value + 45;\n        u6 = u6 + u8[10];\n\n        if p9 == 1 then\n            for i = 5, 8 do\n                if u8[i] ~= nil then\n                    u3[i]:addItemAmount(u8[i][1], u8[i][2]);\n                end;\n            end;\n        end;\n    end);\nend;\n\nfunction v4.tick() -- Line: 68\n    -- upvalues: u1 (copy), u6 (ref), u2 (copy), State (copy), u5 (ref), CheckRecipe (copy), ProcessRecipe (copy), InternalRecipes (copy)\n    if u1:tickIsBusy() or u6 > 0 then\n        local v11 = u6 - u2:removePower(u6);\n        u6 = math.max(v11, 0);\n\n        if u1:tickIsFree() then\n            State.Value = \"\";\n        end;\n\n        return;\n    end;\n\n    if not u2:hasPower(1) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if u5 == nil then\n        for _, v in InternalRecipes do\n            if CheckRecipe(v) then\n                u5 = v;\n                ProcessRecipe(v);\n\n                return;\n            end;\n        end;\n\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if CheckRecipe(u5) then\n        ProcessRecipe(u5);\n\n        return;\n    end;\n\n    u5 = nil;\nend;\n\nreturn v4;"
};
