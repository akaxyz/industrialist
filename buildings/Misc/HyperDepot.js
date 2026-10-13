export default {
  id: "HyperDepot",
  category: "Misc",
  cost: 16000,
  base: {
    height: 20,
    offset: {
      y: -8,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 2,
      transferAmount: 2,
      siteOffset: {
        y: -12.978424072265625,
        x: -1.8261098861694336
      },
      gameOffset: {
        y: 2.2749996185302734,
        x: -1.8261098861694336,
        z: -12.978424072265625
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 10000000,
      transferAmount: 0,
      siteOffset: {
        y: -12.62847900390625,
        x: -1.4284534454345703
      },
      gameOffset: {
        y: 6.024320602416992,
        x: -1.4284534454345703,
        z: -12.62847900390625
      }
    }
  ],
  data: [],
  script: "game:GetService(\"ReplicatedStorage\");\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Main = script.Parent.Screen.SurfaceGui.Main;\nlocal Car = script.Parent.Car;\nlocal State = script.Parent.State;\nlocal TweenService = game:GetService(\"TweenService\");\n\nlocal function getBarSize(p3, p4) -- Line: 17\n    return UDim2.new(1 / p4 * p3, 0, 1, 0);\nend;\n\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal _ = game.ReplicatedStorage.Expenses.Maintenance;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal _ = game.ReplicatedStorage.Pollution;\nlocal TweenService2 = game:GetService(\"TweenService\");\nlocal u5 = TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In);\n\nlocal function tweenModel(u6, p7) -- Line: 31\n    -- upvalues: TweenService2 (copy), u5 (copy)\n    local CFrameValue = Instance.new(\"CFrameValue\");\n    CFrameValue.Value = u6:GetPrimaryPartCFrame();\n    CFrameValue:GetPropertyChangedSignal(\"Value\"):Connect(function() -- Line: 35\n        -- upvalues: u6 (copy), CFrameValue (copy)\n        u6:SetPrimaryPartCFrame(CFrameValue.Value);\n    end);\n    local v8 = TweenService2:Create(CFrameValue, u5, {\n        Value = p7\n    });\n    v8:Play();\n    v8.Completed:Connect(function() -- Line: 42\n        -- upvalues: CFrameValue (copy)\n        CFrameValue:Destroy();\n    end);\n    v8.Completed:Wait();\nend;\n\nlocal CFrame = script.Parent.Car.PrimaryPart.CFrame;\nlocal u9 = false;\n\nlocal function start() -- Line: 51\n    -- upvalues: u9 (ref), Car (copy), tweenModel (copy), TweenService (copy)\n    if u9 == false then\n        u9 = true;\n        Car.Front.Engine:Play();\n        spawn(function() -- Line: 56\n            -- upvalues: tweenModel (ref)\n            tweenModel(script.Parent.Car, script.Parent.Car.PrimaryPart.CFrame + script.Parent.Car.PrimaryPart.CFrame.LookVector * script.Parent.Speed.Value);\n        end);\n\n        for _, descendant in pairs(Car:GetDescendants()) do\n            if descendant:IsA(\"BasePart\") then\n                TweenService:Create(descendant, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n                    Transparency = 1\n                }):Play();\n            end;\n\n            if descendant.Name == \"Sign\" then\n                local v10 = TweenService:Create(descendant.SurfaceGui.SIGN, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n                    TextTransparency = 1\n                });\n                TweenService:Create(descendant.SurfaceGui.SIGN:FindFirstChildWhichIsA(\"UIStroke\"), TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n                    Transparency = 1\n                }):Play();\n                v10:Play();\n            end;\n        end;\n    end;\nend;\n\nlocal function stop() -- Line: 74\n    -- upvalues: u9 (ref), Car (copy), TweenService (copy), tweenModel (copy), CFrame (copy)\n    if u9 == true then\n        for _, descendant in pairs(Car:GetDescendants()) do\n            if descendant:IsA(\"BasePart\") and (string.find(descendant.Name, \"Crate\") == nil and descendant.Name ~= \"Sign\") then\n                TweenService:Create(descendant, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n                    Transparency = 0\n                }):Play();\n            end;\n\n            if descendant.Name == \"Sign\" then\n                local v11 = TweenService:Create(descendant.SurfaceGui.SIGN, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n                    TextTransparency = 0\n                });\n                TweenService:Create(descendant.SurfaceGui.SIGN:FindFirstChildWhichIsA(\"UIStroke\"), TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n                    Transparency = 0\n                }):Play();\n                v11:Play();\n            end;\n        end;\n\n        spawn(function() -- Line: 88\n            -- upvalues: tweenModel (ref), CFrame (ref), u9 (ref)\n            tweenModel(script.Parent.Car, CFrame);\n            u9 = false;\n        end);\n    end;\nend;\n\nlocal function convertBooleanToString(p12) -- Line: 97\n    return p12 == true and \"ON\" or \"OFF\";\nend;\n\nlocal v13 = {\n    localUpdate = function() -- Line: 110, Name: localUpdate\n        -- upvalues: State (copy), start (copy), stop (copy)\n        if State.Value == \"Driving\" then\n            start();\n\n            return;\n        end;\n\n        if State.Value == \"Return\" then\n            stop();\n        end;\n    end\n};\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\n\nlocal function drive() -- Line: 122\n    -- upvalues: u2 (copy), State (copy), u1 (copy), Items (copy), Main (copy)\n    local v14 = u2:getBuffer();\n    local v15 = u2:getMax();\n    local v16 = math.clamp(1000 * v14 / v15, 1, 1000);\n    script.Parent.Speed.Value = v16;\n\n    if State.Value == \"Driving\" then\n        return;\n    end;\n\n    State.Value = \"Driving\";\n    local v17 = u1:getBuffer();\n    local v18 = u1:getItem();\n    local v19 = Items.findItemByDisplayName(v18);\n    u1:setItem(0, \"\");\n    Main.status.Text = \"DRIVING\";\n    Main.status.TextColor3 = Color3.fromRGB(255, 0, 0);\n    task.wait((math.clamp(40 / v16, 2, 1000)));\n    Items.sell(v19, v17);\n    task.wait((math.clamp(40 / v16, 2, 1000)));\n    State.Value = \"Return\";\n    Main.status.Text = \"IDLE\";\n    Main.status.TextColor3 = Color3.fromRGB(255, 213, 0);\nend;\n\nfunction v13.tick() -- Line: 153\n    -- upvalues: u1 (copy), Main (copy), State (copy), drive (copy)\n    local v20 = u1:getBuffer() / (u1:getMax() / 4);\n    math.floor(v20);\n    Main.TextLabel.Text = \"LOADING: \" .. u1:getItem();\n\n    if State.Value ~= \"Driving\" then\n        Main.status.Text = \"IDLE\";\n    end;\n\n    Main.status.TextColor3 = Color3.fromRGB(255, 255, 0);\n    local v21 = u1:getBuffer();\n\n    if math.ceil(v21) == u1:getMax() and State.Value ~= \"Driving\" then\n        spawn(function() -- Line: 166\n            -- upvalues: drive (ref)\n            drive();\n        end);\n    end;\n\n    local Bar = Main.Full.Bar;\n    local v22 = u1:getBuffer();\n    local v23 = 1 / u1:getMax();\n    Bar.Size = UDim2.new(v23 * v22, 0, 1, 0);\n    local power = Main.Full.power;\n    local v24 = u1:getBuffer();\n    power.Text = math.ceil(v24) .. \"/\" .. u1:getMax() .. \" units\";\nend;\n\nreturn v13;"
};
