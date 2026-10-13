export default {
  id: "LiquidBoiler",
  category: "Factories",
  tier: 2,
  cost: 900,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 30000,
      transferAmount: 0,
      siteOffset: {
        y: 1.20001220703125,
        x: 1.20001220703125
      },
      gameOffset: {
        y: 3.374995708465576,
        x: 1.20001220703125,
        z: 1.20001220703125
      }
    },
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1,
        x: 2.050018310546875
      },
      gameOffset: {
        y: 1.924999713897705,
        x: 2.050018310546875,
        z: 1
      },
      tip: "Only input crude oil!"
    },
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -6.050018310546875,
        x: -9
      },
      gameOffset: {
        y: 2.021127700805664,
        x: -9,
        z: -6.050018310546875
      },
      tip: "Outputs hot crude oil for the separator to refine"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal HotCrudeOil = Items.HotCrudeOil;\nlocal CrudeOil = Items.CrudeOil;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nlocal function getBarSize(p4, p5) -- Line: 21\n    return UDim2.new(1 / p5 * p4, 0, 1, 0);\nend;\n\nlocal v6 = {\n    localUpdate = function() -- Line: 28, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value == \"Running\" then\n            script.Parent.SmokeStack.ParticleEmitter.Enabled = true;\n            script.Parent.Base.Boiler:Play();\n\n            return;\n        end;\n\n        script.Parent.SmokeStack.ParticleEmitter.Enabled = false;\n        script.Parent.Base.Boiler:Stop();\n    end\n};\nrequire(ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v6.tick() -- Line: 42\n    -- upvalues: u3 (copy), u1 (copy), CrudeOil (copy), u2 (copy), HotCrudeOil (copy), State (copy), Pollution (copy)\n    if not u3:hasPower(10000) then\n        return;\n    end;\n\n    if u1:has(CrudeOil.DisplayName) and (u1:hasAmount(0.75) and u2:canHold(HotCrudeOil.DisplayName, 0.75)) then\n        u1:removeItem(0.75);\n        u3:removePower(10000);\n        State.Value = \"Running\";\n        local v7 = Pollution;\n        v7.Value = v7.Value + 45;\n        State.Value = \"\";\n        u2:setUsedTemperature(600);\n        u2:addItem(0.75, HotCrudeOil.DisplayName);\n    end;\n\n    if u1:has(\"Water\") and (u1:hasAmount(0.6) and u2:canHold(\"Water\", 0.6)) then\n        u1:removeItem(0.6);\n        u3:removePower(10000);\n        State.Value = \"Running\";\n        local v8 = Pollution;\n        v8.Value = v8.Value + 45;\n        State.Value = \"\";\n        u2:setUsedTemperature(102);\n        u2:addItem(0.6, \"Water\");\n    end;\nend;\n\nreturn v6;"
};
