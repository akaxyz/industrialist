export default {
  id: "OPPowerRateMeter",
  category: "Misc",
  tier: 3,
  cost: 2.6561398887587478e+95,
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
      maxAmount: 1000000000,
      transferAmount: 200000000,
      siteOffset: {
        y: 4.1500244140625,
        x: -0.14990234375
      },
      gameOffset: {
        y: 1.7749969959259033,
        x: -0.14990234375,
        z: 4.1500244140625
      },
      wireRange: 300
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal v1 = {};\nlocal u2 = 0;\nlocal u3 = 0;\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Graph = require(script.Graph);\nlocal u5 = nil;\nlocal SurfaceGui = script.Parent.Screen.SurfaceGui;\nlocal u6 = 1;\nlocal u7 = { {\n        average = 0,\n        sample = 1,\n        data = {}\n    }, {\n        average = 0,\n        sample = 2,\n        data = {}\n    }, {\n        average = 0,\n        sample = 10,\n        data = {}\n    } };\n\nfunction v1.localStart() -- Line: 41\n    -- upvalues: u5 (ref), Graph (copy), u6 (ref)\n    u5 = Graph.new(script.Parent.Screen.SurfaceGui.Chart);\n    u5.Resolution = 300;\n    script.Parent.Screen.SurfaceGui.Bottom.short.MouseButton1Down:Connect(function() -- Line: 45\n        -- upvalues: u6 (ref)\n        u6 = 1;\n    end);\n    script.Parent.Screen.SurfaceGui.Bottom.medium.MouseButton1Down:Connect(function() -- Line: 48\n        -- upvalues: u6 (ref)\n        u6 = 2;\n    end);\n    script.Parent.Screen.SurfaceGui.Bottom.long.MouseButton1Down:Connect(function() -- Line: 51\n        -- upvalues: u6 (ref)\n        u6 = 3;\n    end);\nend;\n\nlocal function round(p8, p9) -- Line: 56\n    local v10 = 10 ^ (p9 or 2);\n\n    return math.floor(p8 * v10 + 0.5) / v10;\nend;\n\nlocal function convertPower(p11, p12) -- Line: 61\n    local v13;\n\n    if p11 < p12 then\n        v13 = p12;\n    else\n        v13 = p11;\n    end;\n\n    if v13 / 1000000000000 > 0.99 then\n        return math.floor(p11 / 1000000000000 * 100 + 0.5) / 100, math.floor(p12 / 1000000000000 * 100 + 0.5) / 100, \"TMF\";\n    end;\n\n    if v13 / 1000000000 > 0.99 then\n        return math.floor(p11 / 1000000000 * 100 + 0.5) / 100, math.floor(p12 / 1000000000 * 100 + 0.5) / 100, \"GMF\";\n    end;\n\n    if v13 / 1000000 > 0.99 then\n        return math.floor(p11 / 1000000 * 100 + 0.5) / 100, math.floor(p12 / 1000000 * 100 + 0.5) / 100, \"MMF\";\n    end;\n\n    if v13 / 1000 > 0.99 then\n        return math.floor(p11 / 1000 * 100 + 0.5) / 100, math.floor(p12 / 1000 * 100 + 0.5) / 100, \"kMF\";\n    end;\n\n    return math.floor(p11 * 1000 + 0.5) / 1000, math.floor(p12 * 1000 + 0.5) / 1000, \"MF\";\nend;\n\nlocal CurrentCamera = workspace.CurrentCamera;\nlocal u14 = 9;\n\nfunction v1.localUpdate() -- Line: 95\n    -- upvalues: u14 (ref), convertPower (copy), u7 (copy), u6 (ref), CurrentCamera (copy), SurfaceGui (copy), u5 (ref)\n    u14 = u14 + 1;\n    local v15 = tonumber(script.Parent.State.Value);\n\n    if v15 == nil then\n        return;\n    end;\n\n    local _, v16, v17 = convertPower(v15, v15);\n\n    for _, v in pairs(u7) do\n        if u14 % v.sample == 0 then\n            v.average = v.average + v15;\n            table.insert(v.data, v.average / v.sample);\n            v.average = 0;\n\n            if #v.data == 61 then\n                table.remove(v.data, 1);\n            end;\n        else\n            v.average = v.average + v15;\n        end;\n    end;\n\n    local v18 = 0;\n\n    for _, v in pairs(u7[u6].data) do\n        v18 = v18 + v;\n    end;\n\n    if (CurrentCamera.CFrame.Position - script.Parent.Root.Position).Magnitude > 20 then\n        SurfaceGui.Enabled = false;\n\n        return;\n    end;\n\n    SurfaceGui.Enabled = true;\n    SurfaceGui.Top.TextLabel.Text = `{v16}{v17}/s flow`;\n    local v19 = table.create(#u7[u6].data);\n\n    for i = 1, #u7[u6].data do\n        v19[i] = v18 / #u7[u6].data;\n    end;\n\n    u5.Data = {\n        Flow = u7[u6].data,\n        Average = v19\n    };\nend;\n\nlocal _ = game.ReplicatedStorage.Pollution.Value;\ntick();\nlocal u20 = tick();\nlocal u21 = 0;\nlocal u22 = workspace:GetAttribute(\"Difficulty\");\n\nfunction v1.tick() -- Line: 145\n    -- upvalues: u4 (copy), u2 (ref), u21 (ref), u3 (ref), u20 (ref), u22 (copy)\n    u2 = u2 + u4:getFlow();\n    u4:setFlow(0);\n\n    if u21 == 30 then\n        u21 = 0;\n        u3 = (u3 + u2) / 2;\n        u2 = 0;\n    else\n        u21 = u21 + 1;\n    end;\n\n    if tick() - u20 >= 1 then\n        u20 = tick();\n        script.Parent.State.Value = tostring(u3);\n    end;\n\n    if u22 >= 4 then\n        u4:removePower(u4:getBuffer());\n    end;\nend;\n\nreturn v1;"
};
