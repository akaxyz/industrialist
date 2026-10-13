export default {
  id: "FancyCoalDrill",
  category: "Extractors",
  cost: 50,
  base: {
    height: 12,
    offset: {
      y: -3.998727798461914,
      x: -0.0032958984375
    },
    width: 4
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 2,
      siteOffset: {
        y: -9.294732093811035,
        x: -1.019287109375
      },
      gameOffset: {
        y: 1.9712281227111816,
        x: -1.019287109375,
        z: -9.294732093811035
      },
      tip: "Outputs a unit of coal when powered"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 480,
      transferAmount: 0,
      siteOffset: {
        y: -5.706077575683594,
        x: -0.23223876953125
      },
      gameOffset: {
        y: 3.410137176513672,
        x: -0.23223876953125,
        z: -5.706077575683594
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local Drill = script.Parent.Drill;\nlocal SmokeStack = script.Parent.SmokeStack;\nlocal SmokeStack2 = script.Parent.SmokeStack2;\nlocal State = script.Parent.State;\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u3 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u4 = 0;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u5 = require(ReplicatedStorage.Modules.ModelTweenUtils).new(Drill);\nlocal u6 = Drill:GetPivot();\nlocal u7 = Drill:GetPivot() - Vector3.new(0, 0.7, 0);\nlocal u8 = false;\n\nlocal function startDrill() -- Line: 24\n    -- upvalues: u8 (ref), Drill (copy), u5 (copy), u7 (copy), SmokeStack (copy), SmokeStack2 (copy)\n    if u8 == false then\n        u8 = true;\n        Drill.Drill[\"Drill Loop\"]:Play();\n        u5:newTween(TweenInfo.new(2), u7):Play();\n        task.wait(2);\n        spawn(function() -- Line: 32\n            -- upvalues: u8 (ref), u5 (ref)\n            while task.wait() and u8 == true do\n                u5:PivotTo(u5:GetPivot() * CFrame.Angles(0, 0, 0.02454369260617026));\n            end;\n        end);\n        SmokeStack.ParticleEmitter.Enabled = true;\n        SmokeStack2.ParticleEmitter.Enabled = true;\n    end;\nend;\n\nlocal function stopDrill() -- Line: 41\n    -- upvalues: Drill (copy), SmokeStack (copy), SmokeStack2 (copy), u5 (copy), u6 (copy), u8 (ref)\n    Drill.Drill[\"Drill Loop\"]:Stop();\n    SmokeStack.ParticleEmitter.Enabled = false;\n    SmokeStack2.ParticleEmitter.Enabled = false;\n    u5:newTween(TweenInfo.new(2), u6):Play();\n    u8 = false;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 57, Name: localUpdate\n        -- upvalues: startDrill (copy), Drill (copy), SmokeStack (copy), SmokeStack2 (copy), u5 (copy), u6 (copy), u8 (ref)\n        if script.Parent.State.Value == \"start\" then\n            startDrill();\n\n            return;\n        end;\n\n        Drill.Drill[\"Drill Loop\"]:Stop();\n        SmokeStack.ParticleEmitter.Enabled = false;\n        SmokeStack2.ParticleEmitter.Enabled = false;\n        u5:newTween(TweenInfo.new(2), u6):Play();\n        u8 = false;\n    end,\n\n    tick = function() -- Line: 66, Name: tick\n        -- upvalues: u3 (copy), u1 (copy), State (copy), u2 (copy), u4 (ref), Pollution (copy)\n        if u3:tickIsBusy() then\n            return;\n        end;\n\n        if not u1:hasPower(480) then\n            State.Value = \"stop\";\n\n            return;\n        end;\n\n        if not u2:canHoldXMoreOf(\"Coal\", 1) then\n            State.Value = \"stop\";\n\n            return;\n        end;\n\n        State.Value = \"start\";\n        u1:removePower(480);\n        u3:nextTicks(4, function(p9) -- Line: 73\n            -- upvalues: u4 (ref), Pollution (ref), u2 (ref)\n            u4 = u4 + 1;\n            local v10 = Pollution;\n            v10.Value = v10.Value + 2;\n\n            if u4 == 4 then\n                u4 = 0;\n                u2:addItemAmount(\"Coal\", 1);\n            end;\n        end);\n    end\n};"
};
