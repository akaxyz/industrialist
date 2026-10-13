export default {
  id: "WindTurbine1",
  category: "Power",
  cost: 400,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "Connector",
      kind: "mv",
      direction: "output",
      maxAmount: 5000,
      transferAmount: 500,
      siteOffset: {
        y: -1.3897705078125,
        x: -1.24072265625
      },
      gameOffset: {
        y: 1.9193668365478516,
        x: -1.24072265625,
        z: -1.3897705078125
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.Connector);\nlocal State = script.Parent.State;\nlocal Blade = script.Parent.Blade;\nlocal u2 = Blade.CFrame * Blade.PivotOffset;\nlocal u3 = u2:Inverse() * Blade.CFrame;\nlocal Wind = game.ReplicatedStorage.Wind;\nlocal u4 = false;\n\nlocal function decorOn() -- Line: 15\n    -- upvalues: u4 (ref), u2 (ref), Wind (copy), Blade (copy), u3 (copy)\n    if u4 == false then\n        u4 = true;\n        script.Parent.Base.wind:Play();\n\n        while u4 do\n            task.wait();\n            u2 = u2 * CFrame.Angles(0, math.rad(2.5 * Wind.Value), 0);\n            Blade.CFrame = u2 * u3;\n        end;\n    end;\nend;\n\nlocal function decorOff() -- Line: 26\n    -- upvalues: u4 (ref)\n    if u4 == true then\n        u4 = false;\n        script.Parent.Base.wind:Stop();\n    end;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 36, Name: localUpdate\n        -- upvalues: State (copy), u4 (ref), decorOn (copy)\n        if State.Value == \"\" then\n            if u4 == true then\n                u4 = false;\n                script.Parent.Base.wind:Stop();\n            end;\n        elseif State.Value == \"Working\" then\n            decorOn();\n        end;\n    end,\n\n    tick = function() -- Line: 48, Name: tick\n        -- upvalues: u1 (copy), Wind (copy)\n        script.Parent.State.Value = \"Working\";\n        u1:addPower((math.floor(23 * Wind.Value)));\n    end\n};"
};
