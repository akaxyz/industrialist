export default {
  id: "Firework",
  category: "Decorations",
  cost: 2000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -1.608673095703125,
        x: -0.002197265625
      },
      gameOffset: {
        y: 1.76825749874115,
        x: -0.002197265625,
        z: -1.608673095703125
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: "local v1 = {};\nlocal u2 = require(game.ReplicatedStorage.Modules.ModelTweenUtils).new(script.Parent.Firework);\nlocal Firework = script.Parent.Firework;\nlocal State = script.Parent.State;\nlocal u3 = nil;\nlocal u4 = u2:GetPivot();\n\nfunction v1.localStart() -- Line: 11\n    -- upvalues: u3 (ref), u2 (copy)\n    u3 = u2:GetPivot() + Vector3.new(0, 400, 0);\nend;\n\nscript.Parent.Base.ProximityPrompt.Enabled = true;\n\nfunction v1.localUpdate() -- Line: 17\n    -- upvalues: State (copy), Firework (copy), u2 (copy), u3 (ref), u4 (copy)\n    if State.Value == \"1\" then\n        Firework.Trail.TrailParticles.GLOW.Enabled = true;\n        Firework.Trail.TrailParticles.fire.Enabled = true;\n        Firework.Trail.TrailParticles.smoke.Enabled = true;\n        Firework.Trail.TrailParticles.PointLight.Enabled = true;\n        Firework.Trail.TrailParticles.Attachment.Core.Enabled = true;\n        Firework.Trail.TrailParticles.Attachment.lens.Enabled = true;\n        script.Parent.Base[\"Flare Gun\"]:Play();\n        u2:newTween(TweenInfo.new(1.8, Enum.EasingStyle.Quad, Enum.EasingDirection.In), u3):Play();\n        task.wait(1.75);\n        Firework[\"Cylinder.003\"].Transparency = 1;\n        Firework.Trail.Transparency = 1;\n        Firework.Firework.Transparency = 1;\n        Firework.Trail.TrailParticles.GLOW.Enabled = false;\n        Firework.Trail.TrailParticles.fire.Enabled = false;\n        Firework.Trail.TrailParticles.smoke.Enabled = false;\n        Firework.Trail.TrailParticles.PointLight.Enabled = false;\n        Firework.Trail.TrailParticles.Attachment.Core.Enabled = false;\n        Firework.Trail.TrailParticles.Attachment.lens.Enabled = false;\n        local v5 = ColorSequence.new(BrickColor.Random().Color);\n        local v6 = ColorSequence.new(BrickColor.Random().Color);\n        script.Parent.Base.Explosion:Play();\n        Firework.Firework.Attachment.Core.Color = v5;\n        Firework.Firework.Attachment.primary.Color = v5;\n        Firework.Firework.Attachment.smoke.Color = v5;\n        Firework.Firework.Attachment.secondary.Color = v6;\n        Firework.Firework.Attachment.Core:Emit(3);\n        Firework.Firework.Attachment.lens:Emit(2);\n        Firework.Firework.Attachment.primary:Emit(50);\n        task.wait(0.3);\n        script.Parent.Base.Secondary:Play();\n        Firework.Firework.Attachment.secondary:Emit(50);\n        task.wait(4);\n        u2:PivotTo(u4);\n        Firework[\"Cylinder.003\"].Transparency = 0;\n        Firework.Trail.Transparency = 0;\n        Firework.Firework.Transparency = 0;\n    end;\nend;\n\nlocal u7 = tick() - 20;\n\nlocal function serverFire() -- Line: 74\n    -- upvalues: u7 (ref), State (copy)\n    if tick() - u7 > 6.5 then\n        u7 = tick();\n        State.Value = \"1\";\n    end;\nend;\n\nlocal u8 = require(game.ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.InMainConnector);\nscript.Parent.Base.ProximityPrompt.Triggered:Connect(function() -- Line: 83\n    -- upvalues: u7 (ref), State (copy)\n    if tick() - u7 > 6.5 then\n        u7 = tick();\n        State.Value = \"1\";\n    end;\nend);\n\nfunction v1.tick() -- Line: 88\n    -- upvalues: State (copy), u8 (copy), u7 (ref)\n    if State.Value == \"1\" then\n        State.Value = \"0\";\n    end;\n\n    if u8:hasPower(1) then\n        u8:removePower(1000);\n\n        if tick() - u7 > 6.5 then\n            u7 = tick();\n            State.Value = \"1\";\n        end;\n    end;\nend;\n\nreturn v1;"
};
