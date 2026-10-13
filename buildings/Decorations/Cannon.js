export default {
  id: "Cannon",
  category: "Decorations",
  tier: 4,
  cost: 3000009,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -3.0640029907226562,
        x: -1.817779541015625
      },
      gameOffset: {
        y: 2.0310635566711426,
        x: -1.817779541015625,
        z: -3.0640029907226562
      },
      tip: "Water in"
    },
    {
      name: "ResidueMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 0.9992828369140625,
        x: -1.8148193359375
      },
      gameOffset: {
        y: 1.9969487190246582,
        x: -1.8148193359375,
        z: 0.9992828369140625
      },
      tip: "Water out"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.NextTicks).new();\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.ResidueMainPipe);\nlocal v3 = {\n    localUpdate = function() -- Line: 19, Name: localUpdate\n    end\n};\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nfunction v3.tick() -- Line: 26\n    -- upvalues: u1 (copy), u2 (copy), Pollution (copy)\n    if not u1:hasAmountOf(\"Water\", 2) then\n        local v4 = Pollution;\n        v4.Value = v4.Value - 225;\n\n        return;\n    end;\n\n    if u1:getTemp() - 40 < 273.15 then\n        u2:setUsedTemperature(-273.15);\n    else\n        u2:setUsedTemperature(u1:getTemp() - 40);\n    end;\n\n    u1:removeItem(2);\n    u2:addItemAmount(\"Water\", 2);\nend;\n\nreturn v3;"
};
