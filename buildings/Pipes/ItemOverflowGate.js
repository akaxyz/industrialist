export default {
  id: "ItemOverflowGate",
  category: "Pipes",
  tier: 3,
  cost: 1000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "Pipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 1,
        x: 0
      },
      gameOffset: {
        y: 1.2469940185546875,
        x: 0,
        z: 1
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1,
        x: 0
      },
      gameOffset: {
        y: 1.2469863891601562,
        x: 0,
        z: -1
      }
    },
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1.5999755859375,
        x: 0
      },
      gameOffset: {
        y: 1.2469863891601562,
        x: 0,
        z: -1.5999755859375
      }
    }
  ],
  data: [],
  updateEvery: 6,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.Pipe, true);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe, true);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut, true);\n\nreturn {\n    tick = function() -- Line: 13, Name: tick\n        -- upvalues: u1 (copy), u3 (copy), u2 (copy)\n        if u1:getItem() == \"\" then\n            return;\n        end;\n\n        local v4 = u1:getBuffer();\n\n        if v4 == 0 then\n            return;\n        end;\n\n        if u3:isFull() then\n            local v5 = u2:getMax() - u2:getBuffer();\n            local v6 = math.clamp(v4, 0, v5);\n            u2:setUsedTemperature(u1:getTemp());\n            u2:addItemAmount(u1:getItem(), v6);\n            u1:removeItem(v6);\n\n            return;\n        end;\n\n        local v7 = u3:getMax() - u3:getBuffer();\n        local v8 = math.clamp(v4, 0, v7);\n        u3:setUsedTemperature(u1:getTemp());\n        u3:addItemAmount(u1:getItem(), v8);\n        u1:removeItem(v8);\n\n        if u1:getBuffer() == 0 then\n            u1:setItem(0, \"\");\n        end;\n    end\n};"
};
