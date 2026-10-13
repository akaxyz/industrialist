export default {
  id: "LargeFluidRateMeter",
  category: "Pipes",
  tier: 4,
  cost: 800000,
  base: {
    height: 8,
    offset: {
      y: 0,
      x: 0
    },
    width: 8
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "largefluid",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: 0.0001220703125,
        x: 0
      },
      gameOffset: {
        y: 4.588985443115234,
        x: 0,
        z: 0.0001220703125
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal v1 = {};\nlocal Screen = script.Parent.Screen;\nlocal u2 = 0;\nlocal u3 = 0;\nlocal u4 = 0;\nlocal u5 = 0;\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal GraphV2 = require(ReplicatedStorage.Modules.GraphV2);\nlocal u7 = nil;\nlocal u8 = 1;\nlocal u9 = 1;\nlocal u10 = { { {\n            average = 0,\n            sample = 1,\n            data = {}\n        }, {\n            average = 0,\n            sample = 2,\n            data = {}\n        }, {\n            average = 0,\n            sample = 10,\n            data = {}\n        } }, { {\n            average = 0,\n            sample = 1,\n            data = {}\n        }, {\n            average = 0,\n            sample = 2,\n            data = {}\n        }, {\n            average = 0,\n            sample = 10,\n            data = {}\n        } } };\nlocal u11 = Color3.fromRGB(97, 62, 16);\nlocal u12 = Color3.fromRGB(255, 166, 42);\n\nfunction v1.localStart() -- Line: 66\n    -- upvalues: u7 (ref), GraphV2 (copy), Screen (copy), u12 (copy), u11 (copy), u9 (ref), u8 (ref), u10 (copy)\n    u7 = GraphV2.new(Screen.SurfaceGui.Frame.MainGraph, { Screen.SurfaceGui.Frame.MainGraph.Graph.Path2D_1, Screen.SurfaceGui.Frame.MainGraph.Graph.Path2D_2 }, u12);\n    local Bottom = Screen.SurfaceGui.Frame.Bottom;\n\n    local function colorChanging(p13) -- Line: 70\n        -- upvalues: Bottom (copy), u11 (ref), u12 (ref)\n        for _, child in pairs(Bottom:GetChildren()) do\n            if child:IsA(\"TextButton\") and child.Name ~= \"mode\" then\n                child.BackgroundColor3 = u11;\n            end;\n        end;\n\n        p13.BackgroundColor3 = u12;\n    end;\n\n    Bottom.mode.MouseButton1Click:Connect(function() -- Line: 79\n        -- upvalues: u9 (ref), Bottom (copy), u12 (ref), u11 (ref)\n        if u9 == 1 then\n            u9 = 2;\n            Bottom.mode.BackgroundColor3 = u12;\n\n            return;\n        end;\n\n        u9 = 1;\n        Bottom.mode.BackgroundColor3 = u11;\n    end);\n    Bottom.short.MouseButton1Click:Connect(function() -- Line: 89\n        -- upvalues: u8 (ref), colorChanging (copy), Bottom (copy)\n        u8 = 1;\n        colorChanging(Bottom.short);\n    end);\n    Bottom.medium.MouseButton1Click:Connect(function() -- Line: 93\n        -- upvalues: u8 (ref), colorChanging (copy), Bottom (copy)\n        u8 = 2;\n        colorChanging(Bottom.medium);\n    end);\n    Bottom.long.MouseButton1Click:Connect(function() -- Line: 97\n        -- upvalues: u8 (ref), colorChanging (copy), Bottom (copy)\n        u8 = 3;\n        colorChanging(Bottom.long);\n    end);\n    Bottom.clear.MouseButton1Click:Connect(function() -- Line: 101\n        -- upvalues: u10 (ref)\n        table.clear(u10[1][1].data);\n        table.clear(u10[1][2].data);\n        table.clear(u10[1][3].data);\n        table.clear(u10[2][1].data);\n        table.clear(u10[2][2].data);\n        table.clear(u10[2][3].data);\n    end);\nend;\n\nlocal function round(p14, p15) -- Line: 111\n    local v16 = 10 ^ (p15 or 2);\n\n    return math.floor(p14 * v16 + 0.5) / v16;\nend;\n\nlocal CurrentCamera = workspace.CurrentCamera;\nlocal u17 = 9;\n\nfunction v1.localUpdate() -- Line: 118\n    -- upvalues: u7 (ref), u17 (ref), u10 (copy), u9 (ref), u8 (ref), CurrentCamera (copy), Screen (copy)\n    if u7 == nil then\n        return;\n    end;\n\n    u17 = u17 + 1;\n    local v18 = tonumber(script.Parent.State.Value);\n\n    if v18 == nil then\n        return;\n    end;\n\n    local v19 = math.floor(v18 * 10 + 0.5) / 10;\n\n    for _, v in pairs(u10[1]) do\n        if u17 % v.sample == 0 then\n            v.average = v.average + v19;\n            table.insert(v.data, v.average / v.sample);\n            v.average = 0;\n\n            if #v.data == 101 then\n                table.remove(v.data, 1);\n            end;\n        else\n            v.average = v.average + v19;\n        end;\n    end;\n\n    local v20 = script.Parent.State:GetAttribute(\"Temp\");\n\n    for _, v in pairs(u10[2]) do\n        if u17 % v.sample == 0 then\n            v.average = v.average + v20;\n            table.insert(v.data, v.average / v.sample);\n            v.average = 0;\n\n            if #v.data == 101 then\n                table.remove(v.data, 1);\n            end;\n        else\n            v.average = v.average + v20;\n        end;\n    end;\n\n    local v21 = 0;\n\n    for _, v in pairs(u10[u9][u8].data) do\n        v21 = v21 + v;\n    end;\n\n    if (CurrentCamera.CFrame.Position - script.Parent.Root.Position).Magnitude > 20 then\n        return;\n    end;\n\n    if u9 == 1 then\n        Screen.SurfaceGui.Frame.Top.Number.Text = `{v19}L/s flow, {math.floor(v21 / #u10[u9][u8].data * 10 + 0.5) / 10}L/s average`;\n    else\n        Screen.SurfaceGui.Frame.Top.Number.Text = `{math.floor(v21 / #u10[u9][u8].data * 100 + 0.5) / 100}°C average`;\n    end;\n\n    local v22 = table.create(#u10[u9][u8].data);\n\n    for i = 1, #u10[u9][u8].data do\n        v22[i] = v21 / #u10[u9][u8].data;\n    end;\n\n    local v23 = {};\n\n    for i = 1, #u10[u9][u8].data do\n        v23[i] = -u10[u9][u8].sample * #u10[u9][u8].data + u10[u9][u8].sample * (i - 1);\n    end;\n\n    u7:RefreshNGraphs(v23, { u10[u9][u8].data, v22 });\nend;\n\ntick();\nlocal u24 = tick();\nlocal u25 = 0;\n\nfunction v1.tick() -- Line: 190\n    -- upvalues: u6 (copy), u2 (ref), u4 (ref), u25 (ref), u3 (ref), u5 (ref), u24 (ref)\n    u2 = u2 + u6:getFlow();\n    u6:setFlow(0);\n    u4 = u4 + u6:getTemp();\n    u25 = u25 + 1;\n\n    if u25 == 30 then\n        u25 = 0;\n        u3 = (u3 + u2) / 2;\n        u5 = u4 / 30;\n        u4 = 0;\n        u2 = 0;\n    end;\n\n    if tick() - u24 >= 1 then\n        u24 = tick();\n        local State = script.Parent.State;\n        local v26 = u3 + math.random(-100, 100) / 10000000;\n        State.Value = tostring(v26);\n        script.Parent.State:SetAttribute(\"Temp\", u5);\n    end;\nend;\n\nreturn v1;"
};
