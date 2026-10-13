export default {
  id: "DieselRefinery",
  category: "Factories",
  tier: 2,
  cost: 1000,
  base: {
    height: 24,
    offset: {
      y: -10,
      x: -8
    },
    width: 20
  },
  nodes: [
    {
      name: "DieselMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -1,
        x: 2.04998779296875
      },
      gameOffset: {
        y: 2.324993133544922,
        x: 2.04998779296875,
        z: -1
      },
      tip: "Outputs diesel of higher grade"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: -4.0999908447265625,
        x: 2.04998779296875
      },
      gameOffset: {
        y: 5.109013080596924,
        x: 2.04998779296875,
        z: -4.0999908447265625
      }
    },
    {
      name: "ResidueMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1,
        x: 2.04998779296875
      },
      gameOffset: {
        y: 2.324993133544922,
        x: 2.04998779296875,
        z: 1
      },
      tip: "Outputs residue. Since residue isn't used anywhere its highly recommended to store it"
    },
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 2.0500030517578125,
        x: 1
      },
      gameOffset: {
        y: 2.3249940872192383,
        x: 1,
        z: 2.0500030517578125
      },
      tip: "Refines any type of diesel into a better form of diesel (can be done until Refined Diesel)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.DieselMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.ResidueMainPipe);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal v5 = {};\nlocal State = script.Parent.State;\nlocal u6 = tick();\n\nfunction v5.localUpdate() -- Line: 23\n    -- upvalues: State (copy), u6 (ref)\n    if State.Value == \"Running\" then\n        script.Parent.SmokeStack.ParticleEmitter.Enabled = true;\n        script.Parent.Base.Generator:Play();\n        local v7 = tick();\n        u6 = v7;\n\n        while wait() and u6 == v7 do\n            local Mixer = script.Parent.Model.Mixer;\n            Mixer.Orientation = Mixer.Orientation + Vector3.new(0, 1, 0);\n        end;\n    else\n        script.Parent.SmokeStack.ParticleEmitter.Enabled = false;\n        script.Parent.Base.Generator:Stop();\n        u6 = tick();\n    end;\nend;\n\nlocal Diesel = script.Parent.Model.Diesel;\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nfunction v5.tick() -- Line: 44\n    -- upvalues: u2 (copy), State (copy), u4 (copy), u1 (copy), u3 (copy), Diesel (copy), Achievements (copy), Pollution (copy)\n    if not u2:hasPower(1000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u4:canHoldXMoreOf(\"Residue\", 0.04) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if u1:hasAmountOf(\"Crude Diesel\", 0.45) and u3:canHoldXMoreOf(\"Poor Quality Diesel\", 0.41) then\n        u1:removeItem(0.45);\n        u3:addItemAmount(\"Poor Quality Diesel\", 0.41);\n        u4:addItemAmount(\"Residue\", 0.04);\n        Diesel.Color = Color3.fromRGB(107, 95, 73);\n    elseif u1:hasAmountOf(\"Poor Quality Diesel\", 0.41) and u3:canHoldXMoreOf(\"Diesel\", 0.37) then\n        u1:removeItem(0.41);\n        u3:addItemAmount(\"Diesel\", 0.37);\n        u4:addItemAmount(\"Residue\", 0.04);\n        Diesel.Color = Color3.fromRGB(188, 155, 93);\n    elseif u1:hasAmountOf(\"Diesel\", 0.37) and u3:canHoldXMoreOf(\"Refined Diesel\", 0.34) then\n        u1:removeItem(0.37);\n        u3:addItemAmount(\"Refined Diesel\", 0.34);\n        u4:addItemAmount(\"Residue\", 0.03);\n        Diesel.Color = Color3.fromRGB(204, 181, 136);\n    else\n        if not (u1:hasAmountOf(\"Refined Diesel\", 0.34) and u3:canHoldXMoreOf(\"Gasoline\", 0.31)) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        u1:removeItem(0.34);\n        u3:addItemAmount(\"Gasoline\", 0.31);\n        u4:addItemAmount(\"Residue\", 0.03);\n        Achievements.giveBadge(2151444753);\n        Diesel.Color = Color3.fromRGB(204, 181, 136);\n    end;\n\n    u2:removePower(1000);\n    State.Value = \"Running\";\n    local v8 = Pollution;\n    v8.Value = v8.Value + 30;\nend;\n\nreturn v5;"
};
