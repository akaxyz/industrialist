export default {
  id: "HeatExchanger",
  category: "Power",
  tier: 4,
  cost: 2718281,
  base: {
    height: 20,
    offset: {
      y: 24.000411987304688,
      x: 8.00030517578125
    },
    width: 52
  },
  nodes: [
    {
      name: "OutSteamMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: 49.27543640136719,
        x: 7.92529296875
      },
      gameOffset: {
        y: 6.399987697601318,
        x: 7.92529296875,
        z: 49.27543640136719
      },
      tip: "Output for High Pressure Steam. (Should be used in a Modular Turbine next)"
    },
    {
      name: "OutWaterMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: 29.975387573242188,
        x: -1.02471923828125
      },
      gameOffset: {
        y: 4.299985885620117,
        x: -1.02471923828125,
        z: 29.975387573242188
      },
      tip: "Output for Distilled Water (should be piped into the other water input) or Contaminated Water (should be piped back to the Nuclear Power Plant)"
    },
    {
      name: "WaterInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -1.2245635986328125,
        x: 7.92529296875
      },
      gameOffset: {
        y: 6.399980068206787,
        x: 7.92529296875,
        z: -1.2245635986328125
      },
      tip: "Input for Distilled Water to be turned into Steam"
    },
    {
      name: "HotWaterInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: 17.975387573242188,
        x: -1.024658203125
      },
      gameOffset: {
        y: 4.249982833862305,
        x: -1.024658203125,
        z: 17.975387573242188
      },
      tip: "Input for heated Distilled Water (from the Coal Power Plant) or heated Contaminated Water (from the Nuclear Power Plant)"
    },
    {
      name: "DataMainConnector",
      kind: "data",
      direction: "output",
      maxAmount: 0,
      transferAmount: 0,
      siteOffset: {
        y: 41.0504150390625,
        x: 17.042724609375
      },
      gameOffset: {
        y: 6.714837551116943,
        x: 17.042724609375,
        z: 41.0504150390625
      },
      wireRange: 9999
    }
  ],
  data: {
    SteamValve: 1,
    Temp: 18,
    WaterValve: 1,
    MinTemp: 100
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.HotWaterInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutWaterMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.WaterInMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutSteamMainPipe);\nlocal Temp = script.Parent.ModelData.Temp;\nlocal u5 = 0;\nlocal u6 = 0;\nlocal SteamValve = script.Parent.ModelData.SteamValve;\nlocal WaterValve = script.Parent.ModelData.WaterValve;\nlocal MinTemp = script.Parent.ModelData.MinTemp;\nlocal v7 = {\n    localUpdate = function() -- Line: 23, Name: localUpdate\n    end\n};\nlocal Achievements = require(ReplicatedStorage.Modules.Achievements);\n\nfunction v7.tick() -- Line: 28\n    -- upvalues: u1 (copy), u3 (copy), u5 (ref), u2 (copy), WaterValve (copy), Temp (copy), u6 (ref), u4 (copy), SteamValve (copy), MinTemp (copy), Achievements (copy)\n    local v8 = u1:getTemp();\n\n    if u3:getTemp() < v8 then\n        u3:getTemp();\n    end;\n\n    if u1:getItem() == \"Distilled Water\" or u1:getItem() == \"Contaminated Water\" then\n        u5 = u1:getBuffer();\n        local v9 = u2:getMax() - u2:getBuffer();\n        u5 = math.clamp(u5, 0, v9);\n        u5 = math.clamp(u5, 0, 400 * WaterValve.Value);\n        local v10 = (v8 - Temp.Value) * 2.2;\n\n        if v10 < 0 then\n            v10 = v10 / 2.2;\n        end;\n\n        local v11 = Temp;\n        v11.Value = v11.Value + v10 * 1000 * u5 / 3000000;\n\n        if u3:getTemp() < v8 then\n            u2:setUsedTemperature((math.clamp(v8 - v10 - Temp.Value * 0.25, 18, (1 / 0))));\n        else\n            u2:setUsedTemperature((math.clamp(v8 - v10 - Temp.Value * 0.25, 18, (1 / 0))));\n        end;\n\n        u2:addItemAmount(u1:getItem(), u5);\n        u1:removeItem(u5);\n        script.Parent.HotWaterFlow.Value = u5;\n    else\n        u5 = 0;\n\n        if Temp.Value > 18 then\n            Temp.Value = Temp.Value - 0.75;\n        end;\n\n        script.Parent.HotWaterFlow.Value = 0;\n    end;\n\n    if u3:getItem() == \"Distilled Water\" then\n        u6 = u3:getBuffer() * 30;\n        local v12 = 24000 - u4:getBuffer();\n        u6 = math.clamp(u6, 0, v12);\n        u6 = math.clamp(u6, 0, 12000 * SteamValve.Value);\n        u6 = math.clamp(u6, 0, 12000 * WaterValve.Value);\n        u6 = math.clamp(u6, 0, u5 / 400 * 12000);\n\n        if Temp.Value > MinTemp.Value then\n            local v13 = u3:getTemp();\n            local v14 = (Temp.Value - v13) * 1000 * (u6 / 30);\n\n            if v14 >= Temp.Value * 3000000 then\n                script.Parent.SteamProduction.Value = 0;\n                script.Parent.Light.Color = Color3.fromRGB(255, 89, 89);\n\n                return;\n            end;\n\n            u3:removeItem(u6 / 30);\n            u4:setUsedTemperature(Temp.Value);\n\n            if Temp.Value >= 500 then\n                Achievements.giveBadge(4213326512100053);\n            end;\n\n            u4:addItem(u6, \"High Pressure Steam\");\n            local v15 = Temp;\n            v15.Value = v15.Value - v14 / 3000000;\n            script.Parent.SteamProduction.Value = u6;\n            script.Parent.Light.Color = Color3.fromRGB(95, 255, 26);\n        end;\n    else\n        script.Parent.SteamProduction.Value = 0;\n    end;\nend;\n\nreturn v7;"
};
