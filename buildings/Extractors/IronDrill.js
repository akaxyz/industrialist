export default {
  id: "IronDrill",
  category: "Extractors",
  tier: 2,
  cost: 350,
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
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: 1.699951171875,
        x: 0
      },
      gameOffset: {
        y: 4.124992370605469,
        x: 0,
        z: 1.699951171875
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 1.919769287109375,
        x: -1
      },
      gameOffset: {
        y: 1.8286666870117188,
        x: -1,
        z: 1.919769287109375
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local Drill = script.Parent.Drill;\nlocal _ = script.Parent.State;\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal Value = script.Ore.Value;\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u3 = 0;\nlocal Value2 = script.Need.Value;\nlocal Value3 = script.PowerNeed.Value;\nlocal Value4 = script.Pollution.Value;\n\nlocal function getBarSize(p4, p5) -- Line: 29\n    return UDim2.new(1 / p5 * p4, 0, 1, 0);\nend;\n\nlocal u6 = TweenService:Create(Drill.Drill, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Drill.Position - Vector3.new(0, 2, 0)\n});\nlocal u7 = TweenService:Create(Drill.Union, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Union.Position - Vector3.new(0, 2, 0)\n});\nlocal u8 = TweenService:Create(Drill.Drill, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Drill.Position\n});\nlocal u9 = TweenService:Create(Drill.Union, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Drill.Union.Position\n});\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u10 = false;\n\nlocal function startDrill() -- Line: 44\n    -- upvalues: u10 (ref), Drill (copy), u8 (copy), u9 (copy), u6 (copy), u7 (copy)\n    if u10 == false then\n        Drill.Drill[\"Drill Loop\"]:Play();\n        u10 = true;\n        spawn(function() -- Line: 48\n            -- upvalues: u10 (ref), Drill (ref)\n            while task.wait() and u10 == true do\n                Drill.Drill.Orientation = Drill.Drill.Orientation + Vector3.new(0, 1, 0);\n            end;\n        end);\n        u8:Cancel();\n        u9:Cancel();\n        u6:Play();\n        u7:Play();\n    end;\nend;\n\nlocal function stopDrill() -- Line: 60\n    -- upvalues: u10 (ref), Drill (copy), u6 (copy), u7 (copy), u8 (copy), u9 (copy)\n    if u10 == true then\n        Drill.Drill[\"Drill Loop\"]:Stop();\n        u6:Cancel();\n        u7:Cancel();\n        u10 = false;\n        u8:Play();\n        u9:Play();\n    end;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 78, Name: localUpdate\n        -- upvalues: startDrill (copy), u10 (ref), Drill (copy), u6 (copy), u7 (copy), u8 (copy), u9 (copy)\n        if script.Parent.State.Value == \"Start_DRILL\" then\n            startDrill();\n\n            return;\n        end;\n\n        if u10 == true then\n            Drill.Drill[\"Drill Loop\"]:Stop();\n            u6:Cancel();\n            u7:Cancel();\n            u10 = false;\n            u8:Play();\n            u9:Play();\n        end;\n    end,\n\n    tick = function() -- Line: 86, Name: tick\n        -- upvalues: u1 (copy), Value3 (copy), u2 (copy), u3 (ref), Pollution (copy), Value4 (copy), Value2 (copy), Value (copy)\n        if script.Parent.State.Value == \"Start_DRILL\" then\n            if u1:getBuffer() < Value3 then\n                script.Parent.State.Value = \"Stop_NO_POWER\";\n\n                return;\n            end;\n        elseif u1:getBuffer() < Value3 * 30 then\n            script.Parent.State.Value = \"Stop_NO_POWER\";\n\n            return;\n        end;\n\n        if u2:getBuffer() >= u2:getMax() then\n            script.Parent.State.Value = \"Stop_IDLE\";\n            u3 = 0;\n\n            return;\n        end;\n\n        script.Parent.State.Value = \"Start_DRILL\";\n        u1:removePower(Value3 * 30);\n        u3 = u3 + 30;\n        local v11 = Pollution;\n        v11.Value = v11.Value + Value4 * 30;\n\n        if Value2 <= u3 then\n            u3 = u3 - Value2;\n            u2:addItem(1, Value);\n        end;\n    end\n};"
};
