export default {
  id: "Sign",
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
    Text: ""
  },
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal v1 = {};\nscript.Parent.Decoration.ProximityPrompt.Enabled = true;\nscript.Parent.Decoration.ProximityPrompt.Triggered:Connect(function(p2) -- Line: 9\n    -- upvalues: ReplicatedStorage (copy)\n    ReplicatedStorage.ChangeText:FireClient(p2, script.RemoteEvent);\nend);\nlocal TextService = game:GetService(\"TextService\");\nscript.RemoteEvent.OnServerEvent:Connect(function(p3, p4) -- Line: 15\n    -- upvalues: TextService (copy)\n    script.Parent.ModelData.Text.Value = TextService:FilterStringAsync(p4, p3.UserId):GetNonChatStringForBroadcastAsync();\nend);\nscript.Parent.ModelData.Text.Changed:Connect(function() -- Line: 19\n    script.Parent.Sign.SurfaceGui.TextLabel.Text = script.Parent.ModelData.Text.Value;\nend);\nscript.Parent.Sign.SurfaceGui.TextLabel.Text = script.Parent.ModelData.Text.Value;\n\nfunction v1.tick() -- Line: 24\nend;\n\nreturn v1;"
};
