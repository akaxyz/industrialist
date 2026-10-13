export default {
  id: "Trommel",
  category: "Factories",
  tier: 3,
  cost: 1000000,
  base: {
    height: 24,
    offset: {
      y: 10,
      x: 4
    },
    width: 12
  },
  nodes: [
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 100,
      transferAmount: 1,
      siteOffset: {
        y: -1.4913339614868164,
        x: 1.00848388671875
      },
      gameOffset: {
        y: 1.579000473022461,
        x: 1.00848388671875,
        z: -1.4913339614868164
      },
      tip: "Input for Soil/Medium Earth Fragment/Deep Earth Fragment/Treated Rock"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 600000,
      transferAmount: 0,
      siteOffset: {
        y: 10.750731468200684,
        x: 9.827178955078125
      },
      gameOffset: {
        y: 2.3717403411865234,
        x: 9.827178955078125,
        z: 10.750731468200684
      }
    },
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: 21.25830078125,
        x: 5.01885986328125
      },
      gameOffset: {
        y: 1.6278533935546875,
        x: 5.01885986328125,
        z: 21.25830078125
      },
      tip: "Outputs Rich Soil/Shallow Earth Fragment/10 Karat Gold"
    },
    {
      name: "OutputMainPipe2",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: 9.0126953125,
        x: -1.40228271484375
      },
      gameOffset: {
        y: 1.702291488647461,
        x: -1.40228271484375,
        z: 9.0126953125
      },
      tip: "Outputs gravel/Table Salt/Powdered Tungsten/Raw Lead"
    },
    {
      name: "OutputMainPipe3",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: 11.022704124450684,
        x: -1.40228271484375
      },
      gameOffset: {
        y: 1.702291488647461,
        x: -1.40228271484375,
        z: 11.022704124450684
      },
      tip: "Outputs sand/Rock/Bauxite Residue"
    },
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 100,
      transferAmount: 1,
      siteOffset: {
        y: -1.4913339614868164,
        x: -1.011474609375
      },
      gameOffset: {
        y: 1.4690017700195312,
        x: -1.011474609375,
        z: -1.4913339614868164
      },
      tip: "Input for Water/Hydrochloric Acid"
    },
    {
      name: "OutputMainPipe1",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: 7.002684593200684,
        x: -1.40228271484375
      },
      gameOffset: {
        y: 1.702291488647461,
        x: -1.40228271484375,
        z: 7.002684593200684
      },
      tip: "Outputs Bauxite Residue/Raw Iron/18 Karat Gold/Rich Soil/Coal"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal TweenService = game:GetService(\"TweenService\");\nlocal State = script.Parent.State;\nlocal Elevator = script.Parent.Elevator;\nlocal u1 = ModelTweenUtils.new(Elevator);\nlocal u2 = Elevator.Hinge.Position - Elevator.Box.Position;\nlocal u3 = Elevator.Hinge.Orientation - Elevator.Box.Orientation;\nlocal CFrame2 = Elevator.Hinge.CFrame;\nlocal Spin = script.Parent.Spin;\nlocal Particles = script.Parent.Particles;\nlocal ParticlesTwo = script.Parent.ParticlesTwo;\nrunning = false;\n\nlocal function decorOn() -- Line: 23\n    -- upvalues: u1 (copy), CFrame2 (copy), Elevator (copy), u2 (copy), u3 (copy), Spin (copy), TweenService (copy), Particles (copy), ParticlesTwo (copy)\n    if running ~= false then\n        Spin.netwithparticles[\"1\"].Beam.Enabled = false;\n        Spin.netwithparticles[\"2\"].Beam.Enabled = false;\n        Spin.netwithparticles[\"3\"].Beam.Enabled = false;\n        Spin.netwithparticles[\"4\"].Beam.Enabled = false;\n        Particles.debri.Enabled = false;\n        ParticlesTwo.Attachment.debri.Enabled = false;\n        script.Parent.Base.RockSound1:Stop();\n        script.Parent.Base[\"Runing motor\"]:Stop();\n\n        return;\n    end;\n\n    running = true;\n    u1:PivotTo(CFrame2);\n    Elevator.Box.Position = Elevator.Hinge.Position - u2;\n    Elevator.Box.Orientation = Elevator.Hinge.Orientation - u3;\n    Elevator.Box.Transparency = 0;\n    u1:newTween(TweenInfo.new(4), Elevator:GetPivot() + Vector3.new(0, 6.9, 0)):Play();\n    task.wait(4);\n    task.spawn(function() -- Line: 37\n        -- upvalues: Spin (ref)\n        while running and task.wait() do\n            Spin:PivotTo(Spin:GetPivot() * CFrame.Angles(0, 0, -0.06981317007977318));\n        end;\n    end);\n    script.Parent.Base.RockSound1:Play();\n    script.Parent.Base[\"Runing motor\"]:Play();\n    TweenService:Create(Elevator.Box, TweenInfo.new(0.2, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n        CFrame = script.Parent.Particles.CFrame,\n        Transparency = 1\n    }):Play();\n    u1:newTween(TweenInfo.new(0.2), Elevator:GetPivot() * CFrame.Angles(1.5707963267948966, 0, 0)):Play();\n    task.wait(0.4);\n    Spin.netwithparticles[\"1\"].Beam.Enabled = true;\n    Spin.netwithparticles[\"2\"].Beam.Enabled = true;\n    Spin.netwithparticles[\"3\"].Beam.Enabled = true;\n    Spin.netwithparticles[\"4\"].Beam.Enabled = true;\n    Particles.debri.Enabled = true;\n    u1:newTween(TweenInfo.new(0.2), Elevator:GetPivot() * CFrame.Angles(-1.5707963267948966, 0, 0)):Play();\n    task.wait(0.2);\n    ParticlesTwo.Attachment.debri.Enabled = true;\n    u1:newTween(TweenInfo.new(4), CFrame2):Play();\n    task.wait(23);\n    Spin.netwithparticles[\"1\"].Beam.Enabled = false;\n    Spin.netwithparticles[\"2\"].Beam.Enabled = false;\n    Spin.netwithparticles[\"3\"].Beam.Enabled = false;\n    Spin.netwithparticles[\"4\"].Beam.Enabled = false;\n    Particles.debri.Enabled = false;\n    ParticlesTwo.Attachment.debri.Enabled = false;\n    script.Parent.Base.RockSound1:Stop();\n    script.Parent.Base[\"Runing motor\"]:Stop();\n    running = false;\nend;\n\nlocal u4 = { { { \"Water\", 80 }, { \"Soil\", 40 }, { \"Rich Soil\", 16 }, { \"Bauxite Residue\", 8 }, { \"Gravel\", 4 }, { \"Sand\", 4 } }, { { \"Water\", 28 }, { \"Medium Earth Fragment\", 28 }, { \"Shallow Earth Fragment\", 14 }, { \"Raw Iron\", 14 }, { \"Table Salt\", 7 }, { \"Rock\", 7 } }, { { \"Hydrochloric Acid\", 5.6 }, { \"Deep Earth Fragment\", 28 }, { \"\", 0 }, { \"18 Karat Gold\", 11.2 }, { \"\", 0 }, { \"Bauxite Residue\", 10 } }, { { \"Filtered Water\", 21 }, { \"Deep Earth Fragment\", 9.3 }, { \"\", 0 }, { \"Coal\", 7 }, { \"Powdered Tungsten\", 9.3 }, { \"\", 0 } }, { { \"Water\", 28 }, { \"Treated Rock\", 14 }, { \"10 Karat Gold\", 7 }, { \"Rich Soil\", 14 }, { \"Raw Lead\", 7 }, { \"Bauxite Residue\", 14 } } };\nlocal v5 = {\n    localUpdate = function() -- Line: 141, Name: localUpdate\n        -- upvalues: State (copy), decorOn (copy)\n        if State.Value == \"Run\" then\n            decorOn();\n\n            return;\n        end;\n\n        if State.Value == \"-\" then\n            decorOn();\n        end;\n    end\n};\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u8 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nlocal u9 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe1);\nlocal u10 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe2);\nlocal u11 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe3);\nlocal u12 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u13 = require(game.ReplicatedStorage.Modules.NextTicks).new();\nlocal Achievements = require(ReplicatedStorage.Modules.Achievements);\n\nfunction v5.tick() -- Line: 163\n    -- upvalues: u13 (copy), u12 (copy), u4 (copy), u6 (copy), u7 (copy), u8 (copy), u9 (copy), u10 (copy), u11 (copy), State (copy), Achievements (copy)\n    if u13:tickIsBusy() then\n        return;\n    end;\n\n    if not u12:hasPower(500000) then\n        return;\n    end;\n\n    for _, v in u4 do\n        if u6:hasAmountOf(v[1][1], v[1][2]) and (u7:hasAmountOf(v[2][1], v[2][2]) and (u8:canHoldXMoreOf(v[3][1], v[3][2]) and (u9:canHoldXMoreOf(v[4][1], v[4][2]) and (u10:canHoldXMoreOf(v[5][1], v[5][2]) and u11:canHoldXMoreOf(v[6][1], v[6][2]))))) then\n            u6:removeItem(v[1][2]);\n            u7:removeItem(v[2][2]);\n            u13:nextTicks(28, function(p14) -- Line: 179\n                -- upvalues: State (ref), u12 (ref), u8 (ref), v (copy), u9 (ref), u10 (ref), u11 (ref), Achievements (ref)\n                State.Value = \"Run\";\n                u12:removePower(17857.14285714286);\n\n                if p14 == 1 then\n                    State.Value = \"-\";\n                    u8:addItemAmount(v[3][1], v[3][2]);\n                    u9:addItemAmount(v[4][1], v[4][2]);\n                    u10:addItemAmount(v[5][1], v[5][2]);\n                    u11:addItemAmount(v[6][1], v[6][2]);\n\n                    if v[5][1] == \"Powdered Tungsten\" then\n                        Achievements.giveBadge(1626911033381885);\n                    end;\n                end;\n            end);\n\n            return;\n        end;\n    end;\nend;\n\nreturn v5;"
};
