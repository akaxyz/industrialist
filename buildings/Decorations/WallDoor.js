export default {
  id: "WallDoor",
  category: "Decorations",
  cost: 4000,
  base: {
    height: 8,
    offset: {
      y: 0,
      x: 0
    },
    width: 32
  },
  nodes: [],
  data: {
    Open: false
  },
  updateEvery: 30,
  script: "local v1 = {};\nlocal _ = script.Parent.State;\n\nif game.Players.LocalPlayer == nil then\n    local Permissions = require(game.ReplicatedStorage.Modules.Permissions);\n    script.Parent.Hitbox.ClickDetector.MouseClick:Connect(function(p2) -- Line: 7\n        -- upvalues: Permissions (copy)\n        if Permissions.doesPlayerHavePermission(p2, Permissions.Levels.BasicInteraction) then\n            if script.Parent.Hitbox.ClickDetector.MaxActivationDistance == 0 then\n                return;\n            end;\n\n            script.Parent.Hitbox.ClickDetector.MaxActivationDistance = 0;\n            script.Parent.ModelData.Open.Value = not script.Parent.ModelData.Open.Value;\n            task.wait(6);\n            script.Parent.Hitbox.ClickDetector.MaxActivationDistance = 10;\n        end;\n    end);\nend;\n\nfunction v1.tick() -- Line: 18\nend;\n\nreturn v1;"
};
