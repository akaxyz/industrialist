export default {
  id: "SteamCondenser",
  category: "Power",
  tier: 4,
  cost: 2400000,
  base: {
    height: 104,
    offset: {
      y: -50,
      x: -14
    },
    width: 32
  },
  nodes: [
    {
      name: "OutWaterMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -54.02496337890625,
        x: -28.67498779296875
      },
      gameOffset: {
        y: 4.350085258483887,
        x: -28.67498779296875,
        z: -54.02496337890625
      },
      tip: "Condensate output (needs to be converted to Distilled Water using polisher afterwards)"
    },
    {
      name: "CoolantInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -7.07501220703125,
        x: -14.125
      },
      gameOffset: {
        y: 4.699999809265137,
        x: -14.125,
        z: -7.07501220703125
      },
      tip: "Input for Distilled Water to cool the condenser. This water should come from the cooling tower."
    },
    {
      name: "SteamInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -54.0250244140625,
        x: 1
      },
      gameOffset: {
        y: 8.350005149841309,
        x: 1,
        z: -54.0250244140625
      },
      tip: "Input for Low Pressure Steam to be turned into Condensate. Low pressure steam is a by-product of modular turbines"
    },
    {
      name: "CoolantOutMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -100.97503662109375,
        x: -13.875
      },
      gameOffset: {
        y: 4.550000190734863,
        x: -13.875,
        z: -100.97503662109375
      },
      tip: "Output for Distilled Water (needs to be cooled in a cooling tower next)"
    },
    {
      name: "DataMainConnector",
      kind: "data",
      direction: "output",
      maxAmount: 0,
      transferAmount: 0,
      siteOffset: {
        y: -10.75,
        x: -14.25
      },
      gameOffset: {
        y: 13.275007247924805,
        x: -14.25,
        z: -10.75
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
        y: 0.05682373046875,
        x: -25.179779052734375
      },
      gameOffset: {
        y: 14.164971351623535,
        x: -25.179779052734375,
        z: 0.05682373046875
      }
    }
  ],
  data: {
    Temp: 18
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.CoolantInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.CoolantOutMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.SteamInMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutWaterMainPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Temp = script.Parent.ModelData.Temp;\n\nreturn {\n    localUpdate = function() -- Line: 20, Name: localUpdate\n    end,\n\n    tick = function() -- Line: 24, Name: tick\n        -- upvalues: u5 (copy), u1 (copy), u2 (copy), Temp (copy), u3 (copy), u4 (copy)\n        if not u5:hasPower(500000) then\n            return;\n        end;\n\n        u5:removePower(500000);\n        local v6 = u1:getTemp();\n\n        if u1:getItem() == \"Distilled Water\" then\n            local v7 = u1:getBuffer();\n            local v8 = u2:getMax() - u2:getBuffer();\n            local v9 = math.clamp(v7, 0, v8);\n            local v10 = math.clamp(v9, 0, 800);\n            local v11 = v6 - Temp.Value;\n            local v12 = Temp;\n            v12.Value = v12.Value + v11 * 1000 * v10 / 3000000;\n            u2:setUsedTemperature(v6 - v11);\n            u1:removeItem(v10);\n            u2:addItemAmount(\"Distilled Water\", v10);\n            script.Parent.CoolantFlow.Value = v10;\n        else\n            if Temp.Value > 18 then\n                Temp.Value = Temp.Value - 0.75;\n            end;\n\n            script.Parent.CoolantFlow.Value = 0;\n        end;\n\n        if u3:getItem() ~= \"Low Pressure Steam\" then\n            script.Parent.CondensateProd.Value = 0;\n\n            return;\n        end;\n\n        local v13 = u3:getTemp();\n        local v14 = u3:getBuffer();\n        local v15 = (u4:getMax() - u4:getBuffer()) * 30;\n        local v16 = math.clamp(v14, 0, v15);\n        local v17 = math.clamp(v16, 0, 24000);\n        local v18 = (Temp.Value - v13) * 1000 * (v17 / 30) / 4;\n        local _ = 3000000 * Temp.Value;\n\n        if Temp.Value - v18 / 3000000 >= math.clamp(v13 * 0.5, 40, 100) then\n            script.Parent.CondensateProd.Value = 0;\n\n            return;\n        end;\n\n        local v19 = Temp;\n        v19.Value = v19.Value - v18 / 3000000;\n        u3:removeItem(v17);\n        u4:setUsedTemperature(Temp.Value);\n        u4:addItemAmount(\"Condensate\", v17 / 30);\n        script.Parent.CondensateProd.Value = v17 / 30;\n    end\n};"
};
