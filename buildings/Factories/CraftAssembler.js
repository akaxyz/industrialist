export default {
  id: "CraftAssembler",
  category: "Factories",
  cost: 1000,
  base: {
    height: 16,
    offset: {
      y: 6.00006103515625,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 250000,
      transferAmount: 0,
      siteOffset: {
        y: -1.37933349609375,
        x: 0.7606201171875
      },
      gameOffset: {
        y: 3.9591944217681885,
        x: 0.7606201171875,
        z: -1.37933349609375
      }
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 80,
      transferAmount: 2,
      siteOffset: {
        y: 9.025634765625,
        x: 1.754638671875
      },
      gameOffset: {
        y: 2.0249931812286377,
        x: 1.754638671875,
        z: 9.025634765625
      },
      tip: "Output for crafted item"
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 100,
      transferAmount: 2,
      siteOffset: {
        y: -0.974365234375,
        x: 1.754638671875
      },
      gameOffset: {
        y: 2.0249931812286377,
        x: 1.754638671875,
        z: -0.974365234375
      },
      tip: "Input for first item (check Recipe book)"
    },
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 200,
      transferAmount: 2,
      siteOffset: {
        y: 1.025634765625,
        x: 1.754638671875
      },
      gameOffset: {
        y: 2.0249931812286377,
        x: 1.754638671875,
        z: 1.025634765625
      },
      tip: "Input for the second item (check Recipe book)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal recipes = require(script.Parent.Shop).recipes;\nlocal u6 = {};\nlocal v7 = {};\n\nfor _, v in pairs(recipes) do\n    table.insert(u6, { v.Ingredients[1], v.Ingredients[2], v.Production[1] });\nend;\n\nlocal u8 = 1;\n\nfunction checkIfThisRecipe(p9, p10, p11, p12, p13, p14, p15)\n    -- upvalues: u6 (copy)\n    local v16 = u6[p9];\n\n    if p14 ~= \"\" and (v16[3][1] ~= p14 or v16[3][2] + p15 > 80) then\n        return false;\n    end;\n\n    if v16[1][1] == p10 and (v16[1][2] <= p11 and (v16[2][1] == p12 and v16[2][2] <= p13)) then\n        return true, false;\n    end;\n\n    if v16[2][1] == p10 and (v16[2][2] <= p11 and (v16[1][1] == p12 and v16[1][2] <= p13)) then\n        return true, true;\n    end;\n\n    return false;\nend;\n\nfunction correctRecipe(u17, p18)\n    -- upvalues: u3 (copy), u4 (copy), State (copy), u1 (copy), u5 (copy), u2 (copy)\n    if p18 then\n        u3:removeItem(u17[2][2]);\n        u4:removeItem(u17[1][2]);\n    else\n        u3:removeItem(u17[1][2]);\n        u4:removeItem(u17[2][2]);\n    end;\n\n    State.Value = \"1\";\n    u1:nextTicks(15, function(p19) -- Line: 56\n        -- upvalues: u5 (ref), State (ref), u2 (ref), u17 (copy)\n        u5:removePower(4000);\n\n        if p19 == 1 then\n            State.Value = \"12\";\n            u2:addItemAmount(u17[3][1], u17[3][2]);\n        end;\n    end);\nend;\n\nfunction v7.tick() -- Line: 65\n    -- upvalues: u1 (copy), u5 (copy), State (copy), u3 (copy), u4 (copy), u2 (copy), u8 (ref), u6 (copy)\n    if u1:tickIsBusy() then\n        return;\n    end;\n\n    if not u5:hasPower(60000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v20 = u3:getItem();\n    local v21 = u3:getBuffer();\n\n    if v20 == \"\" then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v22 = u4:getItem();\n    local v23 = u4:getBuffer();\n\n    if v22 == \"\" then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v24 = u2:getItem();\n    local v25 = u2:getBuffer();\n    local v26, v27 = checkIfThisRecipe(u8, v20, v21, v22, v23, v24, v25);\n\n    if v26 then\n        correctRecipe(u6[u8], v27);\n\n        return;\n    end;\n\n    for i, _ in u6 do\n        if i ~= u8 then\n            local v28, v29 = checkIfThisRecipe(i, v20, v21, v22, v23, v24, v25);\n\n            if v28 then\n                u8 = i;\n                correctRecipe(u6[u8], v29);\n\n                return;\n            end;\n        end;\n    end;\n\n    State.Value = \"\";\nend;\n\nreturn v7;"
};
