export default {
  id: "Kiln",
  category: "Factories",
  tier: 2,
  cost: 3200,
  base: {
    height: 28,
    offset: {
      y: 0.00006103515625,
      x: 12
    },
    width: 16
  },
  nodes: [
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 5.02154541015625,
        x: -1.6741943359375
      },
      gameOffset: {
        y: 1.6690881252288818,
        x: -1.6741943359375,
        z: 5.02154541015625
      }
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: -0.97515869140625,
        x: -1.7723388671875
      },
      gameOffset: {
        y: 1.6687390804290771,
        x: -1.7723388671875,
        z: -0.97515869140625
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 700000,
      transferAmount: 0,
      siteOffset: {
        y: -7.17938232421875,
        x: 14.984619140625
      },
      gameOffset: {
        y: 3.8506126403808594,
        x: 14.984619140625,
        z: -7.17938232421875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v5 = {};\nlocal u6 = 0;\n\nfunction v5.tick() -- Line: 20\n    -- upvalues: u1 (copy), u6 (ref), u2 (copy), State (copy), u3 (copy), u4 (copy), Pollution (copy)\n    if u1:tickIsBusy() then\n        return;\n    end;\n\n    u6 = math.clamp(u6 - 1, 0, 100);\n    local v7 = (1 - u6 / 300) * 600000;\n\n    if not u2:hasPower(v7) then\n        State.Value = \"0\";\n\n        return;\n    end;\n\n    if not (u3:hasAmountOf(\"Clay Brick\", 30) and u4:canHoldXMoreOf(\"Brick\", 30)) then\n        State.Value = \"0\";\n\n        return;\n    end;\n\n    u2:removePower(v7);\n    u3:removeItem(30);\n    u6 = math.clamp(u6 + 10, 0, 100);\n    State.Value = \"1\";\n    u1:nextTicks(60, function(p8) -- Line: 43\n        -- upvalues: Pollution (ref), u4 (ref), State (ref)\n        local v9 = Pollution;\n        v9.Value = v9.Value + 20;\n\n        if p8 ~= 1 then\n            if p8 == 10 then\n                State.Value = \"2\";\n            end;\n\n            return;\n        end;\n\n        u4:addItemAmount(\"Brick\", 30);\n        State.Value = \"\";\n    end);\nend;\n\nreturn v5;"
};
