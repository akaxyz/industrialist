export default {
  id: "Beacon",
  category: "Modular",
  cost: 100000,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: -6
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
        y: 3.50048828125,
        x: -12.499542236328125
      },
      gameOffset: {
        y: 11.549755096435547,
        x: -12.499542236328125,
        z: 3.50048828125
      }
    },
    {
      name: "InLiquidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1.15875244140625,
        x: -1.0400390625
      },
      gameOffset: {
        y: 1.1886754035949707,
        x: -1.0400390625,
        z: -1.15875244140625
      },
      tip: "Input for ..."
    },
    {
      name: "InItemMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1.15875244140625,
        x: -3.000030517578125
      },
      gameOffset: {
        y: 1.1886754035949707,
        x: -3.000030517578125,
        z: -1.15875244140625
      },
      tip: "Input for ..."
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local v1 = {};\nrequire(game.ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(game.ReplicatedStorage.Modules.PipeUtilsV2);\nlocal MachinesInRange = script.Parent.MachinesInRange;\nlocal u2 = {};\n\nlocal function apply() -- Line: 9\n    -- upvalues: MachinesInRange (copy), u2 (copy)\n    for _, child in pairs(MachinesInRange:GetChildren()) do\n        local Value = child.Value;\n\n        if Value.Parent == nil then\n            child:Destroy();\n        elseif not table.find(u2, Value) then\n            table.insert(u2, Value);\n            local Speed = Value.Upgrades.Speed;\n            Speed.Value = Speed.Value + 2;\n        end;\n    end;\nend;\n\nlocal function unapply() -- Line: 22\n    -- upvalues: MachinesInRange (copy), u2 (copy)\n    for _, child in pairs(MachinesInRange:GetChildren()) do\n        local Value = child.Value;\n\n        if Value.Parent == nil then\n            child:Destroy();\n        elseif table.find(u2, Value) then\n            local Speed = Value.Upgrades.Speed;\n            Speed.Value = Speed.Value - 2;\n        end;\n    end;\n\n    table.clear(u2);\nend;\n\nfunction v1.tick() -- Line: 35\n    -- upvalues: apply (copy)\n    apply();\nend;\n\nfunction v1.deleted() -- Line: 39\n    -- upvalues: unapply (copy)\n    unapply();\nend;\n\nreturn v1;"
};
