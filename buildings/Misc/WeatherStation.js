export default {
  id: "WeatherStation",
  category: "Misc",
  tier: 1,
  cost: 71944,
  base: {
    height: 12,
    offset: {
      y: -6,
      x: -4
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 25000,
      transferAmount: 0,
      siteOffset: {
        y: -1.6673583984375,
        x: -8.05206298828125
      },
      gameOffset: {
        y: 7.363000392913818,
        x: -8.05206298828125,
        z: -1.6673583984375
      }
    }
  ],
  data: [],
  updateEvery: 6,
  script: "local u1 = require(game:GetService(\"ReplicatedStorage\").Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal v2 = {};\nlocal State = script.Parent.State;\n\nfunction v2.tick() -- Line: 6\n    -- upvalues: u1 (copy), State (copy)\n    if not u1:hasPower(1000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u1:removePower(1000);\n    State.Value = \"On\";\nend;\n\nreturn v2;"
};
