export default {
  id: "GoldItemStorageSilo",
  category: "Tanks",
  tier: 3,
  cost: 100000,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "item",
      maxAmount: 1000000,
      transferAmount: 35,
      siteOffset: {
        y: -2.0030517578125,
        x: 1.9969482421875
      },
      gameOffset: {
        y: 2.71048641204834,
        x: 1.9969482421875,
        z: -2.0030517578125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local v1 = {};\nlocal u2 = require(game.ReplicatedStorage.Modules.PipeUtilsV2).loadConnector(script.Parent.MainPipe);\nlocal Items = require(game.ReplicatedStorage.Modules.Enums.Items);\nlocal Radiation = game.ReplicatedStorage.Statistics.Radiation;\n\nfunction v1.tick() -- Line: 7\n    -- upvalues: Items (copy), u2 (copy), Radiation (copy)\n    local v3 = Items.findItemByDisplayName(u2:getItem());\n\n    if v3 ~= nil and v3.Radiation ~= nil then\n        local v4 = Radiation;\n        v4.Value = v4.Value + v3.Radiation * 0.0001 * u2:getBuffer();\n    end;\nend;\n\nreturn v1;"
};
