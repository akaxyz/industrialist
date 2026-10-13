export default {
  id: "GasolineGenerator",
  category: "Power",
  tier: 2,
  cost: 900,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -1.850006103515625,
        x: 1.0000150203704834
      },
      gameOffset: {
        y: 2.324997901916504,
        x: 1.0000150203704834,
        z: -1.850006103515625
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 700000,
      transferAmount: 25000,
      siteOffset: {
        y: 1.29998779296875,
        x: 1.300018072128296
      },
      gameOffset: {
        y: 3.274998188018799,
        x: 1.300018072128296,
        z: 1.29998779296875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal ParticleEmitter = script.Parent.SmokeStack1.ParticleEmitter;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u3 = 0;\nlocal Gasoline = Items.Gasoline;\nlocal u4 = 0;\nlocal v5 = {};\nlocal u6 = 0;\n\nfunction v5.localUpdate() -- Line: 26\n    -- upvalues: State (copy), ParticleEmitter (copy)\n    if State.Value ~= \"Running\" then\n        if State.Value == \"\" then\n            script.Parent.Base.Generator:Stop();\n            ParticleEmitter.Enabled = false;\n        end;\n\n        return;\n    end;\n\n    script.Parent.Base.Generator:Play();\n    ParticleEmitter.Enabled = true;\nend;\n\nfunction v5.tick() -- Line: 36\n    -- upvalues: u3 (ref), Pollution (copy), u4 (ref), u2 (copy), u6 (ref), State (copy), u1 (copy), Gasoline (copy)\n    if u3 ~= 0 then\n        u3 = u3 - 1;\n        local v7 = Pollution;\n        v7.Value = v7.Value + u4;\n        u2:addPower(u6);\n\n        if u3 == 0 then\n            State.Value = \"\";\n        end;\n    end;\n\n    if u1:hasAmountOf(Gasoline.DisplayName, 0.1) then\n        if not u2:canHoldXMore(24000) then\n            return;\n        end;\n\n        State.Value = \"Running\";\n        u1:removeItem(0.1);\n        u3 = 2;\n        u6 = 12000;\n        u4 = 3;\n\n        return;\n    end;\n\n    if not u1:hasAmountOf(\"GasolineE10\", 0.1) then\n        if u1:hasAmountOf(\"Leaded Gasoline\", 0.1) then\n            if not u2:canHoldXMore(500000) then\n                return;\n            end;\n\n            State.Value = \"Running\";\n            u1:removeItem(0.1);\n            u3 = 5;\n            u6 = 100000;\n            u4 = 900;\n        end;\n\n        return;\n    end;\n\n    if not u2:canHoldXMore(48000) then\n        return;\n    end;\n\n    State.Value = \"Running\";\n    u1:removeItem(0.1);\n    u3 = 10;\n    u6 = 24000;\n    u4 = 3;\nend;\n\nreturn v5;"
};
