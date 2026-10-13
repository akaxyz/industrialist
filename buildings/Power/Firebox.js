export default {
  id: "Firebox",
  category: "Power",
  tier: 2,
  cost: 550,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "CoalInMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: 1.74993896484375,
        x: -5
      },
      gameOffset: {
        y: 2.024995803833008,
        x: -5,
        z: 1.74993896484375
      },
      tip: "Input for COAL"
    },
    {
      name: "CoolantOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 10,
      transferAmount: 5,
      siteOffset: {
        y: 1.85919189453125,
        x: -3.0500030517578125
      },
      gameOffset: {
        y: 1.9750003814697266,
        x: -3.0500030517578125,
        z: 1.85919189453125
      },
      tip: "Coolant out (put into boiler coolant in)"
    },
    {
      name: "CoolantInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 30,
      transferAmount: 5,
      siteOffset: {
        y: 1.74993896484375,
        x: 1.050018310546875
      },
      gameOffset: {
        y: 1.9999942779541016,
        x: 1.050018310546875,
        z: 1.74993896484375
      },
      tip: "Coolant in (heats up water)"
    }
  ],
  data: [],
  updateEvery: 10,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.CoalInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.CoolantInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.CoolantOutMainPipe);\nlocal ParticleEmitter = script.Parent.SmokeStack1.ParticleEmitter;\nlocal ParticleEmitter2 = script.Parent.SmokeStack2.ParticleEmitter;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u4 = \"\";\nlocal u5 = false;\n\nlocal function decorOn() -- Line: 20\n    -- upvalues: u5 (ref), ParticleEmitter (copy), ParticleEmitter2 (copy)\n    if u5 == false then\n        u5 = true;\n        ParticleEmitter.Enabled = true;\n        ParticleEmitter2.Enabled = true;\n        ParticleEmitter.Parent.furnace:Play();\n    end;\nend;\n\nlocal function decorOff() -- Line: 28\n    -- upvalues: u5 (ref), ParticleEmitter (copy), ParticleEmitter2 (copy)\n    if u5 == true then\n        u5 = false;\n        ParticleEmitter.Enabled = false;\n        ParticleEmitter2.Enabled = false;\n        ParticleEmitter.Parent.furnace:Stop();\n    end;\nend;\n\nlocal v6 = {\n    localUpdate = function() -- Line: 39, Name: localUpdate\n        -- upvalues: State (copy), u5 (ref), ParticleEmitter (copy), ParticleEmitter2 (copy)\n        if State.Value == \"Running\" then\n            if u5 == false then\n                u5 = true;\n                ParticleEmitter.Enabled = true;\n                ParticleEmitter2.Enabled = true;\n                ParticleEmitter.Parent.furnace:Play();\n            end;\n        elseif State.Value == \"Idle\" and u5 == true then\n            u5 = false;\n            ParticleEmitter.Enabled = false;\n            ParticleEmitter2.Enabled = false;\n            ParticleEmitter.Parent.furnace:Stop();\n        end;\n    end\n};\nlocal u7 = 0;\nlocal u8 = script.Parent.Base[\"Fire Burning [Sound Effect]\"];\n\nfunction v6.tick() -- Line: 50\n    -- upvalues: u7 (ref), State (copy), u1 (copy), u8 (copy), Pollution (copy), u2 (copy), u4 (ref), u3 (copy)\n    if u7 == 0 then\n        State.Value = \"Idle\";\n\n        if u1:hasAmountOf(\"Coal\", 1) then\n            u7 = 6;\n            u1:removeItem(1);\n\n            if not u8.Playing then\n                u8:Play();\n            end;\n        end;\n\n        if u7 == 0 then\n            u8:Stop();\n        end;\n    end;\n\n    if u7 ~= 0 then\n        State.Value = \"Running\";\n        u7 = u7 - 1;\n        local v9 = Pollution;\n        v9.Value = v9.Value + 50;\n\n        if u2:hasAmountOf(\"Water\", 2) or (u2:hasAmountOf(\"Filtered Water\", 2) or u2:hasAmountOf(\"Distilled Water\", 2)) then\n            u4 = u2:getItem();\n            u7 = u7 - 1;\n\n            if u7 < 0 then\n                u7 = 0;\n            end;\n\n            u2:removeItem(2);\n            u3:setUsedTemperature(240);\n            u3:addItemAmount(u4, 2);\n        end;\n    end;\nend;\n\nreturn v6;"
};
