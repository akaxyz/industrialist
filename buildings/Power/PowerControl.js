export default {
  id: "PowerControl",
  category: "Power",
  tier: 3,
  cost: 50000,
  base: {
    height: 22,
    offset: {
      y: -9,
      x: 7
    },
    width: 18
  },
  nodes: [
    {
      name: "In1MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 3000000,
      transferAmount: 0,
      siteOffset: {
        y: 0.7552490234375,
        x: -0.44036865234375
      },
      gameOffset: {
        y: 8.600064277648926,
        x: -0.44036865234375,
        z: 0.7552490234375
      }
    },
    {
      name: "In2MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 3000000,
      transferAmount: 0,
      siteOffset: {
        y: 0.7552490234375,
        x: 3.25958251953125
      },
      gameOffset: {
        y: 8.601375579833984,
        x: 3.25958251953125,
        z: 0.7552490234375
      }
    },
    {
      name: "Overflow4MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 3000000,
      transferAmount: 250000,
      siteOffset: {
        y: -3.3592529296875,
        x: 14.4910888671875
      },
      gameOffset: {
        y: 9.905295372009277,
        x: 14.4910888671875,
        z: -3.3592529296875
      }
    },
    {
      name: "Overflow3MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 3000000,
      transferAmount: 250000,
      siteOffset: {
        y: -7.0384521484375,
        x: 14.4910888671875
      },
      gameOffset: {
        y: 9.905294418334961,
        x: 14.4910888671875,
        z: -7.0384521484375
      }
    },
    {
      name: "Overflow2MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 3000000,
      transferAmount: 250000,
      siteOffset: {
        y: -11.08843994140625,
        x: 14.4910888671875
      },
      gameOffset: {
        y: 9.905294418334961,
        x: 14.4910888671875,
        z: -11.08843994140625
      }
    },
    {
      name: "Overflow1MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 3000000,
      transferAmount: 250000,
      siteOffset: {
        y: -14.78839111328125,
        x: 14.4910888671875
      },
      gameOffset: {
        y: 9.905294418334961,
        x: 14.4910888671875,
        z: -14.78839111328125
      }
    },
    {
      name: "Out4MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 3000000,
      transferAmount: 250000,
      siteOffset: {
        y: -18.77386474609375,
        x: 10.98876953125
      },
      gameOffset: {
        y: 8.604114532470703,
        x: 10.98876953125,
        z: -18.77386474609375
      }
    },
    {
      name: "Out3MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 3000000,
      transferAmount: 250000,
      siteOffset: {
        y: -18.77386474609375,
        x: 7.3095703125
      },
      gameOffset: {
        y: 8.602810859680176,
        x: 7.3095703125,
        z: -18.77386474609375
      }
    },
    {
      name: "Out2MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 3000000,
      transferAmount: 250000,
      siteOffset: {
        y: -18.77386474609375,
        x: 3.25958251953125
      },
      gameOffset: {
        y: 8.601375579833984,
        x: 3.25958251953125,
        z: -18.77386474609375
      }
    },
    {
      name: "Out1MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 3000000,
      transferAmount: 250000,
      siteOffset: {
        y: -18.77386474609375,
        x: -0.44036865234375
      },
      gameOffset: {
        y: 8.600064277648926,
        x: -0.44036865234375,
        z: -18.77386474609375
      }
    },
    {
      name: "In4MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 3000000,
      transferAmount: 0,
      siteOffset: {
        y: 0.7552490234375,
        x: 10.98876953125
      },
      gameOffset: {
        y: 8.604114532470703,
        x: 10.98876953125,
        z: 0.7552490234375
      }
    },
    {
      name: "In3MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 3000000,
      transferAmount: 0,
      siteOffset: {
        y: 0.7552490234375,
        x: 7.3095703125
      },
      gameOffset: {
        y: 8.602810859680176,
        x: 7.3095703125,
        z: 0.7552490234375
      }
    }
  ],
  data: {
    Overflow: true,
    BlueFlow: 1500,
    RedFlow: 1500,
    GreenFlow: 1500,
    YellowFlow: 1500
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new();\nlocal ModelData = script.Parent.ModelData;\nscript.Parent.Base.ProximityPrompt.Triggered:Connect(function(p2) -- Line: 7\n    -- upvalues: u1 (copy)\n    u1:openMenu(p2);\nend);\nu1:addSetting(2, ModelData.Overflow, \"Excess power overflows\");\nu1:addSetting(1, ModelData.GreenFlow, \"Max kMF/s for the green output\", 1, 1500);\nu1:addSetting(1, ModelData.BlueFlow, \"Max kMF/s for the blue output\", 1, 1500);\nu1:addSetting(1, ModelData.YellowFlow, \"Max kMF/s for the yellow output\", 1, 1500);\nu1:addSetting(1, ModelData.RedFlow, \"Max kMF/s for the red output\", 1, 1500);\nscript.Parent.Base.ProximityPrompt.Enabled = true;\nlocal u3 = {\n    PowerUtilsV2.loadConnector(script.Parent.In1MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.In2MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.In3MainConnector, true),\n    (PowerUtilsV2.loadConnector(script.Parent.In4MainConnector, true))\n};\nlocal u4 = {\n    PowerUtilsV2.loadConnector(script.Parent.Out1MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Out2MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Out3MainConnector, true),\n    (PowerUtilsV2.loadConnector(script.Parent.Out4MainConnector, true))\n};\nlocal u5 = {\n    PowerUtilsV2.loadConnector(script.Parent.Overflow1MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Overflow2MainConnector, true),\n    PowerUtilsV2.loadConnector(script.Parent.Overflow3MainConnector, true),\n    (PowerUtilsV2.loadConnector(script.Parent.Overflow4MainConnector, true))\n};\n\nreturn {\n    tick = function() -- Line: 45, Name: tick\n        -- upvalues: ModelData (copy), u3 (copy), u4 (copy), u5 (copy)\n        local v6 = {\n            1000 * ModelData.GreenFlow.Value,\n            1000 * ModelData.BlueFlow.Value,\n            1000 * ModelData.YellowFlow.Value,\n            1000 * ModelData.RedFlow.Value\n        };\n\n        for i = 1, 4 do\n            local v7 = v6[i];\n            local v8 = u3[i];\n            local v9 = u4[i];\n            local v10 = u5[i];\n            local v11 = v8:getBuffer();\n            local v12 = math.clamp(v11, 0, v7);\n            local v13 = v9:getMax() - v9:getBuffer();\n            local v14 = math.clamp(v12, 0, v13);\n            v9:addPower(v14);\n            v8:removePower(v14);\n\n            if ModelData.Overflow.Value then\n                local v15 = v8:getBuffer();\n                local v16 = v10:getMax() - v10:getBuffer();\n                local v17 = math.clamp(v15, 0, v16);\n                v10:addPower(v17);\n                v8:removePower(v17);\n            end;\n        end;\n    end\n};"
};
