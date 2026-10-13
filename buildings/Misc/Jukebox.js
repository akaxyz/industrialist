export default {
  id: "Jukebox",
  category: "Misc",
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
    Volume: 0.5,
    Range: 100,
    SoundID: 17436771115
  },
  updateEvery: 5,
  script: "local u1 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new();\nlocal ModelData = script.Parent.ModelData;\n\nif game.Players.LocalPlayer == nil then\n    script.Parent.Prompt.ProximityPrompt.Enabled = true;\n    script.Parent.Prompt.ProximityPrompt.Triggered:Connect(function(p2) -- Line: 8\n        -- upvalues: u1 (copy)\n        u1:openMenu(p2);\n    end);\n    u1:addSetting(3, ModelData.Range, \"Range of sound\", 1, 1000);\n    u1:addSetting(1, ModelData.Volume, \"Volume of sound\", 0, 2);\n    u1:addSetting(3, ModelData.SoundID, \"Sound ID as found on Roblox\", 1, 999999999999999);\nend;\n\nlocal v3 = {};\nlocal Sound = script.Parent.Light.Music.Sound;\nlocal Disc = script.Parent.Disc;\n\nlocal function updateProperties() -- Line: 22\n    -- upvalues: Sound (copy), ModelData (copy)\n    Sound.RollOffMaxDistance = ModelData.Range.Value;\n    Sound.Volume = ModelData.Volume.Value;\nend;\n\nlocal function updateDisc() -- Line: 27\n    -- upvalues: Sound (copy), ModelData (copy), Disc (copy)\n    Sound:Stop();\n    Sound.SoundId = \"rbxassetid://\" .. ModelData.SoundID.Value;\n    Sound.RollOffMaxDistance = ModelData.Range.Value;\n    Sound.Volume = ModelData.Volume.Value;\n    Sound.Parent.RecordScratch:Play();\n    local v4 = Random.new(ModelData.SoundID.Value);\n    Disc.Color.Color = Color3.fromRGB(v4:NextInteger(1, 255), v4:NextInteger(1, 255), v4:NextInteger(1, 255));\n    Disc.Middle.Color = Color3.fromRGB(v4:NextInteger(1, 255), v4:NextInteger(1, 255), v4:NextInteger(1, 255));\n    script.Parent.State.Value = \"\";\n\n    if Sound.IsLoaded then\n        script.Parent.State.Value = \"1\";\n        Sound:Play();\n    end;\nend;\n\nSound.Loaded:Connect(function() -- Line: 47\n    -- upvalues: Sound (copy)\n    script.Parent.State.Value = \"1\";\n    Sound:Play();\nend);\nSound.DidLoop:Connect(function() -- Line: 52\n    -- upvalues: Sound (copy)\n    Sound.Parent.RecordScratch:Play();\nend);\nupdateDisc();\nscript.Parent.ModelData.Range:GetPropertyChangedSignal(\"Value\"):Connect(updateProperties);\nscript.Parent.ModelData.SoundID:GetPropertyChangedSignal(\"Value\"):Connect(updateDisc);\nscript.Parent.ModelData.Volume:GetPropertyChangedSignal(\"Value\"):Connect(updateProperties);\n\nfunction v3.tick() -- Line: 61\nend;\n\nreturn v3;"
};
