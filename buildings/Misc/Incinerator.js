export default {
  id: "Incinerator",
  category: "Misc",
  tier: 2,
  cost: 5000,
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
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1.7356414794921875,
        x: -0.036285400390625
      },
      gameOffset: {
        y: 2.902207374572754,
        x: -0.036285400390625,
        z: -1.7356414794921875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal _ = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Achievements);\nlocal Waste = require(ReplicatedStorage.Modules.Waste);\n\nreturn {\n    localUpdate = function() -- Line: 16, Name: localUpdate\n    end,\n\n    tick = function() -- Line: 18, Name: tick\n        -- upvalues: u1 (copy), Waste (copy)\n        local v2 = u1:getBuffer();\n        local v3 = u1:getItem();\n\n        if v2 <= 0 then\n            script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = false;\n\n            return;\n        end;\n\n        Waste.disposeOf(v3, v2);\n        u1:removeItem(v2);\n\n        if u1:getBuffer() == 0 then\n            u1:setItem(0, \"\");\n        end;\n\n        script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = true;\n    end\n};"
};
