export default {
  id: "CatAssembler",
  category: "Factories",
  tier: 4,
  cost: 16180339,
  base: {
    height: 10,
    offset: {
      y: -3,
      x: 3
    },
    width: 10
  },
  nodes: [
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 30,
      transferAmount: 20,
      siteOffset: {
        y: 1.506134033203125,
        x: 2.93402099609375
      },
      gameOffset: {
        y: 1.5406112670898438,
        x: 2.93402099609375,
        z: 1.506134033203125
      },
      tip: "Sulfur"
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 1.625030517578125,
        x: 7
      },
      gameOffset: {
        y: 1.3749942779541016,
        x: 7,
        z: 1.625030517578125
      }
    },
    {
      name: "FluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 1,
      siteOffset: {
        y: 1.59185791015625,
        x: -1.01177978515625
      },
      gameOffset: {
        y: 1.6304931640625,
        x: -1.01177978515625,
        z: 1.59185791015625
      },
      tip: "Gasoline"
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 20,
      siteOffset: {
        y: 1.3360595703125,
        x: 0.9840087890625
      },
      gameOffset: {
        y: 1.5406112670898438,
        x: 0.9840087890625,
        z: 1.3360595703125
      },
      tip: "Electric Motor"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.FluidMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u5 = require(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal State = script.Parent.State;\nlocal u6 = false;\n\nreturn {\n    localUpdate = function() -- Line: 19, Name: localUpdate\n        -- upvalues: State (copy)\n        while State.Value == \"CAT\" and task.wait(0.041666666666666664) do\n            script.Parent.maxwell.CFrame = script.Parent.maxwell.CFrame * CFrame.Angles(0.08726646259971647, 0, 0);\n        end;\n    end,\n\n    tick = function() -- Line: 29, Name: tick\n        -- upvalues: u5 (copy), u1 (copy), u2 (copy), State (copy), u3 (copy), u6 (ref), u4 (copy)\n        if not u5:tickIsFree() then\n            return;\n        end;\n\n        if u1:hasAmountOf(\"Electric Motor\", 4) then\n            if not u2:hasAmountOf(\"Sulfur\", 15) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u3:hasAmountOf(\"Gasoline\", 31) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u6 = false;\n        else\n            if not u1:hasAmountOf(\"Dynamite\", 5) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u2:hasAmountOf(\"Cat\", 5) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u6 = true;\n        end;\n\n        State.Value = \"CAT\";\n\n        if u6 then\n            u1:removeItem(5);\n            u2:removeItem(5);\n        else\n            u1:removeItem(4);\n            u2:removeItem(15);\n            u3:removeItem(31);\n        end;\n\n        u5:nextTicks(92, function(p7) -- Line: 51\n            -- upvalues: u4 (ref), u6 (ref)\n            if p7 == 1 then\n                u4:setUsedTemperature(13.011197054679151);\n\n                if u6 then\n                    return;\n                end;\n\n                u4:addItemAmount(\"Cat\", 1);\n            end;\n        end);\n    end\n};"
};
