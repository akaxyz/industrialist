export default {
  id: "IndustrialFirebox",
  category: "Power",
  tier: 3,
  cost: 250000,
  base: {
    height: 8,
    offset: {
      y: 0,
      x: -7
    },
    width: 18
  },
  nodes: [
    {
      name: "WaterMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: -3.612423896789551,
        x: -0.99005126953125
      },
      gameOffset: {
        y: 2.0299835205078125,
        x: -0.99005126953125,
        z: -3.612423896789551
      },
      tip: "Input for Water/Liquid Sulfur, each requiring a specific Energy amount to burn"
    },
    {
      name: "InputMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: 3.02752685546875,
        x: 1.4649658203125
      },
      gameOffset: {
        y: 1.297999382019043,
        x: 1.4649658203125,
        z: 3.02752685546875
      },
      tip: "Input for Solid Fuels, each has a specific Energy content"
    },
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: -3.6024179458618164,
        x: -12.97503662109375
      },
      gameOffset: {
        y: 2.0349864959716797,
        x: -12.97503662109375,
        z: -3.6024179458618164
      },
      tip: "Output for Water/Burnt things"
    },
    {
      name: "OutchemicalMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 32,
      transferAmount: 20,
      siteOffset: {
        y: 2.994537353515625,
        x: -15.89703369140625
      },
      gameOffset: {
        y: 1.6929931640625,
        x: -15.89703369140625,
        z: 2.994537353515625
      },
      tip: "Output for burnt items (for example sodium carbonate)"
    }
  ],
  data: {
    Energy: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.NextTicks).new();\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InputMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.WaterMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutchemicalMainPipe);\nlocal ParticleEmitter = script.Parent.Smoke.ParticleEmitter;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u5 = false;\n\nlocal function decorOn() -- Line: 21\n    -- upvalues: u5 (ref), ParticleEmitter (copy)\n    if u5 == false then\n        u5 = true;\n        ParticleEmitter.Enabled = true;\n        ParticleEmitter.Parent.furnace:Play();\n    end;\nend;\n\nlocal function decorOff() -- Line: 28\n    -- upvalues: u5 (ref), ParticleEmitter (copy)\n    if u5 == true then\n        u5 = false;\n        ParticleEmitter.Enabled = false;\n        ParticleEmitter.Parent.furnace:Stop();\n    end;\nend;\n\nlocal v6 = {\n    localUpdate = function() -- Line: 38, Name: localUpdate\n        -- upvalues: State (copy), u5 (ref), ParticleEmitter (copy)\n        if State.Value == \"Running\" then\n            if u5 == false then\n                u5 = true;\n                ParticleEmitter.Enabled = true;\n                ParticleEmitter.Parent.furnace:Play();\n            end;\n        elseif State.Value == \"Idle\" and u5 == true then\n            u5 = false;\n            ParticleEmitter.Enabled = false;\n            ParticleEmitter.Parent.furnace:Stop();\n        end;\n    end\n};\nlocal Energy = script.Parent.ModelData.Energy;\nlocal u7 = {\n    Coal = {\n        amount = 1,\n        energy = 30000,\n        pollution = 250,\n        itemoutput = nil\n    },\n    [\"Coke Fuel\"] = {\n        amount = 1,\n        energy = 600000,\n        pollution = 600,\n        itemoutput = nil\n    },\n    Planks = {\n        amount = 1,\n        energy = 9000,\n        pollution = 90,\n        itemoutput = nil\n    },\n    [\"Oak Log\"] = {\n        amount = 1,\n        energy = 16000,\n        pollution = 125,\n        itemoutput = { \"Sodium Carbonate\", 16 }\n    }\n};\nlocal u8 = {\n    [\"Liquid Sulfur\"] = {\n        amount = 4.5,\n        energy = 900000,\n        itemoutput = nil,\n        output = { \"Sulfur Dioxide\", 9, 300 }\n    },\n    Water = {\n        amount = 12,\n        energy = 300000,\n        itemoutput = nil,\n        output = { \"Water\", 12, 300 }\n    },\n    [\"Distilled Water\"] = {\n        amount = 12,\n        energy = 300000,\n        itemoutput = nil,\n        output = { \"Distilled Water\", 12, 300 }\n    },\n    [\"Filtered Water\"] = {\n        amount = 12,\n        energy = 300000,\n        itemoutput = nil,\n        output = { \"Filtered Water\", 12, 300 }\n    },\n    [\"Concentrated Salt Solution\"] = {\n        amount = 12,\n        energy = 300000,\n        output = { \"Water\", 12, 300 },\n        itemoutput = { \"Table Salt\", 2 }\n    },\n    [\"Boric Acid\"] = {\n        amount = 2,\n        energy = 900000,\n        output = nil,\n        itemoutput = { \"Boron\", 1, 300 }\n    }\n};\nlocal NeonPart = script.Parent.NeonPart;\n\nfunction v6.tick() -- Line: 123\n    -- upvalues: Energy (copy), u7 (copy), u1 (copy), u4 (copy), Pollution (copy), State (copy), u8 (copy), u2 (copy), u3 (copy), NeonPart (copy)\n    if Energy.Value < 3000000 then\n        local v9 = false;\n\n        for i, v in pairs(u7) do\n            if u1:hasAmountOf(i, v.amount) then\n                u1:removeItem(v.amount);\n\n                if v.itemoutput ~= nil and u4:canHoldXMoreOf(v.itemoutput[1], v.itemoutput[2]) then\n                    u4:addItemAmount(v.itemoutput[1], v.itemoutput[2]);\n                end;\n\n                local v10 = Pollution;\n                v10.Value = v10.Value + v.pollution;\n                State.Value = \"Running\";\n                local v11 = Energy;\n                v11.Value = v11.Value + v.energy;\n                v9 = true;\n                break;\n            end;\n        end;\n\n        if v9 == false then\n            State.Value = \"Idle\";\n        end;\n    else\n        State.Value = \"Idle\";\n    end;\n\n    for i, v in pairs(u8) do\n        if u2:hasAmountOf(i, v.amount) and (Energy.Value >= v.energy and (v.itemoutput == nil or u4:canHoldXMoreOf(v.itemoutput[1], v.itemoutput[2]))) and (v.output == nil or u3:canHoldXMoreOf(v.output[1], v.output[2])) then\n            local v12 = Energy;\n            v12.Value = v12.Value - v.energy;\n            u2:removeItem(v.amount);\n\n            if v.output ~= nil then\n                u3:setUsedTemperature(v.output[3]);\n                u3:addItemAmount(v.output[1], v.output[2]);\n            end;\n\n            if v.itemoutput ~= nil then\n                u4:setUsedTemperature(v.itemoutput[3] or 50);\n                u4:addItemAmount(v.itemoutput[1], v.itemoutput[2]);\n            end;\n        end;\n    end;\n\n    local v13 = Color3.fromRGB(0, 0, 0):Lerp(Color3.fromRGB(255, 137, 73), (math.clamp(Energy.Value / 3000000, 0, 1)));\n    NeonPart.Color = v13;\n    NeonPart.SpotLight.Color = v13;\nend;\n\nreturn v6;"
};
