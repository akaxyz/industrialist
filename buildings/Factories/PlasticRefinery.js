export default {
  id: "PlasticRefinery",
  category: "Factories",
  tier: 3,
  cost: 100000,
  base: {
    height: 30,
    offset: {
      y: -13,
      x: -8
    },
    width: 20
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 2500000,
      transferAmount: 0,
      siteOffset: {
        y: 0.649993896484375,
        x: 2.01165771484375
      },
      gameOffset: {
        y: 5.941992282867432,
        x: 2.01165771484375,
        z: 0.649993896484375
      }
    },
    {
      name: "MainOutPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 30,
      transferAmount: 5,
      siteOffset: {
        y: -1,
        x: 2.0499267578125
      },
      gameOffset: {
        y: 2.324990749359131,
        x: 2.0499267578125,
        z: -1
      },
      tip: "Outputs Ethanol or PTA depending on inputs"
    },
    {
      name: "MainPipe2",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 10,
      siteOffset: {
        y: 2.04998779296875,
        x: -1
      },
      gameOffset: {
        y: 2.3249940872192383,
        x: -1,
        z: 2.04998779296875
      },
      tip: "Water or Acetic Acid (depends on recipe)"
    },
    {
      name: "MainPipe1",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 10,
      siteOffset: {
        y: 2.04998779296875,
        x: -3
      },
      gameOffset: {
        y: 2.3249940872192383,
        x: -3,
        z: 2.04998779296875
      },
      tip: "Crude Oil or Paraxylene (depends on recipe)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe1);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipe2);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.MainOutPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal v6 = {};\nlocal State = script.Parent.State;\nlocal u7 = tick();\nlocal Mixer = script.Parent.Mixer;\nlocal Liquid = script.Parent.Liquid;\n\nfunction v6.localUpdate() -- Line: 22\n    -- upvalues: State (copy), u7 (ref), Mixer (copy)\n    if State.Value == \"Running\" then\n        script.Parent.SmokeStack.ParticleEmitter.Enabled = true;\n        script.Parent.Base.Generator:Play();\n        local v8 = tick();\n        u7 = v8;\n\n        while wait() and u7 == v8 do\n            local v9 = Mixer;\n            v9.Orientation = v9.Orientation + Vector3.new(0, 1, 0);\n        end;\n    else\n        script.Parent.SmokeStack.ParticleEmitter.Enabled = false;\n        script.Parent.Base.Generator:Stop();\n        u7 = tick();\n    end;\nend;\n\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nfunction v6.tick() -- Line: 40\n    -- upvalues: u1 (copy), u2 (copy), u3 (copy), u4 (copy), u5 (copy), Liquid (copy), Pollution (copy), State (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if u2:hasAmountOf(\"Crude Oil\", 1) and (u3:hasAmountOf(\"Water\", 4) and (u4:canHoldXMoreOf(\"Ethanol\", 2) and u5:hasPower(240000))) then\n        Liquid.Color = Color3.fromRGB(141, 108, 51);\n        u2:removeItem(1);\n        u3:removeItem(4);\n        u1:nextTicks(4, function(p10) -- Line: 48\n            -- upvalues: u5 (ref), Pollution (ref), State (ref), u4 (ref)\n            u5:removePower(60000);\n            local v11 = Pollution;\n            v11.Value = v11.Value + 30;\n            State.Value = \"Running\";\n\n            if p10 == 1 then\n                u4:addItemAmount(\"Ethanol\", 2);\n            end;\n        end);\n\n        return;\n    end;\n\n    if not (u2:hasAmountOf(\"Paraxylene\", 1) and (u3:hasAmountOf(\"Acetic Acid\", 4) and (u4:canHoldXMoreOf(\"PTA\", 2) and u5:hasPower(240000)))) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    Liquid.Color = Color3.fromRGB(123, 140, 141);\n    u2:removeItem(1);\n    u3:removeItem(4);\n    u1:nextTicks(4, function(p12) -- Line: 66\n        -- upvalues: u5 (ref), Pollution (ref), State (ref), u4 (ref)\n        u5:removePower(60000);\n        local v13 = Pollution;\n        v13.Value = v13.Value + 30;\n        State.Value = \"Running\";\n\n        if p12 == 1 then\n            u4:addItemAmount(\"PTA\", 2);\n        end;\n    end);\nend;\n\nreturn v6;"
};
