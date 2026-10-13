export default {
  id: "OreEnrichmentFacility",
  category: "Factories",
  tier: 4,
  cost: 4000000,
  base: {
    height: 68,
    offset: {
      y: -16,
      x: -34
    },
    width: 72
  },
  nodes: [
    {
      name: "InItem1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -0.99603271484375,
        x: -69.66827392578125
      },
      gameOffset: {
        y: 1.4615097045898438,
        x: -69.66827392578125,
        z: -0.99603271484375
      },
      tip: "Input for the main ore/item (Raw Uranium, Spent Fuel)"
    },
    {
      name: "OutFluid2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -2.9998779296875,
        x: 1.47979736328125
      },
      gameOffset: {
        y: 1.4266357421875,
        x: 1.47979736328125,
        z: -2.9998779296875
      },
      tip: "Output for 2nd fluid"
    },
    {
      name: "OutItem1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.01593017578125,
        x: 1.4866943359375
      },
      gameOffset: {
        y: 1.4615097045898438,
        x: 1.4866943359375,
        z: 1.01593017578125
      },
      tip: "Output for primary item (Mixed Uranium Oxides, Mixed Fissile Nitrates, Treated Raw Copper, Treated Raw Iron, 24 Karat Gold, Powdered Tungsten Carbide, Lithium Carbonate)"
    },
    {
      name: "InFluid2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 3.01544189453125,
        x: -69.67938232421875
      },
      gameOffset: {
        y: 1.4266357421875,
        x: -69.67938232421875,
        z: 3.01544189453125
      },
      tip: "Input for 2nd liquid (Check Recipes) (Ammonia)"
    },
    {
      name: "InItem2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.0076904296875,
        x: -69.66827392578125
      },
      gameOffset: {
        y: 1.4615097045898438,
        x: -69.66827392578125,
        z: 1.0076904296875
      },
      tip: "Input for 2nd item (check Recipes)"
    },
    {
      name: "InFluid1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -2.99591064453125,
        x: -69.67938232421875
      },
      gameOffset: {
        y: 1.4266357421875,
        x: -69.67938232421875,
        z: -2.99591064453125
      },
      tip: "Input for Acid (check recipes)"
    },
    {
      name: "OutItem2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -0.98406982421875,
        x: 1.4866943359375
      },
      gameOffset: {
        y: 1.4615097045898438,
        x: 1.4866943359375,
        z: -0.98406982421875
      },
      tip: "Output for 2nd item (Sand, Fission Byproduct, Bauxite Residue))"
    },
    {
      name: "OutFluid1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 3.0018310546875,
        x: 1.47979736328125
      },
      gameOffset: {
        y: 1.4266357421875,
        x: 1.47979736328125,
        z: 3.0018310546875
      },
      tip: "Output for Residue"
    },
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 0,
      siteOffset: {
        y: -44.3558349609375,
        x: -14.11993408203125
      },
      gameOffset: {
        y: 19.00112533569336,
        x: -14.11993408203125,
        z: -44.3558349609375
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = {\n    PipeUtilsV2.loadConnector(script.Parent.InItem1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.InItem2MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.InFluid1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.InFluid2MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.OutItem1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.OutItem2MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.OutFluid1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.OutFluid2MainPipe)\n};\nlocal v4 = {};\nlocal InternalRecipes = require(script.InternalRecipes);\nlocal u5 = nil;\nlocal u6 = 0;\nlocal State = script.Parent.State;\n\nlocal function CheckRecipe(p7) -- Line: 27\n    -- upvalues: u3 (copy)\n    for i, v in u3 do\n        if p7[i] ~= nil then\n            if i <= 4 then\n                if not v:hasAmountOf(p7[i][1], p7[i][2]) then\n                    return false;\n                end;\n            elseif not v:canHoldXMoreOf(p7[i][1], p7[i][2]) then\n                return false;\n            end;\n        end;\n    end;\n\n    return true;\nend;\n\nlocal function ProcessRecipe(u8) -- Line: 45\n    -- upvalues: State (copy), u3 (copy), u1 (copy), u6 (ref)\n    State.Value = u8[11];\n\n    for i = 1, 4 do\n        if u8[i] ~= nil then\n            u3[i]:removeItem(u8[i][2]);\n        end;\n    end;\n\n    u1:nextTicks(u8[9], function(p9) -- Line: 53\n        -- upvalues: u6 (ref), u8 (copy), u3 (ref)\n        u6 = u6 + u8[10];\n\n        if p9 == 1 then\n            for i = 5, 8 do\n                if u8[i] ~= nil then\n                    u3[i]:addItemAmount(u8[i][1], u8[i][2]);\n                end;\n            end;\n        end;\n    end);\nend;\n\nfunction v4.tick() -- Line: 65\n    -- upvalues: u6 (ref), u2 (copy), u1 (copy), State (copy), u5 (ref), CheckRecipe (copy), ProcessRecipe (copy), InternalRecipes (copy)\n    if u6 > 0 then\n        local v10 = u6 - u2:removePower(u6);\n        u6 = math.max(v10, 0);\n\n        if u1:tickIsFree() then\n            State.Value = \"\";\n        end;\n\n        return;\n    end;\n\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u2:hasPower(1) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if u5 == nil then\n        for _, v in ipairs(InternalRecipes) do\n            if CheckRecipe(v) then\n                u5 = v;\n                ProcessRecipe(v);\n\n                return;\n            end;\n        end;\n\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if CheckRecipe(u5) then\n        ProcessRecipe(u5);\n\n        return;\n    end;\n\n    u5 = nil;\nend;\n\nreturn v4;"
};
