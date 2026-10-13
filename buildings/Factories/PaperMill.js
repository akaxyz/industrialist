export default {
  id: "PaperMill",
  category: "Factories",
  tier: 2,
  cost: 80000,
  base: {
    height: 23.999998092651367,
    offset: {
      y: 4,
      x: -10
    },
    width: 12
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.5858001708984375,
        x: 0.4012451171875
      },
      gameOffset: {
        y: 8.368757247924805,
        x: 0.4012451171875,
        z: -0.5858001708984375
      }
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 3.010009765625,
        x: 1.5849609375
      },
      gameOffset: {
        y: 1.3249999284744263,
        x: 1.5849609375,
        z: 3.010009765625
      },
      tip: "Input for Oak Logs"
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 1.00982666015625,
        x: 1.5849609375
      },
      gameOffset: {
        y: 1.3247567415237427,
        x: 1.5849609375,
        z: 1.00982666015625
      }
    },
    {
      name: "LiquidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 9.574981689453125,
        x: -11.00494384765625
      },
      gameOffset: {
        y: 1.4850008487701416,
        x: -11.00494384765625,
        z: 9.574981689453125
      },
      tip: "Input for Chlorine (optional)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.LiquidInMainPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal v6 = {};\nlocal State = script.Parent.State;\nlocal Pollution = ReplicatedStorage.Pollution;\nlocal u7 = 1;\n\nfunction v6.localUpdate() -- Line: 19\n    -- upvalues: State (copy)\n    if State.Value == \"Running\" then\n        script.Parent.Base.sound:Play();\n\n        return;\n    end;\n\n    script.Parent.Base.sound:Stop();\nend;\n\nlocal Pollution2 = game.ReplicatedStorage.Pollution;\n\nfunction v6.tick() -- Line: 29\n    -- upvalues: u1 (copy), u5 (copy), State (copy), u4 (copy), u7 (ref), Pollution2 (ref), u2 (copy), u3 (copy), Pollution (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u5:hasPower(250000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if u4:hasAmountOf(\"Chlorine\", 2) then\n        u7 = 2;\n        Pollution2 = 25;\n    else\n        u7 = 1;\n        Pollution2 = 0;\n    end;\n\n    if not (u2:hasAmountOf(\"Oak Log\", 4) and u3:canHoldXMoreOf(\"Paper\", 8)) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if u7 == 2 then\n        u4:removeItem(2);\n    end;\n\n    State.Value = \"Running\";\n    u2:removeItem(4);\n    u5:removePower(250000);\n    u1:nextTicks(4 / u7, function(p8) -- Line: 46\n        -- upvalues: u3 (ref), u7 (ref), Pollution (ref), Pollution2 (ref)\n        if p8 == 1 then\n            u3:addItemAmount(\"Paper\", u7 * 8);\n        end;\n\n        local v9 = Pollution;\n        v9.Value = v9.Value + Pollution2;\n    end);\nend;\n\nreturn v6;"
};
