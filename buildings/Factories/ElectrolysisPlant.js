export default {
  id: "ElectrolysisPlant",
  category: "Factories",
  tier: 4,
  cost: 650000,
  base: {
    height: 11.999975204467773,
    offset: {
      y: -4,
      x: 7.9999847412109375
    },
    width: 20
  },
  nodes: [
    {
      name: "OutItemMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -1.05615234375,
        x: 17.684982299804688
      },
      gameOffset: {
        y: 2.0197439193725586,
        x: 17.684982299804688,
        z: -1.05615234375
      },
      tip: "Output for Zinc"
    },
    {
      name: "ItemIn1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -0.97503662109375,
        x: -2.0510101318359375
      },
      gameOffset: {
        y: 2.030001640319824,
        x: -2.0510101318359375,
        z: -0.97503662109375
      },
      tip: "Input for Zinc Sulfate"
    },
    {
      name: "InFluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: -4.975006103515625,
        x: -2.0760040283203125
      },
      gameOffset: {
        y: 2.0250024795532227,
        x: -2.0760040283203125,
        z: -4.975006103515625
      },
      tip: "Input for Water/Concentrated Salt Solution"
    },
    {
      name: "InFluid2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: -2.97503662109375,
        x: -2.0760040283203125
      },
      gameOffset: {
        y: 2.0250024795532227,
        x: -2.0760040283203125,
        z: -2.97503662109375
      },
      tip: "Input for ..."
    },
    {
      name: "Out2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: -4.998931884765625,
        x: 17.699981689453125
      },
      gameOffset: {
        y: 2.02474308013916,
        x: 17.699981689453125,
        z: -4.998931884765625
      },
      tip: "Output for Hydrogen/Sodium Hydroxide Solution"
    },
    {
      name: "Out1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: -2.99896240234375,
        x: 17.699981689453125
      },
      gameOffset: {
        y: 2.02474308013916,
        x: 17.699981689453125,
        z: -2.99896240234375
      },
      tip: "Output for Oxygen/Chlorine/Residue"
    },
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 0,
      siteOffset: {
        y: -7.900054931640625,
        x: -0.1250152587890625
      },
      gameOffset: {
        y: 16.674999237060547,
        x: -0.1250152587890625,
        z: -7.900054931640625
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InFluidMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InFluid2MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.ItemIn1MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.OutItemMainPipe);\nlocal u7 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal v8 = {};\nlocal u9 = {\n    Water = {\n        Input = \"In1\",\n        Amount = 8,\n        Time = 30,\n        Power = 750000,\n        Output1 = { \"Oxygen\", 30 },\n        Output2 = { \"Hydrogen\", 60 },\n        ItemOut = nil,\n        Color = 1\n    },\n    [\"Concentrated Salt Solution\"] = {\n        Input = \"In1\",\n        Amount = 8,\n        Time = 30,\n        Power = 750000,\n        Output1 = { \"Chlorine\", 60 },\n        Output2 = { \"Sodium Hydroxide Solution\", 6 },\n        ItemOut = nil,\n        Color = 1\n    },\n    [\"Zinc Sulfate\"] = {\n        Input = \"ItemIn\",\n        Amount = 30,\n        Time = 30,\n        Power = 750000,\n        Output1 = { \"Residue\", 10 },\n        Output2 = nil,\n        ItemOut = { \"Zinc\", 20 },\n        Color = 2\n    }\n};\nlocal u10 = nil;\nlocal Bubbles1 = script.Parent.Bubbles1;\nlocal Bubbles2 = script.Parent.Bubbles2;\nlocal u11 = ColorSequence.new(Color3.fromRGB(255, 255, 255));\nlocal u12 = ColorSequence.new(Color3.fromRGB(38, 150, 255));\n\nfunction v8.localUpdate() -- Line: 61\n    -- upvalues: State (copy), Bubbles1 (copy), Bubbles2 (copy), u11 (copy), u12 (copy)\n    if State.Value == \"\" then\n        if State.Value == \"\" then\n            Bubbles1.Bubbles.Enabled = false;\n            Bubbles2.Bubbles.Enabled = false;\n            script.Parent.Base[\"Oil Refinery Ambience 3 (SFX)\"]:Stop();\n        end;\n\n        return;\n    end;\n\n    Bubbles1.Bubbles.Enabled = true;\n    Bubbles2.Bubbles.Enabled = true;\n\n    if State.Value == \"1\" then\n        Bubbles1.Bubbles.Color = u11;\n        Bubbles2.Bubbles.Color = u11;\n    elseif State.Value == \"2\" then\n        Bubbles1.Bubbles.Color = u12;\n        Bubbles2.Bubbles.Color = u12;\n    end;\n\n    script.Parent.Base[\"Oil Refinery Ambience 3 (SFX)\"]:Play();\nend;\n\nlocal u13 = require(ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v8.tick() -- Line: 83\n    -- upvalues: u13 (copy), u10 (ref), u9 (copy), u7 (copy), u1 (copy), u2 (copy), u5 (copy), State (copy), u3 (copy), u4 (copy), u6 (copy)\n    if u13:tickIsBusy() then\n        return;\n    end;\n\n    u10 = nil;\n    local v14 = 0;\n\n    for i, v in pairs(u9) do\n        if u7:getBuffer() >= v.Time * v.Power then\n            if v.Input == \"In1\" and u1:hasAmountOf(i, v.Amount) then\n                u10 = i;\n                break;\n            end;\n\n            if v.Input == \"In2\" and u2:hasAmountOf(i, v.Amount) then\n                u10 = i;\n                v14 = 1;\n                break;\n            end;\n\n            if v.Input == \"ItemIn\" and u5:hasAmountOf(i, v.Amount) then\n                u10 = i;\n                v14 = 2;\n                break;\n            end;\n        end;\n    end;\n\n    if u10 == nil then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    State.Value = u9[u10].Color;\n\n    if v14 == 0 then\n        u1:removeItem(u9[u10].Amount);\n    elseif v14 == 1 then\n        u2:removeItem(u9[u10].Amount);\n    elseif v14 == 2 then\n        u5:removeItem(u9[u10].Amount);\n    end;\n\n    u13:nextTicks(u9[u10].Time, function(p15) -- Line: 116\n        -- upvalues: u9 (ref), u10 (ref), u3 (ref), u4 (ref), u6 (ref), u7 (ref)\n        if p15 == 1 then\n            if u9[u10].Output1 ~= nil then\n                u3:addItemAmount(u9[u10].Output1[1], u9[u10].Output1[2]);\n            end;\n\n            if u9[u10].Output2 ~= nil then\n                u4:addItemAmount(u9[u10].Output2[1], u9[u10].Output2[2]);\n            end;\n\n            if u9[u10].ItemOut ~= nil then\n                u6:addItemAmount(u9[u10].ItemOut[1], u9[u10].ItemOut[2]);\n            end;\n        end;\n\n        u7:removePower(u9[u10].Power);\n    end);\nend;\n\nreturn v8;"
};
