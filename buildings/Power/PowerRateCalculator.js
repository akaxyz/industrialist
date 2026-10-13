export default {
  id: "PowerRateCalculator",
  category: "Power",
  tier: 2,
  cost: 1200,
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
      name: "MainConnector",
      kind: "mv",
      maxAmount: 500000,
      transferAmount: 100000,
      siteOffset: {
        y: 0.0500030517578125,
        x: 5.54998779296875
      },
      gameOffset: {
        y: 3.6749989986419678,
        x: 5.54998779296875,
        z: 0.0500030517578125
      },
      wireRange: 16
    }
  ],
  data: [],
  script: "local u1 = 0;\nlocal u2 = 0;\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u3 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal u4 = require(game:GetService(\"ReplicatedStorage\").FormatNumber.Main).NumberFormatter.with();\nlocal v5 = {};\nlocal u6 = 0;\nlocal u7 = workspace:GetAttribute(\"Difficulty\");\n\nfunction v5.tick() -- Line: 22\n    -- upvalues: u3 (copy), u1 (ref), u4 (copy), u2 (ref), u6 (ref), u7 (copy)\n    u1 = u1 + u3:getFlow();\n    u3:setFlow(0);\n    script.Parent.Rate.SurfaceGui.TextLabel.Text = u4:Format((math.floor(u2))) .. \"MF/s\";\n    u6 = u6 + 1;\n\n    if u6 == 30 then\n        u6 = 0;\n        u2 = (u2 + u1) / 2;\n        u1 = 0;\n    end;\n\n    if u7 >= 4 then\n        u3:removePower(u3:getBuffer());\n    end;\nend;\n\nreturn v5;"
};
