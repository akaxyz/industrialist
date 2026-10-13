export default {
  id: "SandExcavator",
  category: "Extractors",
  tier: 3,
  cost: 10000,
  base: {
    height: 18,
    offset: {
      y: -7,
      x: -6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1500000,
      transferAmount: 0,
      siteOffset: {
        y: -0.11370849609375,
        x: -10.5087890625
      },
      gameOffset: {
        y: 9.405999183654785,
        x: -10.5087890625,
        z: -0.11370849609375
      }
    },
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: 1.4805908203125,
        x: -1
      },
      gameOffset: {
        y: 1.3069915771484375,
        x: -1,
        z: 1.4805908203125
      },
      tip: "Sand output"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal State = script.Parent.State;\nlocal u3 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u4 = false;\nrotation = CFrame.Angles(-0.05235987755982989, 0, 0);\n\nreturn {\n    localUpdate = function() -- Line: 18, Name: localUpdate\n        -- upvalues: State (copy), u4 (ref)\n        if State.Value == \"Running\" then\n            u4 = true;\n            script.Parent.Base.Motor:Play();\n\n            while u4 do\n                local v5 = script.Parent.speen:GetPivot();\n                script.Parent.speen:PivotTo(v5 * rotation);\n                task.wait(0.02);\n            end;\n        elseif State.Value == \"\" then\n            u4 = false;\n            script.Parent.Base.Motor:Stop();\n        end;\n    end,\n\n    tick = function() -- Line: 34, Name: tick\n        -- upvalues: u3 (copy), u1 (copy), State (copy), u2 (copy)\n        if u3:tickIsBusy() then\n            return;\n        end;\n\n        if not u1:hasPower(600000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u2:canHoldXMoreOf(\"Sand\", 4) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        State.Value = \"Running\";\n        u3:nextTicks(2, function(p6) -- Line: 39\n            -- upvalues: u1 (ref), u2 (ref)\n            u1:removePower(300000);\n            u2:addItemAmount(\"Sand\", 2);\n        end);\n    end\n};"
};
