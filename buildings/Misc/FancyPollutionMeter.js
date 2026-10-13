export default {
  id: "FancyPollutionMeter",
  category: "Misc",
  tier: 2,
  cost: 15000,
  base: {
    height: 6,
    offset: {
      y: -1,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: 0.1588134765625,
        x: 0.56591796875
      },
      gameOffset: {
        y: 3.6881985664367676,
        x: 0.56591796875,
        z: 0.1588134765625
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal v2 = {};\nlocal u3 = 1;\nlocal u4 = { {\n        sample = 1,\n        average = 0,\n        data = {}\n    }, {\n        sample = 2,\n        average = 0,\n        data = {}\n    }, {\n        sample = 10,\n        average = 0,\n        data = {}\n    } };\nlocal GraphV2 = require(ReplicatedStorage.Modules.GraphV2);\nlocal u5 = nil;\nlocal Screen = script.Parent.Screen;\nlocal u6 = Color3.fromRGB(97, 62, 16);\nlocal u7 = Color3.fromRGB(255, 166, 42);\nlocal Radar = script.Parent.Radar;\nlocal State = script.Parent.State;\n\nfunction v2.localStart() -- Line: 40\n    -- upvalues: u5 (ref), GraphV2 (copy), Screen (copy), u7 (copy), u6 (copy), u3 (ref), u4 (copy), State (copy), Radar (copy)\n    u5 = GraphV2.new(Screen.AdvancedRate.Frame.MainGraph, { Screen.AdvancedRate.Frame.MainGraph.Graph.Path2D_1 }, {\n        TextColor = u7,\n        GridColor = u7\n    });\n    local Bottom = Screen.AdvancedRate.Frame.Bottom;\n\n    local function colorChanging(p8) -- Line: 45\n        -- upvalues: Bottom (copy), u6 (ref), u7 (ref)\n        for _, child in pairs(Bottom:GetChildren()) do\n            if child:IsA(\"TextButton\") then\n                child.BackgroundColor3 = u6;\n            end;\n        end;\n\n        p8.BackgroundColor3 = u7;\n    end;\n\n    Bottom.short.MouseButton1Click:Connect(function() -- Line: 54\n        -- upvalues: u3 (ref), colorChanging (copy), Bottom (copy)\n        u3 = 1;\n        colorChanging(Bottom.short);\n    end);\n    Bottom.medium.MouseButton1Click:Connect(function() -- Line: 58\n        -- upvalues: u3 (ref), colorChanging (copy), Bottom (copy)\n        u3 = 2;\n        colorChanging(Bottom.medium);\n    end);\n    Bottom.long.MouseButton1Click:Connect(function() -- Line: 62\n        -- upvalues: u3 (ref), colorChanging (copy), Bottom (copy)\n        u3 = 3;\n        colorChanging(Bottom.long);\n    end);\n    Bottom.clear.MouseButton1Click:Connect(function() -- Line: 66\n        -- upvalues: u4 (ref)\n        table.clear(u4[1].data);\n        table.clear(u4[2].data);\n        table.clear(u4[3].data);\n    end);\n\n    while task.wait(0.05) do\n        if State.Value == \"off\" then\n            if script.Parent.Base.Radar.Playing == true then\n                script.Parent.Base.Radar:Pause();\n            end;\n        elseif tonumber(State.Value) then\n            Radar:PivotTo(Radar:GetPivot() * CFrame.Angles(0, 0.06981317007977318, 0));\n\n            if script.Parent.Base.Radar.Playing == false then\n                script.Parent.Base.Radar:Resume();\n            end;\n        end;\n    end;\nend;\n\nlocal function round(p9, p10) -- Line: 86\n    local v11 = 10 ^ (p10 or 2);\n\n    return math.floor(p9 * v11 + 0.5) / v11;\nend;\n\nlocal u12 = workspace:GetAttribute(\"Difficulty\");\nlocal u13 = 9;\n\nfunction v2.localUpdate() -- Line: 93\n    -- upvalues: Screen (copy), u5 (ref), u13 (ref), u12 (copy), u4 (copy), u3 (ref)\n    if script.Parent.State.Value == \"off\" then\n        Screen.BasicRate.Enabled = false;\n        Screen.AdvancedRate.Enabled = false;\n    elseif game.ReplicatedStorage.PlacementSystem.Buildings.Misc.AdvancedPollutionMeter:GetAttribute(\"ResearchLocked\") == false then\n        Screen.BasicRate.Enabled = false;\n        Screen.AdvancedRate.Enabled = true;\n    else\n        Screen.BasicRate.Enabled = true;\n        Screen.AdvancedRate.Enabled = false;\n    end;\n\n    if u5 == nil then\n        return;\n    end;\n\n    if tonumber(script.Parent.State.Value) == nil then\n        return;\n    end;\n\n    u13 = u13 + 1;\n    local v14 = game.ReplicatedStorage.Pollution.Value / game.ReplicatedStorage.Pollution:GetAttribute(\"Max\") * 100;\n\n    if not Screen.AdvancedRate.Enabled then\n        Screen.BasicRate.TextLabel.Text = math.floor(v14 * 1 + 0.5) / 1 .. \"%\";\n\n        return;\n    end;\n\n    local v15 = tonumber(script.Parent.State.Value) * 100 + 0.5;\n    local v16 = math.floor(v15) / 100;\n\n    if u12 == 5 then\n        v14 = math.random(-400000, 400000) / 1000;\n        v16 = \"N/A\";\n    end;\n\n    for _, v in pairs(u4) do\n        if u13 % v.sample == 0 then\n            v.average = v.average + v14;\n            table.insert(v.data, v.average / v.sample);\n            v.average = 0;\n\n            if #v.data == 101 then\n                table.remove(v.data, 1);\n            end;\n        else\n            v.average = v.average + v14;\n        end;\n    end;\n\n    Screen.AdvancedRate.Frame.Top.Number.Text = math.floor(v14 * 1000 + 0.5) / 1000 .. \"%\" .. \"  \" .. v16 .. \"%/h\";\n    local v17 = {};\n\n    for i = 1, #u4[u3].data do\n        v17[i] = -u4[u3].sample * #u4[u3].data + u4[u3].sample * (i - 1);\n    end;\n\n    u5:RefreshNGraphs(v17, { u4[u3].data });\nend;\n\nlocal Value = game.ReplicatedStorage.Pollution.Value;\nlocal u18 = tick();\nlocal u19 = 0;\nlocal u20 = tick();\n\nfunction v2.tick() -- Line: 154\n    -- upvalues: u18 (ref), u19 (ref), Value (ref), u20 (ref), u1 (copy)\n    if tick() - u18 > 1 then\n        u18 = tick();\n        local Value2 = game.ReplicatedStorage.Pollution.Value;\n        u19 = (Value2 - Value) / 500000 * 3600;\n        Value = Value2;\n    end;\n\n    if tick() - u20 >= 1 then\n        u20 = tick();\n\n        if u1:hasPower(30000) then\n            u1:removePower(30000);\n            local State2 = script.Parent.State;\n            local v21 = u19 + math.random(-20, 20) / 10000000;\n            State2.Value = tostring(v21);\n\n            return;\n        end;\n\n        script.Parent.State.Value = \"off\";\n    end;\nend;\n\nreturn v2;"
};
