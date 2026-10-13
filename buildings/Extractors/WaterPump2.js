export default {
  id: "WaterPump2",
  category: "Extractors",
  tier: 2,
  cost: 6000,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: -1.99993896484375
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
        y: 1.292755126953125,
        x: -1.14312744140625
      },
      gameOffset: {
        y: 2.916950225830078,
        x: -1.14312744140625,
        z: 1.292755126953125
      }
    },
    {
      name: "FluidOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 50,
      transferAmount: 20,
      siteOffset: {
        y: 1.362091064453125,
        x: -5.01837158203125
      },
      gameOffset: {
        y: 1.8647985458374023,
        x: -5.01837158203125,
        z: 1.362091064453125
      },
      tip: "Generates (and outputs) water when powered"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.PipeUtilsV2).loadConnector(script.Parent.FluidOutMainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal _ = require(ReplicatedStorage.Modules.Enums.Items).Water;\nlocal u3 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal v4 = {};\nlocal State = script.Parent.State;\nlocal Piston = script.Parent.Piston;\nlocal CFrame = Piston.PrimaryPart.CFrame;\nlocal u5 = Piston.PrimaryPart.CFrame - Vector3.new(0, 2, 0);\nscript.CF.Value = CFrame;\nlocal TweenService = game:GetService(\"TweenService\");\n\nfunction v4.localStart() -- Line: 27\n    -- upvalues: Piston (copy)\n    while true do\n        local Magnitude = (workspace.CurrentCamera.CFrame.Position - script.Parent.Base.Position).Magnitude;\n\n        if Magnitude <= 100 then\n            task.wait(0.03333333333333333);\n        elseif Magnitude <= 250 then\n            task.wait(0.06666666666666667);\n        elseif Magnitude <= 450 then\n            task.wait(0.1);\n        else\n            task.wait(0.3333333333333333);\n        end;\n\n        Piston:PivotTo(script.CF.Value);\n    end;\nend;\n\nfunction v4.localUpdate() -- Line: 45\n    -- upvalues: State (copy), TweenService (copy), u5 (copy), CFrame (copy)\n    if State.Value == \"1\" then\n        script.Parent.Base[\"Steam Engine Pump 8 (SFX)\"]:Play();\n        TweenService:Create(script.CF, TweenInfo.new(2.5, Enum.EasingStyle.Quad), {\n            Value = u5\n        }):Play();\n        task.wait(2.6);\n        script.Parent.Base[\"Steam Piston Pump 7 (SFX)\"]:Play();\n        TweenService:Create(script.CF, TweenInfo.new(2.5, Enum.EasingStyle.Quad), {\n            Value = CFrame\n        }):Play();\n    end;\n\n    if State.Value ~= \"DOWN\" then\n        if State.Value == \"RETRACT\" then\n            script.Parent.Base[\"Steam Piston Pump 7 (SFX)\"]:Play();\n            TweenService:Create(script.CF, TweenInfo.new(2.5, Enum.EasingStyle.Quad), {\n                Value = CFrame\n            }):Play();\n        end;\n\n        return;\n    end;\n\n    script.Parent.Base[\"Steam Engine Pump 8 (SFX)\"]:Play();\n    TweenService:Create(script.CF, TweenInfo.new(2.5, Enum.EasingStyle.Quad), {\n        Value = u5\n    }):Play();\nend;\n\nfunction v4.tick() -- Line: 65\n    -- upvalues: u3 (copy), u2 (copy), State (copy), u1 (copy)\n    if u3:tickIsBusy() then\n        return;\n    end;\n\n    if not u2:hasPower(4200) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u1:canHoldXMoreOf(\"Water\", 36) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u2:removePower(4200);\n    State.Value = \"1\";\n    u3:nextTicks(6, function(p6) -- Line: 89\n        -- upvalues: State (ref), u1 (ref)\n        if p6 == 1 then\n            State.Value = \"\";\n        end;\n\n        if p6 <= 4 then\n            u1:addItemAmount(\"Water\", 9);\n        end;\n    end);\nend;\n\nreturn v4;"
};
