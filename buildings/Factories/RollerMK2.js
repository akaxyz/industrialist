export default {
  id: "RollerMK2",
  category: "Factories",
  tier: 3,
  cost: 150000,
  base: {
    height: 30,
    offset: {
      y: -13,
      x: -10
    },
    width: 24
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 2000000,
      transferAmount: 0,
      siteOffset: {
        y: -13.00848388671875,
        x: -3.28179931640625
      },
      gameOffset: {
        y: 9.72059440612793,
        x: -3.28179931640625,
        z: -13.00848388671875
      }
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 240,
      transferAmount: 20,
      siteOffset: {
        y: -21,
        x: 1.125
      },
      gameOffset: {
        y: 1.4999706745147705,
        x: 1.125,
        z: -21
      }
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -5,
        x: 1.125
      },
      gameOffset: {
        y: 1.4999887943267822,
        x: 1.125,
        z: -5
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = 0;\nlocal State = script.Parent.State;\nlocal u5 = {\n    [\"Copper Plate\"] = {\n        Amount = 20,\n        Make = { \"Copper Wire\", 120 },\n        PowerNeed = 200000,\n        Badge = 2151290823,\n        Color = Color3.fromRGB(182, 88, 34)\n    },\n    [\"Iron Plate\"] = {\n        Amount = 20,\n        Make = { \"Iron Coil\", 40 },\n        PowerNeed = 400000,\n        Color = Color3.fromRGB(161, 161, 161)\n    },\n    [\"Steel Ingot\"] = {\n        Amount = 20,\n        Make = { \"Steel Coil\", 20 },\n        PowerNeed = 600000,\n        Color = Color3.fromRGB(130, 130, 130)\n    },\n    [\"Gold Ingot\"] = {\n        Amount = 4,\n        Make = { \"Gold Wire\", 40 },\n        PowerNeed = 200000,\n        Color = Color3.fromRGB(226, 214, 41)\n    }\n};\nlocal v6 = {};\nlocal u7 = require(game.ReplicatedStorage.Modules.NextTicks).new();\nlocal Animation = script.Parent.Animation;\nlocal TweenService = game:GetService(\"TweenService\");\n\nfunction v6.localUpdate() -- Line: 45\n    -- upvalues: State (copy), u5 (copy), Animation (copy), TweenService (copy)\n    if State.Value ~= \"\" then\n        local v8 = u5[State.Value];\n\n        if v8 == nil then\n            return;\n        end;\n\n        local v9 = v8.Time or 8;\n        local Color = v8.Color;\n        script.Parent.Base.Machine:Play();\n\n        while State.Value == State.Value do\n            task.wait(0.5);\n            Animation.Cyl1.Transparency = 0;\n            Animation.Cyl2.Transparency = 0;\n            Animation.Square1.Transparency = 0;\n            Animation.Square2.Transparency = 0;\n            script.Parent.Animation.Cyl1.Color = Color;\n            script.Parent.Animation.Cyl2.Color = Color;\n            script.Parent.Animation.Square1.Color = Color;\n            script.Parent.Animation.Square2.Color = Color;\n            TweenService:Create(Animation.Cyl1, TweenInfo.new(v9, Enum.EasingStyle.Linear), {\n                Size = Vector3.new(6.148, 7, 7)\n            }):Play();\n            TweenService:Create(Animation.Cyl2, TweenInfo.new(v9, Enum.EasingStyle.Linear), {\n                Size = Vector3.new(6.148, 7, 7)\n            }):Play();\n\n            for _ = 1, math.ceil(v9 * 10) do\n                task.wait(0.1);\n                Animation.Cyl1.CFrame = Animation.Cyl1.CFrame * CFrame.Angles(0.14493039575635713, 0, 0);\n                Animation.Cyl2.CFrame = Animation.Cyl2.CFrame * CFrame.Angles(0.14493039575635713, 0, 0);\n            end;\n\n            Animation.Square1.Transparency = 1;\n            Animation.Square2.Transparency = 1;\n            task.wait(1);\n            TweenService:Create(Animation.Cyl1, TweenInfo.new(0.3, Enum.EasingStyle.Linear), {\n                Transparency = 1\n            }):Play();\n            TweenService:Create(Animation.Cyl2, TweenInfo.new(0.3, Enum.EasingStyle.Linear), {\n                Transparency = 1\n            }):Play();\n            task.wait(1);\n            Animation.Cyl1.Size = Vector3.new(6.148, 1.4, 1.4);\n            Animation.Cyl2.Size = Vector3.new(6.148, 1.4, 1.4);\n        end;\n\n        script.Parent.Base.Machine:Stop();\n    end;\nend;\n\nfunction v6.tick() -- Line: 91\n    -- upvalues: u7 (copy), u2 (copy), u5 (copy), u3 (copy), u1 (copy), Achievements (copy), u4 (ref), State (copy)\n    if u7:tickIsBusy() then\n        return;\n    end;\n\n    local v10 = u2:getBuffer();\n    local v11 = u2:getItem();\n\n    for i, v in pairs(u5) do\n        if i == v11 and (v10 >= v.Amount and (u3:hasPower(v.PowerNeed) and u1:canHoldXMoreOf(v.Make[1], v.Make[2]))) then\n            u2:removeItem(v.Amount);\n\n            if v.Badge ~= nil then\n                Achievements.giveBadge(v.Badge);\n            end;\n\n            u4 = v.Time or 8;\n            State.Value = i;\n            u7:nextTicks(u4, function(p12) -- Line: 110\n                -- upvalues: u3 (ref), v (copy), u4 (ref), u1 (ref)\n                u3:removePower(v.PowerNeed / u4);\n\n                if p12 == 1 then\n                    u1:addItemAmount(v.Make[1], v.Make[2]);\n                end;\n            end);\n\n            return;\n        end;\n    end;\n\n    State.Value = \"\";\nend;\n\nreturn v6;"
};
