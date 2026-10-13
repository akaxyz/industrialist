export default {
  id: "BlastFurnace",
  category: "Factories",
  tier: 3,
  cost: 60000,
  base: {
    height: 16,
    offset: {
      y: -2,
      x: -2
    },
    width: 16
  },
  nodes: [
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 48,
      transferAmount: 20,
      siteOffset: {
        y: -10.0242919921875,
        x: -3.0702061653137207
      },
      gameOffset: {
        y: 1.9880008697509766,
        x: -3.0702061653137207,
        z: -10.0242919921875
      },
      tip: "Output"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 5000000,
      transferAmount: 0,
      siteOffset: {
        y: 3.345802068710327,
        x: -7.2216339111328125
      },
      gameOffset: {
        y: 9.765649795532227,
        x: -7.2216339111328125,
        z: 3.345802068710327
      }
    },
    {
      name: "OtherInMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 30,
      transferAmount: 2,
      siteOffset: {
        y: 5.840202331542969,
        x: -1.0202029943466187
      },
      gameOffset: {
        y: 2.0380001068115234,
        x: -1.0202029943466187,
        z: 5.840202331542969
      },
      tip: "Input for Iron Ingots/Metal Powders/Metal Mixes/ Oak Logs/ Crushed Bauxite/Rock"
    },
    {
      name: "CoalInMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: 5.840202331542969,
        x: -3.020203113555908
      },
      gameOffset: {
        y: 2.0380001068115234,
        x: -3.020203113555908,
        z: 5.840202331542969
      },
      tip: "Input for Coal or Coke Fuel"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.EffectUtils).new(script);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.CoalInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OtherInMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u6 = require(ReplicatedStorage.Modules.EffectUtils).new(script);\nu6:registerState(\"running\", true, function() -- Line: 20\n    script.Parent.SmokeStack.Attachment.ParticleEmitter.Enabled = true;\n    script.Parent.Base.Base:Play();\nend);\nu6:registerState(\"running\", false, function() -- Line: 24\n    script.Parent.SmokeStack.Attachment.ParticleEmitter.Enabled = false;\n    script.Parent.Base.Base:Stop();\nend);\nlocal v7 = {\n    localUpdate = function() -- Line: 31, Name: localUpdate\n        -- upvalues: u6 (copy)\n        u6:localUpdate();\n    end\n};\nlocal u8 = { { { \"Coal\", 4 }, { \"Iron Ingot\", 1 }, { \"Steel Ingot\", 2 } }, { { \"Coal\", 5 }, { \"Iron Mix\", 3.2 }, { \"Steel Ingot\", 6 } }, { { \"Coal\", 1.66 }, { \"Iron Powder\", 1.6 }, { \"Iron Mix\", 3.2 } }, { { \"Coal\", 3.32 }, { \"Copper Powder\", 2.66 }, { \"Copper Mix\", 5.32 } }, { { \"Coal\", 4 }, { \"Oak Log\", 2 }, { \"Coke Fuel\", 6 } }, { { \"Coke Fuel\", 4 }, { \"Crushed Bauxite\", 4 }, { \"Alumina\", 6 } }, { { \"Coal\", 4 }, { \"Sand\", 4 }, { \"Silicon\", 5 } }, { { \"Coal\", 4 }, { \"Rock\", 4 }, { \"Iron Mix\", 4 } }, { { \"Coke Fuel\", 1 }, { \"Iron Ingot\", 2 }, { \"Steel Ingot\", 6 } }, { { \"Coke Fuel\", 1.5 }, { \"Iron Mix\", 19.2 }, { \"Steel Ingot\", 24 } }, { { \"Coke Fuel\", 2 }, { \"Rock\", 4 }, { \"Iron Mix\", 6 } }, { { \"Coke Fuel\", 1 }, { \"Iron Powder\", 4.8 }, { \"Iron Mix\", 12.8 } }, { { \"Coke Fuel\", 1 }, { \"Copper Powder\", 7.98 }, { \"Copper Mix\", 21.28 } }, { { \"Coke Fuel\", 4 }, { \"Sand\", 4 }, { \"Silicon\", 10 } } };\n\nfunction v7.tick() -- Line: 114\n    -- upvalues: u1 (copy), u5 (copy), u8 (copy), u2 (copy), u3 (copy), u4 (copy), u6 (copy), Pollution (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u5:hasPower(75000) then\n        return;\n    end;\n\n    for _, v in pairs(u8) do\n        if u2:hasAmountOf(v[1][1], v[1][2]) and (u3:hasAmountOf(v[2][1], v[2][2]) and u4:canHoldXMoreOf(v[3][1], v[3][2])) then\n            u3:removeItem(v[2][2]);\n            u6:setState(\"running\", true);\n            u1:nextTicks(5, function(p9) -- Line: 127\n                -- upvalues: u4 (ref), v (copy), u6 (ref), u5 (ref), u2 (ref), Pollution (ref)\n                if p9 == 1 then\n                    u4:setUsedTemperature(300);\n                    u4:addItemAmount(v[3][1], v[3][2]);\n                    u6:setState(\"running\", false);\n                end;\n\n                u5:removePower(15000);\n                u2:removeItem(v[1][2] / 5);\n                local v10 = Pollution;\n                v10.Value = v10.Value + 70;\n            end);\n\n            return;\n        end;\n    end;\nend;\n\nreturn v7;"
};
