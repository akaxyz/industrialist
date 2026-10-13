export default {
  id: "DieselEngineExhaust",
  category: "Modular",
  tier: 2,
  cost: 4500,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [],
  data: [],
  script: "local v1 = {};\nlocal ParticleEmitter = script.Parent.SmokeStack1.ParticleEmitter;\nlocal ParticleEmitter2 = script.Parent.SmokeStack1.ParticleEmitter;\nlocal Exhaust = script.Parent.Exhaust;\n\nfunction v1.tick() -- Line: 9\n    -- upvalues: Exhaust (copy), ParticleEmitter (copy), ParticleEmitter2 (copy)\n    local Value = Exhaust.Value;\n\n    if Value <= 10 then\n        ParticleEmitter.Enabled = false;\n        ParticleEmitter2.Enabled = false;\n\n        return;\n    end;\n\n    local v2 = math.ceil(5 + 15 * (10 / Value));\n    ParticleEmitter.Rate = v2;\n    ParticleEmitter2.Rate = v2;\n    ParticleEmitter.Enabled = true;\n    ParticleEmitter2.Enabled = true;\n    local v3 = Exhaust;\n    v3.Value = v3.Value - 10;\nend;\n\nreturn v1;"
};
