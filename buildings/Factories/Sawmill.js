export default {
  id: "Sawmill",
  category: "Factories",
  cost: 800,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: -2.0001220703125
    },
    width: 8
  },
  nodes: [
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: -1.652679443359375,
        x: -1.0155029296875
      },
      gameOffset: {
        y: 2.024991035461426,
        x: -1.0155029296875,
        z: -1.652679443359375
      }
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: 13.025619506835938,
        x: 1.7545166015625
      },
      gameOffset: {
        y: 2.024991035461426,
        x: 1.7545166015625,
        z: 13.025619506835938
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 60000,
      transferAmount: 0,
      siteOffset: {
        y: -0.0140380859375,
        x: -4.57177734375
      },
      gameOffset: {
        y: 3.7999048233032227,
        x: -4.57177734375,
        z: -0.0140380859375
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal v5 = {};\nlocal State = script.Parent.State;\n\nfunction v5.tick() -- Line: 16\n    -- upvalues: u1 (copy), u4 (copy), u3 (copy), u2 (copy), State (copy)\n    if u1:tickIsBusy() then\n        return;\n    end;\n\n    if not u4:hasPower(60000) then\n        return;\n    end;\n\n    if not u3:hasAmount(1) then\n        return;\n    end;\n\n    local u6, u7;\n\n    if u3:hasAmountOf(\"Oak Log\", 1) and u2:canHoldXMoreOf(\"Cut Oak Log\", 2) then\n        State.Value = \"1\";\n        u3:removeItem(1);\n        u6 = \"Cut Oak Log\";\n        u7 = 2;\n    elseif u3:hasAmountOf(\"Cut Oak Log\", 1) and u2:canHoldXMoreOf(\"Chunk Plank\", 1) then\n        State.Value = \"2\";\n        u3:removeItem(1);\n        u6 = \"Chunk Plank\";\n        u7 = 1;\n    elseif u3:hasAmountOf(\"Chunk Plank\", 1) and u2:canHoldXMoreOf(\"Planks\", 3) then\n        State.Value = \"3\";\n        u3:removeItem(1);\n        u6 = \"Planks\";\n        u7 = 3;\n    else\n        if not (u3:hasAmountOf(\"Iron Ingot\", 1) and u2:canHoldXMoreOf(\"Iron Plate\", 4)) then\n            return;\n        end;\n\n        State.Value = \"4\";\n        u3:removeItem(1);\n        u6 = \"Iron Plate\";\n        u7 = 4;\n    end;\n\n    u1:nextTicks(20, function(p8) -- Line: 47\n        -- upvalues: u4 (ref), State (ref), u2 (ref), u6 (ref), u7 (ref)\n        u4:removePower(3000);\n\n        if p8 == 6 then\n            State.Value = \"\";\n            u2:addItemAmount(u6, u7);\n        end;\n    end);\nend;\n\nreturn v5;"
};
