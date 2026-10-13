export default {
  id: "LargeFluidValveControl",
  category: "Pipes",
  tier: 4,
  cost: 100000,
  base: {
    height: 8.000040054321289,
    offset: {
      y: 3.99993896484375,
      x: 0
    },
    width: 12.00006103515625
  },
  nodes: [
    {
      name: "StraightMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: 8.752685546875,
        x: -0.00860595703125
      },
      gameOffset: {
        y: 4.3427653312683105,
        x: -0.00860595703125,
        z: 8.752685546875
      },
      tip: "Non bypassed fluid output"
    },
    {
      name: "BypassMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: 3.03125,
        x: -0.00103759765625
      },
      gameOffset: {
        y: 4.337005138397217,
        x: -0.00103759765625,
        z: 3.03125
      },
      tip: "Bypassed fluid"
    },
    {
      name: "InMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 2000,
      siteOffset: {
        y: -0.7042236328125,
        x: -0.01324462890625
      },
      gameOffset: {
        y: 4.402567386627197,
        x: -0.01324462890625,
        z: -0.7042236328125
      }
    }
  ],
  data: {
    Overflow: false,
    Valve: 100
  },
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe, true);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.BypassMainPipe, true);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.StraightMainPipe, true);\nlocal u4 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new();\nlocal Valve = script.Parent.ModelData.Valve;\nlocal Overflow = script.Parent.ModelData.Overflow;\nscript.Parent.Control.Control.Triggered:Connect(function(p5) -- Line: 13\n    -- upvalues: u4 (copy)\n    u4:openMenu(p5);\nend);\nu4:addSetting(1, Valve, \"Amount of fluid to bypass in %\", 0, 100);\nu4:addSetting(2, Overflow, \"Bypass flow if it cannot distribute\");\nscript.Parent.Control.Control.Enabled = true;\n\nreturn {\n    tick = function() -- Line: 23, Name: tick\n        -- upvalues: u1 (copy), Valve (copy), u2 (copy), u3 (copy), Overflow (copy)\n        if u1:getItem() == \"\" then\n            return;\n        end;\n\n        local v6 = u1:getBuffer();\n\n        if v6 * Valve.Value / 100 <= u2:getMax() - u2:getBuffer() and v6 - v6 * Valve.Value / 100 <= u3:getMax() - u3:getBuffer() or not Overflow.Value then\n            if u2:getMax() - u2:getBuffer() <= u3:getMax() - u3:getBuffer() then\n                local v7 = u2:getMax() - u2:getBuffer();\n                v6 = math.clamp(v6, 0, v7);\n            end;\n\n            if u3:getMax() - u3:getBuffer() == u2:getMax() - u2:getBuffer() then\n                local v8 = u3:getMax() - u3:getBuffer();\n                v6 = math.clamp(v6, 0, v8);\n            end;\n\n            local v9 = u1:getItem();\n\n            if not u2:canHoldXMoreOf(v9, v6 * Valve.Value / 100) then\n                return;\n            end;\n\n            if not u3:canHoldXMoreOf(v9, v6 - v6 * Valve.Value / 100) then\n                return;\n            end;\n\n            u2:setUsedTemperature(u1:getTemp());\n            u3:setUsedTemperature(u1:getTemp());\n            u1:removeItem(v6);\n            u2:addItemAmount(v9, v6 * Valve.Value / 100);\n            u3:addItemAmount(v9, v6 - v6 * Valve.Value / 100);\n\n            if u1:getBuffer() == 0 then\n                u1:setItem(0, \"\");\n            end;\n\n            return;\n        end;\n\n        local v10 = 1 - Valve.Value / 100;\n        local v11 = u2:isFull() and 1 or v10;\n        local v12 = u3:getMax() - u3:getBuffer();\n        local v13 = math.clamp(v12, 0, v6 * v11);\n        local v14 = u2:getMax() - u2:getBuffer();\n        local v15 = math.clamp(v6 - v13, 0, v14);\n        local v16 = math.clamp(v15, 0, v6 - v13);\n        u2:setUsedTemperature(u1:getTemp());\n        u3:setUsedTemperature(u1:getTemp());\n        local v17 = u1:getItem();\n        u1:removeItem(v13 + v16);\n        u2:addItemAmount(v17, v16);\n        u3:addItemAmount(v17, v13);\n    end\n};"
};
