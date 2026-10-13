export default {
  id: "ColdBypassPipe",
  category: "Pipes",
  tier: 3,
  cost: 5000,
  base: {
    height: 6,
    offset: {
      y: -1,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 0.7501220703125,
        x: 0
      },
      gameOffset: {
        y: 1.3670039176940918,
        x: 0,
        z: 0.7501220703125
      }
    },
    {
      name: "BypassMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1.0001220703125,
        x: 0
      },
      gameOffset: {
        y: 1.4670019149780273,
        x: 0,
        z: -1.0001220703125
      },
      tip: "Bypass if temperature is below set temperature"
    },
    {
      name: "StraightMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -2.74993896484375,
        x: 0
      },
      gameOffset: {
        y: 1.3670039176940918,
        x: 0,
        z: -2.74993896484375
      },
      tip: "Output if temperature is above or equal to set temperature"
    }
  ],
  data: {
    Temp: 105
  },
  updateEvery: 6,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe, true);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.BypassMainPipe, true);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.StraightMainPipe, true);\nlocal u4 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new();\nlocal Temp = script.Parent.ModelData.Temp;\nscript.Parent.Control.Control.Triggered:Connect(function(p5) -- Line: 12\n    -- upvalues: u4 (copy)\n    u4:openMenu(p5);\nend);\nu4:addSetting(1, script.Parent.ModelData.Temp, \"Temperature below which the fluid will be bypassed\", -10000, 10000);\nscript.Parent.Control.Control.Enabled = true;\n\nreturn {\n    tick = function() -- Line: 20, Name: tick\n        -- upvalues: u1 (copy), Temp (copy), u3 (copy), u2 (copy)\n        if u1:getBuffer() <= 0 then\n            return;\n        end;\n\n        local v6 = u1:getBuffer();\n\n        if u1:getTemp() >= Temp.Value then\n            if not u3:canHoldXMoreOf(u1:getItem(), v6) then\n                return;\n            end;\n\n            u3:setUsedTemperature(u1:getTemp());\n            u3:addItemAmount(u1:getItem(), v6);\n            u1:removeItem(v6);\n\n            return;\n        end;\n\n        if not u2:canHoldXMoreOf(u1:getItem(), v6) then\n            return;\n        end;\n\n        u2:setUsedTemperature(u1:getTemp());\n        u2:addItemAmount(u1:getItem(), v6);\n        u1:removeItem(v6);\n    end\n};"
};
