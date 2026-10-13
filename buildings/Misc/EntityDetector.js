export default {
  id: "EntityDetector",
  category: "Misc",
  cost: 4415,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: -1
    },
    width: 6
  },
  nodes: [
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -0.323486328125,
        x: -3.1739501953125
      },
      gameOffset: {
        y: 6.164299011230469,
        x: -3.1739501953125,
        z: -0.323486328125
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: -0.323486328125,
        x: -1.36712646484375
      },
      gameOffset: {
        y: 6.164299011230469,
        x: -1.36712646484375,
        z: -0.323486328125
      }
    }
  ],
  data: [],
  updateEvery: 6,
  script: "local v1 = {};\nlocal PowerUtilsV2 = require(game.ReplicatedStorage.Modules.PowerUtilsV2);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.OutMainConnector);\nlocal u4 = {};\nscript.EntityDetected.OnServerEvent:Connect(function(p5, p6) -- Line: 9\n    -- upvalues: u4 (copy)\n    u4[p5] = p6;\nend);\nlocal State = script.Parent.State;\n\nfunction v1.tick() -- Line: 16\n    -- upvalues: u2 (copy), u4 (copy), State (copy), u3 (copy)\n    if not u2:hasPower(20000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u2:removePower(20000);\n    local v7 = 0;\n\n    for _, v in pairs(u4) do\n        v7 = v7 + v;\n    end;\n\n    if State.Value ~= tostring(v7) then\n        State.Value = tostring(v7);\n    end;\n\n    if math.abs(v7) >= 1 then\n        u3:addPower(1000);\n\n        return;\n    end;\n\n    u3:removePower(1000);\nend;\n\nreturn v1;"
};
