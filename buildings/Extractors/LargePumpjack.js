export default {
  id: "LargePumpjack",
  category: "Extractors",
  tier: 3,
  cost: 120000,
  base: {
    height: 40,
    offset: {
      y: 18,
      x: 0
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 11.69049072265625,
        x: 7.1937255859375
      },
      gameOffset: {
        y: 6.852411270141602,
        x: 7.1937255859375,
        z: 11.69049072265625
      }
    },
    {
      name: "Out1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -1.15777587890625,
        x: 1.0003662109375
      },
      gameOffset: {
        y: 1.4747600555419922,
        x: 1.0003662109375,
        z: -1.15777587890625
      },
      tip: "Output for Crude Oil"
    },
    {
      name: "InFluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: -1.15777587890625,
        x: -0.9996337890625
      },
      gameOffset: {
        y: 1.4747600555419922,
        x: -0.9996337890625,
        z: -1.15777587890625
      },
      tip: "Input for Hydrochloric Acid/Sulfuric Acid/Acetic Acid"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InFluidMainPipe);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v4 = {};\nlocal Speed = script.Parent.Upgrades.Speed;\nlocal positions = require(script.OilRigPrecalculated).positions;\nlocal Parent = script.Parent;\nlocal u5 = Parent.Counterweight:GetPivot();\nlocal u6 = Parent.Horse:GetPivot();\nlocal u7 = (script.Parent.Base.Orientation.Y == 90 or script.Parent.Base.Orientation.Y == -90) and 2 or 1;\n\nlocal function alignArm() -- Line: 29\n    -- upvalues: u7 (ref), Parent (copy)\n    if u7 == 1 then\n        Parent.Horse.Align.Position = Vector3.new(Parent.Counterweight.Crankarm.Pivot.Position.X, Parent.Horse.Align.Position.Y, Parent.Horse.Align.Position.Z);\n    elseif u7 == 2 then\n        Parent.Horse.Align.Position = Vector3.new(Parent.Horse.Align.Position.X, Parent.Horse.Align.Position.Y, Parent.Counterweight.Crankarm.Pivot.Position.Z);\n    end;\n\n    local v8 = CFrame.lookAt(Parent.Counterweight.Crankarm:GetPivot().Position, Parent.Horse.Align.Position) * CFrame.Angles(-1.5707963267948966, 0, 0);\n    Parent.Counterweight.Crankarm:PivotTo(v8);\nend;\n\nlocal u9 = 0;\nlocal u10 = false;\nlocal CurrentCamera = workspace.CurrentCamera;\n\nfunction v4.localUpdate() -- Line: 44\n    -- upvalues: State (copy), u10 (ref), u9 (ref), positions (copy), Parent (copy), u5 (copy), u6 (copy), alignArm (copy), Speed (copy), CurrentCamera (copy)\n    if State.Value == \"\" then\n        if u10 == true then\n            u10 = false;\n            script.Parent.Base.Pump:Stop();\n        end;\n    elseif State.Value == \"Pumping\" and u10 == false then\n        u10 = true;\n        script.Parent.Base.Pump:Play();\n\n        while u10 do\n            if u9 > 360 then\n                u9 = u9 - 360;\n            end;\n\n            local v11 = positions[u9];\n            Parent.Counterweight:PivotTo(u5 * CFrame.Angles(math.rad(u9), 0, 0));\n            Parent.Horse:PivotTo(u6 * CFrame.Angles(math.rad(v11), 0, 0));\n            alignArm();\n            script.Parent.Base.Pump.Pitch = 0.4 + Speed.Value * 0.05;\n            local Cable = Parent.Cable;\n            local v12 = math.abs(Parent.CableAnchor.Position.Y - Parent.Horse.YAlign.Position.Y) * 2;\n            Cable.Size = Vector3.new(v12, 0.13, 0.13);\n            Parent.Cable.Position = Parent.CableAnchor.Position;\n            local Magnitude = (CurrentCamera.CFrame.Position - script.Parent.Base.Position).Magnitude;\n\n            if Magnitude <= 100 then\n                task.wait(0.03333333333333333);\n                u9 = u9 + math.floor(Speed.Value) * 1 * 2;\n            elseif Magnitude <= 500 then\n                task.wait(0.06666666666666667);\n                u9 = u9 + math.floor(Speed.Value) * 2 * 2;\n            elseif Magnitude <= 800 then\n                task.wait(0.1);\n                u9 = u9 + math.floor(Speed.Value) * 3 * 2;\n            else\n                task.wait(0.2);\n                u9 = u9 + math.floor(Speed.Value) * 6 * 2;\n            end;\n        end;\n    end;\nend;\n\nfunction v4.tick() -- Line: 93\n    -- upvalues: u3 (copy), u1 (copy), Speed (copy), u2 (copy), State (copy), Pollution (copy)\n    local v13 = u3:getItem();\n    local v14 = u3:getBuffer();\n    local v15 = 0;\n    local v16 = 1;\n    local v17 = 1;\n\n    if v13 == \"Hydrochloric Acid\" and v14 >= 1 then\n        v17 = 0.5;\n        v16 = 2.5;\n        v15 = 1;\n    elseif v13 == \"Sulfuric Acid\" and v14 >= 1 then\n        v16 = 3;\n        v15 = 1;\n    elseif v13 == \"Acetic Acid\" and v14 >= 1 then\n        v16 = 2;\n        v15 = 1;\n    end;\n\n    if not (u1:hasPower(30000 * Speed.Value * v17) and u2:canHoldXMore(v16 * 2)) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    State.Value = \"Pumping\";\n    local v18 = Pollution;\n    v18.Value = v18.Value + 100 * Speed.Value * (v16 * 2);\n    u1:removePower(30000 * Speed.Value * v17);\n    u2:addItem(1 * Speed.Value * v16, \"Crude Oil\");\n    u3:removeItem(v15);\nend;\n\nreturn v4;"
};
