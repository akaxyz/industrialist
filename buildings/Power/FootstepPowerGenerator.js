export default {
  id: "FootstepPowerGenerator",
  category: "Power",
  tier: 1,
  cost: 7202,
  base: {
    height: 4,
    offset: {
      y: 0.00027942657470703125,
      x: -0.000164031982421875
    },
    width: 4
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 100,
      siteOffset: {
        y: -1.8299989700317383,
        x: 1.8400001525878906
      },
      gameOffset: {
        y: 0.4500002861022949,
        x: 1.8400001525878906,
        z: -1.8299989700317383
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal v1 = {};\nlocal State = script.Parent.State;\nlocal Hitbox = script.Parent.Hitbox;\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nHitbox.Touched:Connect(function() -- Line: 11\n    -- upvalues: State (copy), u2 (copy)\n    State.Value = math.random(1, 100);\n    u2:addPower(1);\nend);\n\nfunction v1.tick() -- Line: 16\nend;\n\nreturn v1;"
};
