export default {
  id: "ChemicalReactor",
  category: "Factories",
  tier: 3,
  cost: 750000,
  base: {
    height: 20,
    offset: {
      y: 8,
      x: 8
    },
    width: 20
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 5000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.0001220703125,
        x: 14.37518310546875
      },
      gameOffset: {
        y: 11.270954132080078,
        x: 14.37518310546875,
        z: -0.0001220703125
      }
    },
    {
      name: "OutFluid1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 7.010009765625,
        x: 17.430999755859375
      },
      gameOffset: {
        y: 1.4770030975341797,
        x: 17.430999755859375,
        z: 7.010009765625
      },
      tip: "Output for Residue/Sulfuric Acid/GasolineE10/Leaded Gasoline/Tetraethyllead"
    },
    {
      name: "InFluid1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 9.010009765625,
        x: -1.5
      },
      gameOffset: {
        y: 1.4700031280517578,
        x: -1.5,
        z: 9.010009765625
      }
    },
    {
      name: "ItemIn1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: 1,
        x: -1.37493896484375
      },
      gameOffset: {
        y: 1.332998275756836,
        x: -1.37493896484375,
        z: 1
      }
    },
    {
      name: "OutItem1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: 11,
        x: 17.37493896484375
      },
      gameOffset: {
        y: 1.332998275756836,
        x: 17.37493896484375,
        z: 11
      },
      tip: "Output for Rubber/Dirty Lithium Sulfate/Lithium Sulfate/Lithium Carbonate/Treated Raw Iron/Treated Raw Copper/Galvanized Steel/Powdered Tungsten Carbide/Sulfur/Gunpowder/Gold Ingot/Zirconium Chloride/Zirconium Dioxide"
    },
    {
      name: "ItemIn2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: 3,
        x: -1.37493896484375
      },
      gameOffset: {
        y: 1.332998275756836,
        x: -1.37493896484375,
        z: 3
      }
    },
    {
      name: "InFluid2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 10.989990234375,
        x: -1.5
      },
      gameOffset: {
        y: 1.4700031280517578,
        x: -1.5,
        z: 10.989990234375
      }
    },
    {
      name: "InFluid3MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 12.989990234375,
        x: -1.5
      },
      gameOffset: {
        y: 1.4700031280517578,
        x: -1.5,
        z: 12.989990234375
      }
    },
    {
      name: "OutItem2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: 9,
        x: 17.37493896484375
      },
      gameOffset: {
        y: 1.332998275756836,
        x: 17.37493896484375,
        z: 9
      },
      tip: "Output for ..."
    },
    {
      name: "OutFluid2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 5.010009765625,
        x: 17.430999755859375
      },
      gameOffset: {
        y: 1.4770030975341797,
        x: 17.430999755859375,
        z: 5.010009765625
      },
      tip: "Output for Hydrochloric Acid/Zinc Sulfate/Hydroflouric Acid"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.ItemIn1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.ItemIn2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OutItem1MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.OutItem2MainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.InFluid1MainPipe);\nlocal u8 = PipeUtilsV2.loadConnector(script.Parent.InFluid2MainPipe);\nlocal u9 = PipeUtilsV2.loadConnector(script.Parent.InFluid3MainPipe);\nlocal u10 = PipeUtilsV2.loadConnector(script.Parent.OutFluid1MainPipe);\nlocal u11 = PipeUtilsV2.loadConnector(script.Parent.OutFluid2MainPipe);\nlocal State = script.Parent.State;\nlocal u12 = {};\nlocal v13 = {\n    localUpdate = function() -- Line: 38, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value ~= \"Running\" then\n            if State.Value == \"\" then\n                script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = false;\n                script.Parent.Base.stuf:stop();\n            end;\n\n            return;\n        end;\n\n        script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = true;\n        script.Parent.Base.stuf:Play();\n    end\n};\n\nfor _, v in pairs({\n    {\n        speed = 6,\n        FluidsIn = { { \"Naphtha\", 10 }, { \"Heavy Oil\", 16 } },\n        ItemsIn = {},\n        FluidsOut = { { \"Residue\", 4 } },\n        ItemsOut = { { \"Rubber\", 8 } }\n    },\n    {\n        speed = 6,\n        FluidsIn = { { \"Sulfur Trioxide\", 20 }, { \"Water\", 20 } },\n        ItemsIn = {},\n        FluidsOut = { { \"Sulfuric Acid\", 15 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 3,\n        FluidsIn = { { \"Sulfur Trioxide\", 20 }, { \"Water\", 20 }, { \"Sulfuric Acid\", 2 } },\n        ItemsIn = {},\n        FluidsOut = { { \"Sulfuric Acid\", 15 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 3,\n        FluidsIn = { { \"Sulfur Trioxide\", 20 }, { \"Distilled Water\", 20 }, { \"Sulfuric Acid\", 2 } },\n        ItemsIn = {},\n        FluidsOut = { { \"Sulfuric Acid\", 17 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 6,\n        FluidsIn = { { \"Sulfuric Acid\", 5 }, { \"Distilled Water\", 20 }, { \"Sulfuric Acid\", 2 } },\n        ItemsIn = { { \"Microchip Scrap\", 5 } },\n        FluidsOut = {},\n        ItemsOut = { { \"Gold Ingot\", 1 } }\n    },\n    {\n        speed = 2,\n        FluidsIn = { { \"Sulfuric Acid\", 0.9 }, { \"Lithium Brine\", 6 } },\n        ItemsIn = {},\n        FluidsOut = {},\n        ItemsOut = { { \"Dirty Lithium Sulfate\", 4 } }\n    },\n    {\n        speed = 4,\n        FluidsIn = { { \"Water\", 10 } },\n        ItemsIn = { { \"Lithium Sulfate\", 8 }, { \"Sodium Carbonate\", 4 } },\n        FluidsOut = {},\n        ItemsOut = { { \"Lithium Carbonate\", 4 } }\n    },\n    {\n        speed = 2,\n        FluidsIn = { { \"Sulfuric Acid\", 1.4 } },\n        ItemsIn = { { \"Lithium Ore\", 4 }, { \"Sodium Carbonate\", 2 } },\n        FluidsOut = {},\n        ItemsOut = { { \"Lithium Sulfate\", 4 } }\n    },\n    {\n        speed = 4,\n        FluidsIn = { { \"Sulfuric Acid\", 0.8 } },\n        ItemsIn = { { \"Deep Earth Fragment\", 1 } },\n        FluidsOut = { { \"Residue\", 2 }, { \"Hydrofluoric Acid\", 1.8 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 4,\n        FluidsIn = { { \"Sulfuric Acid\", 2 } },\n        ItemsIn = { { \"Table Salt\", 2 } },\n        FluidsOut = { { \"Residue\", 2 }, { \"Hydrochloric Acid\", 4 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 5,\n        FluidsIn = { { \"Hydrochloric Acid\", 1 } },\n        ItemsIn = { { \"Raw Iron\", 20 } },\n        FluidsOut = { { \"Residue\", 4 } },\n        ItemsOut = { { \"Treated Raw Iron\", 20 } }\n    },\n    {\n        speed = 5,\n        FluidsIn = { { \"Hydrochloric Acid\", 1 } },\n        ItemsIn = { { \"Raw Copper\", 20 } },\n        FluidsOut = { { \"Residue\", 4 } },\n        ItemsOut = { { \"Treated Raw Copper\", 20 } }\n    },\n    {\n        speed = 5,\n        FluidsIn = { { \"Chlorine\", 20 }, { \"Hydrogen\", 20 }, { \"Distilled Water\", 5 } },\n        ItemsIn = {},\n        FluidsOut = { { \"\", 0 }, { \"Hydrochloric Acid\", 5 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 5,\n        FluidsIn = { { \"Sulfuric Acid\", 2 } },\n        ItemsIn = { { \"Raw Zinc\", 20 } },\n        FluidsOut = { { \"Residue\", 5 } },\n        ItemsOut = { { \"Zinc Sulfate\", 15 } }\n    },\n    {\n        speed = 5,\n        FluidsIn = {},\n        ItemsIn = { { \"Zinc\", 5 }, { \"Steel Ingot\", 20 } },\n        FluidsOut = {},\n        ItemsOut = { { \"Galvanized Steel\", 20 } }\n    },\n    {\n        speed = 5,\n        FluidsIn = { { \"Ethanol\", 4 } },\n        ItemsIn = { { \"Lead Ingot\", 1 } },\n        FluidsOut = { { \"Tetraethyllead\", 10 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 6,\n        FluidsIn = { { \"Gasoline\", 9 }, { \"Ethanol\", 1 } },\n        ItemsIn = {},\n        FluidsOut = { { \"GasolineE10\", 10 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 6,\n        FluidsIn = { { \"Gasoline\", 9 }, { \"Tetraethyllead\", 1 } },\n        ItemsIn = {},\n        FluidsOut = { { \"Leaded Gasoline\", 10 } },\n        ItemsOut = {}\n    },\n    {\n        speed = 6,\n        FluidsIn = { { \"Hydrogen\", 20 } },\n        ItemsIn = { { \"Powdered Tungsten\", 4 }, { \"Black Dye\", 3 } },\n        FluidsOut = {},\n        ItemsOut = { { \"Powdered Tungsten Carbide\", 2 } }\n    },\n    {\n        speed = 4,\n        FluidsIn = { { \"Filtered Water\", 6 } },\n        ItemsIn = { { \"Treated Rock\", 2 } },\n        FluidsOut = {},\n        ItemsOut = { { \"Sulfur\", 1 } }\n    },\n    {\n        speed = 6,\n        FluidsIn = { { \"Water\", 10 } },\n        ItemsIn = { { \"Sulfur\", 8 }, { \"Coal\", 4 } },\n        FluidsOut = {},\n        ItemsOut = { { \"Gunpowder\", 4 } }\n    },\n    {\n        speed = 4,\n        FluidsIn = { { \"Chlorine\", 2 } },\n        ItemsIn = { { \"Raw Zirconium\", 2 } },\n        FluidsOut = { { \"Residue\", 1 } },\n        ItemsOut = { { \"Zirconium Chloride\", 4 } }\n    },\n    {\n        speed = 4,\n        FluidsIn = { { \"Distilled Water\", 6 } },\n        ItemsIn = { { \"Zirconium Chloride\", 2 } },\n        FluidsOut = { { \"\", 0 }, { \"Hydrochloric Acid\", 3 } },\n        ItemsOut = { { \"Zirconium Dioxide\", 2 } }\n    }\n}) do\n    local v14 = {};\n\n    for _, v2 in pairs(v.FluidsIn) do\n        table.insert(v14, v2[1]);\n    end;\n\n    for _, v2 in pairs(v.ItemsIn) do\n        table.insert(v14, v2[1]);\n    end;\n\n    table.sort(v14);\n    local v15 = \"\";\n\n    for _, v2 in pairs(v14) do\n        v15 = v15 .. v2;\n    end;\n\n    u12[v15] = v;\nend;\n\nfunction v13.tick() -- Line: 444\n    -- upvalues: u1 (copy), u2 (copy), State (copy), u3 (copy), u4 (copy), u7 (copy), u8 (copy), u9 (copy), u12 (copy), u10 (copy), u11 (copy), u5 (copy), u6 (copy), Pollution (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u2:hasPower(3000000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v16 = u3:getItem();\n    local v17 = u3:getBuffer();\n    local v18 = u4:getItem();\n    local v19 = u4:getBuffer();\n    local v20 = u7:getItem();\n    local v21 = u7:getBuffer();\n    local v22 = u8:getItem();\n    local v23 = u8:getBuffer();\n    local v24 = u9:getItem();\n    local v25 = u9:getBuffer();\n    local v26 = {\n        v16,\n        v18,\n        v20,\n        v22,\n        v24\n    };\n    table.sort(v26);\n    local v27 = \"\";\n\n    for _, v in pairs(v26) do\n        v27 = v27 .. v;\n    end;\n\n    local u28 = u12[v27];\n\n    if u28 == nil then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v29 = true;\n\n    for i, v in pairs(u28.FluidsOut) do\n        if i == 1 then\n            if not u10:canHoldXMoreOf(v[1], v[2]) then\n                v29 = false;\n                break;\n            end;\n        elseif i == 2 and not u11:canHoldXMoreOf(v[1], v[2]) then\n            v29 = false;\n            break;\n        end;\n    end;\n\n    if v29 == false then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    for i, v in pairs(u28.ItemsOut) do\n        if i == 1 then\n            if not u5:canHoldXMoreOf(v[1], v[2]) then\n                v29 = false;\n                break;\n            end;\n        elseif i == 2 and not u6:canHoldXMoreOf(v[1], v[2]) then\n            v29 = false;\n            break;\n        end;\n    end;\n\n    if v29 == false then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    for _, v in pairs(u28.FluidsIn) do\n        if v[1] ~= v20 or v[2] > v21 then\n            if v[1] ~= v22 or v[2] > v23 then\n                if v[1] ~= v24 or v[2] > v25 then\n                    v29 = false;\n                    break;\n                end;\n            end;\n        end;\n    end;\n\n    if v29 == false then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    for _, v in pairs(u28.ItemsIn) do\n        if v[1] ~= v16 or v[2] > v17 then\n            if v[1] ~= v18 or v[2] > v19 then\n                v29 = false;\n                break;\n            end;\n        end;\n    end;\n\n    if v29 == false then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    for _, v in pairs(u28.FluidsIn) do\n        if v[1] == v20 then\n            u7:removeItem(v[2]);\n        elseif v[1] == v22 then\n            u8:removeItem(v[2]);\n        elseif v[1] == v24 then\n            u9:removeItem(v[2]);\n        end;\n    end;\n\n    for _, v in pairs(u28.ItemsIn) do\n        if v[1] == v16 then\n            u3:removeItem(v[2]);\n        elseif v[1] == v18 then\n            u4:removeItem(v[2]);\n        end;\n    end;\n\n    State.Value = \"Running\";\n    u1:nextTicks(u28.speed, function(p30) -- Line: 541\n        -- upvalues: u28 (copy), u10 (ref), u11 (ref), u5 (ref), u6 (ref), u2 (ref), Pollution (ref)\n        if p30 == 1 then\n            for i, v in ipairs(u28.FluidsOut) do\n                if i == 1 then\n                    u10:addItemAmount(v[1], v[2]);\n                elseif i == 2 then\n                    u11:addItemAmount(v[1], v[2]);\n                end;\n            end;\n\n            for i, v in ipairs(u28.ItemsOut) do\n                if i == 1 then\n                    u5:addItemAmount(v[1], v[2]);\n                elseif i == 2 then\n                    u6:addItemAmount(v[1], v[2]);\n                end;\n            end;\n        end;\n\n        u2:removePower(500000);\n        local v31 = Pollution;\n        v31.Value = v31.Value + 225;\n    end);\nend;\n\nreturn v13;"
};
