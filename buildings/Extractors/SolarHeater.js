export default {
  id: "SolarHeater",
  category: "Extractors",
  cost: 1500,
  base: {
    height: 14,
    offset: {
      y: -5,
      x: -1
    },
    width: 14
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: -11.45989990234375,
        x: -0.99993896484375
      },
      gameOffset: {
        y: 1.8250017166137695,
        x: -0.99993896484375,
        z: -11.45989990234375
      },
      tip: "Input for water to heat up"
    },
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: 1.45001220703125,
        x: -0.99993896484375
      },
      gameOffset: {
        y: 1.8249969482421875,
        x: -0.99993896484375,
        z: 1.45001220703125
      },
      tip: "Outputs slightly warmer water"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal SunEnergy = ReplicatedStorage.SunEnergy;\n\nreturn {\n    tick = function() -- Line: 15, Name: tick\n        -- upvalues: u1 (copy), u2 (copy), SunEnergy (copy)\n        if not (u1:hasAmount(3) and u2:canHoldXMore(3)) then\n            return;\n        end;\n\n        local v3 = u1:getTemp() + SunEnergy.Value / 10;\n        local v4 = math.clamp(v3, 0, SunEnergy.Value / 6 + 50);\n\n        if v4 < u1:getTemp() then\n            v4 = u1:getTemp();\n        end;\n\n        u2:setUsedTemperature(v4);\n        u2:addItemAmount(u1:getItem(), 3);\n        u1:removeItem(3);\n    end\n};"
};
