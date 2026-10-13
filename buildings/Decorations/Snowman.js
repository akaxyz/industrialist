export default {
  id: "Snowman",
  category: "Decorations",
  cost: 4000,
  base: {
    height: 12,
    offset: {
      y: -2,
      x: 2
    },
    width: 12
  },
  nodes: [],
  data: {
    Seed: 0
  },
  script: "local v1 = {};\nlocal Seed = script.Parent.ModelData.Seed;\n\nfunction v1.localUpdate() -- Line: 6\nend;\n\nfunction RandomColor(p2)\n    math.randomseed(p2);\n    local v3 = math.random(0, 255);\n    math.randomseed(p2 - 651);\n    local v4 = math.random(0, 255);\n    math.randomseed(p2 + 5453);\n    local v5 = math.random(0, 255);\n\n    return Color3.fromRGB(v3, v4, v5);\nend;\n\nlocal u6 = 333;\n\nfunction v1.localStart() -- Line: 21\n    -- upvalues: u6 (ref), Seed (copy)\n    repeat\n        u6 = u6 - 1;\n        task.wait();\n    until Seed.Value ~= 0 or u6 <= 0;\n\n    local v7 = RandomColor(Seed.Value);\n    script.Parent.Scarf.Color = v7;\n    math.randomseed(Seed.Value);\n\n    if math.random(1, 100) == 1 then\n        script.Parent.Scarf.Material = \"Neon\";\n    end;\nend;\n\nlocal u8 = false;\n\nfunction v1.tick() -- Line: 41\n    -- upvalues: u8 (ref), Seed (copy)\n    if u8 == false then\n        u8 = true;\n\n        if Seed.Value == 0 then\n            local new = Random.new;\n            local v9 = tick() + script.Parent.Scarf.Position.X - script.Parent.Scarf.Position.Y * script.Parent.Scarf.Position.X;\n            Seed.Value = new((math.abs(v9))):NextNumber(1, 9999999);\n        end;\n    end;\nend;\n\nreturn v1;"
};
