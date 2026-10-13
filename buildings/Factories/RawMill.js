export default {
  id: "RawMill",
  category: "Factories",
  tier: 2,
  cost: 1250,
  base: {
    height: 26,
    offset: {
      y: -11,
      x: 4.999755859375
    },
    width: 18
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 75000,
      transferAmount: 0,
      siteOffset: {
        y: -22.942413330078125,
        x: -1.2738037109375
      },
      gameOffset: {
        y: 11.584066390991211,
        x: -1.2738037109375,
        z: -22.942413330078125
      }
    },
    {
      name: "InItem2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 1.1800537109375,
        x: -1.00244140625
      },
      gameOffset: {
        y: 1.472287654876709,
        x: -1.00244140625,
        z: 1.1800537109375
      },
      tip: "Input for Clay"
    },
    {
      name: "InItem3MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 1.1800537109375,
        x: 0.99755859375
      },
      gameOffset: {
        y: 1.472287654876709,
        x: 0.99755859375,
        z: 1.1800537109375
      },
      tip: "Input for Limestone"
    },
    {
      name: "Out1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: -22.93817138671875,
        x: 13
      },
      gameOffset: {
        y: 1.4168424606323242,
        x: 13,
        z: -22.93817138671875
      },
      tip: "Aggregate output"
    },
    {
      name: "InItem1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 1.1800537109375,
        x: -3.0020751953125
      },
      gameOffset: {
        y: 1.4721221923828125,
        x: -3.0020751953125,
        z: 1.1800537109375
      },
      tip: "Input for Gravel"
    },
    {
      name: "Out2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: -23,
        x: 11
      },
      gameOffset: {
        y: 1.4168548583984375,
        x: 11,
        z: -23
      },
      tip: "Rawmix output"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InItem1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.InItem2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.InItem3MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal State = script.Parent.State;\n\nreturn {\n    tick = function() -- Line: 22, Name: tick\n        -- upvalues: u1 (copy), u2 (copy), State (copy), u3 (copy), u4 (copy), u5 (copy), u7 (copy), u6 (copy)\n        if u1:tickIsBusy() then\n            return;\n        end;\n\n        if not u2:hasPower(50000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        local u8 = nil;\n\n        if u3:hasAmountOf(\"Gravel\", 20) and (u4:hasAmountOf(\"Clay\", 20) and u5:hasAmountOf(\"Limestone\", 20)) then\n            u3:removeItem(20);\n            u4:removeItem(20);\n            u5:removeItem(20);\n            u8 = 1;\n        elseif u5:hasAmountOf(\"Limestone\", 30) and u4:hasAmountOf(\"Clay\", 30) then\n            u5:removeItem(30);\n            u4:removeItem(30);\n            u8 = 2;\n        elseif u3:hasAmountOf(\"Gravel\", 30) then\n            u3:removeItem(30);\n            u8 = 3;\n        end;\n\n        if u8 == nil then\n            State.Value = \"\";\n        else\n            u2:removePower(50000);\n            State.Value = u8;\n            u1:nextTicks(20, function(p9) -- Line: 51\n                -- upvalues: u8 (ref), u7 (ref), u6 (ref)\n                if p9 == 1 then\n                    if u8 == 1 then\n                        u7:addItemAmount(\"Rawmix\", 20);\n                        u6:addItemAmount(\"Aggregate\", 20);\n\n                        return;\n                    end;\n\n                    if u8 == 2 then\n                        u7:addItemAmount(\"Rawmix\", 20);\n\n                        return;\n                    end;\n\n                    if u8 == 3 then\n                        u6:addItemAmount(\"Aggregate\", 20);\n                    end;\n                end;\n            end);\n        end;\n    end\n};"
};
