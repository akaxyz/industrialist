export default {
  id: "DieselGenerator",
  category: "Power",
  tier: 2,
  cost: 4500,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 250000,
      transferAmount: 25000,
      siteOffset: {
        y: 2.14996337890625,
        x: -0.9527587890625
      },
      gameOffset: {
        y: 3.6249961853027344,
        x: -0.9527587890625,
        z: 2.14996337890625
      }
    },
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 3,
        x: -1.7527313232421875
      },
      gameOffset: {
        y: 1.9749956130981445,
        x: -1.7527313232421875,
        z: 3
      },
      tip: "Higher grade fuel burns longer and outputs more power!"
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal ParticleEmitter = script.Parent.SmokeStack1.ParticleEmitter;\nlocal ParticleEmitter2 = script.Parent.SmokeStack2.ParticleEmitter;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u3 = 0;\nlocal CrudeDiesel = Items.CrudeDiesel;\nlocal PoorQualityDiesel = Items.PoorQualityDiesel;\nlocal Diesel = Items.Diesel;\nlocal RefinedDiesel = Items.RefinedDiesel;\nlocal v4 = {};\nlocal u5 = 0;\n\nfunction v4.localUpdate() -- Line: 30\n    -- upvalues: State (copy), ParticleEmitter (copy), ParticleEmitter2 (copy)\n    if State.Value ~= \"Running\" then\n        if State.Value == \"\" then\n            script.Parent.Base.Generator:Stop();\n            ParticleEmitter.Enabled = false;\n            ParticleEmitter2.Enabled = false;\n        end;\n\n        return;\n    end;\n\n    script.Parent.Base.Generator:Play();\n    ParticleEmitter.Enabled = true;\n    ParticleEmitter2.Enabled = true;\nend;\n\nfunction v4.tick() -- Line: 42\n    -- upvalues: u3 (ref), Pollution (copy), u2 (copy), u5 (ref), State (copy), u1 (copy), CrudeDiesel (copy), PoorQualityDiesel (copy), Diesel (copy), RefinedDiesel (copy)\n    if u3 ~= 0 then\n        u3 = u3 - 1;\n        local v6 = Pollution;\n        v6.Value = v6.Value + 3;\n        u2:addPower(u5);\n\n        if u3 == 0 then\n            State.Value = \"\";\n        end;\n\n        return;\n    end;\n\n    if u1:hasAmountOf(CrudeDiesel.DisplayName, 0.1) then\n        if not u2:canHoldXMore(5000) then\n            return;\n        end;\n\n        State.Value = \"Running\";\n        u3 = 150;\n        u1:removeItem(0.1);\n        u5 = 1840;\n\n        return;\n    end;\n\n    if u1:hasAmountOf(PoorQualityDiesel.DisplayName, 0.1) then\n        if not u2:canHoldXMore(7500) then\n            return;\n        end;\n\n        State.Value = \"Running\";\n        u3 = 180;\n        u1:removeItem(0.1);\n        u5 = 2200;\n\n        return;\n    end;\n\n    if not u1:hasAmountOf(Diesel.DisplayName, 0.1) then\n        if u1:hasAmountOf(RefinedDiesel.DisplayName, 0.1) then\n            if not u2:canHoldXMore(15000) then\n                return;\n            end;\n\n            State.Value = \"Running\";\n            u3 = 310;\n            u1:removeItem(0.1);\n            u5 = 3000;\n        end;\n\n        return;\n    end;\n\n    if not u2:canHoldXMore(10000) then\n        return;\n    end;\n\n    State.Value = \"Running\";\n    u3 = 230;\n    u1:removeItem(0.1);\n    u5 = 2600;\nend;\n\nreturn v4;"
};
