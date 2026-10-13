export default {
  id: "Billboard",
  category: "Decorations",
  cost: 5000,
  base: {
    height: 12,
    offset: {
      y: -4,
      x: 4
    },
    width: 12
  },
  nodes: [],
  data: {
    ID: 17728724475
  },
  updateEvery: 30,
  script: "game:GetService(\"ReplicatedStorage\");\nlocal Image = script.Parent.Image;\nlocal u1, u2;\n\nif game.Players.LocalPlayer == nil then\n    local u3 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new();\n    game:GetService(\"InsertService\");\n    local _ = script.Parent.ModelData.ID.Value;\n    local _ = Image.One.Decal.Texture;\n    script.Parent.Base.ProximityPrompt.Triggered:Connect(function(p4) -- Line: 14\n        -- upvalues: u3 (ref)\n        u3:openMenu(p4);\n    end);\n    script.Parent.Base.ProximityPrompt.Enabled = true;\n    u3:addSetting(3, script.Parent.ModelData.ID, \"Image ID\", 0, 999999999999999);\n    u1 = script.Parent.ModelData.ID.Value;\n    u2 = `rbxthumb://type=Asset&id={u1}&w=420&h=420`;\n    Image.One.Decal.Texture = u2;\n    Image.Two.Decal.Texture = u2;\nelse\n    u1 = nil;\n    u2 = nil;\nend;\n\nreturn {\n    tick = function() -- Line: 29, Name: tick\n        -- upvalues: u1 (ref), u2 (ref), Image (copy)\n        if script.Parent.ModelData.ID.Value ~= u1 then\n            u1 = script.Parent.ModelData.ID.Value;\n            u2 = `rbxthumb://type=Asset&id={u1}&w=420&h=420`;\n        end;\n\n        if Image.One.Decal.Texture ~= u2 then\n            Image.One.Decal.Texture = u2;\n            Image.Two.Decal.Texture = u2;\n        end;\n    end\n};"
};
