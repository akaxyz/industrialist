export default {
  id: "UraniumDrill",
  category: "Extractors",
  tier: 2,
  cost: 3500000,
  base: {
    height: 12,
    offset: {
      y: -4,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000000,
      transferAmount: 0,
      siteOffset: {
        y: 1.699981689453125,
        x: 0
      },
      gameOffset: {
        y: 4.125,
        x: 0,
        z: 1.699981689453125
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 2.04998779296875,
        x: -0.0035400390625
      },
      gameOffset: {
        y: 2.139284133911133,
        x: -0.0035400390625,
        z: 2.04998779296875
      }
    }
  ],
  data: {
    Progress: 0
  },
  script: "local Drill = script.Parent.Drill;\nlocal _ = script.Parent.State;\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal Value = script.Ore.Value;\nlocal TweenService = game:GetService(\"TweenService\");\nlocal Progress = script.Parent.ModelData.Progress;\nlocal Value2 = script.Need.Value;\nlocal Value3 = script.PowerNeed.Value;\n\nlocal function getBarSize(p3, p4) -- Line: 27\n    return UDim2.new(1 / p4 * p3, 0, 1, 0);\nend;\n\nlocal u5 = TweenService:Create(Drill.Drill, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Drill.Position - Vector3.new(0, 2, 0)\n});\nlocal u6 = TweenService:Create(Drill.Union, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Union.Position - Vector3.new(0, 2, 0)\n});\nlocal u7 = TweenService:Create(Drill.Drill, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Drill.Position\n});\nlocal u8 = TweenService:Create(Drill.Union, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Union.Position\n});\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u9 = false;\n\nlocal function startDrill() -- Line: 42\n    -- upvalues: u9 (ref), Drill (copy), u7 (copy), u8 (copy), u5 (copy), u6 (copy)\n    if u9 == false then\n        Drill.Drill[\"Drill Loop\"]:Play();\n        u9 = true;\n        spawn(function() -- Line: 46\n            -- upvalues: u9 (ref), Drill (ref)\n            while task.wait() and u9 == true do\n                Drill.Drill.Orientation = Drill.Drill.Orientation + Vector3.new(0, 1, 0);\n            end;\n        end);\n        u7:Cancel();\n        u8:Cancel();\n        u5:Play();\n        u6:Play();\n    end;\nend;\n\nlocal function stopDrill() -- Line: 57\n    -- upvalues: u9 (ref), Drill (copy), u5 (copy), u6 (copy), u7 (copy), u8 (copy)\n    if u9 == true then\n        Drill.Drill[\"Drill Loop\"]:Stop();\n        u5:Cancel();\n        u6:Cancel();\n        u9 = false;\n        u7:Play();\n        u8:Play();\n    end;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 74, Name: localUpdate\n        -- upvalues: startDrill (copy), u9 (ref), Drill (copy), u5 (copy), u6 (copy), u7 (copy), u8 (copy)\n        if script.Parent.State.Value == \"Start_DRILL\" then\n            startDrill();\n\n            return;\n        end;\n\n        if u9 == true then\n            Drill.Drill[\"Drill Loop\"]:Stop();\n            u5:Cancel();\n            u6:Cancel();\n            u9 = false;\n            u7:Play();\n            u8:Play();\n        end;\n    end,\n\n    tick = function() -- Line: 82, Name: tick\n        -- upvalues: u1 (copy), Value3 (copy), u2 (copy), Progress (copy), Pollution (copy), Value2 (copy), Value (copy)\n        if script.Parent.State.Value == \"Start_DRILL\" then\n            if u1:getBuffer() < Value3 then\n                script.Parent.State.Value = \"Stop_NO_POWER\";\n\n                return;\n            end;\n        elseif u1:getBuffer() < Value3 * 4 then\n            script.Parent.State.Value = \"Stop_NO_POWER\";\n\n            return;\n        end;\n\n        if u2:getBuffer() >= u2:getMax() then\n            script.Parent.State.Value = \"Stop_IDLE\";\n            Progress.Value = 0;\n\n            return;\n        end;\n\n        script.Parent.State.Value = \"Start_DRILL\";\n        u1:removePower(Value3);\n        local v10 = Progress;\n        v10.Value = v10.Value + 1;\n        local v11 = Pollution;\n        v11.Value = v11.Value + 10;\n\n        if Progress.Value == Value2 then\n            Progress.Value = 0;\n            u2:addItem(0.1, Value);\n        end;\n    end\n};"
};
