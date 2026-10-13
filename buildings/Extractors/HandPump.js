export default {
  id: "HandPump",
  category: "Extractors",
  cost: 250,
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
      name: "FluidOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: 1.6912841796875,
        x: -0.995880126953125
      },
      gameOffset: {
        y: 1.4229474067687988,
        x: -0.995880126953125,
        z: 1.6912841796875
      },
      tip: "Generates (and outputs) water when powered"
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.PipeUtilsV2).loadConnector(script.Parent.FluidOutMainPipe);\nlocal v2 = {};\nlocal u3 = tick();\nscript.Parent.Base.ProximityPrompt.Enabled = true;\nlocal u4 = false;\nscript.Parent.Base.ProximityPrompt.Triggered:Connect(function() -- Line: 14\n    -- upvalues: u3 (ref), u4 (ref)\n    if tick() - u3 > 2 then\n        u3 = tick();\n        u4 = true;\n    end;\nend);\nlocal ModelTweenUtils = require(ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u5 = ModelTweenUtils.new(script.Parent.Lever);\nlocal u6 = ModelTweenUtils.new(script.Parent.Crank);\nlocal u7 = u6:GetPivot();\n\nfunction v2.localStart() -- Line: 29\n    -- upvalues: u5 (copy)\n    while task.wait() do\n        u5:PivotTo(CFrame.lookAt(script.Parent.Crank.LeverAlign.Position, script.Parent.Pivot.Position));\n    end;\nend;\n\nlocal TweenService = game:GetService(\"TweenService\");\n\nfunction v2.localUpdate() -- Line: 38\n    -- upvalues: u6 (copy), u7 (copy), TweenService (copy)\n    if script.Parent.State.Value == \"0\" then\n        return;\n    end;\n\n    script.Parent.Base.Valve:Play();\n    u6:newTween(TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), u7 * CFrame.Angles(0, -0.3490658503988659, 0)):Play();\n    TweenService:Create(script.Parent.Fluid, TweenInfo.new(0.5, Enum.EasingStyle.Linear), {\n        Size = Vector3.new(0.649, 4, 0.649)\n    }):Play();\n    task.wait(1);\n    u6:newTween(TweenInfo.new(0.9, Enum.EasingStyle.Linear), u7):Play();\n    TweenService:Create(script.Parent.Fluid, TweenInfo.new(0.9, Enum.EasingStyle.Quad), {\n        Size = Vector3.new(0.649, 0.9, 0.649)\n    }):Play();\nend;\n\nfunction v2.tick() -- Line: 64\n    -- upvalues: u4 (ref), u1 (copy)\n    if u4 then\n        script.Parent.State.Value = tick();\n        u1:addItemAmount(\"Water\", 10);\n        u4 = false;\n    end;\nend;\n\nreturn v2;"
};
