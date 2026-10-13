export default {
  id: "IndustrialKiln",
  category: "Factories",
  tier: 2,
  cost: 7500,
  base: {
    height: 20,
    offset: {
      y: -8,
      x: 18
    },
    width: 40
  },
  nodes: [
    {
      name: "InItemMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.4434814453125,
        x: 23.0040283203125
      },
      gameOffset: {
        y: 1.3152031898498535,
        x: 23.0040283203125,
        z: 1.4434814453125
      }
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.4206619262695312,
        x: 12.9979248046875
      },
      gameOffset: {
        y: 1.311098575592041,
        x: 12.9979248046875,
        z: 1.4206619262695312
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 325000,
      transferAmount: 0,
      siteOffset: {
        y: -15.3504638671875,
        x: 17.2705078125
      },
      gameOffset: {
        y: 7.165677070617676,
        x: 17.2705078125,
        z: -15.3504638671875
      }
    },
    {
      name: "FuelMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -17.62994384765625,
        x: 30.990692138671875
      },
      gameOffset: {
        y: 1.3573479652404785,
        x: 30.990692138671875,
        z: -17.62994384765625
      },
      tip: "Input for fuel"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.FuelMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.InItemMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v6 = {};\nlocal u7 = { { { \"Coal\", 6.64 }, { \"Iron Powder\", 6.4 }, { \"Iron Mix\", 12.8, 1 } }, { { \"Coal\", 13.28 }, { \"Copper Powder\", 10.64 }, { \"Copper Mix\", 21.28, 2 } }, { { \"Coke Fuel\", 16 }, { \"Crushed Bauxite\", 16 }, { \"Alumina Dust\", 22.799999999999997, 1 } }, { { \"Coal\", 16 }, { \"Rock\", 16 }, { \"Iron Mix\", 16, 1 } }, { { \"Coal\", 20 }, { \"Rawmix\", 30 }, { \"Cement\", 20, 3 } }, { { \"Coke Fuel\", 10 }, { \"Rawmix\", 30 }, { \"Cement\", 20, 3 } }, { { \"Coke Fuel\", 8 }, { \"Rock\", 16 }, { \"Iron Mix\", 24, 1 } }, { { \"Coke Fuel\", 4 }, { \"Iron Powder\", 19.2 }, { \"Iron Mix\", 51.2, 1 } }, { { \"Coke Fuel\", 4 }, { \"Copper Powder\", 31.92 }, { \"Copper Mix\", 85.12, 2 } } };\n\nfunction v6.tick() -- Line: 74\n    -- upvalues: u1 (copy), u2 (copy), State (copy), u7 (copy), u3 (copy), u4 (copy), u5 (copy), Pollution (copy)\n    if u1:tickIsBusy() then\n        return;\n    end;\n\n    if not u2:hasPower(300000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    for _, v in pairs(u7) do\n        if u3:hasAmountOf(v[1][1], v[1][2]) and (u4:hasAmountOf(v[2][1], v[2][2]) and u5:canHoldXMoreOf(v[3][1], v[3][2])) then\n            u4:removeItem(v[2][2]);\n            State.Value = v[3][3];\n            u1:nextTicks(20, function(p8) -- Line: 87\n                -- upvalues: u5 (ref), v (copy), State (ref), u2 (ref), u3 (ref), Pollution (ref)\n                if p8 == 1 then\n                    u5:setUsedTemperature(300);\n                    u5:addItemAmount(v[3][1], v[3][2]);\n                    State.Value = \"0\";\n                end;\n\n                u2:removePower(15000);\n                u3:removeItem(v[1][2] / 20);\n                local v9 = Pollution;\n                v9.Value = v9.Value + 120;\n            end);\n\n            return;\n        end;\n    end;\n\n    State.Value = \"\";\nend;\n\nreturn v6;"
};
