export default {
  id: "GoldDrill",
  category: "Extractors",
  tier: 2,
  cost: 25000,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: 1
    },
    width: 6
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 10,
      transferAmount: 2,
      siteOffset: {
        y: 13.249969482421875,
        x: 1.0000228881835938
      },
      gameOffset: {
        y: 2.474987030029297,
        x: 1.0000228881835938,
        z: 13.249969482421875
      },
      tip: "Gives you your gold"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.41204833984375,
        x: 1.0000228881835938
      },
      gameOffset: {
        y: 1.1279888153076172,
        x: 1.0000228881835938,
        z: -0.41204833984375
      }
    }
  ],
  data: [],
  script: "local Drill = script.Parent.Drill;\nlocal _ = script.Parent.State;\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal Value = script.Ore.Value;\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u3 = 0;\nlocal Value2 = script.Need.Value;\nlocal Value3 = script.PowerNeed.Value;\n\nlocal function getBarSize(p4, p5) -- Line: 27\n    return UDim2.new(1 / p5 * p4, 0, 1, 0);\nend;\n\nlocal u6 = TweenService:Create(Drill.Drill, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Drill.Position - Vector3.new(0, 2, 0)\n});\nlocal u7 = TweenService:Create(Drill.Union, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Union.Position - Vector3.new(0, 2, 0)\n});\nlocal u8 = TweenService:Create(Drill.Drill, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Drill.Position\n});\nlocal u9 = TweenService:Create(Drill.Union, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Union.Position\n});\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u10 = false;\n\nlocal function startDrill() -- Line: 42\n    -- upvalues: u10 (ref), Drill (copy), u8 (copy), u9 (copy), u6 (copy), u7 (copy)\n    if u10 == false then\n        Drill.Drill[\"Drill Loop\"]:Play();\n        u10 = true;\n        spawn(function() -- Line: 46\n            -- upvalues: u10 (ref), Drill (ref)\n            while task.wait() and u10 == true do\n                Drill.Drill.Orientation = Drill.Drill.Orientation + Vector3.new(0, 1, 0);\n            end;\n        end);\n        u8:Cancel();\n        u9:Cancel();\n        u6:Play();\n        u7:Play();\n    end;\nend;\n\nlocal function stopDrill() -- Line: 57\n    -- upvalues: u10 (ref), Drill (copy), u6 (copy), u7 (copy), u8 (copy), u9 (copy)\n    if u10 == true then\n        Drill.Drill[\"Drill Loop\"]:Stop();\n        u6:Cancel();\n        u7:Cancel();\n        u10 = false;\n        u8:Play();\n        u9:Play();\n    end;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 74, Name: localUpdate\n        -- upvalues: startDrill (copy), u10 (ref), Drill (copy), u6 (copy), u7 (copy), u8 (copy), u9 (copy)\n        if script.Parent.State.Value == \"Start_DRILL\" then\n            startDrill();\n\n            return;\n        end;\n\n        if u10 == true then\n            Drill.Drill[\"Drill Loop\"]:Stop();\n            u6:Cancel();\n            u7:Cancel();\n            u10 = false;\n            u8:Play();\n            u9:Play();\n        end;\n    end,\n\n    tick = function() -- Line: 82, Name: tick\n        -- upvalues: u1 (copy), Value3 (copy), u2 (copy), u3 (ref), Pollution (copy), Value2 (copy), Value (copy)\n        if script.Parent.State.Value == \"Start_DRILL\" then\n            if u1:getBuffer() < Value3 then\n                script.Parent.State.Value = \"Stop_NO_POWER\";\n\n                return;\n            end;\n        elseif u1:getBuffer() < Value3 * 4 then\n            script.Parent.State.Value = \"Stop_NO_POWER\";\n\n            return;\n        end;\n\n        if u2:getBuffer() >= u2:getMax() then\n            script.Parent.State.Value = \"Stop_IDLE\";\n            u3 = 0;\n\n            return;\n        end;\n\n        script.Parent.State.Value = \"Start_DRILL\";\n        u1:removePower(Value3);\n        u3 = u3 + 1;\n        local v11 = Pollution;\n        v11.Value = v11.Value + 0.1;\n\n        if u3 == Value2 then\n            u3 = 0;\n            u2:addItem(0.1, Value);\n        end;\n    end\n};"
};
