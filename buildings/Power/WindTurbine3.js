export default {
  id: "WindTurbine3",
  category: "Power",
  tier: 3,
  cost: 100000,
  base: {
    height: 20,
    offset: {
      y: 8.000015258789062,
      x: -8
    },
    width: 20
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 200000,
      siteOffset: {
        y: 0.1038970947265625,
        x: -5.8436279296875
      },
      gameOffset: {
        y: 7.904071807861328,
        x: -5.8436279296875,
        z: 0.1038970947265625
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal Rotor = script.Parent.Rotor;\nlocal u2 = Rotor.PrimaryPart:GetPivot();\nlocal Wind = game.ReplicatedStorage.Wind;\nlocal u3 = false;\n\nlocal function decorOn() -- Line: 14\n    -- upvalues: u3 (ref), u2 (ref), Wind (copy), Rotor (copy)\n    if u3 == false then\n        u3 = true;\n        script.Parent.Rotor.rotor.wind:Play();\n\n        while u3 do\n            task.wait();\n            u2 = u2 * CFrame.Angles(math.rad(2.5 * Wind.Value * 0.1), 0, 0);\n            Rotor:PivotTo(u2);\n        end;\n    end;\nend;\n\nlocal function decorOff() -- Line: 25\n    -- upvalues: u3 (ref)\n    if u3 == true then\n        u3 = false;\n        script.Parent.Rotor.rotor.wind:Stop();\n    end;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 35, Name: localUpdate\n        -- upvalues: State (copy), u3 (ref), decorOn (copy)\n        if State.Value == \"\" then\n            if u3 == true then\n                u3 = false;\n                script.Parent.Rotor.rotor.wind:Stop();\n            end;\n        elseif State.Value == \"Working\" then\n            decorOn();\n        end;\n    end,\n\n    tick = function() -- Line: 47, Name: tick\n        -- upvalues: u1 (copy), Wind (copy)\n        script.Parent.State.Value = \"Working\";\n        u1:addPower((math.floor(10000 * Wind.Value)));\n    end\n};"
};
