export default {
  id: "Flag",
  category: "Decorations",
  cost: 1000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [],
  data: {
    ID: 16819569150,
    Ratio: 1.66
  },
  updateEvery: 30,
  script: "game:GetService(\"ReplicatedStorage\");\nlocal Flag = script.Parent.Flag;\nlocal u1, u2;\n\nif game.Players.LocalPlayer == nil then\n    local u3 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new();\n    game:GetService(\"InsertService\");\n    local _ = script.Parent.ModelData.ID.Value;\n    local _ = Flag.Flag.Decal2.Texture;\n    script.Parent.Base.ProximityPrompt.Triggered:Connect(function(p4) -- Line: 16\n        -- upvalues: u3 (ref)\n        u3:openMenu(p4);\n    end);\n    script.Parent.Base.ProximityPrompt.Enabled = true;\n    u3:addSetting(3, script.Parent.ModelData.ID, \"Image ID\", 0, 999999999999999);\n    u3:addSetting(1, script.Parent.ModelData.Ratio, \"Ratio (length:height)\", 0.5, 3);\n    u1 = script.Parent.ModelData.ID.Value;\n    u2 = `rbxthumb://type=Asset&id={u1}&w=420&h=420`;\n    Flag.Flag.Decal1.ImageLabel.Image = u2;\n    Flag.Flag.Decal2.Texture = u2;\nelse\n    u1 = nil;\n    u2 = nil;\nend;\n\nreturn {\n    localStart = function() -- Line: 38, Name: localStart\n        -- upvalues: Flag (copy)\n        local function changeSize() -- Line: 40\n            -- upvalues: Flag (ref)\n            local Z = Flag.Flag.Size.Z;\n            Flag.Flag.Size = Vector3.new(0.02, 4, 4 * script.Parent.ModelData.Ratio.Value);\n            Flag.Flag.CFrame = Flag.Flag.CFrame - Flag.Flag.CFrame.LookVector * (4 * script.Parent.ModelData.Ratio.Value - Z) * 0.5;\n        end;\n\n        changeSize();\n        script.Parent.ModelData.Ratio.Changed:Connect(function() -- Line: 48\n            -- upvalues: changeSize (copy)\n            changeSize();\n        end);\n\n        while task.wait(0.1) and script.Parent.Parent ~= nil do\n            Flag:PivotTo((CFrame.lookAt(Flag.Root.Position, Flag.Root.Position - workspace.GlobalWind)));\n        end;\n    end,\n\n    localUpdate = function() -- Line: 62, Name: localUpdate\n    end,\n\n    tick = function() -- Line: 66, Name: tick\n        -- upvalues: u1 (ref), u2 (ref), Flag (copy)\n        if script.Parent.ModelData.ID.Value ~= u1 then\n            u1 = script.Parent.ModelData.ID.Value;\n            u2 = `rbxthumb://type=Asset&id={u1}&w=420&h=420`;\n        end;\n\n        if Flag.Flag.Decal2.Texture ~= u2 then\n            Flag.Flag.Decal1.ImageLabel.Image = u2;\n            Flag.Flag.Decal2.Texture = u2;\n        end;\n    end\n};"
};
