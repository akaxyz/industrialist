export default {
  id: "CompactCoalPowerPlant",
  category: "Power",
  cost: 550,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 50000,
      transferAmount: 4000,
      siteOffset: {
        y: -10.050239562988281,
        x: 1.5
      },
      gameOffset: {
        y: 2.399998188018799,
        x: 1.5,
        z: -10.050239562988281
      }
    },
    {
      name: "CoalInMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: 1.7499847412109375,
        x: -4
      },
      gameOffset: {
        y: 2.024996280670166,
        x: -4,
        z: 1.7499847412109375
      },
      tip: "Input for COAL"
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.PipeUtilsV2).loadConnector(script.Parent.CoalInMainPipe, false);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal ParticleEmitter = script.Parent.SmokeStack1.ParticleEmitter;\nlocal ParticleEmitter2 = script.Parent.SmokeStack2.ParticleEmitter;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u3 = false;\n\nlocal function decorOn() -- Line: 17\n    -- upvalues: u3 (ref), ParticleEmitter (copy), ParticleEmitter2 (copy)\n    if u3 == false then\n        u3 = true;\n        ParticleEmitter.Enabled = true;\n        ParticleEmitter2.Enabled = true;\n        ParticleEmitter.Parent.furnace:Play();\n    end;\nend;\n\nlocal function decorOff() -- Line: 25\n    -- upvalues: u3 (ref), ParticleEmitter (copy), ParticleEmitter2 (copy)\n    if u3 == true then\n        u3 = false;\n        ParticleEmitter.Enabled = false;\n        ParticleEmitter2.Enabled = false;\n        ParticleEmitter.Parent.furnace:Stop();\n    end;\nend;\n\nlocal u4 = 0;\n\nreturn {\n    localUpdate = function() -- Line: 40, Name: localUpdate\n        -- upvalues: State (copy), u3 (ref), ParticleEmitter (copy), ParticleEmitter2 (copy)\n        if State.Value == \"Running\" then\n            if u3 == false then\n                u3 = true;\n                ParticleEmitter.Enabled = true;\n                ParticleEmitter2.Enabled = true;\n                ParticleEmitter.Parent.furnace:Play();\n            end;\n        elseif State.Value == \"Idle\" and u3 == true then\n            u3 = false;\n            ParticleEmitter.Enabled = false;\n            ParticleEmitter2.Enabled = false;\n            ParticleEmitter.Parent.furnace:Stop();\n        end;\n    end,\n\n    tick = function() -- Line: 48, Name: tick\n        -- upvalues: u4 (ref), State (copy), u1 (copy), Pollution (copy), u2 (copy)\n        if u4 ~= 0 then\n            if u4 ~= 0 then\n                State.Value = \"Running\";\n                u4 = u4 - 1;\n                local v5 = Pollution;\n                v5.Value = v5.Value + 3.8;\n                u2:addPower(450);\n            end;\n\n            return;\n        end;\n\n        State.Value = \"Idle\";\n\n        if not u1:hasAmountOf(\"Coal\", 2) then\n            return;\n        end;\n\n        u1:removeItem(2);\n        u4 = 100;\n    end\n};"
};
