export default {
  id: "BigLiquidBurner",
  category: "Misc",
  tier: 2,
  cost: 10000,
  base: {
    height: 10,
    offset: {
      y: 3,
      x: 3
    },
    width: 10
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -1.96551513671875,
        x: 2.9995880126953125
      },
      gameOffset: {
        y: 2.0033512115478516,
        x: 2.9995880126953125,
        z: -1.96551513671875
      },
      tip: "Input for the liquid to remove"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal _ = game.ReplicatedStorage.Pollution;\nlocal Achievements = require(ReplicatedStorage.Modules.Achievements);\nlocal v2 = {};\nlocal Waste = require(ReplicatedStorage.Modules.Waste);\nlocal State = script.Parent.State;\n\nfunction v2.tick() -- Line: 18\n    -- upvalues: u1 (copy), Achievements (copy), Waste (copy), State (copy)\n    local v3 = u1:getBuffer();\n    local v4 = u1:getItem();\n\n    if v3 == 0 then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if v4 ~= \"Residue\" and (v4 ~= \"Water\" and (v4 ~= \"Filtered Water\" and (v4 ~= \"Distilled Water\" and v4 == \"Liquid Gold\"))) then\n        Achievements.giveBadge(1640952538292011);\n    end;\n\n    local v5 = Waste.disposeOf(v4, v3);\n    u1:removeItem(v3);\n    State:SetAttribute(\"Pollution\", v5);\n    State.Value = v3;\nend;\n\nreturn v2;"
};
