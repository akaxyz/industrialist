export default {
  id: "IndustrialRoller",
  category: "Factories",
  tier: 3,
  cost: 150000,
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
      name: "InputMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 1.72845458984375,
        x: -1.02142333984375
      },
      gameOffset: {
        y: 1.7499971389770508,
        x: -1.02142333984375,
        z: 1.72845458984375
      },
      tip: "Input for metal plates/Ferroaluminium Alloy"
    },
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 45,
      transferAmount: 1,
      siteOffset: {
        y: 1.75,
        x: 5
      },
      gameOffset: {
        y: 1.725015640258789,
        x: 5,
        z: 1.75
      },
      tip: "Output for wires/coils/magnets"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 250000,
      transferAmount: 0,
      siteOffset: {
        y: -0.01153564453125,
        x: -1.511474609375
      },
      gameOffset: {
        y: 4.114995956420898,
        x: -1.511474609375,
        z: -0.01153564453125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InputMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = false;\nlocal u5 = {\n    [\"Copper Plate\"] = {\n        Amount = 2,\n        Make = { \"Copper Wire\", 12 },\n        PowerNeed = 4000,\n        Badge = 2151290823\n    },\n    [\"Iron Plate\"] = {\n        Amount = 2,\n        Make = { \"Iron Coil\", 4 },\n        PowerNeed = 6000\n    },\n    [\"Steel Ingot\"] = {\n        Amount = 2,\n        Make = { \"Steel Rod\", 2 },\n        PowerNeed = 50000\n    },\n    [\"Steel Plate\"] = {\n        Amount = 2,\n        Make = { \"Gear\", 2 },\n        PowerNeed = 50000,\n        Badge = 2152756200\n    },\n    [\"Iron Ingot\"] = {\n        Amount = 2,\n        Make = { \"Nails\", 16 },\n        PowerNeed = 6000\n    },\n    [\"Ferroaluminium Alloy Ingot\"] = {\n        Amount = 2,\n        Make = { \"Ferroaluminium Magnet\", 1 },\n        PowerNeed = 6000\n    },\n    [\"Gold Ingot\"] = {\n        Amount = 2,\n        Make = { \"Gold Wire\", 20 },\n        PowerNeed = 60000\n    },\n    [\"Zirconium Dioxide\"] = {\n        Amount = 10,\n        Make = { \"Zirconium Rod\", 0.1 },\n        PowerNeed = 250000\n    }\n};\nlocal v6 = {};\nlocal u7 = require(game.ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v6.tick() -- Line: 61\n    -- upvalues: u7 (copy), u1 (copy), u4 (ref), u2 (copy), u5 (copy), u3 (copy), Achievements (copy)\n    if u7:tickIsBusy() then\n        return;\n    end;\n\n    if not u1:canHoldXMore(16) then\n        return;\n    end;\n\n    if u4 then\n        return;\n    end;\n\n    local v8 = u2:getBuffer();\n    local v9 = u2:getItem();\n\n    for i, v in pairs(u5) do\n        if i == v9 then\n            if v8 < v.Amount then\n                return;\n            end;\n\n            if not u3:hasPower(v.PowerNeed) then\n                return;\n            end;\n\n            u4 = true;\n            u3:removePower(v.PowerNeed);\n            u2:removeItem(v.Amount);\n\n            if v.Badge ~= nil then\n                Achievements.giveBadge(v.Badge);\n            end;\n\n            script.Parent.Base.Machine:Play();\n            u7:nextTicks(6, function(p10) -- Line: 85\n                -- upvalues: u1 (ref), v (copy), u4 (ref)\n                if p10 == 1 then\n                    u1:addItemAmount(v.Make[1], v.Make[2]);\n                    u4 = false;\n                end;\n            end);\n        end;\n    end;\nend;\n\nreturn v6;"
};
