export default {
  id: "SnowGlobe2",
  category: "Decorations",
  cost: 500001,
  base: {
    height: 10,
    offset: {
      y: -3,
      x: 3
    },
    width: 10
  },
  nodes: [],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal State = script.Parent.State;\nscript.Parent.Base.ProximityPrompt.Enabled = true;\nlocal v1 = {};\nlocal Radiation = game.ReplicatedStorage.Statistics.Radiation;\nscript.Parent.Base.ProximityPrompt.Triggered:Connect(function(p2) -- Line: 11\n    -- upvalues: State (copy), ReplicatedStorage (copy), Radiation (copy)\n    script.Parent.Base.ProximityPrompt.Enabled = false;\n    State.Value = \"More\";\n\n    if math.random(1, 100) <= 2 then\n        ReplicatedStorage.Raining.Value = true;\n    end;\n\n    task.wait(5);\n    Radiation.Value = math.max(Radiation.Value - 50000, 0);\n    State.Value = \"\";\n    task.wait(2);\n    script.Parent.Base.ProximityPrompt.Enabled = true;\nend);\n\nfunction v1.tick() -- Line: 27\nend;\n\nreturn v1;"
};
