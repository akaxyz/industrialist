export default {
  id: "SpawnPoint",
  category: "Decorations",
  cost: 1,
  base: {
    height: 8,
    offset: {
      y: 0,
      x: 0
    },
    width: 8
  },
  nodes: [],
  data: [],
  updateEvery: 30,
  script: "local v1 = {};\n\nlocal function movePlayerCharacter(p2) -- Line: 3\n    p2:PivotTo(script.Parent.SpawnLocation.CFrame * CFrame.new(0, 2, 0));\nend;\n\ngame.Players.PlayerAdded:Connect(function(p3) -- Line: 8\n    -- upvalues: movePlayerCharacter (copy)\n    p3.CharacterAdded:Connect(movePlayerCharacter);\nend);\nlocal u4 = false;\n\nfunction v1.tick() -- Line: 15\n    -- upvalues: u4 (ref)\n    if u4 then\n        return;\n    end;\n\n    u4 = true;\n\n    for _, v in game.Players:GetPlayers() do\n        if v.Character ~= nil then\n            v.Character:PivotTo(script.Parent.SpawnLocation.CFrame * CFrame.new(0, 2, 0));\n        end;\n    end;\nend;\n\nreturn v1;"
};
