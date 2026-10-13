export default {
  id: "CoalDrill",
  category: "Extractors",
  cost: 50,
  base: {
    height: 12,
    offset: {
      y: 0,
      x: -4
    },
    width: 4
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 900,
      transferAmount: 0,
      siteOffset: {
        y: -0.050018310546875,
        x: -7
      },
      gameOffset: {
        y: 5.624989986419678,
        x: -7,
        z: -0.050018310546875
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 2,
      siteOffset: {
        y: 1,
        x: -9.4969482421875
      },
      gameOffset: {
        y: 1.3250012397766113,
        x: -9.4969482421875,
        z: 1
      },
      tip: "Outputs a unit of coal when powered"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u3 = 0;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal Value = script.Ore.Value;\nlocal Value2 = script.DrillOut.Value;\nlocal Value3 = script.Need.Value;\nlocal Value4 = script.PowerNeed.Value;\nlocal Value5 = script.Pollution.Value;\nlocal Speed = script.Parent.Upgrades.Speed;\nlocal Drill = script.Parent.Drill;\nlocal SmokeStack = script.Parent.SmokeStack;\nlocal State = script.Parent.State;\nlocal u4 = TweenService:Create(Drill.Drill, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Drill.Position - Vector3.new(0, 2, 0)\n});\nlocal u5 = TweenService:Create(Drill.Union, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Union.Position - Vector3.new(0, 2, 0)\n});\nlocal u6 = TweenService:Create(Drill.Drill, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Drill.Position\n});\nlocal u7 = TweenService:Create(Drill.Union, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Union.Position\n});\nlocal u8 = false;\n\nlocal function startDrill() -- Line: 33\n    -- upvalues: u8 (ref), Drill (copy), Speed (copy), SmokeStack (copy), u6 (copy), u7 (copy), u4 (copy), u5 (copy)\n    if u8 == false then\n        Drill.Drill[\"Drill Loop\"]:Play();\n        u8 = true;\n        spawn(function() -- Line: 37\n            -- upvalues: u8 (ref), Drill (ref), Speed (ref)\n            local v9 = 0;\n\n            while task.wait(0.03333333333333333) and u8 == true do\n                v9 = v9 + 1;\n\n                if v9 % 30 == 0 then\n                    Drill.Drill[\"Drill Loop\"].Pitch = 0.9 + 0.1 * Speed.Value;\n                    v9 = 0;\n                end;\n\n                Drill.Drill.Orientation = Drill.Drill.Orientation + Vector3.new(0, 2 * Speed.Value, 0);\n            end;\n        end);\n        SmokeStack.ParticleEmitter.Enabled = true;\n        u6:Cancel();\n        u7:Cancel();\n        u4:Play();\n        u5:Play();\n    end;\nend;\n\nlocal function stopDrill() -- Line: 55\n    -- upvalues: u8 (ref), Drill (copy), SmokeStack (copy), u4 (copy), u5 (copy), u6 (copy), u7 (copy)\n    if u8 == true then\n        Drill.Drill[\"Drill Loop\"]:Stop();\n        SmokeStack.ParticleEmitter.Enabled = false;\n        u4:Cancel();\n        u5:Cancel();\n        u8 = false;\n        u6:Play();\n        u7:Play();\n    end;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 70, Name: localUpdate\n        -- upvalues: startDrill (copy), u8 (ref), Drill (copy), SmokeStack (copy), u4 (copy), u5 (copy), u6 (copy), u7 (copy)\n        if script.Parent.State.Value == \"Start_DRILL\" then\n            startDrill();\n\n            return;\n        end;\n\n        if u8 == true then\n            Drill.Drill[\"Drill Loop\"]:Stop();\n            SmokeStack.ParticleEmitter.Enabled = false;\n            u4:Cancel();\n            u5:Cancel();\n            u8 = false;\n            u6:Play();\n            u7:Play();\n        end;\n    end,\n\n    tick = function() -- Line: 78, Name: tick\n        -- upvalues: u1 (copy), Value4 (copy), Speed (copy), State (copy), u2 (copy), Value2 (copy), u3 (ref), Pollution (copy), Value5 (copy), Value3 (copy), Value (copy)\n        if not u1:hasPower(Value4 * 30 * Speed.Value) then\n            State.Value = \"Stop_NO_POWER\";\n\n            return;\n        end;\n\n        if not u2:canHoldXMore(Value2) then\n            State.Value = \"Stop_IDLE\";\n\n            return;\n        end;\n\n        State.Value = \"Start_DRILL\";\n        u1:removePower(Value4 * 30 * Speed.Value);\n        u3 = u3 + 30 * Speed.Value;\n        local v10 = Pollution;\n        v10.Value = v10.Value + Value5 * 30 * Speed.Value;\n\n        if Value3 <= u3 then\n            u3 = u3 - Value3;\n            u2:addItem(Value2, Value);\n        end;\n    end\n};"
};
