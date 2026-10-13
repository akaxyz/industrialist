export default {
  id: "PressurizedWaterFilter",
  category: "Factories",
  tier: 3,
  cost: 350000,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: -7
    },
    width: 18
  },
  nodes: [
    {
      name: "FluidOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 1,
      siteOffset: {
        y: 8.856704711914062,
        x: -7.0477294921875
      },
      gameOffset: {
        y: 3.2090415954589844,
        x: -7.0477294921875,
        z: 8.856704711914062
      },
      tip: "Output for Residue"
    },
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: 9.032951354980469,
        x: -1.0316162109375
      },
      gameOffset: {
        y: 1.675858497619629,
        x: -1.0316162109375,
        z: 9.032951354980469
      },
      tip: "Outputs Gold of the higher tier"
    },
    {
      name: "InFluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 100,
      transferAmount: 1,
      siteOffset: {
        y: 0.0368499755859375,
        x: -3.0538330078125
      },
      gameOffset: {
        y: 5.36705207824707,
        x: -3.0538330078125,
        z: 0.0368499755859375
      },
      tip: "Input for Water"
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: -1.02734375,
        x: -8.97760009765625
      },
      gameOffset: {
        y: 1.6812591552734375,
        x: -8.97760009765625,
        z: -1.02734375
      },
      tip: "Input for Rich Soil/10K/18K Gold"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1100000,
      transferAmount: 0,
      siteOffset: {
        y: 8.233154296875,
        x: -7.306884765625
      },
      gameOffset: {
        y: 4.908391952514648,
        x: -7.306884765625,
        z: 8.233154296875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.EffectUtils).new(script);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal _ = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.InFluidMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.FluidOutMainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nlocal u7 = require(ReplicatedStorage.Modules.EffectUtils).new(script);\nlocal u8 = false;\nu7:registerState(\"running\", true, function() -- Line: 25\n    -- upvalues: u8 (ref)\n    u8 = true;\n    script.Parent.Base[\"Electric Motor\"]:Play();\nend);\nu7:registerState(\"running\", false, function() -- Line: 36\n    -- upvalues: u8 (ref)\n    u8 = false;\n    script.Parent.Base[\"Electric Motor\"]:Stop();\nend);\nlocal v9 = {\n    localUpdate = function() -- Line: 46, Name: localUpdate\n        -- upvalues: u7 (copy)\n        u7:localUpdate();\n    end\n};\nlocal u10 = { { { \"Rich Soil\", 4 }, { \"Water\", 20 }, { \"Residue\", 8 }, { \"8 Karat Gold\", 2 } }, { { \"10 Karat Gold\", 4 }, { \"Water\", 20 }, { \"Residue\", 4 }, { \"12 Karat Gold\", 2 } }, { { \"18 Karat Gold\", 4 }, { \"Water\", 20 }, { \"Residue\", 4 }, { \"24 Karat Gold\", 2 } }, { { \"Dirty Lithium Sulfate\", 10 }, { \"Water\", 20 }, { \"Residue\", 10 }, { \"Lithium Sulfate\", 10 } }, { { \"Medium Earth Fragment\", 5 }, { \"Water\", 20 }, { \"Concentrated Salt Solution\", 10 }, { \"Raw Iron\", 5 } }, { { \"Deep Earth Fragment\", 5 }, { \"Water\", 20 }, { \"Naphtha\", 2.5 }, { \"Coal\", 10 } }, { { \"Treated Rock\", 5 }, { \"Water\", 20 }, { \"Residue\", 5 }, { \"Rock\", 5 } } };\n\nfunction v9.tick() -- Line: 106\n    -- upvalues: u1 (copy), u2 (copy), u10 (copy), u3 (copy), u4 (copy), u5 (copy), u6 (copy), u7 (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u2:hasPower(1000000) then\n        return;\n    end;\n\n    for _, v in pairs(u10) do\n        if u3:hasAmountOf(v[1][1], v[1][2]) and (u4:hasAmountOf(v[2][1], v[2][2]) and (u5:canHoldXMoreOf(v[3][1], v[3][2]) and u6:canHoldXMoreOf(v[4][1], v[4][2]))) then\n            u3:removeItem(v[1][2]);\n            u4:removeItem(v[2][2]);\n            u7:setState(\"running\", true);\n            u1:nextTicks(5, function(p11) -- Line: 122\n                -- upvalues: u5 (ref), v (copy), u6 (ref), u7 (ref), u2 (ref)\n                if p11 == 1 then\n                    u5:setUsedTemperature(70);\n                    u5:addItemAmount(v[3][1], v[3][2]);\n                    u6:addItemAmount(v[4][1], v[4][2]);\n                    u7:setState(\"running\", false);\n                end;\n\n                u2:removePower(200000);\n            end);\n\n            return;\n        end;\n    end;\nend;\n\nreturn v9;"
};
