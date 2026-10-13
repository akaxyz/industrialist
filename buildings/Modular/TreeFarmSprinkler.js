export default {
  id: "TreeFarmSprinkler",
  category: "Modular",
  cost: 200,
  base: {
    height: 8,
    offset: {
      y: 2.0000152587890625,
      x: -2
    },
    width: 8
  },
  nodes: [],
  data: [],
  script: "local v1 = {};\nlocal State = script.Parent.State;\nlocal Spin = script.Parent.Spin;\nlocal ParticleEmitter = Spin.Union.One.ParticleEmitter;\nlocal ParticleEmitter2 = Spin.Union.Two.ParticleEmitter;\nlocal u2 = 0;\nlocal u3 = Spin:GetPivot();\nlocal u4 = false;\n\nfunction v1.localUpdate() -- Line: 14\n    -- upvalues: State (copy), u4 (ref), ParticleEmitter (copy), ParticleEmitter2 (copy), u2 (ref), Spin (copy), u3 (copy)\n    if State.Value == \"1\" and u4 == false then\n        u4 = true;\n        task.spawn(function() -- Line: 18\n            -- upvalues: ParticleEmitter (ref), ParticleEmitter2 (ref), u2 (ref), Spin (ref), u3 (ref), u4 (ref)\n            script.Parent.Base[\"Water Hose 1 (SFX)\"]:Play();\n            ParticleEmitter.Enabled = true;\n            ParticleEmitter2.Enabled = true;\n            local v5 = 0;\n\n            repeat\n                v5 = v5 + 1;\n                u2 = u2 + 3;\n                task.wait(0.03333333333333333);\n                Spin:PivotTo(u3 * CFrame.Angles(math.rad(u2), 0, 0));\n            until v5 >= 400;\n\n            ParticleEmitter.Enabled = false;\n            ParticleEmitter2.Enabled = false;\n            u4 = false;\n            script.Parent.Base[\"Water Hose 1 (SFX)\"]:Stop();\n        end);\n    end;\nend;\n\nfunction v1.tick() -- Line: 39\nend;\n\nreturn v1;"
};
