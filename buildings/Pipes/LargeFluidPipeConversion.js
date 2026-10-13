export default {
  id: "LargeFluidPipeConversion",
  category: "Pipes",
  tier: 4,
  cost: 125000,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "LargeMainPipe",
      kind: "largefluid",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: 0,
        x: 2
      },
      gameOffset: {
        y: 4.3249969482421875,
        x: 2,
        z: 0
      }
    },
    {
      name: "SmallMainPipe",
      kind: "fluid",
      maxAmount: 2000,
      transferAmount: 20,
      siteOffset: {
        y: 5.62506103515625,
        x: 2
      },
      gameOffset: {
        y: 3.0250089168548584,
        x: 2,
        z: 5.62506103515625
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 100000,
      transferAmount: 0,
      siteOffset: {
        y: -1.0750732421875,
        x: 5.074951171875
      },
      gameOffset: {
        y: 2.499999761581421,
        x: 5.074951171875,
        z: -1.0750732421875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.SmallMainPipe, true);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.LargeMainPipe, true);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal v4 = {\n    localUpdate = function() -- Line: 12, Name: localUpdate\n    end\n};\nlocal u5 = 0;\n\nfunction v4.tick() -- Line: 18\n    -- upvalues: u3 (copy), u1 (copy), u2 (copy), u5 (ref)\n    if not u3:hasPower(50000) then\n        return;\n    end;\n\n    if u1:getItem() ~= u2:getItem() and (u1:getItem() ~= \"\" and u2:getItem() ~= \"\") then\n        return;\n    end;\n\n    if u1:getBuffer() <= 0 and u2:getBuffer() <= 0 then\n        return;\n    end;\n\n    u3:removePower(50000);\n    local v6 = u1:getBuffer();\n    local v7 = u2:getBuffer();\n    u5 = 0;\n\n    if v6 >= v7 then\n        if v7 < v6 then\n            u5 = (v6 - v7) / 2;\n            local v8 = u2:getMax() - v7;\n            u5 = math.clamp(u5, 0, v8);\n            u2:setUsedTemperature(u1:getTemp());\n            u2:addItemAmount(u1:getItem(), u5);\n            u1:removeItem(u5);\n        end;\n\n        return;\n    end;\n\n    u5 = (v7 - v6) / 2;\n    local v9 = u1:getMax() - v6;\n    u5 = math.clamp(u5, 0, v9);\n    u1:setUsedTemperature(u2:getTemp());\n    u1:addItemAmount(u2:getItem(), u5);\n    u2:removeItem(u5);\nend;\n\nreturn v4;"
};
