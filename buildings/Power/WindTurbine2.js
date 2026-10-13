export default {
  id: "WindTurbine2",
  category: "Power",
  tier: 2,
  cost: 1785,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "Connector",
      kind: "mv",
      direction: "output",
      maxAmount: 50000,
      transferAmount: 2500,
      siteOffset: {
        y: -0.83074951171875,
        x: 1.6500244140625
      },
      gameOffset: {
        y: 1.7249979972839355,
        x: 1.6500244140625,
        z: -0.83074951171875
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.Connector);\nlocal State = script.Parent.State;\nlocal Rotator = script.Parent.Rotator;\nlocal u2 = Rotator:GetPivot();\nlocal u3 = u2:Inverse() * Rotator:GetPivot();\nlocal Wind = game.ReplicatedStorage.Wind;\nlocal u4 = false;\n\nlocal function decorOn() -- Line: 15\n    -- upvalues: u4 (ref), u2 (ref), Wind (copy), Rotator (copy), u3 (copy)\n    if u4 == false then\n        u4 = true;\n        script.Parent.Base.wind:Play();\n\n        while u4 do\n            wait();\n            u2 = u2 * CFrame.Angles(0, 0, (math.rad(2.5 * Wind.Value)));\n            Rotator:PivotTo(u2 * u3);\n        end;\n    end;\nend;\n\nlocal function decorOff() -- Line: 26\n    -- upvalues: u4 (ref)\n    if u4 == true then\n        u4 = false;\n        script.Parent.Base.wind:Stop();\n    end;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 36, Name: localUpdate\n        -- upvalues: State (copy), u4 (ref), decorOn (copy)\n        if State.Value == \"\" then\n            if u4 == true then\n                u4 = false;\n                script.Parent.Base.wind:Stop();\n            end;\n        elseif State.Value == \"Working\" then\n            decorOn();\n        end;\n    end,\n\n    tick = function() -- Line: 48, Name: tick\n        -- upvalues: u1 (copy), Wind (copy)\n        script.Parent.State.Value = \"Working\";\n        u1:addPower((math.floor(75 * Wind.Value)));\n    end\n};"
};
