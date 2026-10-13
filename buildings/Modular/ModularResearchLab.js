export default {
  id: "ModularResearchLab",
  category: "Modular",
  cost: 750,
  base: {
    height: 16,
    offset: {
      y: 4,
      x: -6
    },
    width: 16
  },
  nodes: [],
  data: {
    Items: ""
  },
  updateEvery: 30,
  script: "local v1 = {};\ngame:GetService(\"ReplicatedStorage\");\nlocal Items = script.Parent.ModelData.Items;\n\nfunction script.Parent.GetData.OnInvoke(p2, p3, p4, p5) -- Line: 6\n    -- upvalues: Items (copy)\n    if p2 == 1 then\n        local v6 = string.split(Items.Value, \"|\");\n        local v7 = #v6 <= 1 and { \"\", \"0\", \"\", \"0\", \"\", \"0\" } or v6;\n\n        return {\n            { v7[1], (tonumber(v7[2])) },\n            { v7[3], (tonumber(v7[4])) },\n            { v7[5], (tonumber(v7[6])) }\n        };\n    end;\n\n    if p2 == 2 then\n        local v8 = string.split(Items.Value, \"|\");\n        local v9 = #v8 <= 1 and { \"\", \"0\", \"\", \"0\", \"\", \"0\" } or v8;\n        v9[p3 * 2 - 1] = p4;\n        local v10 = tonumber(v9[p3 * 2]) + p5;\n        v9[p3 * 2] = tostring(v10);\n        Items.Value = table.concat(v9, \"|\");\n    end;\nend;\n\nfunction v1.tick() -- Line: 27\nend;\n\nreturn v1;"
};
