export default {
  id: "ResearchStation2",
  category: "Misc",
  tier: 2,
  cost: 5000,
  base: {
    height: 20,
    offset: {
      y: 14,
      x: -8
    },
    width: 32
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 25000,
      transferAmount: 0,
      siteOffset: {
        y: -0.851287841796875,
        x: -3.17974853515625
      },
      gameOffset: {
        y: 3.156656265258789,
        x: -3.17974853515625,
        z: -0.851287841796875
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 4,
      transferAmount: 4,
      siteOffset: {
        y: -1.349700927734375,
        x: -17.00067138671875
      },
      gameOffset: {
        y: 1.3269903659820557,
        x: -17.00067138671875,
        z: -1.349700927734375
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.NextTicks).new();\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal _ = script.Parent.State;\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal v3 = {};\nlocal Radiation = game.ReplicatedStorage.Statistics.Radiation;\n\nfunction v3.tick() -- Line: 17\n    -- upvalues: u2 (copy), u1 (copy), Items (copy), Radiation (copy)\n    if not u2:hasPower(17000) then\n        script.Parent.State.Value = \"\";\n\n        return;\n    end;\n\n    if not u1:hasAmount(0.5) then\n        script.Parent.State.Value = \"\";\n\n        return;\n    end;\n\n    local v4 = Items.findItemByDisplayName(u1:getItem());\n    local v5 = v4.RPMultiplier or 1;\n\n    if v4.Radiation ~= nil then\n        local v6 = Radiation;\n        v6.Value = v6.Value + v4.Radiation * 10;\n    end;\n\n    u1:removeItem(0.5);\n    script.Parent.State.Value = tostring(v5 * 5);\n    u2:removePower(17000);\n    workspace:SetAttribute(\"ResearchStation2Active\", workspace:GetAttribute(\"ResearchStation2Active\") + 1);\n    workspace:SetAttribute(\"ResearchStation2Speed\", workspace:GetAttribute(\"ResearchStation2Speed\") + v5);\nend;\n\nreturn v3;"
};
