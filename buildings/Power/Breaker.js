export default {
  id: "Breaker",
  category: "Power",
  tier: 2,
  cost: 8000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "MainConnector2",
      kind: "mv",
      direction: "output",
      maxAmount: 750000,
      transferAmount: 500000,
      siteOffset: {
        y: 1.412384033203125,
        x: -0.03765106201171875
      },
      gameOffset: {
        y: 0.7032229900360107,
        x: -0.03765106201171875,
        z: 1.412384033203125
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 750000,
      transferAmount: 0,
      siteOffset: {
        y: -1.387603759765625,
        x: 0.0123443603515625
      },
      gameOffset: {
        y: 0.7032229900360107,
        x: 0.0123443603515625,
        z: -1.387603759765625
      }
    }
  ],
  data: {
    State: "1"
  },
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector, true);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector2, true);\nlocal v3 = {\n    localUpdate = function() -- Line: 13, Name: localUpdate\n    end\n};\nlocal State = script.Parent.ModelData.State;\nscript.Parent.Switch.On.ProximityPrompt.Triggered:Connect(function() -- Line: 17\n    -- upvalues: State (copy)\n    if State.Value ~= \"1\" then\n        if State.Value == \"0\" then\n            State.Value = \"1\";\n            script.Parent.Switch.On.Valve:Play();\n        end;\n\n        return;\n    end;\n\n    State.Value = \"0\";\n    script.Parent.Switch.On.Valve:Play();\nend);\n\nfunction v3.tick() -- Line: 27\n    -- upvalues: State (copy), u1 (copy), u2 (copy)\n    script.Parent.Switch.On.ProximityPrompt.Enabled = true;\n\n    if State.Value ~= \"1\" then\n        if State.Value == \"0\" then\n            script.Parent.Switch.On.Transparency = 1;\n            script.Parent.Switch.Off.Transparency = 0;\n            script.Parent.Switch.On.ProximityPrompt.ObjectText = \"CLOSED\";\n        end;\n\n        return;\n    end;\n\n    script.Parent.Switch.On.Transparency = 0;\n    script.Parent.Switch.Off.Transparency = 1;\n    script.Parent.Switch.On.ProximityPrompt.ObjectText = \"OPEN\";\n    local v4 = u1:getBuffer();\n    local v5 = u2:getMax() - u2:getBuffer();\n    local v6 = math.clamp(v4, 0, v5);\n    math.min(v6, 500000);\n    u2:addPower(v6);\n    u1:removePower(v6);\nend;\n\nreturn v3;"
};
