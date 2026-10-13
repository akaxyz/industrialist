export default {
  id: "OGOilRig",
  category: "Extractors",
  tier: 2,
  cost: 1200,
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
        y: 1.9500064849853516,
        x: 0.5
      },
      gameOffset: {
        y: 2.324988842010498,
        x: 0.5,
        z: 1.9500064849853516
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 15000,
      transferAmount: 0,
      siteOffset: {
        y: 1.9500064849853516,
        x: -0.5
      },
      gameOffset: {
        y: 2.324988842010498,
        x: -0.5,
        z: 1.9500064849853516
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal State = script.Parent.State;\nlocal Rotator = script.Parent.Rotator;\nlocal u3 = Rotator.CFrame * Rotator.PivotOffset;\nlocal u4 = u3:Inverse() * Rotator.CFrame;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v5 = {};\nlocal Speed = script.Parent.Upgrades.Speed;\nlocal u6 = false;\n\nfunction v5.localUpdate() -- Line: 20\n    -- upvalues: State (copy), u6 (ref), Speed (copy), u3 (ref), Rotator (copy), u4 (copy)\n    if State.Value == \"\" then\n        if u6 == true then\n            u6 = false;\n            script.Parent.Base.Pump:Stop();\n        end;\n    elseif State.Value == \"Pumping\" and u6 == false then\n        u6 = true;\n        script.Parent.Base.Pump:Play();\n        local v7 = 0;\n\n        while u6 do\n            task.wait(0.03333333333333333);\n            v7 = v7 + 1;\n\n            if v7 % 30 == 0 then\n                script.Parent.Base.Pump.Pitch = 0.9 + 0.1 * Speed.Value;\n                v7 = 0;\n            end;\n\n            u3 = u3 * CFrame.Angles(math.rad(5 * Speed.Value), 0, 0);\n            Rotator.CFrame = u3 * u4;\n        end;\n    end;\nend;\n\nfunction v5.tick() -- Line: 46\n    -- upvalues: u1 (copy), Speed (copy), u2 (copy), State (copy), Pollution (copy)\n    if not (u1:hasPower(3000 * Speed.Value) and u2:canHoldXMore(0.12)) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    State.Value = \"Pumping\";\n    local v8 = Pollution;\n    v8.Value = v8.Value + 0.3 * Speed.Value;\n    u1:removePower(3000 * Speed.Value);\n    u2:addItem(0.12 * Speed.Value, \"Crude Oil\");\nend;\n\nreturn v5;"
};
