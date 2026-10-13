export default {
  id: "OilFrackingTower",
  category: "Extractors",
  tier: 3,
  cost: 500000,
  base: {
    height: 24,
    offset: {
      y: 9.999992370605469,
      x: -10
    },
    width: 24
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 14.554496765136719,
        x: 0.35516357421875
      },
      gameOffset: {
        y: 21.52389907836914,
        x: 0.35516357421875,
        z: 14.554496765136719
      }
    },
    {
      name: "LiquidIn2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 400,
      transferAmount: 20,
      siteOffset: {
        y: -1.02679443359375,
        x: -1
      },
      gameOffset: {
        y: 1.5977592468261719,
        x: -1,
        z: -1.02679443359375
      },
      tip: "Input for Steam"
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: -0.66876220703125,
        x: -7
      },
      gameOffset: {
        y: 1.3437767028808594,
        x: -7,
        z: -0.66876220703125
      },
      tip: "Input for Sand"
    },
    {
      name: "LiquidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: -1.02679443359375,
        x: -3
      },
      gameOffset: {
        y: 1.5977592468261719,
        x: -3,
        z: -1.02679443359375
      },
      tip: "Input for Acetic Acid/Sulfuric Acid"
    },
    {
      name: "LiquidIn3MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: -1.02679443359375,
        x: 1
      },
      gameOffset: {
        y: 1.5977592468261719,
        x: 1,
        z: -1.02679443359375
      },
      tip: "Input for Water"
    },
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 600,
      transferAmount: 20,
      siteOffset: {
        y: -1.02679443359375,
        x: -21
      },
      gameOffset: {
        y: 1.547760009765625,
        x: -21,
        z: -1.02679443359375
      },
      tip: "Output for Fracking Oil used in Atmospheric Distillation"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.EffectUtils).new(script);\nlocal u2 = require(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal State = script.Parent.State;\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn2MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.LiquidIn3MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.LiquidInMainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u8 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\n\nreturn {\n    localUpdate = function() -- Line: 23, Name: localUpdate\n        -- upvalues: u1 (copy), State (copy)\n        u1:localUpdate();\n\n        if State.Value == \"Running\" then\n            script.Parent.Base[\"Oil Refinery Ambience 2 (SFX)\"]:play();\n\n            return;\n        end;\n\n        if State.Value == \"\" then\n            script.Parent.Base[\"Oil Refinery Ambience 2 (SFX)\"]:stop();\n        end;\n    end,\n\n    tick = function() -- Line: 36, Name: tick\n        -- upvalues: u2 (copy), u3 (copy), State (copy), u4 (copy), u6 (copy), u8 (copy), u5 (copy), u7 (copy), Pollution (copy)\n        if not u2:tickIsFree() then\n            return;\n        end;\n\n        if not u3:hasAmountOf(\"Steam\", 200) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u4:hasAmountOf(\"Water\", 40) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u6:hasAmountOf(\"Sand\", 16) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u8:hasPower(500000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if u5:hasAmountOf(\"Sulfuric Acid\", 7.5) then\n            u5:removeItem(7.5);\n        else\n            if not u5:hasAmountOf(\"Acetic Acid\", 16) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u5:removeItem(16);\n        end;\n\n        u8:removePower(500000);\n        State.Value = \"Running\";\n        u2:nextTicks(8, function(p9) -- Line: 52\n            -- upvalues: u7 (ref), u3 (ref), u4 (ref), u6 (ref), Pollution (ref)\n            if p9 == 1 then\n                u7:addItemAmount(\"Fracking Oil\", 20);\n            end;\n\n            u3:removeItem(25);\n            u4:removeItem(5);\n            u6:removeItem(2);\n            local v10 = Pollution;\n            v10.Value = v10.Value + 45;\n            u7:addItemAmount(\"Fracking Oil\", 10);\n        end);\n    end\n};"
};
