export default {
  id: "DieselEngineThrottleController",
  category: "Modular",
  tier: 2,
  cost: 10000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [],
  data: {
    Throttle: 100
  },
  script: "local v1 = {};\nlocal Throttle = script.Parent.ModelData.Throttle;\nlocal Controller = script.Parent.Controller;\nController.Increase.Triggered:Connect(function() -- Line: 5\n    -- upvalues: Throttle (copy)\n    if Throttle.Value >= 100 then\n        Throttle.Value = 100;\n\n        return;\n    end;\n\n    local v2 = Throttle;\n    v2.Value = v2.Value + 10;\nend);\nController.Decrease.Triggered:Connect(function() -- Line: 12\n    -- upvalues: Throttle (copy)\n    if Throttle.Value <= 10 then\n        Throttle.Value = 10;\n\n        return;\n    end;\n\n    local v3 = Throttle;\n    v3.Value = v3.Value - 10;\nend);\nlocal u4 = 0;\n\nfunction v1.tick() -- Line: 21\n    -- upvalues: Controller (copy), Throttle (copy), u4 (ref)\n    Controller.Decrease.ObjectText = Throttle.Value .. \"%\";\n    Controller.Increase.ObjectText = Throttle.Value .. \"%\";\n    Controller.Decrease.Enabled = true;\n    Controller.Increase.Enabled = true;\n    u4 = u4 + 1;\n\n    if u4 % 5 == 0 then\n        u4 = 0;\n        Throttle.Value = math.clamp(Throttle.Value, 10, 100);\n    end;\nend;\n\nreturn v1;"
};
