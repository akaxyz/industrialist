export default {
  id: "NaturalGasWell",
  category: "Extractors",
  tier: 3,
  cost: 60000,
  base: {
    height: 24,
    offset: {
      y: -10,
      x: -10
    },
    width: 24
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 3000000,
      transferAmount: 0,
      siteOffset: {
        y: 2.04998779296875,
        x: -15.5
      },
      gameOffset: {
        y: 1.9750022888183594,
        x: -15.5,
        z: 2.04998779296875
      }
    },
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 300,
      transferAmount: 30,
      siteOffset: {
        y: 2.04998779296875,
        x: -14.5
      },
      gameOffset: {
        y: 1.9750022888183594,
        x: -14.5,
        z: 2.04998779296875
      },
      tip: "Raw gas output (put into condenser to start refining)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal RawGas = require(ReplicatedStorage.Modules.Enums.Items).RawGas;\nlocal State = script.Parent.State;\nlocal u3 = false;\n\nlocal function decorOn() -- Line: 16\n    -- upvalues: u3 (ref)\n    if u3 == false then\n        u3 = true;\n        script.Parent.Base.Pump:Play();\n        script.Parent.SmokeStack.ParticleEmitter.Enabled = true;\n    end;\nend;\n\nlocal function decorOff() -- Line: 23\n    -- upvalues: u3 (ref)\n    if u3 == true then\n        u3 = false;\n        script.Parent.Base.Pump:Stop();\n        script.Parent.SmokeStack.ParticleEmitter.Enabled = false;\n    end;\nend;\n\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nreturn {\n    localUpdate = function() -- Line: 36, Name: localUpdate\n        -- upvalues: State (copy), u3 (ref)\n        if State.Value == \"\" then\n            if u3 == true then\n                u3 = false;\n                script.Parent.Base.Pump:Stop();\n                script.Parent.SmokeStack.ParticleEmitter.Enabled = false;\n            end;\n        elseif State.Value == \"Pumping\" and u3 == false then\n            u3 = true;\n            script.Parent.Base.Pump:Play();\n            script.Parent.SmokeStack.ParticleEmitter.Enabled = true;\n        end;\n    end,\n\n    tick = function() -- Line: 46, Name: tick\n        -- upvalues: u2 (copy), u1 (copy), State (copy), RawGas (copy), Pollution (copy)\n        if not u2:canHoldXMore(30) then\n            return;\n        end;\n\n        if not u1:hasPower(45000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        State.Value = \"Pumping\";\n        u1:removePower(45000);\n        u2:addItem(30, RawGas.DisplayName);\n        local v4 = Pollution;\n        v4.Value = v4.Value + 60;\n    end\n};"
};
