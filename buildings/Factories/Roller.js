export default {
  id: "Roller",
  category: "Factories",
  cost: 411,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 250000,
      transferAmount: 0,
      siteOffset: {
        y: -0.7257080078125,
        x: -0.819091796875
      },
      gameOffset: {
        y: 2.1008167266845703,
        x: -0.819091796875,
        z: -0.7257080078125
      }
    },
    {
      name: "InputMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -0.0015716552734375,
        x: -2.000244140625
      },
      gameOffset: {
        y: 0.9250001907348633,
        x: -2.000244140625,
        z: -0.0015716552734375
      },
      tip: "Input for metal plates"
    },
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 30,
      transferAmount: 1,
      siteOffset: {
        y: 3.9854278564453125,
        x: -2.000244140625
      },
      gameOffset: {
        y: 0.9250001907348633,
        x: -2.000244140625,
        z: 3.9854278564453125
      },
      tip: "Output for wires/coils"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InputMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = {\n    [\"Copper Plate\"] = {\n        Amount = 2,\n        Make = { \"Copper Wire\", 12 },\n        PowerNeed = 4000,\n        Badge = 2151290823,\n        Animation = \"6\"\n    },\n    [\"Iron Plate\"] = {\n        Amount = 2,\n        Make = { \"Iron Coil\", 4 },\n        PowerNeed = 6000,\n        Animation = \"5\"\n    },\n    [\"Steel Ingot\"] = {\n        Amount = 2,\n        Make = { \"Steel Rod\", 2 },\n        PowerNeed = 50000,\n        Animation = \"4\"\n    },\n    [\"Steel Plate\"] = {\n        Amount = 2,\n        Make = { \"Gear\", 2 },\n        PowerNeed = 50000,\n        Badge = 2152756200,\n        Animation = \"4\"\n    },\n    [\"Iron Ingot\"] = {\n        Amount = 2,\n        Make = { \"Nails\", 16 },\n        PowerNeed = 6000,\n        Animation = \"1\"\n    },\n    [\"Gold Ingot\"] = {\n        Amount = 2,\n        Make = { \"Gold Wire\", 20 },\n        PowerNeed = 60000,\n        Animation = \"3\"\n    }\n};\nlocal v5 = {};\nlocal u6 = require(game.ReplicatedStorage.Modules.NextTicks).new();\nlocal State = script.Parent.State;\n\nfunction v5.tick() -- Line: 58\n    -- upvalues: u6 (copy), u1 (copy), State (copy), u2 (copy), u4 (copy), u3 (copy), Achievements (copy)\n    if u6:tickIsBusy() then\n        return;\n    end;\n\n    if not u1:canHoldXMore(20) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v7 = u2:getBuffer();\n    local v8 = u2:getItem();\n\n    for i, v in pairs(u4) do\n        if i == v8 then\n            if v7 < v.Amount then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u3:hasPower(v.PowerNeed) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u3:removePower(v.PowerNeed);\n            u2:removeItem(v.Amount);\n\n            if v.Badge ~= nil then\n                Achievements.giveBadge(v.Badge);\n            end;\n\n            State.Value = v.Animation;\n            u6:nextTicks(8, function(p9) -- Line: 80\n                -- upvalues: u1 (ref), v (copy), State (ref)\n                if p9 == 1 then\n                    u1:addItemAmount(v.Make[1], v.Make[2]);\n                    State.Value = \"\";\n                end;\n            end);\n\n            return;\n        end;\n    end;\n\n    State.Value = \"\";\nend;\n\nreturn v5;"
};
