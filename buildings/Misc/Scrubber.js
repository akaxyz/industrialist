export default {
  id: "Scrubber",
  category: "Misc",
  tier: 3,
  cost: 30000,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: -6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 500000,
      transferAmount: 0,
      siteOffset: {
        y: 12.6519775390625,
        x: -12.699981689453125
      },
      gameOffset: {
        y: 3.8060951232910156,
        x: -12.699981689453125,
        z: 12.6519775390625
      }
    },
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 10.979080200195312,
        x: -14.01055908203125
      },
      gameOffset: {
        y: 2.1352529525756836,
        x: -14.01055908203125,
        z: 10.979080200195312
      },
      tip: "Water in"
    },
    {
      name: "ResidueMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 7.0294952392578125,
        x: -14.01055908203125
      },
      gameOffset: {
        y: 2.135255813598633,
        x: -14.01055908203125,
        z: 7.0294952392578125
      },
      tip: "Residue out"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal _ = Items.Water.DisplayName;\nlocal _ = Items.Residue.DisplayName;\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.ResidueMainPipe);\nlocal State = script.Parent.State;\nlocal v5 = {};\nlocal Generator = script.Parent.Base.Generator;\n\nfunction v5.localUpdate() -- Line: 20\n    -- upvalues: State (copy), Generator (copy)\n    if State.Value == \"idle\" then\n        Generator:Stop();\n\n        return;\n    end;\n\n    if State.Value == \"run\" then\n        Generator:Play();\n    end;\nend;\n\nlocal Pollution = game.ReplicatedStorage.Pollution;\ngame.ReplicatedStorage.Pollution:GetAttribute(\"Max\");\n\nfunction v5.tick() -- Line: 32\n    -- upvalues: u1 (copy), u4 (copy), State (copy), u2 (copy), u3 (copy), Pollution (copy)\n    if u1:tickIsBusy() then\n        return;\n    end;\n\n    if not u4:canHoldXMoreOf(\"Residue\", 4) then\n        State.Value = \"idle\";\n\n        return;\n    end;\n\n    if not u2:hasPower(60000) then\n        State.Value = \"idle\";\n\n        return;\n    end;\n\n    local v6 = u3:getItem();\n\n    if u3:getBuffer() < 2 then\n        State.Value = \"idle\";\n\n        return;\n    end;\n\n    local u7;\n\n    if v6 == \"Water\" then\n        u7 = 1;\n    elseif v6 == \"Filtered Water\" then\n        u7 = 1.1;\n    elseif v6 == \"Residue\" then\n        u7 = -2;\n    else\n        if v6 ~= \"Distilled Water\" then\n            State.Value = \"idle\";\n\n            return;\n        end;\n\n        u7 = 1.939;\n    end;\n\n    State.Value = \"run\";\n    u3:removeItem(2);\n    u1:nextTicks(4, function() -- Line: 54\n        -- upvalues: u2 (ref), u4 (ref), Pollution (ref), u7 (ref)\n        u2:removePower(15000);\n        u4:addItem(1, \"Residue\");\n        local v8 = Pollution;\n        v8.Value = v8.Value - math.ceil(u7 * 450);\n    end);\nend;\n\nreturn v5;"
};
