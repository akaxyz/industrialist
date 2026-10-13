export default {
  id: "GrinderMK2",
  category: "Factories",
  tier: 3,
  cost: 125000,
  base: {
    height: 30,
    offset: {
      y: 12.999992370605469,
      x: 18
    },
    width: 40
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 20000000,
      transferAmount: 0,
      siteOffset: {
        y: 13.000053405761719,
        x: 35.340576171875
      },
      gameOffset: {
        y: 19.53036117553711,
        x: 35.340576171875,
        z: 13.000053405761719
      }
    },
    {
      name: "MainPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 0.9999923706054688,
        x: -1.27362060546875
      },
      gameOffset: {
        y: 1.3250102996826172,
        x: -1.27362060546875,
        z: 0.9999923706054688
      }
    },
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 24.99999237060547,
        x: -1.27386474609375
      },
      gameOffset: {
        y: 1.3244819641113281,
        x: -1.27386474609375,
        z: 24.99999237060547
      },
      tip: "Output"
    },
    {
      name: "LiquidPipeIn",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 13.000053405761719,
        x: 37.97406005859375
      },
      gameOffset: {
        y: 2.170450210571289,
        x: 37.97406005859375,
        z: 13.000053405761719
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal State = script.Parent.State;\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipeIn);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.LiquidPipeIn);\nlocal u5 = { { { \"Treated Rock\", 40 }, { \"Distilled Water\", 60 }, { \"Impure Boron\", 2 } }, { { \"Raw Iron\", 40 }, nil, { \"Iron Powder\", 25.6 } }, { { \"Raw Copper\", 80 }, nil, { \"Copper Powder\", 42.56 } }, { { \"Gravel\", 80 }, nil, { \"Sand\", 100 } }, { { \"Bauxite Residue\", 80 }, nil, { \"Crushed Bauxite\", 60 } }, { { \"Alumina\", 40 }, nil, { \"Alumina Dust\", 40 } }, { { \"Soil\", 120 }, nil, { \"Gravel\", 120 } }, { { \"Rock\", 120 }, nil, { \"Gravel\", 120 } }, { { \"Shallow Earth Fragment\", 60 }, { \"Filtered Water\", 40 }, { \"Raw Iron\", 60 } }, { { \"Shallow Earth Fragment\", 60 }, nil, { \"Rock\", 60 } }, { { \"Rock\", 120 }, nil, { \"Gravel\", 120 } }, { { \"Medium Earth Fragment\", 30 }, { \"Machine Oil\", 20 }, { \"Shallow Earth Fragment\", 60 } }, { { \"Deep Earth Fragment\", 30 }, nil, { \"Treated Rock\", 60 } }, { { \"Treated Rock\", 60 }, nil, { \"Rich Soil\", 60 } } };\nlocal v6 = {};\nlocal u7 = require(game.ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v6.tick() -- Line: 95\n    -- upvalues: u7 (copy), u3 (copy), State (copy), u5 (copy), u1 (copy), u4 (copy), u2 (copy)\n    if u7:tickIsBusy() then\n        return;\n    end;\n\n    if not u3:hasPower(20000000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    for _, v in pairs(u5) do\n        if u1:hasAmountOf(v[1][1], v[1][2]) and (v[2] == nil or u4:hasAmountOf(v[2][1], v[2][2])) and u2:canHoldXMoreOf(v[3][1], v[3][2]) then\n            u1:removeItem(v[1][2]);\n\n            if v[2] ~= nil then\n                u4:removeItem(v[2][2]);\n            end;\n\n            State.Value = tick();\n            u7:nextTicks(16, function(p8) -- Line: 111\n                -- upvalues: u3 (ref), u2 (ref), v (copy)\n                u3:removePower(1250000);\n\n                if p8 == 1 then\n                    u2:addItemAmount(v[3][1], v[3][2]);\n                end;\n            end);\n\n            return;\n        end;\n    end;\n\n    State.Value = \"\";\nend;\n\nreturn v6;"
};
