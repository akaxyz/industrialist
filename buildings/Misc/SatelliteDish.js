export default {
  id: "SatelliteDish",
  category: "Misc",
  tier: 3,
  cost: 30000,
  base: {
    height: 32,
    offset: {
      y: 0,
      x: 0
    },
    width: 32
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 100000,
      transferAmount: 0,
      siteOffset: {
        y: 7.564697265625,
        x: 5.59210205078125
      },
      gameOffset: {
        y: 6.190469741821289,
        x: 5.59210205078125,
        z: 7.564697265625
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local v1 = {};\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u2 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\n\nfunction v1.tick() -- Line: 10\n    -- upvalues: u2 (copy), State (copy)\n    if not u2:hasPower(75000) or (workspace:GetAttribute(\"SateliteDishControllerWereActive\") or 0) <= 0 then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u2:removePower(75000);\n    State.Value = \"1\";\n    workspace:SetAttribute(\"ResearchDishesActive\", (workspace:GetAttribute(\"ResearchDishesActive\") or 0) + 1);\nend;\n\nreturn v1;"
};
