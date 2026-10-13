export default {
  id: "PowerRateCalculator2",
  category: "Power",
  tier: 3,
  cost: 9000,
  base: {
    height: 12,
    offset: {
      y: -3.9999771118164062,
      x: 3.99993896484375
    },
    width: 12
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      maxAmount: 3000000,
      transferAmount: 500000,
      siteOffset: {
        y: -5.4542083740234375,
        x: 7.699859619140625
      },
      gameOffset: {
        y: 3.0807857513427734,
        x: 7.699859619140625,
        z: -5.4542083740234375
      },
      wireRange: 22
    }
  ],
  data: [],
  script: "local u1 = 0;\nlocal u2 = 0;\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u3 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal u4 = require(game:GetService(\"ReplicatedStorage\").FormatNumber.Main).NumberFormatter.with();\nlocal v5 = {};\nlocal u6 = 0;\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal u7 = workspace:GetAttribute(\"Difficulty\");\n\nfunction v5.tick() -- Line: 22\n    -- upvalues: u3 (copy), u1 (ref), u2 (ref), Achievements (copy), u4 (copy), u6 (ref), u7 (copy)\n    u1 = u1 + u3:getFlow();\n    u3:setFlow(0);\n\n    if u2 > 2500000 then\n        Achievements.giveBadge(2151505005);\n    end;\n\n    script.Parent.Rate.SurfaceGui.TextLabel.Text = u4:Format((math.floor(u2))) .. \"MF/s\";\n    u6 = u6 + 1;\n\n    if u6 == 30 then\n        u6 = 0;\n        u2 = (u2 + u1) / 2;\n        u1 = 0;\n    end;\n\n    if u7 >= 4 then\n        u3:removePower(u3:getBuffer());\n    end;\nend;\n\nreturn v5;"
};
