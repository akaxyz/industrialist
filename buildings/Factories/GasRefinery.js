export default {
  id: "GasRefinery",
  category: "Factories",
  tier: 3,
  cost: 175000,
  base: {
    height: 24,
    offset: {
      y: 10,
      x: 12
    },
    width: 28
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 21.95001220703125,
        x: -0.199951171875
      },
      gameOffset: {
        y: 2.7250003814697266,
        x: -0.199951171875,
        z: 21.95001220703125
      }
    },
    {
      name: "GasInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: 21.95001220703125,
        x: 1
      },
      gameOffset: {
        y: 2.7250003814697266,
        x: 1,
        z: 21.95001220703125
      },
      tip: "Water-free gas in (from condenser)"
    },
    {
      name: "ResidueMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -1.95001220703125,
        x: 11
      },
      gameOffset: {
        y: 2.125,
        x: 11,
        z: -1.95001220703125
      },
      tip: "Residue out (store it somewhere)"
    },
    {
      name: "GasOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 50,
      transferAmount: 20,
      siteOffset: {
        y: -1.95001220703125,
        x: 1
      },
      gameOffset: {
        y: 2.125,
        x: 1,
        z: -1.95001220703125
      },
      tip: "Refined gas out (either into LNG or gas burner for power)"
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.GasInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.GasOutMainPipe);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.ResidueMainPipe);\nlocal v6 = {\n    localUpdate = function() -- Line: 16, Name: localUpdate\n    end\n};\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal Generator = script.Parent.Base.Generator;\n\nlocal function fail() -- Line: 20\n    -- upvalues: Generator (copy)\n    Generator:Stop();\nend;\n\nfunction v6.tick() -- Line: 23\n    -- upvalues: u1 (copy), u4 (copy), Generator (copy), u2 (copy), u3 (copy), u5 (copy), Pollution (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u4:hasPower(20000) then\n        Generator:Stop();\n\n        return;\n    end;\n\n    if not u2:hasAmountOf(\"Water-Free Gas\", 30) then\n        Generator:Stop();\n\n        return;\n    end;\n\n    if not u3:canHoldXMoreOf(\"Refined Gas\", 20) then\n        Generator:Stop();\n\n        return;\n    end;\n\n    if not u5:canHoldXMoreOf(\"Residue\", 1) then\n        Generator:Stop();\n\n        return;\n    end;\n\n    u2:removeItem(30);\n\n    if Generator.Playing == false then\n        Generator:Play();\n    end;\n\n    u1:nextTicks(10, function(p7) -- Line: 33\n        -- upvalues: Pollution (ref), u4 (ref), u5 (ref), u3 (ref)\n        local v8 = Pollution;\n        v8.Value = v8.Value + 1;\n        u4:removePower(2000);\n        u5:addItemAmount(\"Residue\", 0.1);\n        u3:addItemAmount(\"Refined Gas\", 2);\n    end);\nend;\n\nreturn v6;"
};
