export default {
  id: "PrecisionAssembler",
  category: "Factories",
  tier: 4,
  cost: 1000000,
  base: {
    height: 24,
    offset: {
      y: -10,
      x: 0
    },
    width: 12
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 5000000,
      transferAmount: 0,
      siteOffset: {
        y: 1.3125,
        x: 0.00250244140625
      },
      gameOffset: {
        y: 12.862476348876953,
        x: 0.00250244140625,
        z: 1.3125
      }
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: 1.5,
        x: -3
      },
      gameOffset: {
        y: 1.3150062561035156,
        x: -3,
        z: 1.5
      },
      tip: "Input for Silicon/Logic Plate/Coal/Zirconium Rod/Lithium Carbonate"
    },
    {
      name: "Out1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: -21.899993896484375,
        x: 1.0300064086914062
      },
      gameOffset: {
        y: 2.2450027465820312,
        x: 1.0300064086914062,
        z: -21.899993896484375
      },
      tip: "Output for Logic Plates/Semiconductors/8x Microchip/Graphite-Iron Electrode/Graphite-Zinc Electrode/Enriched Uranium Fuel Rod/MOX Fuel Rod/Uncharged Lithium-Ion Battery/Control Rod/Standard Fuel Rod"
    },
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: 1.5,
        x: -1
      },
      gameOffset: {
        y: 1.3150062561035156,
        x: -1,
        z: 1.5
      },
      tip: "Input for Plastic Pellets/Aluminium/Copper Wire/Iron Ingot/Zinc/Enriched UO2 Pellets/Graphite-Zinc Electrode/Graphite-Iron Electrode/Boron"
    },
    {
      name: "In3MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: 1.5,
        x: 1
      },
      gameOffset: {
        y: 1.3150062561035156,
        x: 1,
        z: 1.5
      },
      tip: "Input for Copper Plates/Semiconductor/Yellowcake/Hardened Plastic Casing"
    },
    {
      name: "In4MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: 1.5,
        x: 3
      },
      gameOffset: {
        y: 1.3150062561035156,
        x: 3,
        z: 1.5
      },
      tip: "Input for Gold Wire/Insulated Wire"
    },
    {
      name: "Out2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 30,
      transferAmount: 2,
      siteOffset: {
        y: -21.899993896484375,
        x: -0.9699935913085938
      },
      gameOffset: {
        y: 2.2450027465820312,
        x: -0.9699935913085938,
        z: -21.899993896484375
      },
      tip: "Output for"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.In3MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.In4MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nPipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u6 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal u7 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u8 = \"\";\nlocal u9 = 0;\nlocal v10 = {\n    localUpdate = function() -- Line: 24, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value ~= \"On\" then\n            if State.Value == \"Off\" then\n                script.Parent.Base[\"Electric shock idle looped\"]:Stop();\n\n                for _, child in pairs(script.Parent.Lights:GetChildren()) do\n                    child.Color = Color3.fromRGB(0, 0, 0);\n                end;\n            end;\n\n            return;\n        end;\n\n        script.Parent.Base[\"Electric shock idle looped\"]:Play();\n\n        for _, child in pairs(script.Parent.Lights:GetChildren()) do\n            child.Color = Color3.fromRGB(248, 217, 109);\n        end;\n    end\n};\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\n\nfunction v10.tick() -- Line: 41\n    -- upvalues: u7 (copy), u6 (copy), State (copy), u5 (copy), u1 (copy), u2 (copy), u3 (copy), u8 (ref), u9 (ref), u4 (copy), Achievements (copy)\n    if u7:tickIsBusy() then\n        return;\n    end;\n\n    if not u6:hasPower(5000000) then\n        State.Value = \"Off\";\n\n        return;\n    end;\n\n    if not u5:canHoldXMore(2) then\n        State.Value = \"Off\";\n\n        return;\n    end;\n\n    local u11;\n\n    if u1:hasAmountOf(\"Silicon\", 4) and (u2:hasAmountOf(\"Plastic Pellets\", 10) and u3:hasAmountOf(\"Copper Plate\", 2)) then\n        u8 = \"Logic Plate\";\n        u11 = 2;\n        u1:removeItem(4);\n        u2:removeItem(10);\n        u3:removeItem(2);\n        u9 = 5;\n    elseif u1:hasAmountOf(\"Silicon\", 4) and u2:hasAmountOf(\"Aluminium Ingot\", 1) then\n        u8 = \"Semiconductor\";\n        u11 = 2;\n        u1:removeItem(4);\n        u2:removeItem(1);\n        u9 = 5;\n    elseif u1:hasAmountOf(\"Logic Plate\", 6) and (u2:hasAmountOf(\"Copper Wire\", 16) and (u3:hasAmountOf(\"Semiconductor\", 5) and u4:hasAmountOf(\"Gold Wire\", 10))) then\n        u8 = \"8x Microchip\";\n        u11 = 1;\n        u1:removeItem(6);\n        u2:removeItem(16);\n        u3:removeItem(5);\n        u4:removeItem(10);\n        u9 = 30;\n    elseif u1:hasAmountOf(\"Coal\", 5) and (u2:hasAmountOf(\"Iron Ingot\", 14) and u5:canHoldXMoreOf(\"Graphite-Iron Electrode\", 20)) then\n        u8 = \"Graphite-Iron Electrode\";\n        u11 = 20;\n        u1:removeItem(5);\n        u2:removeItem(14);\n        u9 = 5;\n    elseif u1:hasAmountOf(\"Coal\", 5) and (u2:hasAmountOf(\"Zinc\", 14) and u5:canHoldXMoreOf(\"Graphite-Zinc Electrode\", 10)) then\n        u8 = \"Graphite-Zinc Electrode\";\n        u11 = 10;\n        u1:removeItem(5);\n        u2:removeItem(14);\n        u9 = 5;\n    elseif u1:hasAmountOf(\"Zirconium Rod\", 1) and (u2:hasAmountOf(\"Enriched UO2 Pellets\", 20) and u5:canHoldXMoreOf(\"Standard Fuel Rod\", 1)) then\n        u8 = \"Standard Fuel Rod\";\n        u11 = 1;\n        u1:removeItem(1);\n        u2:removeItem(20);\n        u9 = 5;\n    elseif u1:hasAmountOf(\"Zirconium Rod\", 1) and (u2:hasAmountOf(\"Boron\", 40) and u5:canHoldXMoreOf(\"Control Rod\", 1)) then\n        u8 = \"Control Rod\";\n        u11 = 1;\n        u1:removeItem(1);\n        u2:removeItem(40);\n        u9 = 5;\n    elseif u1:hasAmountOf(\"Zirconium Rod\", 1) and (u2:hasAmountOf(\"Plutonium Oxide Pellets\", 20) and (u3:hasAmountOf(\"Yellowcake\", 10) and u5:canHoldXMoreOf(\"MOX Fuel Rod\", 1))) then\n        u8 = \"MOX Fuel Rod\";\n        u11 = 1;\n        u1:removeItem(1);\n        u2:removeItem(20);\n        u3:removeItem(10);\n        Achievements.giveBadge(3403267940741676);\n        u9 = 5;\n    elseif u1:hasAmountOf(\"Zirconium Rod\", 1) and (u2:hasAmountOf(\"Yellowcake\", 30) and u5:canHoldXMoreOf(\"Low Enrichment Fuel Rod\", 1)) then\n        u8 = \"Low Enrichment Fuel Rod\";\n        u11 = 1;\n        u1:removeItem(1);\n        u2:removeItem(30);\n        u9 = 5;\n    elseif u1:hasAmountOf(\"Zirconium Rod\", 1) and (u3:hasAmountOf(\"Yellowcake\", 30) and u5:canHoldXMoreOf(\"Low Enrichment Fuel Rod\", 1)) then\n        u8 = \"Low Enrichment Fuel Rod\";\n        u11 = 1;\n        u1:removeItem(1);\n        u3:removeItem(30);\n        u9 = 5;\n    else\n        if not (u1:hasAmountOf(\"Lithium Carbonate\", 10) and (u2:hasAmountOf(\"Graphite-Iron Electrode\", 4) or u2:hasAmountOf(\"Graphite-Zinc Electrode\", 4)) and (u3:hasAmountOf(\"Hardened Plastic Casing\", 0.25) and u5:canHoldXMoreOf(\"Uncharged Lithium-Ion Battery\", 2))) then\n            State.Value = \"Off\";\n\n            return;\n        end;\n\n        u8 = \"Uncharged Lithium-Ion Battery\";\n        u11 = 2;\n        u1:removeItem(10);\n        u2:removeItem(4);\n        u3:removeItem(0.25);\n        u9 = 5;\n    end;\n\n    State.Value = \"On\";\n    u7:nextTicks(u9, function(p12) -- Line: 128\n        -- upvalues: u5 (ref), u8 (ref), u11 (ref), u6 (ref), u9 (ref)\n        if p12 == 1 then\n            u5:addItemAmount(u8, u11);\n        end;\n\n        u6:removePower(5000000 / u9);\n    end);\nend;\n\nreturn v10;"
};
