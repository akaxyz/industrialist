export default {
  id: "FestiveCoolingTower",
  category: "Power",
  tier: 4,
  cost: 2500000,
  base: {
    height: 100.00010681152344,
    offset: {
      y: 48.00004577636719,
      x: -42.00006103515625
    },
    width: 100.00011444091797
  },
  nodes: [
    {
      name: "OutMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -1.52508544921875,
        x: 4.00042724609375
      },
      gameOffset: {
        y: 4.374908447265625,
        x: 4.00042724609375,
        z: -1.52508544921875
      },
      tip: "Output for cool water (should be piped to Condenser)"
    },
    {
      name: "InMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 24000,
      transferAmount: 2000,
      siteOffset: {
        y: -1.52508544921875,
        x: -4.00054931640625
      },
      gameOffset: {
        y: 4.374908447265625,
        x: -4.00054931640625,
        z: -1.52508544921875
      },
      tip: "Input for warm water (from Condenser)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "if game.Players.LocalPlayer ~= nil then\n    script.Parent.Festive.Light1:AddTag(\"ChristmasLight\");\n    script.Parent.Festive.Light2:AddTag(\"ChristmasLight\");\nend;\n\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal ParticleEmitter = script.Parent.Effects.ParticleEmitter;\nlocal State = script.Parent.State;\n\nreturn {\n    localUpdate = function() -- Line: 19, Name: localUpdate\n        -- upvalues: State (copy), ParticleEmitter (copy)\n        if State.Value == \"\" then\n            return;\n        end;\n\n        ParticleEmitter.Rate = tonumber(State.Value);\n    end,\n\n    localStart = function() -- Line: 28, Name: localStart\n        -- upvalues: ParticleEmitter (copy)\n        while task.wait(1) do\n            ParticleEmitter:Emit(ParticleEmitter.Rate);\n        end;\n    end,\n\n    tick = function() -- Line: 35, Name: tick\n        -- upvalues: u1 (copy), State (copy), u2 (copy)\n        if not u1:has(\"Distilled Water\") then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if u2:getItem() ~= \"\" and u2:getItem() ~= \"Distilled Water\" then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        local v3 = u1:getBuffer();\n        local v4 = u2:getMax() - u2:getBuffer();\n        local v5 = math.clamp(v3, 0, v4);\n        local v6 = math.clamp(v5, 0, 800);\n        State.Value = v6 / 100;\n        local v7 = u1:getTemp() / 3;\n        u2:setUsedTemperature((math.clamp(v7, 21, (1 / 0))));\n        u1:removeItem(v6);\n        u2:addItemAmount(\"Distilled Water\", v6);\n    end\n};"
};
