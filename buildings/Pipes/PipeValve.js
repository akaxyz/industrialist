export default {
  id: "PipeValve",
  category: "Pipes",
  tier: 3,
  cost: 4000,
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
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1.5499267578125,
        x: -1
      },
      gameOffset: {
        y: 1.4169998168945312,
        x: -1,
        z: -1.5499267578125
      }
    },
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 1.2999267578125,
        x: -1
      },
      gameOffset: {
        y: 1.4169998168945312,
        x: -1,
        z: 1.2999267578125
      }
    }
  ],
  data: {
    State: "1"
  },
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe, true);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut, true);\nlocal v3 = {};\nlocal State = script.Parent.ModelData.State;\nscript.Parent.Valve.ProximityPrompt.Triggered:Connect(function() -- Line: 11\n    -- upvalues: State (copy)\n    if State.Value ~= \"1\" then\n        if State.Value == \"0\" then\n            State.Value = \"1\";\n            script.Parent.Valve.Valve:Play();\n        end;\n\n        return;\n    end;\n\n    State.Value = \"0\";\n    script.Parent.Valve.Valve:Play();\nend);\n\nfunction v3.tick() -- Line: 21\n    -- upvalues: State (copy), u1 (copy), u2 (copy)\n    script.Parent.Valve.ProximityPrompt.Enabled = true;\n\n    if State.Value ~= \"1\" then\n        if State.Value == \"0\" then\n            script.Parent.Valve.Orientation = Vector3.new(0, script.Parent.Valve.Orientation.Y, script.Parent.Valve.Orientation.Z);\n            script.Parent.Valve.ProximityPrompt.ObjectText = \"CLOSED\";\n        end;\n\n        return;\n    end;\n\n    script.Parent.Valve.Orientation = Vector3.new(45, script.Parent.Valve.Orientation.Y, script.Parent.Valve.Orientation.Z);\n    script.Parent.Valve.ProximityPrompt.ObjectText = \"OPEN\";\n\n    if u1:getItem() ~= u2:getItem() and u2:getItem() ~= \"\" or not u2:canHoldXMore(10) then\n        return;\n    end;\n\n    local v4 = u1:getItem();\n    local v5 = u1:removeItem(10);\n    u2:setUsedTemperature(u1:getTemp());\n    u2:addItem(v5, v4);\nend;\n\nreturn v3;"
};
