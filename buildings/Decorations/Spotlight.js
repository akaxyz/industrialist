export default {
  id: "Spotlight",
  category: "Decorations",
  cost: 900,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 60000,
      transferAmount: 0,
      siteOffset: {
        y: 3.79315185546875,
        x: 4.182861328125
      },
      gameOffset: {
        y: 7.738663673400879,
        x: 4.182861328125,
        z: 3.79315185546875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Parent = script.Parent;\nlocal Light1 = Parent.Light1;\nlocal Light2 = Parent.Light2;\nlocal Light3 = Parent.Light3;\nlocal Light4 = Parent.Light4;\nlocal State = script.Parent.State;\nlocal _ = game.ReplicatedStorage.Pollution;\nlocal v2 = {\n    localUpdate = function() -- Line: 15, Name: localUpdate\n        -- upvalues: State (copy), Parent (copy), Light1 (copy), Light2 (copy), Light3 (copy), Light4 (copy)\n        if State.Value == \"on\" then\n            if script.Parent.LightState.Value == false then\n                for _, child in pairs(Parent.Neons:GetChildren()) do\n                    child.BrickColor = BrickColor.Gray();\n                end;\n\n                Light1.SpotLight.Enabled = true;\n                Light2.SpotLight.Enabled = true;\n                Light3.SpotLight.Enabled = true;\n                Light4.SpotLight.Enabled = true;\n                script.Parent.LightState.Value = true;\n            end;\n        elseif script.Parent.LightState.Value == true then\n            for _, child in pairs(Parent.Neons:GetChildren()) do\n                child.BrickColor = BrickColor.Black();\n            end;\n\n            Light1.SpotLight.Enabled = false;\n            Light2.SpotLight.Enabled = false;\n            Light3.SpotLight.Enabled = false;\n            Light4.SpotLight.Enabled = false;\n            script.Parent.LightState.Value = false;\n        end;\n    end\n};\nrequire(ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v2.tick() -- Line: 45\n    -- upvalues: u1 (copy), State (copy)\n    if not u1:hasPower(30000) then\n        State.Value = \"off\";\n\n        return;\n    end;\n\n    u1:removePower(2700);\n    State.Value = \"on\";\nend;\n\nreturn v2;"
};
