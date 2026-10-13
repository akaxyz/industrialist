export default {
  id: "CrudeOilSeparator",
  category: "Factories",
  tier: 2,
  cost: 1500,
  base: {
    height: 20,
    offset: {
      y: -8,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "DieselMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -17.949996948242188,
        x: 1
      },
      gameOffset: {
        y: 2.1249961853027344,
        x: 1,
        z: -17.949996948242188
      },
      tip: "Outputs diesel after processing"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: 1.8500213623046875,
        x: -0.199951171875
      },
      gameOffset: {
        y: 2.72499418258667,
        x: -0.199951171875,
        z: 1.8500213623046875
      }
    },
    {
      name: "GasolineMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -17.949996948242188,
        x: 3
      },
      gameOffset: {
        y: 2.1249961853027344,
        x: 3,
        z: -17.949996948242188
      },
      tip: "Outputs gasoline after processing"
    },
    {
      name: "ResidueMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -17.949996948242188,
        x: 13
      },
      gameOffset: {
        y: 2.1249961853027344,
        x: 13,
        z: -17.949996948242188
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
        y: 1.8500213623046875,
        x: 1
      },
      gameOffset: {
        y: 2.72499418258667,
        x: 1,
        z: 1.8500213623046875
      },
      tip: "Input only hot crude oil (heat crude oil via Liquid Boiler)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.DieselMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.GasolineMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.ResidueMainPipe);\nlocal _ = Items.HotCrudeOil;\nlocal _ = Items.CrudeOil;\nlocal _ = Items.CrudeDiesel;\nlocal _ = Items.Gasoline;\nlocal _ = Items.Residue;\nlocal v6 = {};\nlocal State = script.Parent.State;\n\nfunction v6.localUpdate() -- Line: 30\n    -- upvalues: State (copy)\n    if State.Value == \"Running\" then\n        script.Parent.Base.Generator:Play();\n        script.Parent.SmokeStack1.ParticleEmitter.Enabled = true;\n        script.Parent.SmokeStack2.ParticleEmitter.Enabled = true;\n        script.Parent.SmokeStack3.ParticleEmitter.Enabled = true;\n\n        return;\n    end;\n\n    script.Parent.Base.Generator:Stop();\n    script.Parent.SmokeStack1.ParticleEmitter.Enabled = false;\n    script.Parent.SmokeStack2.ParticleEmitter.Enabled = false;\n    script.Parent.SmokeStack3.ParticleEmitter.Enabled = false;\nend;\n\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nfunction v6.tick() -- Line: 47\n    -- upvalues: u2 (copy), State (copy), u1 (copy), u3 (copy), u4 (copy), u5 (copy), Pollution (copy)\n    if not u2:hasPower(2200) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u1:hasAmountOf(\"Hot Crude Oil\", 1.5) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u3:canHoldXMore(0.675) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u4:canHoldXMore(0.3) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u5:canHoldXMore(0.3) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u1:removeItem(1.5);\n    u3:addItemAmount(\"Crude Diesel\", 0.675);\n    u4:addItemAmount(\"Gasoline\", 0.3);\n    u5:addItemAmount(\"Residue\", 0.3);\n    local v7 = Pollution;\n    v7.Value = v7.Value + 60;\n    u2:removePower(2200);\n    State.Value = \"Running\";\nend;\n\nreturn v6;"
};
