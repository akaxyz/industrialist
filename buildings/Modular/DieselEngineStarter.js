export default {
  id: "DieselEngineStarter",
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
      direction: "input",
      maxAmount: 3000000,
      transferAmount: 300000,
      siteOffset: {
        y: -0.02520751953125,
        x: 1.5711288452148438
      },
      gameOffset: {
        y: 1.8490030765533447,
        x: 1.5711288452148438,
        z: -0.02520751953125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal Torque = script.Parent.Torque;\n\nreturn {\n    tick = function() -- Line: 9, Name: tick\n        -- upvalues: u1 (copy), Torque (copy)\n        local v2 = math.clamp(200 - script.Parent.Torque.Value, 0, 200);\n        local v3 = u1:getBuffer() / 10000;\n        local v4 = math.clamp(v2, 0, v3);\n        u1:removePower(v4 * 10000);\n        local v5 = Torque;\n        v5.Value = v5.Value + v4;\n    end\n};"
};
