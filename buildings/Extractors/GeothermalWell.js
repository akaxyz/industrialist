export default {
  id: "GeothermalWell",
  category: "Extractors",
  tier: 2,
  cost: 1500,
  base: {
    height: 10,
    offset: {
      y: -3,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "WaterInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 30,
      transferAmount: 5,
      siteOffset: {
        y: 1.16217041015625,
        x: 5.0108642578125
      },
      gameOffset: {
        y: 1.449484944343567,
        x: 5.0108642578125,
        z: 1.16217041015625
      }
    },
    {
      name: "HotWaterOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 10,
      transferAmount: 5,
      siteOffset: {
        y: 1.16217041015625,
        x: 2.9998626708984375
      },
      gameOffset: {
        y: 1.449484944343567,
        x: 2.9998626708984375,
        z: 1.16217041015625
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: 0.054229736328125,
        x: -0.0499114990234375
      },
      gameOffset: {
        y: 2.0052919387817383,
        x: -0.0499114990234375,
        z: 0.054229736328125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.WaterInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.HotWaterOutMainPipe);\nlocal u4 = \"\";\nlocal v5 = {};\nlocal _ = script.Parent.Base.Hum;\n\nfunction v5.tick() -- Line: 18\n    -- upvalues: u2 (copy), u4 (ref), u3 (copy), u1 (copy)\n    if not (u2:hasAmountOf(\"Water\", 9.09) or (u2:hasAmountOf(\"Filtered Water\", 9.09) or u2:hasAmountOf(\"Distilled Water\", 9.09))) then\n        return;\n    end;\n\n    u4 = u2:getItem();\n\n    if not u3:canHoldXMoreOf(u4, 6.05394) then\n        return;\n    end;\n\n    if not u1:hasPower(3000) then\n        return;\n    end;\n\n    local v6 = u2:getTemp();\n    u2:removeItem(9.09);\n    local v7 = tick() / 2;\n    local v8 = math.sin(v7) * 10;\n    local v9 = tick() / 3;\n    local v10 = v6 + v8 * math.sin(v9) + 80;\n    u3:setUsedTemperature((math.clamp(v10, 0, 220)));\n    u3:addItemAmount(tostring(u4), 6.05394);\n    u1:removePower(3000);\nend;\n\nreturn v5;"
};
