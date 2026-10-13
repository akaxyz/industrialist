export default {
  id: "AmericanOilRig",
  category: "Extractors",
  tier: 2,
  cost: 5000,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.2919921875,
        x: 1.000244140625
      },
      gameOffset: {
        y: 1.364755630493164,
        x: 1.000244140625,
        z: 1.2919921875
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 100000,
      transferAmount: 0,
      siteOffset: {
        y: 0.886962890625,
        x: -1.442718505859375
      },
      gameOffset: {
        y: 2.406757354736328,
        x: -1.442718505859375,
        z: 0.886962890625
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v3 = {};\nlocal Speed = script.Parent.Upgrades.Speed;\nlocal positions = require(script.OilRigPrecalculated).positions;\nlocal Parent = script.Parent;\nlocal u4 = Parent.Counterweight:GetPivot();\nlocal u5 = Parent.Horse:GetPivot();\nlocal u6 = (script.Parent.Base.Orientation.Y == 90 or script.Parent.Base.Orientation.Y == -90) and 2 or 1;\n\nlocal function alignArm() -- Line: 28\n    -- upvalues: u6 (ref), Parent (copy)\n    if u6 == 1 then\n        Parent.Horse.Align.Position = Vector3.new(Parent.Crankarm.Pivot.Position.X, Parent.Horse.Align.Position.Y, Parent.Horse.Align.Position.Z);\n    elseif u6 == 2 then\n        Parent.Horse.Align.Position = Vector3.new(Parent.Horse.Align.Position.X, Parent.Horse.Align.Position.Y, Parent.Crankarm.Pivot.Position.Z);\n    end;\n\n    local v7 = CFrame.lookAt(Parent.Counterweight.Align.Position, Parent.Horse.Align.Position) * CFrame.Angles(-1.5707963267948966, 0, 0);\n    Parent.Crankarm:PivotTo(v7);\nend;\n\nlocal u8 = 0;\nlocal u9 = false;\nlocal CurrentCamera = workspace.CurrentCamera;\n\nfunction v3.localUpdate() -- Line: 43\n    -- upvalues: State (copy), u9 (ref), u8 (ref), positions (copy), Parent (copy), u4 (copy), u5 (copy), alignArm (copy), Speed (copy), CurrentCamera (copy)\n    if State.Value == \"\" then\n        if u9 == true then\n            u9 = false;\n            script.Parent.Base.Pump:Stop();\n        end;\n    elseif State.Value == \"Pumping\" and u9 == false then\n        u9 = true;\n        script.Parent.Base.Pump:Play();\n\n        while u9 do\n            if u8 > 360 then\n                u8 = u8 - 360;\n            end;\n\n            local v10 = positions[u8];\n            Parent.Counterweight:PivotTo(u4 * CFrame.Angles(math.rad(u8), 0, 0));\n            Parent.Horse:PivotTo(u5 * CFrame.Angles(math.rad(v10), 0, 0));\n            alignArm();\n            script.Parent.Base.Pump.Pitch = 0.8 + Speed.Value * 0.05;\n            local Magnitude = (CurrentCamera.CFrame.Position - script.Parent.Base.Position).Magnitude;\n\n            if Magnitude <= 100 then\n                task.wait(0.03333333333333333);\n                u8 = u8 + math.floor(Speed.Value) * 1 * 5 * 2;\n            elseif Magnitude <= 250 then\n                task.wait(0.06666666666666667);\n                u8 = u8 + math.floor(Speed.Value) * 2 * 5 * 2;\n            elseif Magnitude <= 450 then\n                task.wait(0.1);\n                u8 = u8 + math.floor(Speed.Value) * 3 * 5 * 2;\n            else\n                task.wait(0.3333333333333333);\n                u8 = u8 + math.floor(Speed.Value) * 10 * 5 * 2;\n            end;\n        end;\n    end;\nend;\n\nfunction v3.tick() -- Line: 90\n    -- upvalues: u1 (copy), Speed (copy), u2 (copy), State (copy), Pollution (copy)\n    if u1:hasPower(50000 * Speed.Value) and u2:canHoldXMore(0.12) then\n        State.Value = \"Pumping\";\n        local v11 = Pollution;\n        v11.Value = v11.Value + 0.4 * Speed.Value;\n        u1:removePower(50000 * Speed.Value);\n        u2:addItem(0.24 * Speed.Value, \"Crude Oil\");\n        math.randomseed(tick());\n\n        if math.random(1, 3) == 1 and script.Parent.Base[\"Eagle SFX\"].Playing == false then\n            math.randomseed(tick());\n            local v12 = math.random(50, 200) / 100;\n            script.Parent.Base[\"Eagle SFX\"].Pitch = v12;\n            script.Parent.Base[\"Eagle SFX\"]:Play();\n        end;\n    else\n        State.Value = \"\";\n    end;\nend;\n\nreturn v3;"
};
