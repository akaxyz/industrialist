export default {
  id: "GasBurner",
  category: "Power",
  tier: 3,
  cost: 100000,
  base: {
    height: 20,
    offset: {
      y: -8,
      x: -6
    },
    width: 16
  },
  nodes: [
    {
      name: "CoolantOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 45,
      transferAmount: 10,
      siteOffset: {
        y: 1.94000244140625,
        x: -5
      },
      gameOffset: {
        y: 1.9249849319458008,
        x: -5,
        z: 1.94000244140625
      },
      tip: "Coolant out (hot water to boiler)"
    },
    {
      name: "CoolantInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 45,
      transferAmount: 10,
      siteOffset: {
        y: -17.830322265625,
        x: -3.0002288818359375
      },
      gameOffset: {
        y: 1.733004093170166,
        x: -3.0002288818359375,
        z: -17.830322265625
      },
      tip: "Coolant in (to heat)"
    },
    {
      name: "GasMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 30,
      transferAmount: 20,
      siteOffset: {
        y: -17.830322265625,
        x: -9.000228881835938
      },
      gameOffset: {
        y: 1.733004093170166,
        x: -9.000228881835938,
        z: -17.830322265625
      },
      tip: "Refined Gas input"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.GasMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.CoolantInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.CoolantOutMainPipe);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nreturn {\n    localUpdate = function() -- Line: 19, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value ~= \"run\" then\n            if State.Value == \"\" then\n                script.Parent.Smokestack1.ParticleEmitter.Enabled = false;\n                script.Parent.Smokestack2.ParticleEmitter.Enabled = false;\n                script.Parent.Smokestack3.ParticleEmitter.Enabled = false;\n                script.Parent.Base[\"Generator sound\"]:Stop();\n            end;\n\n            return;\n        end;\n\n        script.Parent.Smokestack1.ParticleEmitter.Enabled = true;\n        script.Parent.Smokestack2.ParticleEmitter.Enabled = true;\n        script.Parent.Smokestack3.ParticleEmitter.Enabled = true;\n        script.Parent.Base[\"Generator sound\"]:Play();\n    end,\n\n    tick = function() -- Line: 33, Name: tick\n        -- upvalues: u2 (copy), State (copy), u3 (copy), u1 (copy), Pollution (copy)\n        local v4;\n\n        if u2:hasAmountOf(\"Water\", 30) then\n            v4 = 0;\n        elseif u2:hasAmountOf(\"Filtered Water\", 30) then\n            v4 = 5;\n        else\n            if not u2:hasAmountOf(\"Distilled Water\", 30) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            v4 = 10;\n        end;\n\n        local v5 = u2:getItem();\n\n        if not u3:canHoldXMoreOf(v5, 30) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if u1:hasAmountOf(\"Refined Gas\", 30) then\n            u1:removeItem(30);\n        else\n            if not u1:hasAmountOf(\"Hydrogen\", 20) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u1:removeItem(20);\n        end;\n\n        u2:removeItem(30);\n        u3:setUsedTemperature(v4 + 400);\n        u3:addItem(30, v5);\n        local v6 = Pollution;\n        v6.Value = v6.Value + 24;\n        State.Value = \"run\";\n    end\n};"
};
