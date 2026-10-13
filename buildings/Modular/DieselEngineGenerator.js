export default {
  id: "DieselEngineGenerator",
  category: "Modular",
  tier: 2,
  cost: 6000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 300000,
      siteOffset: {
        y: -0.02520751953125,
        x: 1.5711402893066406
      },
      gameOffset: {
        y: 2.0490057468414307,
        x: 1.5711402893066406,
        z: -0.02520751953125
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal Torque = script.Parent.Torque;\n\nreturn {\n    tick = function() -- Line: 9, Name: tick\n        -- upvalues: Torque (copy), u1 (copy)\n        if math.floor(Torque.Value) == 0 then\n            return;\n        end;\n\n        local v2 = 0;\n\n        if tick() - (script.Parent.Torque:GetAttribute(\"Update\") or 0) > 3 then\n            script.Parent.Torque.Value = 0;\n        end;\n\n        if script.Parent.Controller.Value == nil then\n            script.Parent.Torque.Value = 0;\n        elseif script.Parent.Controller.Value.Parent == nil then\n            script.Parent.Torque.Value = 0;\n        end;\n\n        for i = 1, math.ceil(Torque.Value) do\n            local v3 = math.clamp(i ^ 2 / 100, 5, 200);\n            v2 = v2 + math.clamp(v3 - (i <= 90 and 0 or (i - 100) ^ 2 / 100), -25, 150);\n        end;\n\n        local v4 = math.floor(v2 * 2.6);\n        u1:addPower((math.clamp(v4, 0, (1 / 0))));\n    end\n};"
};
