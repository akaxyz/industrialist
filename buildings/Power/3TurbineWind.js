export default {
  id: "3TurbineWind",
  category: "Power",
  tier: 3,
  cost: 250000,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: -6
    },
    width: 16
  },
  nodes: [
    {
      name: "Connector",
      kind: "mv",
      direction: "output",
      maxAmount: 500000,
      transferAmount: 100000,
      siteOffset: {
        y: -0.830810546875,
        x: 1.6500244140625
      },
      gameOffset: {
        y: 1.724999189376831,
        x: 1.6500244140625,
        z: -0.830810546875
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.Connector);\nlocal State = script.Parent.State;\nlocal Rotator = script.Parent.Rotator;\nlocal u2 = Rotator:GetPivot();\nlocal u3 = u2:Inverse() * Rotator:GetPivot();\nlocal Wind = game.ReplicatedStorage.Wind;\nlocal u4 = false;\n\nlocal function decorOn() -- Line: 15\n    -- upvalues: u4 (ref), u2 (ref), Wind (copy), Rotator (copy), u3 (copy)\n    if u4 == false then\n        u4 = true;\n        script.Parent.Base.wind:Play();\n\n        while u4 do\n            wait();\n            u2 = u2 * CFrame.Angles(0, 0, (math.rad(7 * Wind.Value)));\n            Rotator:PivotTo(u2 * u3);\n        end;\n    end;\nend;\n\nlocal function decorOff() -- Line: 26\n    -- upvalues: u4 (ref)\n    if u4 == true then\n        u4 = false;\n        script.Parent.Base.wind:Stop();\n    end;\nend;\n\nlocal v5 = {\n    localUpdate = function() -- Line: 36, Name: localUpdate\n        -- upvalues: State (copy), u4 (ref), decorOn (copy)\n        if State.Value == \"\" then\n            if u4 == true then\n                u4 = false;\n                script.Parent.Base.wind:Stop();\n            end;\n        elseif State.Value == \"Working\" then\n            decorOn();\n        end;\n    end\n};\nlocal u6 = false;\n\nfunction v5.tick() -- Line: 48\n    -- upvalues: Wind (copy), u6 (ref), u1 (copy)\n    if Wind.Value <= 4 or (u6 ~= false or math.random(1, 5) ~= 1) then\n        if u6 == false then\n            script.Parent.State.Value = \"Working\";\n            u1:addPower((math.floor(300 * Wind.Value)));\n        end;\n\n        return;\n    end;\n\n    u6 = true;\n    script.Parent.State.Value = \"\";\n    script.Parent.Rotator.Blades.Anchored = false;\n    script.Parent.Rotator.Nacella.Anchored = false;\n    script.Parent.Base[\"metal pipe falling sound effect but its louder\"]:Play();\n    local Blades = script.Parent.Rotator.Blades;\n    local v7 = math.random(-101, 120);\n    local v8 = math.random(-110, 190);\n    Blades.AssemblyLinearVelocity = Vector3.new(v7, v8, math.random(-111, 102));\n    local Blades2 = script.Parent.Rotator.Blades;\n    local v9 = math.random(-101, 120);\n    local v10 = math.random(-100, 103);\n    Blades2.AssemblyAngularVelocity = Vector3.new(v9, v10, math.random(-107, 106));\nend;\n\nreturn v5;"
};
