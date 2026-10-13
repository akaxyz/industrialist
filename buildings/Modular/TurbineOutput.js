export default {
  id: "TurbineOutput",
  category: "Modular",
  tier: 4,
  cost: 150000,
  base: {
    height: 24,
    offset: {
      y: 10,
      x: 3.9999923706054688
    },
    width: 12
  },
  nodes: [
    {
      name: "OutFluidMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: 10.00018310546875,
        x: 2.0002365112304688
      },
      gameOffset: {
        y: 6.824737071990967,
        x: 2.0002365112304688,
        z: 10.00018310546875
      },
      tip: "Outputs low pressure steam. Should be piped straight to a Condenser to convert it back into Water."
    }
  ],
  data: {
    Temperature: 18,
    Steam: 0
  },
  updateEvery: 30,
  script: "local v1 = {};\nlocal u2 = require(game.ReplicatedStorage.Modules.PipeUtilsV2).loadConnector(script.Parent.OutFluidMainPipe);\nlocal Steam = script.Parent.ModelData.Steam;\nlocal Temperature = script.Parent.ModelData.Temperature;\n\nfunction v1.tick() -- Line: 9\n    -- upvalues: Steam (copy), u2 (copy), Temperature (copy)\n    local Value = Steam.Value;\n    local v3 = u2:getMax() - u2:getBuffer() + 1e-11;\n    local v4 = math.clamp(Value, 0, v3);\n\n    if v4 > 0 then\n        u2:setUsedTemperature(Temperature.Value);\n        u2:addItemAmount(\"Low Pressure Steam\", v4);\n        local v5 = Steam;\n        v5.Value = v5.Value - v4;\n    end;\nend;\n\nreturn v1;"
};
