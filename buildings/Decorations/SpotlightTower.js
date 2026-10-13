export default {
  id: "SpotlightTower",
  category: "Decorations",
  cost: 40000,
  base: {
    height: 20,
    offset: {
      y: 0,
      x: 0
    },
    width: 20
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 60000,
      transferAmount: 0,
      siteOffset: {
        y: -0.0284423828125,
        x: -6.083404541015625
      },
      gameOffset: {
        y: 10.744239807128906,
        x: -6.083404541015625,
        z: -0.0284423828125
      }
    }
  ],
  data: {
    Pitch: 0,
    Yaw: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal _ = script.Parent.State;\nlocal v2 = {};\nlocal Seat = script.Parent.SpotlightBase.Seat;\nlocal ModelData = script.Parent.ModelData;\nlocal Yaw = ModelData.Yaw;\nlocal Pitch = ModelData.Pitch;\nscript.ControlBeam.OnServerEvent:Connect(function(p3, p4, p5) -- Line: 16\n    -- upvalues: Seat (copy), Pitch (copy), Yaw (copy)\n    if Seat.Occupant ~= p3.Character.Humanoid then\n        return;\n    end;\n\n    Pitch.Value = math.clamp(Pitch.Value + p5, -45, 45);\n    local v6 = Yaw;\n    v6.Value = v6.Value + p4;\n\n    if Yaw.Value >= 360 then\n        local v7 = Yaw;\n        v7.Value = v7.Value - 360;\n    end;\n\n    if Yaw.Value < 0 then\n        local v8 = Yaw;\n        v8.Value = v8.Value + 360;\n    end;\nend);\nlocal _ = script.HasPower;\n\nfunction v2.tick() -- Line: 33\n    -- upvalues: u1 (copy)\n    if u1:hasPower(60000) then\n        u1:removePower(60000);\n\n        if not script.HasPower.Value then\n            script.HasPower.Value = true;\n        end;\n    elseif script.HasPower.Value then\n        script.HasPower.Value = false;\n    end;\nend;\n\nreturn v2;"
};
