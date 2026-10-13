export default {
  id: "FiltrationPlant",
  category: "Factories",
  tier: 2,
  cost: 20000,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: 2
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 250000,
      transferAmount: 0,
      siteOffset: {
        y: -1.13372802734375,
        x: -1.70947265625
      },
      gameOffset: {
        y: 8.327598571777344,
        x: -1.70947265625,
        z: -1.13372802734375
      }
    },
    {
      name: "MainPipeIn",
      kind: "fluid",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.467987060546875,
        x: 0.99969482421875
      },
      gameOffset: {
        y: 1.5062000751495361,
        x: 0.99969482421875,
        z: 1.467987060546875
      },
      tip: "Water input for filtering"
    },
    {
      name: "MainPipeOut",
      kind: "fluid",
      direction: "output",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -13.63482666015625,
        x: 0.989501953125
      },
      gameOffset: {
        y: 1.7763090133666992,
        x: 0.989501953125,
        z: -13.63482666015625
      },
      tip: "Filtered water out"
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.EffectUtils).new(script);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipeIn);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u5 = require(ReplicatedStorage.Modules.EffectUtils).new(script);\nu5:registerState(\"running\", true, function() -- Line: 18\n    script.Parent.Base.WaterPump:Play();\nend);\nu5:registerState(\"running\", false, function() -- Line: 21\n    script.Parent.Base.WaterPump:Stop();\nend);\nlocal v6 = {\n    localUpdate = function() -- Line: 27, Name: localUpdate\n        -- upvalues: u5 (copy)\n        u5:localUpdate();\n    end\n};\n\nlocal function fail() -- Line: 31\n    -- upvalues: u5 (copy)\n    u5:setState(\"running\", false);\nend;\n\nlocal u7 = { {\n        RunFor = 60,\n        Input = { \"Water\", 4 },\n        Output = { \"Filtered Water\", 3 }\n    }, {\n        RunFor = 60,\n        Input = { \"Filtered Water\", 4 },\n        Output = { \"Water\", 3 }\n    }, {\n        RunFor = 60,\n        Badge = 2153448890,\n        Input = { \"Gasoline\", 4 },\n        Output = { \"Crude Diesel\", 2.4 }\n    }, {\n        RunFor = 60,\n        Input = { \"Refined Diesel\", 4 },\n        Output = { \"Machine Oil\", 2.4 }\n    }, {\n        RunFor = 60,\n        Input = { \"Residue\", 4 },\n        Output = { \"Residue\", 4.4 }\n    }, {\n        RunFor = 60,\n        Input = { \"Heavy Oil\", 4 },\n        Output = { \"Crude Oil\", 3 }\n    } };\n\nfunction v6.tick() -- Line: 69\n    -- upvalues: u1 (copy), u4 (copy), u5 (copy), u7 (copy), u2 (copy), u3 (copy), Achievements (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u4:hasPower(15000) then\n        u5:setState(\"running\", false);\n\n        return;\n    end;\n\n    local v8 = false;\n\n    for _, v in pairs(u7) do\n        if u2:hasAmountOf(v.Input[1], v.Input[2]) and u3:canHoldXMoreOf(v.Output[1], v.Output[2]) then\n            u2:removeItem(v.Input[2]);\n\n            if v.Badge then\n                Achievements.giveBadge(v.Badge);\n            end;\n\n            u4:removePower(15000);\n            u1:nextTicks(v.RunFor, function(p9) -- Line: 81\n                -- upvalues: u3 (ref), v (copy)\n                u3:addItemAmount(v.Output[1], v.Output[2] / v.RunFor);\n            end);\n            v8 = true;\n            break;\n        end;\n    end;\n\n    if v8 then\n        return;\n    end;\n\n    u5:setState(\"running\", false);\nend;\n\nreturn v6;"
};
