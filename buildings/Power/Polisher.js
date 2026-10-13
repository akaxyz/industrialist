export default {
  id: "Polisher",
  category: "Power",
  tier: 4,
  cost: 1200000,
  base: {
    height: 56.000282287597656,
    offset: {
      y: 0.0001220703125,
      x: 10.00006103515625
    },
    width: 24.000120162963867
  },
  nodes: [
    {
      name: "LargeInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 400,
      transferAmount: 2000,
      siteOffset: {
        y: 0.0001220703125,
        x: -1.4749755859375
      },
      gameOffset: {
        y: 4.300009727478027,
        x: -1.4749755859375,
        z: 0.0001220703125
      },
      tip: "Input for condensate (from Condenser)"
    },
    {
      name: "LargeOutMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 800,
      transferAmount: 2000,
      siteOffset: {
        y: 0.0001220703125,
        x: 21.42510986328125
      },
      gameOffset: {
        y: 4.350032806396484,
        x: 21.42510986328125,
        z: 0.0001220703125
      },
      tip: "Output for Distilled Water. Should be piped back into the Heat Exchanger afterwards."
    },
    {
      name: "LiquidIn1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -5.005126953125,
        x: -1.11517333984375
      },
      gameOffset: {
        y: 1.4670112133026123,
        x: -1.11517333984375,
        z: -5.005126953125
      },
      tip: "Input for Hydrochloric Acid"
    },
    {
      name: "LiquidIn2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 5.01483154296875,
        x: -1.11517333984375
      },
      gameOffset: {
        y: 1.4670112133026123,
        x: -1.11517333984375,
        z: 5.01483154296875
      },
      tip: "Input for Sodium Hydroxide Solution"
    },
    {
      name: "DataMainConnector",
      kind: "data",
      direction: "output",
      maxAmount: 0,
      transferAmount: 0,
      siteOffset: {
        y: -10.04998779296875,
        x: 1.10760498046875
      },
      gameOffset: {
        y: 5.151031494140625,
        x: 1.10760498046875,
        z: -10.04998779296875
      },
      wireRange: 9999
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 5000000,
      transferAmount: 0,
      siteOffset: {
        y: -13.36224365234375,
        x: 4.36248779296875
      },
      gameOffset: {
        y: 7.862799644470215,
        x: 4.36248779296875,
        z: -13.36224365234375
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.LargeInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.LargeOutMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn2MainPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\n\nreturn {\n    localUpdate = function() -- Line: 16, Name: localUpdate\n    end,\n\n    tick = function() -- Line: 20, Name: tick\n        -- upvalues: u1 (copy), u2 (copy), u3 (copy), u4 (copy), u5 (copy)\n        local v6 = u1:getBuffer();\n        local v7 = u2:getMax() - u2:getBuffer() + 0.1;\n        local v8 = math.clamp(v6, 0, v7);\n        local v9 = v8 / 400;\n\n        if u3:hasAmountOf(\"Hydrochloric Acid\", v9) and (u4:hasAmountOf(\"Sodium Hydroxide Solution\", v9) and (u5:hasPower(v8 * 1250) and u1:has(\"Condensate\"))) then\n            u3:removeItem(v9 * 0.99);\n            u4:removeItem(v9 * 0.99);\n        else\n            v8 = 0;\n            v9 = 0;\n        end;\n\n        local v10;\n\n        if v8 > 0 and v9 > 0 then\n            u5:removePower(v8 * 1250);\n            u1:removeItem(v8);\n            local v11 = u1:getTemp() * 0.9;\n            v10 = math.clamp(v11, 18, 100);\n            u2:setUsedTemperature(v10);\n            u2:addItemAmount(\"Distilled Water\", v8);\n        else\n            v10 = 0;\n        end;\n\n        for _, child in pairs(script.Parent.Lights:GetChildren()) do\n            child.Color = Color3.fromRGB(255, 0, 0):Lerp(Color3.fromRGB(0, 255, 0), v8 / 400);\n        end;\n\n        script.Parent.CondensateFlow.Value = v8;\n        script.Parent.ChemicalUsage.Value = v9;\n        script.Parent.OutTemperature.Value = v10;\n    end\n};"
};
