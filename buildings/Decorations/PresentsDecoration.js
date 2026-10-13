export default {
  id: "PresentsDecoration",
  category: "Decorations",
  cost: 40,
  base: {
    height: 16,
    offset: {
      y: -2,
      x: 2
    },
    width: 16
  },
  nodes: [],
  data: {
    Seed: 0
  },
  script: "local v1 = {};\nlocal Seed = script.Parent.ModelData.Seed;\n\nfunction v1.localUpdate() -- Line: 6\nend;\n\nfunction RandomColor(p2)\n    math.randomseed(p2);\n    local v3 = math.random(0, 255);\n    math.randomseed(p2 - 651);\n    local v4 = math.random(0, 255);\n    math.randomseed(p2 + 5453);\n    local v5 = math.random(0, 255);\n\n    return Color3.fromRGB(v3, v4, v5);\nend;\n\nlocal u6 = 333;\n\nfunction v1.localStart() -- Line: 21\n    -- upvalues: u6 (ref), Seed (copy)\n    repeat\n        u6 = u6 - 1;\n        task.wait();\n    until Seed.Value ~= 0 or u6 <= 0;\n\n    for _, child in pairs(script.Parent.Presents:GetChildren()) do\n        local v7 = RandomColor(Seed.Value + tonumber(child.Name));\n        local v8 = RandomColor(Seed.Value + 54110 + tonumber(child.Name));\n\n        for _, child2 in pairs(child.Primary:GetChildren()) do\n            child2.Color = v7;\n        end;\n\n        for _, child2 in pairs(child.Secondary:GetChildren()) do\n            child2.Color = v8;\n        end;\n    end;\nend;\n\nlocal u9 = false;\n\nfunction v1.tick() -- Line: 50\n    -- upvalues: u9 (ref), Seed (copy)\n    if u9 == false then\n        u9 = true;\n\n        if Seed.Value == 0 then\n            local new = Random.new;\n            local v10 = tick() + script.Parent.Base.Position.X - script.Parent.Base.Position.Y * script.Parent.Base.Position.X;\n            Seed.Value = new((math.abs(v10))):NextNumber(1, 9999999);\n        end;\n    end;\nend;\n\nreturn v1;"
};
