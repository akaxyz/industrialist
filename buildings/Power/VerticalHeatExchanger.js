export default {
  id: "VerticalHeatExchanger",
  category: "Power",
  tier: 4,
  cost: 2718281,
  base: {
    height: 28,
    offset: {
      y: -12,
      x: -12
    },
    width: 28
  },
  nodes: [
    {
      name: "DataMainConnector",
      kind: "data",
      direction: "output",
      maxAmount: 0,
      transferAmount: 0,
      siteOffset: {
        y: -10.50994873046875,
        x: -4.28204345703125
      },
      gameOffset: {
        y: 40.17485809326172,
        x: -4.28204345703125,
        z: -10.50994873046875
      },
      wireRange: 9999
    },
    {
      name: "WaterInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: 0.368896484375,
        x: -18.00946044921875
      },
      gameOffset: {
        y: 4.182853698730469,
        x: -18.00946044921875,
        z: 0.368896484375
      },
      tip: "Input for Distilled Water to be turned to Steam"
    },
    {
      name: "HotWaterInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -11.8868408203125,
        x: -0.3311767578125
      },
      gameOffset: {
        y: 4.1569976806640625,
        x: -0.3311767578125,
        z: -11.8868408203125
      },
      tip: "Input for heated Distilled Water (from the Coal Power Plant) or heated Contaminated Water (from the Nuclear Power Plant)"
    },
    {
      name: "OutWaterMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -11.9168701171875,
        x: -24.63494873046875
      },
      gameOffset: {
        y: 4.306987762451172,
        x: -24.63494873046875,
        z: -11.9168701171875
      },
      tip: "Output for Distilled Water (should be piped into the other water input) or Contaminated Water (should be piped back to the Nuclear Power Plant)"
    },
    {
      name: "OutSteamMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -24.694656372070312,
        x: -8.036865234375
      },
      gameOffset: {
        y: 4.400028228759766,
        x: -8.036865234375,
        z: -24.694656372070312
      },
      tip: "Output for High Pressure Steam. (Should be used in a Modular Turbine next)"
    }
  ],
  data: {
    SteamValve: 1,
    Temp: 18,
    WaterValve: 1,
    MinTemp: 100
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.HotWaterInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutWaterMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.WaterInMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutSteamMainPipe);\nlocal Temp = script.Parent.ModelData.Temp;\nlocal u5 = 0;\nlocal u6 = 0;\nlocal SteamValve = script.Parent.ModelData.SteamValve;\nlocal WaterValve = script.Parent.ModelData.WaterValve;\nlocal MinTemp = script.Parent.ModelData.MinTemp;\nlocal v7 = {\n    localUpdate = function() -- Line: 23, Name: localUpdate\n    end\n};\nlocal Achievements = require(ReplicatedStorage.Modules.Achievements);\n\nfunction v7.tick() -- Line: 28\n    -- upvalues: u1 (copy), u5 (ref), u2 (copy), WaterValve (copy), Temp (copy), u3 (copy), u6 (ref), u4 (copy), SteamValve (copy), MinTemp (copy), Achievements (copy)\n    local v8 = u1:getTemp();\n\n    if u1:getItem() == \"Distilled Water\" or u1:getItem() == \"Contaminated Water\" then\n        u5 = u1:getBuffer();\n        local v9 = u2:getMax() - u2:getBuffer();\n        u5 = math.clamp(u5, 0, v9);\n        u5 = math.clamp(u5, 0, 400 * WaterValve.Value);\n        local v10 = (v8 - Temp.Value) * 2.2;\n\n        if v10 < 0 then\n            v10 = v10 / 2.2;\n        end;\n\n        local v11 = Temp;\n        v11.Value = v11.Value + v10 * 1000 * u5 / 3000000;\n\n        if u3:getTemp() < v8 then\n            u2:setUsedTemperature((math.clamp(v8 - v10 - Temp.Value * 0.25, 18, (1 / 0))));\n        else\n            u2:setUsedTemperature((math.clamp(v8 - v10 - Temp.Value * 0.25, 18, (1 / 0))));\n        end;\n\n        u2:addItemAmount(u1:getItem(), u5);\n        u1:removeItem(u5);\n        script.Parent.HotWaterFlow.Value = u5;\n    else\n        u5 = 0;\n\n        if Temp.Value > 18 then\n            Temp.Value = Temp.Value - 0.75;\n        end;\n\n        script.Parent.HotWaterFlow.Value = 0;\n    end;\n\n    if u3:getItem() == \"Distilled Water\" then\n        u6 = u3:getBuffer() * 30;\n        local v12 = 24000 - u4:getBuffer();\n        u6 = math.clamp(u6, 0, v12);\n        u6 = math.clamp(u6, 0, 12000 * SteamValve.Value);\n        u6 = math.clamp(u6, 0, 12000 * WaterValve.Value);\n        u6 = math.clamp(u6, 0, u5 / 400 * 12000);\n\n        if Temp.Value > MinTemp.Value then\n            local v13 = u3:getTemp();\n            local v14 = (Temp.Value - v13) * 1000 * (u6 / 30);\n\n            if v14 >= Temp.Value * 3000000 then\n                script.Parent.SteamProduction.Value = 0;\n\n                return;\n            end;\n\n            u3:removeItem(u6 / 30);\n            u4:setUsedTemperature(Temp.Value);\n\n            if Temp.Value >= 500 then\n                Achievements.giveBadge(4213326512100053);\n            end;\n\n            u4:addItem(u6, \"High Pressure Steam\");\n            local v15 = Temp;\n            v15.Value = v15.Value - v14 / 3000000;\n            script.Parent.SteamProduction.Value = u6;\n        end;\n    else\n        script.Parent.SteamProduction.Value = 0;\n    end;\nend;\n\nreturn v7;"
};
