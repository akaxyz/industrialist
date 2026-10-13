export default {
  id: "LightningRod",
  category: "Misc",
  tier: 3,
  cost: 75000,
  base: {
    height: 17.999996185302734,
    offset: {
      y: -7.000030517578125,
      x: -7
    },
    width: 18
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "hv",
      direction: "output",
      maxAmount: 100000000,
      transferAmount: 30000000,
      siteOffset: {
        y: -14.9000244140625,
        x: -14.89996337890625
      },
      gameOffset: {
        y: 13.096951484680176,
        x: -14.89996337890625,
        z: -14.9000244140625
      },
      wireRange: 150
    }
  ],
  data: [],
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal v1 = {};\nlocal _ = script.Parent.State;\n\nfunction v1.localUpdate() -- Line: 11\nend;\n\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = tick();\nscript.Lightning.Event:Connect(function() -- Line: 18\n    -- upvalues: u3 (ref), u2 (copy)\n    local v4 = tick();\n    u3 = v4;\n    script.Parent.Particles.ParticleEmitter:Emit(300);\n    script.Parent.Particles2.ParticleEmitter:Emit(300);\n    u2:addPower(100000000);\n\n    for _, child in pairs(script.Parent.Indicators:GetChildren()) do\n        child.Material = \"Neon\";\n    end;\n\n    for i = 1, 10 do\n        script.Parent.Indicators[i].Material = \"SmoothPlastic\";\n        task.wait(0.1);\n\n        if u3 ~= v4 then\n            break;\n        end;\n    end;\nend);\n\nfunction v1.tick() -- Line: 36\n    -- upvalues: u2 (copy)\n    u2:removePower(u2:getBuffer() / 2);\nend;\n\nreturn v1;"
};
