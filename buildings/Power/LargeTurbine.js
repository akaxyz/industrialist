export default {
  id: "LargeTurbine",
  category: "Power",
  tier: 2,
  cost: 4000,
  base: {
    height: 10,
    offset: {
      y: 3,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "SteamInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: -0.9000244140625,
        x: 1.149993896484375
      },
      gameOffset: {
        y: 1.6750011444091797,
        x: 1.149993896484375,
        z: -0.9000244140625
      },
      tip: "Steam in for power (you might want to use the better pipes you can research later on, they are in tier 3)"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 300000,
      siteOffset: {
        y: 7.399993896484375,
        x: -2.14996337890625
      },
      gameOffset: {
        y: 1.0250015258789062,
        x: -2.14996337890625,
        z: 7.399993896484375
      }
    },
    {
      name: "WaterOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 10,
      transferAmount: 5,
      siteOffset: {
        y: -0.9000244140625,
        x: -5.29998779296875
      },
      gameOffset: {
        y: 1.6568641662597656,
        x: -5.29998779296875,
        z: -0.9000244140625
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.SteamInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.WaterOutMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal _ = game.ReplicatedStorage.Pollution;\nlocal u4 = script.Parent.Base[\"Turbine Spinning\"];\nlocal u5 = {};\nlocal v6 = {};\nlocal u7 = 0;\nlocal u8 = 0;\nlocal u9 = 500;\n\nfor i, v in pairs({\n    [0] = { 0, 1 },\n    [100] = { 2200, 1800 },\n    [110] = { 2201, 1801 },\n    [150] = { 4400, 3600 },\n    [155] = { 4401, 3601 },\n    [300] = { 8250, 4000 },\n    [400] = { 8580, 4001 },\n    [50000] = { 8600, 4001 }\n}) do\n    table.insert(u5, { i, v[1], v[2] });\nend;\n\ntable.sort(u5, function(p10, p11) -- Line: 35\n    return p10[1] < p11[1];\nend);\n\nfunction v6.tick() -- Line: 38\n    -- upvalues: u1 (copy), u2 (copy), u7 (ref), u8 (ref), u5 (copy), u9 (ref), u3 (copy), u4 (copy)\n    if u1:hasAmountOf(\"Steam\", 3) and u2:canHold(\"Water\", 0.1) then\n        local v12 = u1:getTemp();\n\n        if u7 < u8 then\n            u7 = math.clamp(u7 + 5, 0, u8);\n        else\n            u7 = math.clamp(u7 - 5, 0, (1 / 0));\n        end;\n\n        local v13 = nil;\n        local v14 = nil;\n\n        for _, v in ipairs(u5) do\n            if v13 == nil then\n                v13 = v;\n            else\n                if v12 < v[1] and v13[1] < v12 then\n                    local v15 = (v12 - v13[1]) / (v[1] - v13[1]);\n                    v14 = { v12, v13[2] + (v[2] - v13[2]) * v15, v13[3] + (v[3] - v13[3]) * v15 };\n                    break;\n                end;\n\n                v13 = v;\n            end;\n        end;\n\n        u9 = v14[2];\n        u8 = v14[3];\n        u3:addPower((math.clamp(u9 * (u7 + 1) / u8, 0, 100000)));\n        u2:addItem(0.1, \"Water\");\n        u2:setTemp((math.clamp(v12 / 3, 40, 99)));\n        u1:removeItem(3);\n\n        if not u4.Playing then\n            u4:Play();\n        end;\n    end;\n\n    if u7 >= 2 then\n        u3:addPower(u9 * u7 / u8);\n    end;\n\n    u7 = math.clamp(u7 - 3, 0, (1 / 0));\n\n    if u7 <= 2 then\n        u4:Stop();\n\n        return;\n    end;\n\n    u4.Volume = math.clamp(u7 / 3600, 0, 0.65);\n    u4.Pitch = u7 / 3600 + 0.2;\nend;\n\nreturn v6;"
};
