export default {
  id: "MetalSign",
  category: "Decorations",
  cost: 900,
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
    Text: "Hello World"
  },
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal v1 = {};\nscript.Parent.Decoration.ProximityPrompt.Enabled = true;\nscript.Parent.Decoration.ProximityPrompt.Triggered:Connect(function(p2) -- Line: 9\n    -- upvalues: ReplicatedStorage (copy)\n    ReplicatedStorage.ChangeText:FireClient(p2, script.RemoteEvent);\nend);\nlocal TextLabel = script.Parent.Sign.SurfaceGui.TextLabel;\nlocal TextSize = TextLabel.TextSize;\n\nlocal function try() -- Line: 16\n    -- upvalues: TextLabel (copy), try (copy)\n    if TextLabel.TextFits == false then\n        local v3 = TextLabel;\n        v3.TextSize = v3.TextSize - 1;\n        try();\n    end;\nend;\n\nlocal function fullTry() -- Line: 23\n    -- upvalues: TextLabel (copy), TextSize (copy), try (copy)\n    TextLabel.TextSize = TextSize;\n\n    if TextLabel.TextFits == false then\n        local v4 = TextLabel;\n        v4.TextSize = v4.TextSize - 1;\n        try();\n    end;\nend;\n\nlocal TextService = game:GetService(\"TextService\");\nscript.RemoteEvent.OnServerEvent:Connect(function(p5, p6) -- Line: 30\n    -- upvalues: TextService (copy)\n    script.Parent.ModelData.Text.Value = TextService:FilterStringAsync(p6, p5.UserId):GetNonChatStringForBroadcastAsync();\nend);\nscript.Parent.ModelData.Text.Changed:Connect(function() -- Line: 35\n    -- upvalues: TextLabel (copy)\n    TextLabel.Text = script.Parent.ModelData.Text.Value;\nend);\nTextLabel.Text = script.Parent.ModelData.Text.Value;\n\nfunction v1.tick() -- Line: 45\nend;\n\nreturn v1;"
};
