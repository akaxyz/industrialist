export default {
  id: "IndustrialElectricFurnace",
  category: "Factories",
  tier: 3,
  cost: 1000000,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 25,
      transferAmount: 1,
      siteOffset: {
        y: 7,
        x: -9.74993896484375
      },
      gameOffset: {
        y: 1.124995231628418,
        x: -9.74993896484375,
        z: 7
      },
      tip: "Outputs the molten input"
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 7.6500396728515625,
        x: 1.80950927734375
      },
      gameOffset: {
        y: 1.0999975204467773,
        x: 1.80950927734375,
        z: 7.6500396728515625
      },
      tip: "Input for gold/alumina dust/sand"
    },
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 0.3500518798828125,
        x: 1.80950927734375
      },
      gameOffset: {
        y: 1.0999975204467773,
        x: 1.80950927734375,
        z: 0.3500518798828125
      },
      tip: "Input for gold/alumina dust/ sand"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1100000,
      transferAmount: 0,
      siteOffset: {
        y: 7.0650177001953125,
        x: -2.80999755859375
      },
      gameOffset: {
        y: 8.21496868133545,
        x: -2.80999755859375,
        z: 7.0650177001953125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal ParticleEmitter = script.Parent.SmokeStack.ParticleEmitter;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u5 = false;\n\nlocal function decorOn() -- Line: 19\n    -- upvalues: u5 (ref), ParticleEmitter (copy)\n    if u5 == false then\n        u5 = true;\n        ParticleEmitter.Enabled = true;\n        script.Parent.Base.furnace:Play();\n    end;\nend;\n\nlocal function decorOff() -- Line: 26\n    -- upvalues: u5 (ref), ParticleEmitter (copy)\n    if u5 == true then\n        u5 = false;\n        ParticleEmitter.Enabled = false;\n        script.Parent.Base.furnace:Stop();\n    end;\nend;\n\nlocal v6 = {\n    localUpdate = function() -- Line: 36, Name: localUpdate\n        -- upvalues: State (copy), u5 (ref), ParticleEmitter (copy)\n        if State.Value == \"Running\" then\n            if u5 == false then\n                u5 = true;\n                ParticleEmitter.Enabled = true;\n                script.Parent.Base.furnace:Play();\n            end;\n        elseif State.Value == \"Idle\" and u5 == true then\n            u5 = false;\n            ParticleEmitter.Enabled = false;\n            script.Parent.Base.furnace:Stop();\n        end;\n    end\n};\nlocal u7 = {\n    [\"24 Karat Gold\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Gold\", 1, 1100 }\n    },\n    [\"18 Karat Gold\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Gold\", 0.4, 1100 }\n    },\n    [\"12 Karat Gold\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Gold\", 0.2, 1100 }\n    },\n    [\"10 Karat Gold\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Gold\", 0.1, 1100 }\n    },\n    [\"8 Karat Gold\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Gold\", 0.08, 1100 }\n    },\n    [\"Alumina Dust\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Aluminium\", 1, 1100 }\n    },\n    Sand = {\n        needed = 2,\n        time = 5,\n        output = { \"Liquid Glass\", 1, 1100 }\n    },\n    [\"Treated Raw Iron\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Iron\", 5, 1800 }\n    },\n    [\"Treated Raw Copper\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Copper\", 5, 1800 }\n    },\n    [\"Raw Lead\"] = {\n        needed = 5,\n        time = 5,\n        output = { \"Liquid Lead\", 5, 1800 }\n    },\n    Sulfur = {\n        needed = 10,\n        time = 5,\n        output = { \"Liquid Sulfur\", 20, 180 }\n    }\n};\nlocal u8 = require(ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v6.tick() -- Line: 103\n    -- upvalues: u8 (copy), u4 (copy), u3 (copy), u1 (copy), u2 (copy), u7 (copy), State (copy), Pollution (copy)\n    if u8:tickIsBusy() then\n        return;\n    end;\n\n    if not u4:hasPower(1000000) then\n        return;\n    end;\n\n    if not u3:canHoldXMore(1) then\n        return;\n    end;\n\n    local v9, v10, v11;\n\n    if u1:getBuffer() < u2:getBuffer() then\n        v9 = u2:getBuffer();\n        v10 = u2:getItem();\n        v11 = 2;\n    else\n        v9 = u1:getBuffer();\n        v10 = u1:getItem();\n        v11 = 1;\n    end;\n\n    local u12 = nil;\n\n    for i, v in pairs(u7) do\n        if v10 == i and v9 >= v.needed then\n            u12 = v;\n        end;\n    end;\n\n    if u12 ~= nil then\n        if v11 == 1 then\n            u1:removeItem(u12.needed);\n        else\n            u2:removeItem(u12.needed);\n        end;\n\n        State.Value = \"Running\";\n        u8:nextTicks(u12.time, function(p13) -- Line: 134\n            -- upvalues: Pollution (ref), u4 (ref), u12 (ref), u3 (ref), State (ref)\n            local v14 = Pollution;\n            v14.Value = v14.Value + 30;\n            u4:removePower(1000000 / u12.time);\n\n            if p13 == 1 then\n                u3:setUsedTemperature(u12.output[3]);\n                u3:addItemAmount(u12.output[1], u12.output[2]);\n                State.Value = \"Idle\";\n            end;\n        end);\n    end;\nend;\n\nreturn v6;"
};
