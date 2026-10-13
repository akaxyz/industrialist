export default {
  id: "TurbineInput",
  category: "Modular",
  tier: 4,
  cost: 150000,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: -10.000030517578125
    },
    width: 24
  },
  nodes: [
    {
      name: "SteamInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -1.2496337890625,
        x: -9.999603271484375
      },
      gameOffset: {
        y: 2.73175048828125,
        x: -9.999603271484375,
        z: -1.2496337890625
      },
      tip: "Input for High Pressure Steam (from any HeatExchanger)"
    }
  ],
  data: {
    Temperature: 18,
    Steam: 0
  },
  updateEvery: 30,
  script: "local v1 = {};\nlocal u2 = require(game.ReplicatedStorage.Modules.PipeUtilsV2).loadConnector(script.Parent.SteamInMainPipe);\nlocal Steam = script.Parent.ModelData.Steam;\nlocal Temperature = script.Parent.ModelData.Temperature;\n\nfunction v1.tick() -- Line: 9\n    -- upvalues: u2 (copy), Steam (copy), Temperature (copy)\n    if u2:has(\"High Pressure Steam\") and Steam.Value <= 24000 then\n        local v3 = u2:getBuffer();\n        local v4 = math.clamp(v3, 0, 24000 - Steam.Value);\n        Temperature.Value = (Temperature.Value * Steam.Value + u2:getTemp() * v4) / (Steam.Value + v4 + 0.001);\n        local v5 = Steam;\n        v5.Value = v5.Value + v4;\n        u2:removeItem(v4);\n    end;\nend;\n\nreturn v1;"
};
