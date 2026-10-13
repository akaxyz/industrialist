export default {
  id: "AdvancedPowerRateMeter",
  category: "Misc",
  tier: 3,
  cost: 7000,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      maxAmount: 3000000,
      transferAmount: 500000,
      siteOffset: {
        y: 4.1500244140625,
        x: -0.14990234375
      },
      gameOffset: {
        y: 1.7749950885772705,
        x: -0.14990234375,
        z: 4.1500244140625
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal v1 = {};\nlocal Screen = script.Parent.Screen;\nlocal u2 = 0;\nlocal u3 = 0;\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal GraphV2 = require(ReplicatedStorage.Modules.GraphV2);\nlocal u5 = nil;\nlocal u6 = 1;\nlocal u7 = { {\n        average = 0,\n        sample = 1,\n        data = {}\n    }, {\n        average = 0,\n        sample = 2,\n        data = {}\n    }, {\n        average = 0,\n        sample = 10,\n        data = {}\n    } };\nlocal u8 = Color3.fromRGB(16, 116, 204);\nlocal u9 = Color3.fromRGB(20, 212, 255);\n\nfunction v1.localStart() -- Line: 44\n    -- upvalues: u5 (ref), GraphV2 (copy), Screen (copy), u8 (copy), u9 (copy), u6 (ref), u7 (copy)\n    u5 = GraphV2.new(Screen.SurfaceGui.Frame.MainGraph, { Screen.SurfaceGui.Frame.MainGraph.Graph.Path2D_1, Screen.SurfaceGui.Frame.MainGraph.Graph.Path2D_2 });\n    local Bottom = Screen.SurfaceGui.Frame.Bottom;\n\n    local function colorChanging(p10) -- Line: 48\n        -- upvalues: Bottom (copy), u8 (ref), u9 (ref)\n        for _, child in pairs(Bottom:GetChildren()) do\n            if child:IsA(\"TextButton\") then\n                child.BackgroundColor3 = u8;\n            end;\n        end;\n\n        p10.BackgroundColor3 = u9;\n    end;\n\n    Bottom.short.MouseButton1Click:Connect(function() -- Line: 57\n        -- upvalues: u6 (ref), colorChanging (copy), Bottom (copy)\n        u6 = 1;\n        colorChanging(Bottom.short);\n    end);\n    Bottom.medium.MouseButton1Click:Connect(function() -- Line: 61\n        -- upvalues: u6 (ref), colorChanging (copy), Bottom (copy)\n        u6 = 2;\n        colorChanging(Bottom.medium);\n    end);\n    Bottom.long.MouseButton1Click:Connect(function() -- Line: 65\n        -- upvalues: u6 (ref), colorChanging (copy), Bottom (copy)\n        u6 = 3;\n        colorChanging(Bottom.long);\n    end);\n    Bottom.clear.MouseButton1Click:Connect(function() -- Line: 69\n        -- upvalues: u7 (ref)\n        table.clear(u7[1].data);\n        table.clear(u7[2].data);\n        table.clear(u7[3].data);\n    end);\nend;\n\nlocal function round(p11, p12) -- Line: 76\n    local v13 = 10 ^ (p12 or 2);\n\n    return math.floor(p11 * v13 + 0.5) / v13;\nend;\n\nlocal function convertPower(p14, p15) -- Line: 81\n    local v16;\n\n    if p14 < p15 then\n        v16 = p15;\n    else\n        v16 = p14;\n    end;\n\n    if v16 / 1000000000000 > 0.99 then\n        return math.floor(p14 / 1000000000000 * 100 + 0.5) / 100, math.floor(p15 / 1000000000000 * 100 + 0.5) / 100, \"TMF\";\n    end;\n\n    if v16 / 1000000000 > 0.99 then\n        return math.floor(p14 / 1000000000 * 100 + 0.5) / 100, math.floor(p15 / 1000000000 * 100 + 0.5) / 100, \"GMF\";\n    end;\n\n    if v16 / 1000000 > 0.99 then\n        return math.floor(p14 / 1000000 * 100 + 0.5) / 100, math.floor(p15 / 1000000 * 100 + 0.5) / 100, \"MMF\";\n    end;\n\n    if v16 / 1000 > 0.99 then\n        return math.floor(p14 / 1000 * 100 + 0.5) / 100, math.floor(p15 / 1000 * 100 + 0.5) / 100, \"kMF\";\n    end;\n\n    return math.floor(p14 * 1000 + 0.5) / 1000, math.floor(p15 * 1000 + 0.5) / 1000, \"MF\";\nend;\n\nlocal CurrentCamera = workspace.CurrentCamera;\nlocal u17 = 9;\n\nfunction v1.localUpdate() -- Line: 114\n    -- upvalues: u5 (ref), u17 (ref), u7 (copy), u6 (ref), CurrentCamera (copy), convertPower (copy), Screen (copy)\n    if u5 == nil then\n        return;\n    end;\n\n    u17 = u17 + 1;\n    local v18 = tonumber(script.Parent.State.Value);\n\n    if v18 == nil then\n        return;\n    end;\n\n    local v19 = math.floor(v18 * 10 + 0.5) / 10;\n\n    for _, v in pairs(u7) do\n        if u17 % v.sample == 0 then\n            v.average = v.average + v19;\n            table.insert(v.data, v.average / v.sample);\n            v.average = 0;\n\n            if #v.data == 101 then\n                table.remove(v.data, 1);\n            end;\n        else\n            v.average = v.average + v19;\n        end;\n    end;\n\n    local v20 = 0;\n\n    for _, v in pairs(u7[u6].data) do\n        v20 = v20 + v;\n    end;\n\n    if (CurrentCamera.CFrame.Position - script.Parent.Root.Position).Magnitude > 20 then\n        return;\n    end;\n\n    local v21, v22, v23 = convertPower(v20 / #u7[u6].data, v19);\n    Screen.SurfaceGui.Frame.Top.Number.Text = `{v22}{v23}/s flow, {v21}{v23}/s average`;\n    local v24 = table.create(#u7[u6].data);\n\n    for i = 1, #u7[u6].data do\n        v24[i] = v20 / #u7[u6].data;\n    end;\n\n    local v25 = {};\n\n    for i = 1, #u7[u6].data do\n        v25[i] = -u7[u6].sample * #u7[u6].data + u7[u6].sample * (i - 1);\n    end;\n\n    u5:RefreshNGraphs(v25, { u7[u6].data, v24 });\nend;\n\nlocal _ = game.ReplicatedStorage.Pollution.Value;\ntick();\nlocal u26 = tick();\nlocal u27 = 0;\nlocal u28 = workspace:GetAttribute(\"Difficulty\");\n\nfunction v1.tick() -- Line: 168\n    -- upvalues: u4 (copy), u2 (ref), u27 (ref), u3 (ref), u26 (ref), u28 (copy)\n    u2 = u2 + u4:getFlow();\n    u4:setFlow(0);\n    u27 = u27 + 1;\n\n    if u27 == 30 then\n        u27 = 0;\n        u3 = (u3 + u2) / 2;\n        u2 = 0;\n    end;\n\n    if tick() - u26 >= 1 then\n        u26 = tick();\n        local State = script.Parent.State;\n        local v29 = u3 + math.random(-100, 100) / 1000000;\n        State.Value = tostring(v29);\n    end;\n\n    if u28 >= 4 then\n        u4:removePower(u4:getBuffer());\n    end;\nend;\n\nreturn v1;"
};
