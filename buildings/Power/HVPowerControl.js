export default {
  id: "HVPowerControl",
  category: "Power",
  tier: 4,
  cost: 10000000,
  base: {
    height: 100,
    offset: {
      y: 66,
      x: -48
    },
    width: 136
  },
  nodes: [
    {
      name: "In1MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 42.022216796875,
        x: -88.347900390625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -88.347900390625,
        z: 42.022216796875
      },
      tip: "Input",
      wireRange: 100
    },
    {
      name: "In2MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 44.5413818359375,
        x: -88.347900390625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -88.347900390625,
        z: 44.5413818359375
      },
      tip: "Input",
      wireRange: 100
    },
    {
      name: "Overflow5MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 7.8807373046875,
        x: -29.6671142578125
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -29.6671142578125,
        z: 7.8807373046875
      },
      tip: "Overflow output",
      wireRange: 100
    },
    {
      name: "Overflow6MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 7.8807373046875,
        x: -32.186279296875
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -32.186279296875,
        z: 7.8807373046875
      },
      tip: "Overflow output",
      wireRange: 100
    },
    {
      name: "Out6MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 124.2254638671875,
        x: -32.186279296875
      },
      gameOffset: {
        y: 31.018173217773438,
        x: -32.186279296875,
        z: 124.2254638671875
      },
      tip: "Normal Output",
      wireRange: 100
    },
    {
      name: "Out5MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 124.2254638671875,
        x: -29.6671142578125
      },
      gameOffset: {
        y: 31.018173217773438,
        x: -29.6671142578125,
        z: 124.2254638671875
      },
      tip: "Normal Output",
      wireRange: 100
    },
    {
      name: "In5MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 72.04541015625,
        x: -88.347900390625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -88.347900390625,
        z: 72.04541015625
      },
      tip: "Input",
      wireRange: 100
    },
    {
      name: "In6MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 74.5645751953125,
        x: -88.347900390625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -88.347900390625,
        z: 74.5645751953125
      },
      tip: "Input",
      wireRange: 100
    },
    {
      name: "Out4MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 124.2254638671875,
        x: -17.195465087890625
      },
      gameOffset: {
        y: 31.018173217773438,
        x: -17.195465087890625,
        z: 124.2254638671875
      },
      tip: "Normal Output",
      wireRange: 100
    },
    {
      name: "Out3MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 124.2254638671875,
        x: -14.654693603515625
      },
      gameOffset: {
        y: 31.018173217773438,
        x: -14.654693603515625,
        z: 124.2254638671875
      },
      tip: "Normal Output",
      wireRange: 100
    },
    {
      name: "In3MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 57.02783203125,
        x: -88.347900390625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -88.347900390625,
        z: 57.02783203125
      },
      tip: "Input",
      wireRange: 100
    },
    {
      name: "In4MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 59.5469970703125,
        x: -88.347900390625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -88.347900390625,
        z: 59.5469970703125
      },
      tip: "Input",
      wireRange: 100
    },
    {
      name: "Overflow4MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 7.8807373046875,
        x: -17.19549560546875
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -17.19549560546875,
        z: 7.8807373046875
      },
      tip: "Overflow output",
      wireRange: 100
    },
    {
      name: "Overflow3MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 7.8807373046875,
        x: -14.67633056640625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -14.67633056640625,
        z: 7.8807373046875
      },
      tip: "Overflow output",
      wireRange: 100
    },
    {
      name: "Overflow7MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 7.8807373046875,
        x: -59.67333984375
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -59.67333984375,
        z: 7.8807373046875
      },
      tip: "Overflow output",
      wireRange: 100
    },
    {
      name: "Overflow8MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 7.8807373046875,
        x: -62.1925048828125
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -62.1925048828125,
        z: 7.8807373046875
      },
      tip: "Overflow output",
      wireRange: 100
    },
    {
      name: "Out8MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 124.2254638671875,
        x: -62.1925048828125
      },
      gameOffset: {
        y: 31.018173217773438,
        x: -62.1925048828125,
        z: 124.2254638671875
      },
      tip: "Normal Output",
      wireRange: 100
    },
    {
      name: "Out7MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 124.2254638671875,
        x: -59.67333984375
      },
      gameOffset: {
        y: 31.018173217773438,
        x: -59.67333984375,
        z: 124.2254638671875
      },
      tip: "Normal Output",
      wireRange: 100
    },
    {
      name: "In7MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 87.04638671875,
        x: -88.347900390625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -88.347900390625,
        z: 87.04638671875
      },
      tip: "Input",
      wireRange: 100
    },
    {
      name: "In8MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 89.5655517578125,
        x: -88.347900390625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -88.347900390625,
        z: 89.5655517578125
      },
      tip: "Input",
      wireRange: 100
    },
    {
      name: "Overflow1MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 7.8807373046875,
        x: -44.66204833984375
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -44.66204833984375,
        z: 7.8807373046875
      },
      tip: "Overflow output",
      wireRange: 100
    },
    {
      name: "Overflow2MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 7.8807373046875,
        x: -47.18121337890625
      },
      gameOffset: {
        y: 30.98725128173828,
        x: -47.18121337890625,
        z: 7.8807373046875
      },
      tip: "Overflow output",
      wireRange: 100
    },
    {
      name: "Out2MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 124.2254638671875,
        x: -47.18121337890625
      },
      gameOffset: {
        y: 31.018173217773438,
        x: -47.18121337890625,
        z: 124.2254638671875
      },
      tip: "Normal Output",
      wireRange: 100
    },
    {
      name: "Out1MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 40000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 124.2254638671875,
        x: -44.66204833984375
      },
      gameOffset: {
        y: 31.018173217773438,
        x: -44.66204833984375,
        z: 124.2254638671875
      },
      tip: "Normal Output",
      wireRange: 100
    }
  ],
  data: {
    Overflow: true,
    BlueFlow: 120,
    RedFlow: 120,
    GreenFlow: 120,
    YellowFlow: 120
  },
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new();\nlocal ModelData = script.Parent.ModelData;\nscript.Parent.PromptPart.ProximityPrompt.Triggered:Connect(function(p2) -- Line: 7\n    -- upvalues: u1 (copy)\n    u1:openMenu(p2);\nend);\nu1:addSetting(2, ModelData.Overflow, \"Excess power overflows.\");\nu1:addSetting(1, ModelData.GreenFlow, \"Max MMF/s per green output.\", 0, 240);\nu1:addSetting(1, ModelData.BlueFlow, \"Max MMF/s per blue output.\", 0, 240);\nu1:addSetting(1, ModelData.YellowFlow, \"Max MMF/s per yellow output.\", 0, 240);\nu1:addSetting(1, ModelData.RedFlow, \"Max MMF/s per red output.\", 0, 240);\nscript.Parent.PromptPart.ProximityPrompt.Enabled = true;\nlocal u3 = {\n    PowerUtilsV2.loadConnector(script.Parent.In1MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.In2MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.In3MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.In4MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.In5MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.In6MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.In7MainConnector, true),\n    (PowerUtilsV2.loadConnector(script.Parent.In8MainConnector, true))\n};\nlocal u4 = {\n    PowerUtilsV2.loadConnector(script.Parent.Out1MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Out2MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Out3MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Out4MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Out5MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Out6MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Out7MainConnector, true),\n    (PowerUtilsV2.loadConnector(script.Parent.Out8MainConnector, true))\n};\nlocal u5 = {\n    PowerUtilsV2.loadConnector(script.Parent.Overflow1MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Overflow2MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Overflow3MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Overflow4MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Overflow5MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Overflow6MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Overflow7MainConnector, true),\n    (PowerUtilsV2.loadConnector(script.Parent.Overflow8MainConnector, true))\n};\nlocal v6 = {};\nlocal RemoteEvent = script.Parent.RemoteEvent;\nlocal u7 = { { 0, 0, 0, 0, 0, 0, 0, 0 }, { 0, 0, 0, 0, 0, 0, 0, 0 }, { 0, 0, 0, 0, 0, 0, 0, 0 } };\nlocal u8 = 0;\n\nfunction v6.tick() -- Line: 69\n    -- upvalues: ModelData (copy), u3 (copy), u4 (copy), u5 (copy), u7 (copy), u8 (ref), RemoteEvent (copy)\n    local v9 = {\n        166666.66666666666 * ModelData.YellowFlow.Value,\n        166666.66666666666 * ModelData.YellowFlow.Value,\n        166666.66666666666 * ModelData.GreenFlow.Value,\n        166666.66666666666 * ModelData.GreenFlow.Value,\n        166666.66666666666 * ModelData.BlueFlow.Value,\n        166666.66666666666 * ModelData.BlueFlow.Value,\n        166666.66666666666 * ModelData.RedFlow.Value,\n        166666.66666666666 * ModelData.RedFlow.Value\n    };\n    local v10 = false;\n\n    for i = 1, 8 do\n        local v11 = v9[i];\n        local v12 = u3[i];\n        local v13 = u4[i];\n        local v14 = u5[i];\n        v10 = v10 == false and v12:getBuffer() > 0 and true or v10;\n        local v15 = v12:getBuffer();\n        local v16 = math.clamp(v15, 0, v11);\n        local v17 = v13:getMax() - v13:getBuffer();\n        local v18 = math.abs(v17);\n        local v19 = math.clamp(v16, 0, v18);\n        v13:addPower(v19);\n        v12:removePower(v19);\n        local v20 = u7[1];\n        v20[i] = v20[i] + v19;\n        local v21 = u7[3];\n        v21[i] = v21[i] + v19;\n\n        if ModelData.Overflow.Value then\n            local v22 = v12:getBuffer();\n            local v23 = v14:getMax() - v14:getBuffer();\n            local v24 = math.abs(v23);\n            local v25 = math.clamp(v22, 0, v24);\n            v14:addPower(v25);\n            v12:removePower(v25);\n            local v26 = u7[1];\n            v26[i] = v26[i] + v25;\n            local v27 = u7[2];\n            v27[i] = v27[i] + v25;\n        end;\n    end;\n\n    u8 = u8 + 1;\n\n    if u8 % 6 == 0 then\n        RemoteEvent:FireAllClients(u7);\n\n        for i = 1, 3 do\n            u7[i][1] = 0;\n            u7[i][2] = 0;\n            u7[i][3] = 0;\n            u7[i][4] = 0;\n            u7[i][5] = 0;\n            u7[i][6] = 0;\n            u7[i][7] = 0;\n            u7[i][8] = 0;\n        end;\n    end;\nend;\n\nreturn v6;"
};
