export default {
  id: "SteamTurbine",
  category: "Power",
  cost: 40,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "FluidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 0.1,
      siteOffset: {
        y: -5.00445556640625,
        x: 1.556732177734375
      },
      gameOffset: {
        y: 1.5299396514892578,
        x: 1.556732177734375,
        z: -5.00445556640625
      },
      tip: "Steam in for power (from Coal Generator)"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 100000,
      transferAmount: 2000,
      siteOffset: {
        y: -5.7945556640625,
        x: -0.007843017578125
      },
      gameOffset: {
        y: 2.06819748878479,
        x: -0.007843017578125,
        z: -5.7945556640625
      }
    },
    {
      name: "FluidOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 10,
      transferAmount: 2,
      siteOffset: {
        y: -5.004364013671875,
        x: -1.66107177734375
      },
      gameOffset: {
        y: 1.5548415184020996,
        x: -1.66107177734375,
        z: -5.004364013671875
      },
      tip: "After steam is converted into power water will be the side product"
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.FluidInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.FluidOutMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = script.Parent.Base[\"Turbine Spinning\"];\nlocal u5 = {};\nlocal v6 = {};\nlocal u7 = 0;\nlocal u8 = 0;\nlocal u9 = 1;\n\nfor i, v in pairs({\n    [0] = { 0, 1 },\n    [100] = { 2000, 1800 },\n    [110] = { 2001, 1801 },\n    [150] = { 4000, 3600 },\n    [155] = { 4001, 3601 },\n    [300] = { 7500, 4000 },\n    [400] = { 7800, 4001 },\n    [50000] = { 7801, 4001 }\n}) do\n    table.insert(u5, { i, v[1], v[2] });\nend;\n\ntable.sort(u5, function(p10, p11) -- Line: 32\n    return p10[1] < p11[1];\nend);\n\nfunction v6.tick() -- Line: 35\n    -- upvalues: u1 (copy), u2 (copy), u7 (ref), u8 (ref), u5 (copy), u9 (ref), u3 (copy), u4 (copy)\n    if u1:hasAmountOf(\"Steam\", 0.1) and u2:isEmptyOrHas(\"Water\") then\n        local v12 = u1:getTemp();\n\n        if u7 < u8 then\n            u7 = math.clamp(u7 + 5, 0, u8);\n        else\n            u7 = math.clamp(u7 - 5, 0, (1 / 0));\n        end;\n\n        local v13 = nil;\n        local v14 = nil;\n\n        for _, v in ipairs(u5) do\n            if v13 == nil then\n                v13 = v;\n            else\n                if v12 < v[1] and v13[1] < v12 then\n                    local v15 = (v12 - v13[1]) / (v[1] - v13[1]);\n                    v14 = { v12, v13[2] + (v[2] - v13[2]) * v15, v13[3] + (v[3] - v13[3]) * v15 };\n                    break;\n                end;\n\n                v13 = v;\n            end;\n        end;\n\n        u9 = 0.02 * v14[2];\n        u8 = v14[3];\n        u3:addPower((math.clamp(u9 * (u7 + 1) / u8, 0, 1000)));\n        u2:addItem(0.003, \"Water\");\n        u2:setTemp((math.clamp(v12 / 3, 40, 99)));\n        u1:removeItem(0.1);\n\n        if not u4.Playing then\n            u4:Play();\n        end;\n    end;\n\n    if u7 >= 2 then\n        u3:addPower(u9 * u7 / u8);\n    end;\n\n    u7 = math.clamp(u7 - 3, 0, (1 / 0));\n\n    if u7 <= 2 then\n        u4:Stop();\n\n        return;\n    end;\n\n    u4.Volume = math.clamp(u7 / 3600, 0, 0.65);\n    u4.Pitch = u7 * 1.3 / 3600 + 0.4;\nend;\n\nreturn v6;"
};
