export default {
  id: "SnowGlobe",
  category: "Decorations",
  cost: 5000,
  base: {
    height: 10,
    offset: {
      y: -3,
      x: 2.99920654296875
    },
    width: 10
  },
  nodes: [],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal State = script.Parent.State;\nscript.Parent.Base.ProximityPrompt.Enabled = true;\nlocal v1 = {\n    localUpdate = function() -- Line: 9, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value ~= \"\" then\n            if State.Value == \"More\" then\n                script.Parent.Particle.ParticleEmitter.Enabled = true;\n                script.Parent.Particle.ParticleEmitter.Rate = 30;\n                script.Parent.Base[\"Sleigh Bells\"]:Play();\n            end;\n\n            return;\n        end;\n\n        script.Parent.Particle.ParticleEmitter.Rate = 5;\n        script.Parent.Particle.ParticleEmitter.Enabled = false;\n    end\n};\n\nif game.Players.LocalPlayer == nil then\n    script.Parent.Base.ProximityPrompt.Triggered:Connect(function(p2) -- Line: 20\n        -- upvalues: State (copy), ReplicatedStorage (copy)\n        script.Parent.Base.ProximityPrompt.Enabled = false;\n        State.Value = \"More\";\n\n        if math.random(1, 100) <= 2 then\n            ReplicatedStorage.Raining.Value = true;\n        end;\n\n        task.wait(5);\n        State.Value = \"\";\n        script.Parent.Base.ProximityPrompt.Enabled = true;\n    end);\nend;\n\nfunction v1.tick() -- Line: 32\nend;\n\nreturn v1;"
};
