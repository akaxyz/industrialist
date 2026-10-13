export default {
  id: "PlasticMoldingMachine",
  category: "Factories",
  tier: 3,
  cost: 100000,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 500000,
      transferAmount: 0,
      siteOffset: {
        y: -4.859405517578125,
        x: -1.241943359375
      },
      gameOffset: {
        y: 9.552471160888672,
        x: -1.241943359375,
        z: -4.859405517578125
      }
    },
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -2.98797607421875,
        x: -1.93011474609375
      },
      gameOffset: {
        y: 2.033492088317871,
        x: -1.93011474609375,
        z: -2.98797607421875
      },
      tip: "Output for molded product"
    },
    {
      name: "MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 50,
      transferAmount: 10,
      siteOffset: {
        y: -2.959716796875,
        x: 5.9000244140625
      },
      gameOffset: {
        y: 1.7830979824066162,
        x: 5.9000244140625,
        z: -2.959716796875
      },
      tip: "Input for plastic pellets"
    }
  ],
  data: {
    IsBottle: true
  },
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal ModelTweenUtils = require(ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u4 = ModelTweenUtils.new(script.Parent.Rotators);\nlocal u5 = ModelTweenUtils.new(script.Parent.Rotators.bFlap);\nlocal u6 = ModelTweenUtils.new(script.Parent.Rotators.gFlap);\nlocal u7 = script.Parent.Rotators:GetPivot();\nscript.Parent.Lever.MainBody.ProximityPrompt.Enabled = true;\n\nlocal function refreshSelection() -- Line: 20\n    -- upvalues: u4 (copy), u7 (copy)\n    if script.Parent.Mode.Value == \"Bottle\" then\n        u4:newTween(TweenInfo.new(1, Enum.EasingStyle.Linear), u7):Play();\n\n        return;\n    end;\n\n    if script.Parent.Mode.Value == \"Gear Box\" then\n        u4:newTween(TweenInfo.new(1, Enum.EasingStyle.Linear), u7 * CFrame.Angles(3.141592653589793, 0, 0)):Play();\n    end;\nend;\n\nlocal v8 = {\n    localStart = function() -- Line: 30, Name: localStart\n        -- upvalues: refreshSelection (copy)\n        script.Parent.Mode:GetPropertyChangedSignal(\"Value\"):Connect(refreshSelection);\n        refreshSelection();\n    end\n};\nlocal TweenService = game:GetService(\"TweenService\");\nlocal Debris = game:GetService(\"Debris\");\n\nlocal function dropInstance(p9) -- Line: 37\n    -- upvalues: TweenService (copy), Debris (copy)\n    local v10 = p9:Clone();\n    v10.Transparency = 0;\n    v10.Position = p9.Position;\n    v10.Parent = workspace;\n    TweenService:Create(v10, TweenInfo.new(2, Enum.EasingStyle.Circular), {\n        Position = v10.Position - Vector3.new(0, 6, 0)\n    }):Play();\n    Debris:AddItem(v10, 5);\nend;\n\nfunction v8.localUpdate() -- Line: 46\n    -- upvalues: u5 (copy), dropInstance (copy), u6 (copy)\n    if script.Parent.State.Value ~= \"1\" then\n        return;\n    end;\n\n    if script.Parent.Mode.Value ~= \"Bottle\" then\n        if script.Parent.Mode.Value == \"Gear Box\" then\n            local v11 = u6:GetPivot();\n            u6:newTween(TweenInfo.new(1, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), u6:GetPivot() * CFrame.Angles(-1.5707963267948966, 0, 0)):Play();\n            task.wait(0.5);\n            dropInstance(script.Parent.Rotators.Folder.Gearbox);\n            task.wait(2);\n            u6:newTween(TweenInfo.new(3, Enum.EasingStyle.Linear), v11):Play();\n        end;\n\n        return;\n    end;\n\n    local v12 = u5:GetPivot();\n    u5:newTween(TweenInfo.new(1, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), u5:GetPivot() * CFrame.Angles(-1.5707963267948966, 0, 0)):Play();\n    task.wait(0.5);\n    dropInstance(script.Parent.Rotators.Folder.Bottle1);\n    dropInstance(script.Parent.Rotators.Folder.Bottle2);\n    task.wait(2);\n    u5:newTween(TweenInfo.new(3, Enum.EasingStyle.Linear), v12):Play();\nend;\n\nlocal u13 = false;\nlocal u14 = 240;\n\nfunction v8.tick() -- Line: 70\n    -- upvalues: u14 (ref), u13 (ref), u3 (copy), u2 (copy), u1 (copy)\n    if u14 > 0 then\n        u14 = u14 - 1;\n\n        return;\n    end;\n\n    if u13 then\n        return;\n    end;\n\n    if not u3:canHoldXMore(2) then\n        return;\n    end;\n\n    if not (u2:hasAmountOf(\"Plastic Pellets\", 20) and u1:hasPower(100000)) then\n        return;\n    end;\n\n    u13 = true;\n    script.Parent.Locked.Value = true;\n    u2:removeItem(20);\n    u1:removePower(100000);\n    task.spawn(function() -- Line: 82\n        -- upvalues: u3 (ref), u13 (ref)\n        script.Parent.Base[\"Water Pump\"]:Play();\n        script.Parent.State.Value = \"1\";\n        task.wait(7);\n        script.Parent.State.Value = \"0\";\n\n        if script.Parent.Mode.Value == \"Bottle\" then\n            u3:addItemAmount(\"Plastic Bottle\", 2);\n        elseif script.Parent.Mode.Value == \"Gear Box\" then\n            u3:addItemAmount(\"Plastic Casing\", 1);\n        end;\n\n        script.Parent.Base[\"Water Pump\"]:Stop();\n        u13 = false;\n        script.Parent.Locked.Value = false;\n    end);\nend;\n\nreturn v8;"
};
