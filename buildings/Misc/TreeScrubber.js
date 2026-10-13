export default {
  id: "TreeScrubber",
  category: "Misc",
  cost: 25000,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: 7
    },
    width: 18
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -0.41943359375,
        x: -1.5101318359375
      },
      gameOffset: {
        y: 2.6917638778686523,
        x: -1.5101318359375,
        z: -0.41943359375
      },
      tip: "Input for Water"
    },
    {
      name: "ResidueMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 3.56878662109375,
        x: -1.5101318359375
      },
      gameOffset: {
        y: 2.6917619705200195,
        x: -1.5101318359375,
        z: 3.56878662109375
      },
      tip: "Residue Output"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.NextTicks).new();\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.ResidueMainPipe);\nlocal State = script.Parent.State;\nlocal v3 = {\n    localUpdate = function() -- Line: 18, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value == \"\" then\n            return;\n        end;\n\n        for _, child in pairs(script.Parent.Leaves:GetChildren()) do\n            child.Color = Color3.fromRGB(65, 134, 92):Lerp(Color3.fromRGB(80, 75, 58), (tonumber(State.Value)));\n        end;\n    end\n};\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u4 = game.ReplicatedStorage.Pollution:GetAttribute(\"Max\");\n\nfunction v3.tick() -- Line: 32\n    -- upvalues: u1 (copy), State (copy), u2 (copy), Pollution (copy), u4 (copy)\n    if not u1:hasAmountOf(\"Water\", 18) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u2:canHoldXMoreOf(\"Residue\", 6) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v5 = math.exp(Pollution.Value / u4);\n    local v6 = math.clamp(v5, 0, 1) * 1.2 * 450;\n    local v7 = math.exp(Pollution.Value / u4);\n    local v8 = math.clamp(v7, 0, 1) * 6 * 10;\n    local v9 = math.round(v8) / 10;\n    local v10 = math.clamp(Pollution.Value / u4, -1, 0);\n    State.Value = math.abs(v10);\n    u1:removeItem(18);\n    u2:addItemAmount(\"Residue\", v9);\n    local v11 = Pollution;\n    v11.Value = v11.Value - v6;\nend;\n\nreturn v3;"
};
