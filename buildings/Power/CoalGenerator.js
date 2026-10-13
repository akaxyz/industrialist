export default {
  id: "CoalGenerator",
  category: "Power",
  cost: 160,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "FluidOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 2,
      siteOffset: {
        y: -5.6815185546875,
        x: -4.009552001953125
      },
      gameOffset: {
        y: 1.7379088401794434,
        x: -4.009552001953125,
        z: -5.6815185546875
      },
      tip: "Outputs steam. Use a steam turbine to turn extra steam into power"
    },
    {
      name: "CoalInMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 2,
      siteOffset: {
        y: 1.64251708984375,
        x: -0.003692626953125
      },
      gameOffset: {
        y: 2.0249974727630615,
        x: -0.003692626953125,
        z: 1.64251708984375
      },
      tip: "Input for COAL"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 7000,
      transferAmount: 1500,
      siteOffset: {
        y: -5.69775390625,
        x: -0.98992919921875
      },
      gameOffset: {
        y: 5.466335296630859,
        x: -0.98992919921875,
        z: -5.69775390625
      }
    },
    {
      name: "FluidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 6,
      transferAmount: 2,
      siteOffset: {
        y: 1.82269287109375,
        x: -4
      },
      gameOffset: {
        y: 1.346066951751709,
        x: -4,
        z: 1.82269287109375
      },
      tip: "Input for WATER"
    }
  ],
  data: {
    Speed: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.CoalInMainPipe, false);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.FluidInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.FluidOutMainPipe);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v5 = {};\nlocal Speed = script.Parent.ModelData.Speed;\n\nfunction v5.tick() -- Line: 19\n    -- upvalues: u1 (copy), u2 (copy), Pollution (copy), State (copy), Speed (copy), u4 (copy), u3 (copy)\n    if u1:hasAmountOf(\"Coal\", 0.25) and u2:hasAmountOf(\"Water\", 1.45) then\n        u2:removeItem(1.45);\n        u1:removeItem(0.25);\n        local v6 = Pollution;\n        v6.Value = v6.Value + 37.5;\n\n        if State.Value == \"\" then\n            State.Value = math.random(1, 55);\n        end;\n\n        if Speed.Value == 0 then\n            Speed.Value = 0.1;\n        else\n            Speed.Value = math.clamp(Speed.Value + 0.1, 0, 7);\n        end;\n    elseif Speed.Value > 0 then\n        State.Value = \"\";\n        Speed.Value = math.clamp(Speed.Value - 0.5, 0, 7);\n    end;\n\n    if Speed.Value > 0 then\n        local v7 = Speed.Value / 7;\n        u4:addPower(7000 * v7);\n        u3:setUsedTemperature(150);\n        u3:addItem(3 * v7, \"Steam\");\n    end;\nend;\n\nreturn v5;"
};
