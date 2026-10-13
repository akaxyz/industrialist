export default {
  id: "SodiumHydroxideWell",
  category: "Pipes",
  tier: 2,
  cost: 2.6561398887587478e+95,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainPipeOut",
      kind: "fluid",
      maxAmount: 20,
      transferAmount: 10,
      siteOffset: {
        y: -1.54998779296875,
        x: -1
      },
      gameOffset: {
        y: 1.4169998168945312,
        x: -1,
        z: -1.54998779296875
      }
    },
    {
      name: "MainPipe",
      kind: "fluid",
      maxAmount: 20,
      transferAmount: 10,
      siteOffset: {
        y: 1.29998779296875,
        x: -1
      },
      gameOffset: {
        y: 1.4169998168945312,
        x: -1,
        z: 1.29998779296875
      }
    }
  ],
  data: {
    State: "1"
  },
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nPipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal v2 = {\n    localUpdate = function() -- Line: 13, Name: localUpdate\n    end\n};\nlocal State = script.Parent.ModelData.State;\nscript.Parent.Valve.ProximityPrompt.Triggered:Connect(function() -- Line: 17\n    -- upvalues: State (copy)\n    if State.Value ~= \"1\" then\n        if State.Value == \"0\" then\n            State.Value = \"1\";\n            script.Parent.Valve.Valve:Play();\n        end;\n\n        return;\n    end;\n\n    State.Value = \"0\";\n    script.Parent.Valve.Valve:Play();\nend);\n\nfunction v2.tick() -- Line: 27\n    -- upvalues: State (copy), u1 (copy)\n    script.Parent.Valve.ProximityPrompt.Enabled = true;\n\n    if State.Value ~= \"1\" then\n        if State.Value == \"0\" then\n            script.Parent.Valve.Orientation = Vector3.new(0, script.Parent.Valve.Orientation.Y, script.Parent.Valve.Orientation.Z);\n            script.Parent.Valve.ProximityPrompt.ObjectText = \"CLOSED\";\n        end;\n\n        return;\n    end;\n\n    script.Parent.Valve.Orientation = Vector3.new(45, script.Parent.Valve.Orientation.Y, script.Parent.Valve.Orientation.Z);\n    script.Parent.Valve.ProximityPrompt.ObjectText = \"OPEN\";\n    u1:addItemAmount(\"Sodium Hydroxide\", 1);\nend;\n\nreturn v2;"
};
