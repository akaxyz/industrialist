export default {
  id: "MVToLVConverter",
  category: "Power",
  tier: 2,
  cost: 15000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "OutMainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 15000,
      transferAmount: 200,
      siteOffset: {
        y: -0.149993896484375,
        x: -1.850006103515625
      },
      gameOffset: {
        y: 3.494999408721924,
        x: -1.850006103515625,
        z: -0.149993896484375
      }
    },
    {
      name: "InMainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 15000,
      transferAmount: 0,
      siteOffset: {
        y: 0.0500030517578125,
        x: 5.54998779296875
      },
      gameOffset: {
        y: 3.6749989986419678,
        x: 5.54998779296875,
        z: 0.0500030517578125
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.InMainConnector);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.OutMainConnector);\n\nreturn {\n    tick = function() -- Line: 10, Name: tick\n        -- upvalues: u2 (copy), u1 (copy)\n        if not u2:canHoldXMore(95) then\n            return;\n        end;\n\n        if u1:hasPower(100) then\n            u2:addPower(95);\n            u1:removePower(100);\n        end;\n    end\n};"
};
