export default {
  id: "SoilExcavator",
  category: "Extractors",
  tier: 3,
  cost: 250000,
  base: {
    height: 20,
    offset: {
      y: 8,
      x: -3
    },
    width: 10
  },
  nodes: [
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 50,
      transferAmount: 100,
      siteOffset: {
        y: 17.861572265625,
        x: -4.990478515625
      },
      gameOffset: {
        y: 2.021796226501465,
        x: -4.990478515625,
        z: 17.861572265625
      },
      tip: "Outputs Soil (to be put into trommel)"
    },
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 50,
      transferAmount: 1,
      siteOffset: {
        y: -1.585205078125,
        x: 1.01495361328125
      },
      gameOffset: {
        y: 1.5026893615722656,
        x: 1.01495361328125,
        z: -1.585205078125
      },
      tip: "Input for Water"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 400000,
      transferAmount: 0,
      siteOffset: {
        y: 10.2947998046875,
        x: 1.96038818359375
      },
      gameOffset: {
        y: 1.7675418853759766,
        x: 1.96038818359375,
        z: 10.2947998046875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nlocal State = script.Parent.State;\nlocal Scooper = script.Parent.Scooper;\nlocal BigGear = script.Parent.BigGear;\nlocal SmallGear = script.Parent.SmallGear;\nlocal u4 = tick();\n\nlocal function decorOn() -- Line: 17\n    -- upvalues: u4 (ref), Scooper (copy), BigGear (copy), SmallGear (copy)\n    local v5 = tick();\n    u4 = v5;\n    script.Parent.Base[\"motor sound\"]:Play();\n\n    while u4 == v5 and (wait() and script.Parent ~= nil) do\n        Scooper:PivotTo(Scooper:GetPivot() * CFrame.Angles(0.017453292519943295, 0, 0));\n        BigGear.CFrame = BigGear.CFrame * CFrame.Angles(-0.011635528346628864, 0, 0);\n        SmallGear.CFrame = SmallGear.CFrame * CFrame.Angles(0.017453292519943295, 0, 0);\n    end;\nend;\n\nreturn {\n    localUpdate = function() -- Line: 33, Name: localUpdate\n        -- upvalues: State (copy), decorOn (copy), u4 (ref)\n        if State.Value == \"Run\" then\n            decorOn();\n\n            return;\n        end;\n\n        script.Parent.Base[\"motor sound\"]:Stop();\n        u4 = tick();\n    end,\n\n    tick = function() -- Line: 42, Name: tick\n        -- upvalues: u1 (copy), State (copy), u3 (copy), u2 (copy)\n        if not u1:hasPower(300000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u3:canHoldXMore(10) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        local v6 = u2:getBuffer();\n        local v7 = u2:getItem();\n\n        if v6 < 10 or v7 ~= \"Water\" then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        u2:removeItem(10);\n        u1:removePower(200000);\n        State.Value = \"Run\";\n        u3:addItemAmount(\"Soil\", 1);\n    end\n};"
};
