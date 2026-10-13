export default {
  id: "ChemicalPlant",
  category: "Factories",
  tier: 4,
  cost: 2340000,
  base: {
    height: 46,
    offset: {
      y: -21,
      x: 22.00006103515625
    },
    width: 48
  },
  nodes: [
    {
      name: "LiquidOut3MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 300,
      transferAmount: 20,
      siteOffset: {
        y: -43.8087158203125,
        x: 17.00177001953125
      },
      gameOffset: {
        y: 1.67620849609375,
        x: 17.00177001953125,
        z: -43.8087158203125
      },
      tip: "Output for ..."
    },
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.7293701171875,
        x: 12.64752197265625
      },
      gameOffset: {
        y: 38.63288879394531,
        x: 12.64752197265625,
        z: -0.7293701171875
      }
    },
    {
      name: "LiquidOut2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 300,
      transferAmount: 20,
      siteOffset: {
        y: -43.818115234375,
        x: 37.00177001953125
      },
      gameOffset: {
        y: 1.67620849609375,
        x: 37.00177001953125,
        z: -43.818115234375
      },
      tip: "Output for Residue/Hydrochloric Acid"
    },
    {
      name: "LiquidOut1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 300,
      transferAmount: 20,
      siteOffset: {
        y: -43.818115234375,
        x: 43.00177001953125
      },
      gameOffset: {
        y: 1.67620849609375,
        x: 43.00177001953125,
        z: -43.818115234375
      },
      tip: "Output for Ammonia/Hydrogen/Unenriched UF6 Gas/Slightly Enriched UF6 Gas/Hydroflouric Acid/Boric Acid/Phosphorus Oxychlroide/Tributhyl Phosphate/Hydrochloric Acid/Sulfuric Acid"
    },
    {
      name: "ItemOut2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -43.8375244140625,
        x: 22.99163818359375
      },
      gameOffset: {
        y: 1.505126953125,
        x: 22.99163818359375,
        z: -43.8375244140625
      },
      tip: "Output for Plutonium Oxide Pellets"
    },
    {
      name: "ItemIn2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.8411865234375,
        x: 43.01812744140625
      },
      gameOffset: {
        y: 1.5052413940429688,
        x: 43.01812744140625,
        z: 1.8411865234375
      }
    },
    {
      name: "LiquidIn4MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 2,
      siteOffset: {
        y: 1.8170166015625,
        x: 38.98272705078125
      },
      gameOffset: {
        y: 1.6757354736328125,
        x: 38.98272705078125,
        z: 1.8170166015625
      }
    },
    {
      name: "LiquidIn3MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 2,
      siteOffset: {
        y: 1.79913330078125,
        x: 5.03277587890625
      },
      gameOffset: {
        y: 1.6757354736328125,
        x: 5.03277587890625,
        z: 1.79913330078125
      }
    },
    {
      name: "LiquidIn2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 1.79913330078125,
        x: 3.03271484375
      },
      gameOffset: {
        y: 1.6757354736328125,
        x: 3.03271484375,
        z: 1.79913330078125
      }
    },
    {
      name: "LiquidIn1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 1.79913330078125,
        x: 1.03271484375
      },
      gameOffset: {
        y: 1.6757354736328125,
        x: 1.03271484375,
        z: 1.79913330078125
      }
    },
    {
      name: "ItemIn1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.8411865234375,
        x: 41.01812744140625
      },
      gameOffset: {
        y: 1.5052413940429688,
        x: 41.01812744140625,
        z: 1.8411865234375
      }
    },
    {
      name: "ItemOut1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -43.8375244140625,
        x: 28.99163818359375
      },
      gameOffset: {
        y: 1.505126953125,
        x: 28.99163818359375,
        z: -43.8375244140625
      },
      tip: "Output for Hardened Plastic Pellets, Enriched UO2 Pellets/Reprocessed Uranium"
    }
  ],
  data: {
    Efficiency: 100,
    Speed: 100
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal _ = script.Parent.Effects;\nlocal _ = script.Parent.Base;\nlocal v3 = PipeUtilsV2.loadConnector(script.Parent.ItemIn1MainPipe);\nlocal v4 = PipeUtilsV2.loadConnector(script.Parent.ItemIn2MainPipe);\nlocal v5 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn1MainPipe);\nlocal v6 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn2MainPipe);\nlocal v7 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn3MainPipe);\nlocal v8 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn4MainPipe);\nlocal u9 = PipeUtilsV2.loadConnector(script.Parent.ItemOut1MainPipe);\nlocal u10 = PipeUtilsV2.loadConnector(script.Parent.ItemOut2MainPipe);\nlocal u11 = PipeUtilsV2.loadConnector(script.Parent.LiquidOut1MainPipe);\nlocal u12 = PipeUtilsV2.loadConnector(script.Parent.LiquidOut2MainPipe);\nlocal u13 = PipeUtilsV2.loadConnector(script.Parent.LiquidOut3MainPipe);\nlocal u14 = { v3, v4 };\nlocal u15 = {\n    v5,\n    v6,\n    v7,\n    v8\n};\nlocal InternalRecipes = require(script.InternalRecipes);\nlocal v16 = {};\nlocal u17 = 0;\nlocal u18 = 0;\nlocal Speed = script.Parent.ModelData.Speed;\nlocal Efficiency = script.Parent.ModelData.Efficiency;\nlocal Display = script.Parent.Monitor.SurfaceGui.Display;\nlocal Click = Display.Parent.Parent.Click;\nlocal u19 = 1;\nlocal u20 = 1;\nlocal u21 = 1;\n\nlocal function updateModifiers() -- Line: 57\n    -- upvalues: u19 (ref), Efficiency (copy), u21 (ref), Speed (copy), u20 (ref), Display (copy)\n    u19 = 100 / Efficiency.Value;\n    u21 = 1;\n\n    if Efficiency.Value < 100 then\n        u21 = u21 + (Efficiency.Value - 100) / 100;\n    else\n        u21 = u21 + (Efficiency.Value - 100) / 20;\n    end;\n\n    if Speed.Value < 100 then\n        u21 = u21 + (Speed.Value - 100) / 75;\n    else\n        u21 = u21 + (Speed.Value - 100) / 50;\n    end;\n\n    u20 = Speed.Value / 100;\n    u19 = u19 * u20;\n    Display.Body.efficiency.Text = `EFFICIENCY: {math.floor(Efficiency.Value)}%`;\n    Display.Body.speed.Text = `SPEED: {math.floor(Speed.Value)}%`;\n    Display.Body.originalPower.Text = `{math.round(u21 * 100) / 100}x Original Power`;\n    Display.Body.originalResources.Text = `{math.round(u19 * 100) / 100}x Original Resources`;\n    Display.Body.originalOutput.Text = `{math.round(u20 * 100) / 100}x Original Output`;\nend;\n\nDisplay.Buttons.MinusSpeed.MouseButton1Click:Connect(function() -- Line: 83\n    -- upvalues: Click (copy), Speed (copy), updateModifiers (copy)\n    Click:Play();\n    Speed.Value = math.clamp(Speed.Value - 5, 50, 200);\n    updateModifiers();\nend);\nDisplay.Buttons.PlusSpeed.MouseButton1Click:Connect(function() -- Line: 89\n    -- upvalues: Click (copy), Speed (copy), updateModifiers (copy)\n    Click:Play();\n    Speed.Value = math.clamp(Speed.Value + 5, 50, 200);\n    updateModifiers();\nend);\nDisplay.Buttons.MinusEfficiency.MouseButton1Click:Connect(function() -- Line: 96\n    -- upvalues: Click (copy), Efficiency (copy), updateModifiers (copy)\n    Click:Play();\n    Efficiency.Value = math.clamp(Efficiency.Value - 5, 80, 120);\n    updateModifiers();\nend);\nDisplay.Buttons.PlusEfficiency.MouseButton1Click:Connect(function() -- Line: 102\n    -- upvalues: Click (copy), Efficiency (copy), updateModifiers (copy)\n    Click:Play();\n    Efficiency.Value = math.clamp(Efficiency.Value + 5, 80, 120);\n    updateModifiers();\nend);\nupdateModifiers();\n\nlocal function checkRecipe(u22) -- Line: 111\n    -- upvalues: u9 (copy), u20 (ref), u10 (copy), u11 (copy), u12 (copy), u13 (copy), u2 (copy), u21 (ref), u17 (ref), u15 (copy), u19 (ref), u14 (copy), State (copy), u1 (copy), u18 (ref), Pollution (copy)\n    if u22.IOut1 ~= nil and not u9:canHoldXMoreOf(u22.IOut1[1], u22.IOut1[2] * u20) then\n        return;\n    end;\n\n    if u22.IOut2 ~= nil and not u10:canHoldXMoreOf(u22.IOut2[1], u22.IOut2[2] * u20) then\n        return;\n    end;\n\n    if u22.LOut1 ~= nil and not u11:canHoldXMoreOf(u22.LOut1[1], u22.LOut1[2] * u20) then\n        return;\n    end;\n\n    if u22.LOut2 ~= nil and not u12:canHoldXMoreOf(u22.LOut2[1], u22.LOut2[2] * u20) then\n        return;\n    end;\n\n    if u22.LOut3 ~= nil and not u13:canHoldXMoreOf(u22.LOut3[1], u22.LOut3[2] * u20) then\n        return;\n    end;\n\n    if not u2:hasPower(u22.Consumes * u21 / 4) then\n        return;\n    end;\n\n    local v23 = {};\n    local v24 = {};\n    local v25 = {};\n\n    if u22.Liquids ~= nil then\n        u17 = #u22.Liquids;\n\n        for i, v in u15 do\n            for _, v2 in u22.Liquids do\n                if v:hasAmountOf(v2[1], v2[2] * u19) and v25[v2[1]] == nil then\n                    v23[i] = v2;\n                    v25[v2[1]] = true;\n                    u17 = u17 - 1;\n                    break;\n                end;\n            end;\n        end;\n\n        if u17 ~= 0 then\n            return;\n        end;\n    end;\n\n    if u22.Items ~= nil then\n        u17 = #u22.Items;\n\n        for i, v in u14 do\n            for _, v2 in u22.Items do\n                if v:hasAmountOf(v2[1], v2[2] * u19) and v25[v2[1]] == nil then\n                    v24[i] = v2;\n                    v25[v2[1]] = true;\n                    u17 = u17 - 1;\n                    break;\n                end;\n            end;\n        end;\n\n        if u17 ~= 0 then\n            return;\n        end;\n    end;\n\n    local v26 = 0;\n\n    for i, v in pairs(v23) do\n        u15[i]:removeItem(v[2] * u19);\n\n        if u22[1] == \"Steam\" then\n            v26 = 1;\n        end;\n    end;\n\n    for i, v in pairs(v24) do\n        u14[i]:removeItem(v[2] * u19);\n    end;\n\n    State.Value = `{u22.Pollution},{#u22.Liquids},{u22.AnimationCode},{v26},{u21}`;\n    u1:nextTicks(u22.Speed, function(p27) -- Line: 170\n        -- upvalues: u18 (ref), u22 (copy), u21 (ref), Pollution (ref), u9 (ref), u20 (ref), u10 (ref), u11 (ref), u12 (ref), u13 (ref)\n        u18 = u18 + u22.Consumes * u21 / u22.Speed;\n        local v28 = Pollution;\n        v28.Value = v28.Value + u22.Pollution;\n\n        if p27 == 1 then\n            if u22.IOut1 ~= nil then\n                u9:addItemAmount(u22.IOut1[1], u22.IOut1[2] * u20);\n            end;\n\n            if u22.IOut2 ~= nil then\n                u10:addItemAmount(u22.IOut2[1], u22.IOut2[2] * u20);\n            end;\n\n            if u22.LOut1 ~= nil then\n                u11:addItemAmount(u22.LOut1[1], u22.LOut1[2] * u20);\n            end;\n\n            if u22.LOut2 ~= nil then\n                u12:addItemAmount(u22.LOut2[1], u22.LOut2[2] * u20);\n            end;\n\n            if u22.LOut3 ~= nil then\n                u13:addItemAmount(u22.LOut3[1], u22.LOut3[2] * u20);\n            end;\n        end;\n    end);\n\n    return true;\nend;\n\nlocal u29 = 1;\n\nfunction v16.tick() -- Line: 186\n    -- upvalues: u2 (copy), Display (copy), u18 (ref), u1 (copy), State (copy), checkRecipe (copy), InternalRecipes (copy), u29 (ref)\n    if u2:hasPower(1) then\n        Display.Visible = true;\n    else\n        Display.Visible = false;\n    end;\n\n    if u18 ~= 0 then\n        local v30 = u2:getBuffer();\n        local v31 = math.clamp(v30, 0, u18);\n        u18 = u18 - v31;\n        u2:removePower(v31);\n    end;\n\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if u18 ~= 0 then\n        State.Value = \"\";\n        Display.Body.status.Text = \"LACK OF POWER\";\n        Display.Visible = false;\n\n        return;\n    end;\n\n    if checkRecipe(InternalRecipes[u29]) then\n        Display.Body.status.Text = \"RUNNING\";\n\n        return;\n    end;\n\n    for i, v in ipairs(InternalRecipes) do\n        if i ~= u29 and checkRecipe(v) then\n            u29 = i;\n            Display.Body.status.Text = \"RUNNING\";\n\n            return;\n        end;\n    end;\n\n    State.Value = \"\";\n    Display.Body.status.Text = \"OFFLINE\";\nend;\n\nreturn v16;"
};
