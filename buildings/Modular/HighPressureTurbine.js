export default {
  id: "HighPressureTurbine",
  category: "Modular",
  tier: 4,
  cost: 1000000,
  base: {
    height: 24,
    offset: {
      y: 10,
      x: -10
    },
    width: 24
  },
  nodes: [],
  data: [],
  updateEvery: 30,
  script: "local v1 = {};\nlocal Tick = script.Parent.Tick;\nTick.Value = tick();\n\nfunction v1.tick() -- Line: 5\n    -- upvalues: Tick (copy)\n    if tick() - Tick.Value > 3 then\n        script.Parent.Base.MachineSound:Stop();\n    end;\nend;\n\nreturn v1;"
};
