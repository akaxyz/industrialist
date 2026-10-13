export default {
  id: "HVTransformer",
  category: "Power",
  tier: 4,
  cost: 750000,
  base: {
    height: 16,
    offset: {
      y: 0,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "HVMainConnector",
      kind: "hv",
      maxAmount: 2500000000,
      transferAmount: 40000000,
      siteOffset: {
        y: 0,
        x: 0.5
      },
      gameOffset: {
        y: 17.549999237060547,
        x: 0.5,
        z: 0
      },
      wireRange: 90
    },
    {
      name: "NVMainConnector",
      kind: "mv",
      maxAmount: 2500000000,
      transferAmount: 40000000,
      siteOffset: {
        y: -0.0625,
        x: 11.75
      },
      gameOffset: {
        y: 7.899996757507324,
        x: 11.75,
        z: -0.0625
      },
      wireRange: 60
    },
    {
      name: "LiquidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: -0.06230926513671875,
        x: 13.48724365234375
      },
      gameOffset: {
        y: 1.5437570810317993,
        x: 13.48724365234375,
        z: -0.06230926513671875
      },
      tip: "Input for Water/Machine Oil to boost efficiency"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.NVMainConnector, true);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.HVMainConnector, true);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.LiquidInMainPipe);\nlocal v4 = {\n    localUpdate = function() -- Line: 11, Name: localUpdate\n    end\n};\nlocal StartTracking = game.ReplicatedStorage.StartTracking;\nlocal u5 = 0;\nlocal u6 = 0;\n\nfunction v4.tick() -- Line: 19\n    -- upvalues: u2 (copy), u1 (copy), u5 (ref), u3 (copy), u6 (ref), StartTracking (copy)\n    local v7 = u2:getBuffer();\n    local v8 = u1:getBuffer();\n    u5 = 0;\n\n    if v8 < v7 then\n        u5 = (v7 - v8) / 2;\n    elseif v7 < v8 then\n        u5 = (v8 - v7) / 2;\n    end;\n\n    if u3:hasAmountOf(\"Water\", 1) then\n        u6 = 0.94;\n        u3:removeItem(1);\n    elseif u3:hasAmountOf(\"Machine Oil\", 0.5) then\n        u6 = 0.99;\n        u3:removeItem(0.5);\n    else\n        u6 = 0.85;\n    end;\n\n    if v8 >= v7 then\n        if v7 < v8 then\n            if StartTracking.Value then\n                shared.powerConsumed = shared.powerConsumed + u5 * (1 - u6);\n                shared.powerLost = shared.powerLost + u5 * (1 - u6);\n            end;\n\n            u2:addPower(u5 * u6);\n            u1:removePower(u5);\n        end;\n\n        return;\n    end;\n\n    u1:addPower(u5 * u6);\n\n    if StartTracking.Value then\n        shared.powerConsumed = shared.powerConsumed + u5 * (1 - u6);\n        shared.powerLost = shared.powerLost + u5 * (1 - u6);\n    end;\n\n    u2:removePower(u5);\nend;\n\nreturn v4;"
};
