export default {
  id: "AdvancedAssembler",
  category: "Factories",
  tier: 4,
  cost: 150000,
  base: {
    height: 24,
    offset: {
      y: -10,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "ItemIn1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: -0.999420166015625,
        x: 1.5250701904296875
      },
      gameOffset: {
        y: 1.3750019073486328,
        x: 1.5250701904296875,
        z: -0.999420166015625
      }
    },
    {
      name: "ItemIn2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: -2.999420166015625,
        x: 1.5250701904296875
      },
      gameOffset: {
        y: 1.3764009475708008,
        x: 1.5250701904296875,
        z: -2.999420166015625
      }
    },
    {
      name: "ItemIn3MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: -4.999420166015625,
        x: 1.5250701904296875
      },
      gameOffset: {
        y: 1.3771858215332031,
        x: 1.5250701904296875,
        z: -4.999420166015625
      }
    },
    {
      name: "ItemIn4MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: -6.999420166015625,
        x: 1.5250701904296875
      },
      gameOffset: {
        y: 1.380690574645996,
        x: 1.5250701904296875,
        z: -6.999420166015625
      }
    },
    {
      name: "InFluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: -9.001251220703125,
        x: 1.5447540283203125
      },
      gameOffset: {
        y: 1.492208480834961,
        x: 1.5447540283203125,
        z: -9.001251220703125
      }
    },
    {
      name: "Out2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -21.487548828125,
        x: -3.00042724609375
      },
      gameOffset: {
        y: 1.3777599334716797,
        x: -3.00042724609375,
        z: -21.487548828125
      },
      tip: "Output for ..."
    },
    {
      name: "Out1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -21.487548828125,
        x: -1.00042724609375
      },
      gameOffset: {
        y: 1.3767595291137695,
        x: -1.00042724609375,
        z: -21.487548828125
      },
      tip: "Output for Chair/Tire/Tire Rim/Insulated Wire/Crankshaft/Gearbox/Toy/Uncharged Lithium-Ion Battery/Lithium Battery Pack/Filter/Dynamite"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -20.5601806640625,
        x: 1.189208984375
      },
      gameOffset: {
        y: 8.5865478515625,
        x: 1.189208984375,
        z: -20.5601806640625
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.ItemIn1MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.ItemIn2MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.ItemIn3MainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.ItemIn4MainPipe);\nlocal u8 = PipeUtilsV2.loadConnector(script.Parent.InFluidMainPipe);\nlocal u9 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal u10 = 0;\nlocal u11 = \"\";\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal v12 = {};\nlocal u13 = {\n    { { { \"Nails\", 20 }, { \"Planks\", 12 } }, { { \"Chair\", 1 } }, 5 },\n    { { { \"Aluminium Ingot\", 2 }, { \"Steel Ingot\", 4 } }, { { \"Tire Rim\", 1 } }, 5 },\n    { { { \"Rubber\", 4 }, { \"Tire Rim\", 1 } }, { { \"Tire\", 1 } }, 5 },\n    { { { \"Copper Wire\", 8 }, { \"Rubber\", 4 } }, { { \"Insulated Wire\", 8 } }, 1 },\n    { { { \"Crankshaft\", 1 }, { \"Plastic Casing\", 2 } }, { { \"Gearbox\", 1 } }, 5 },\n    { { { \"Gear\", 4 }, { \"Plastic Casing\", 2 }, { \"Steel Rod\", 2 } }, { { \"Gearbox\", 1 } }, 10 },\n    { { { \"Gear\", 8 }, { \"Hardened Plastic Casing\", 2 }, { \"Steel Rod\", 4 } }, { { \"Gearbox\", 2 } }, 5 },\n    { { { \"Gear\", 4 }, { \"Steel Rod\", 2 } }, { { \"Crankshaft\", 1 } }, 5 },\n    { { { \"Black Dye\", 6 }, { \"Planks\", 3 } }, { { \"Toy\", 1 } }, 5 },\n    { { { \"Graphite-Iron Electrode\", 2 }, { \"Lithium Carbonate\", 4 }, { \"Plastic Pellets\", 10 } }, { { \"Uncharged Lithium-Ion Battery\", 1 } }, 10 },\n    { { { \"Graphite-Zinc Electrode\", 2 }, { \"Lithium Carbonate\", 4 }, { \"Plastic Pellets\", 10 } }, { { \"Uncharged Lithium-Ion Battery\", 1 } }, 10 },\n    { { { \"Charged Lithium-Ion Battery\", 8 }, { \"Copper Plate\", 12 }, { \"Rubber\", 8 } }, { { \"Lithium Battery Pack\", 1 } }, 10 },\n    { { { \"Coal\", 5 }, { \"Iron Coil\", 2 }, { \"Paper\", 2 }, { \"Sand\", 2 } }, { { \"Filter\", 1 } }, 5 },\n    { { { \"Coal\", 5 }, { \"Gravel\", 2 }, { \"Iron Coil\", 2 }, { \"Paper\", 2 } }, { { \"Filter\", 2 } }, 5 },\n    { { { \"Insulated Wire\", 40 }, { \"Steel Rod\", 2 } }, { { \"Electromagnet\", 2 } }, 5 },\n    { { { \"Electromagnet\", 4 }, { \"Ferroaluminium Magnet\", 0.2 }, { \"Steel Plate\", 4 }, { \"Steel Rod\", 2 } }, { { \"Electric Motor\", 2 } }, 5, { \"Machine Oil\", 2 } },\n    { { { \"Electromagnet\", 6 }, { \"Steel Plate\", 4 }, { \"Steel Rod\", 2 } }, { { \"Electric Motor\", 2 } }, 5, { \"Machine Oil\", 2 } },\n    { { { \"Gunpowder\", 6 }, { \"Paper\", 6 } }, { { \"Dynamite\", 1 } }, 5 },\n    { { { \"Black Dye\", 9 }, { \"Paper\", 6 } }, { { \"Present Box\", 2 } }, 8 }\n};\n\nfunction v12.tick() -- Line: 129\n    -- upvalues: u1 (copy), u2 (copy), State (copy), u9 (copy), u4 (copy), u5 (copy), u6 (copy), u7 (copy), u13 (copy), u8 (copy), u10 (ref), u11 (ref), u3 (copy)\n    if u1:tickIsBusy() then\n        return;\n    end;\n\n    if not u2:canHoldXMore(1) then\n        State.Value = \"0\";\n\n        return;\n    end;\n\n    if u9:getBuffer() < 1000000 then\n        State.Value = \"0\";\n\n        return;\n    end;\n\n    local v14 = {\n        { u4:getItem(), u4:getBuffer(), 1 },\n        { u5:getItem(), u5:getBuffer(), 2 },\n        { u6:getItem(), u6:getBuffer(), 3 },\n        { u7:getItem(), u7:getBuffer(), 4 }\n    };\n    table.sort(v14, function(p15, p16) -- Line: 141\n        if p15[1] == \"\" then\n            return false;\n        end;\n\n        return p16[1] == \"\" and true or p15[1]:lower() < p16[1]:lower();\n    end);\n    local v17 = nil;\n\n    for _, v in pairs(u13) do\n        for i, v2 in ipairs(v[1]) do\n            if v14[i][1] ~= v2[1] then\n                v17 = nil;\n                break;\n            end;\n\n            v17 = v;\n        end;\n\n        if v17 ~= nil then\n            break;\n        end;\n    end;\n\n    if v17 ~= nil then\n        for i, v in ipairs(v17[1]) do\n            if v14[i][2] < v[2] then\n                v17 = nil;\n            end;\n        end;\n\n        if v17 ~= nil and not u2:canHoldXMoreOf(v17[2][1][1], v17[2][1][2]) then\n            v17 = nil;\n        end;\n    end;\n\n    if v17 and (v17[4] ~= nil and not u8:hasAmountOf(v17[4][1], v17[4][2])) then\n        v17 = nil;\n    end;\n\n    if v17 == nil then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u10 = v17[3];\n    u11 = v17[2];\n\n    for i, v in ipairs(v17[1]) do\n        if v14[i][1] == v[1] and v14[i][2] >= v[2] then\n            local v18 = u4;\n\n            if v14[i][3] == 2 then\n                v18 = u5;\n            elseif v14[i][3] == 3 then\n                v18 = u6;\n            elseif v14[i][3] == 4 then\n                v18 = u7;\n            end;\n\n            v18:removeItem(v[2]);\n        end;\n    end;\n\n    if v17[4] ~= nil then\n        u8:removeItem(v17[4][2]);\n    end;\n\n    State.Value = \"1\";\n    u1:nextTicks(u10, function(p19) -- Line: 208\n        -- upvalues: u11 (ref), u2 (ref), u3 (ref), u9 (ref), u10 (ref)\n        if p19 == 1 then\n            for i, v in ipairs(u11) do\n                if i == 1 then\n                    u2:addItemAmount(v[1], v[2]);\n                elseif i == 2 then\n                    u3:addItemAmount(v[1], v[2]);\n                end;\n            end;\n        end;\n\n        u9:removePower(1000000 / u10);\n    end);\nend;\n\nreturn v12;"
};
