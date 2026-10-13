export default {
  id: "HugeSpotlight",
  category: "Decorations",
  cost: 15000,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 4.009490966796875,
        x: -6.1671142578125
      },
      gameOffset: {
        y: 4.933310508728027,
        x: -6.1671142578125,
        z: 4.009490966796875
      },
      tip: "Power it to turn on the spotlight."
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local State = script.Parent.State;\nlocal Light = script.Parent.Light;\nlocal Lights = script.Parent.Lights;\nlocal v1 = {};\nlocal u2 = require(game.ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.InMainConnector);\n\nfunction v1.localUpdate() -- Line: 10\n    -- upvalues: State (copy), Light (copy), Lights (copy)\n    if State.Value ~= \"On\" then\n        if State.Value == \"Off\" then\n            for _, child in Light:GetChildren() do\n                child.SpotLight.Enabled = false;\n            end;\n\n            for _, child in Lights:GetChildren() do\n                child.Material = Enum.Material.SmoothPlastic;\n            end;\n\n            script.Parent.Base[\"Switch 2 (SFX)\"]:Play();\n            script.Parent.Base[\"Light Bulb Buzz 2 (SFX)\"]:Pause();\n        end;\n\n        return;\n    end;\n\n    for _, child in Light:GetChildren() do\n        child.SpotLight.Enabled = true;\n    end;\n\n    for _, child in Lights:GetChildren() do\n        child.Material = Enum.Material.Neon;\n    end;\n\n    script.Parent.Base[\"Circuit Breaker 4 (SFX)\"]:Play();\n    script.Parent.Base[\"Light Bulb Buzz 2 (SFX)\"]:Resume();\nend;\n\nfunction v1.tick() -- Line: 34\n    -- upvalues: u2 (copy), State (copy)\n    if not u2:hasPower(1) then\n        State.Value = \"Off\";\n\n        return;\n    end;\n\n    u2:removePower(u2:getBuffer());\n    State.Value = \"On\";\nend;\n\nreturn v1;"
};
