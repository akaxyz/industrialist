export default {
  id: "AdvancedElectricFurnace",
  category: "Factories",
  tier: 2,
  cost: 100000,
  base: {
    height: 12,
    offset: {
      y: 3.9998779296875,
      x: 4
    },
    width: 12
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 250000,
      transferAmount: 0,
      siteOffset: {
        y: 5.5753173828125,
        x: 8.54608154296875
      },
      gameOffset: {
        y: 9.645801544189453,
        x: 8.54608154296875,
        z: 5.5753173828125
      }
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: 0.0047607421875,
        x: -1.58929443359375
      },
      gameOffset: {
        y: 1.9310626983642578,
        x: -1.58929443359375,
        z: 0.0047607421875
      }
    },
    {
      name: "FluidOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: 1.006103515625,
        x: 9.51348876953125
      },
      gameOffset: {
        y: 1.8299694061279297,
        x: 9.51348876953125,
        z: 1.006103515625
      }
    },
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 20,
      transferAmount: 2,
      siteOffset: {
        y: 8.0047607421875,
        x: -1.58929443359375
      },
      gameOffset: {
        y: 1.9310626983642578,
        x: -1.58929443359375,
        z: 8.0047607421875
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.FluidOutMainPipe);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Effects = script.Parent.Effects;\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v5 = {};\nlocal TweenService = game:GetService(\"TweenService\");\nlocal MotenMetals = script.Parent.MotenMetals;\nlocal u6 = MotenMetals.Lava1.Position.Y - 0.1;\n\nfunction v5.localUpdate() -- Line: 24\n    -- upvalues: State (copy), Effects (copy), TweenService (copy), MotenMetals (copy), u6 (copy)\n    local v7 = tonumber(State.Value);\n\n    if not v7 then\n        if State.Value ~= \"Output\" then\n            if State.Value == \"Idle\" then\n                Effects.ParticleEmitter.Enabled = false;\n                Effects.furnace:Stop();\n            end;\n\n            return;\n        end;\n\n        TweenService:Create(MotenMetals.Lava1, TweenInfo.new(1, Enum.EasingStyle.Linear), {\n            Position = Vector3.new(MotenMetals.Lava1.Position.X, u6, MotenMetals.Lava1.Position.Z)\n        }):Play();\n        TweenService:Create(MotenMetals.Lava2, TweenInfo.new(1, Enum.EasingStyle.Linear), {\n            Position = Vector3.new(MotenMetals.Lava2.Position.X, u6, MotenMetals.Lava2.Position.Z)\n        }):Play();\n        TweenService:Create(MotenMetals.Lava3, TweenInfo.new(1, Enum.EasingStyle.Linear), {\n            Position = Vector3.new(MotenMetals.Lava3.Position.X, u6, MotenMetals.Lava3.Position.Z)\n        }):Play();\n\n        return;\n    end;\n\n    Effects.ParticleEmitter.Enabled = true;\n\n    if Effects.furnace.Playing == false then\n        Effects.furnace:Play();\n    end;\n\n    TweenService:Create(MotenMetals.Lava1, TweenInfo.new(math.random(15, v7 * 10) / 10), {\n        Position = MotenMetals.Lava1.Position + Vector3.new(0, 2.2, 0)\n    }):Play();\n    TweenService:Create(MotenMetals.Lava2, TweenInfo.new(math.random(15, v7 * 10) / 10), {\n        Position = MotenMetals.Lava2.Position + Vector3.new(0, 2.2, 0)\n    }):Play();\n    TweenService:Create(MotenMetals.Lava3, TweenInfo.new(math.random(15, v7 * 10) / 10, Enum.EasingStyle.Linear), {\n        Position = MotenMetals.Lava3.Position + Vector3.new(0, 2.2, 0)\n    }):Play();\nend;\n\nlocal u8 = {\n    [\"Raw Copper\"] = {\n        needed = 2,\n        time = 3,\n        output = { \"Liquid Copper\", 2, 1800 }\n    },\n    [\"Raw Iron\"] = {\n        needed = 2,\n        time = 5,\n        output = { \"Liquid Iron\", 2, 1800 }\n    },\n    [\"Iron Ingot\"] = {\n        needed = 2,\n        time = 10,\n        output = { \"Liquid Iron\", 3.6, 1800 }\n    },\n    [\"Copper Ingot\"] = {\n        needed = 2,\n        time = 6,\n        output = { \"Liquid Copper\", 3.6, 1400 }\n    },\n    [\"Copper Mix\"] = {\n        needed = 5.33,\n        time = 3,\n        output = { \"Liquid Copper\", 10.4, 1800 }\n    },\n    [\"Iron Mix\"] = {\n        needed = 6.4,\n        time = 5,\n        output = { \"Liquid Iron\", 14, 1800 }\n    },\n    Sulfur = {\n        needed = 10,\n        time = 5,\n        output = { \"Liquid Sulfur\", 20, 1800 }\n    }\n};\nlocal u9 = require(ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v5.tick() -- Line: 84\n    -- upvalues: u9 (copy), u4 (copy), State (copy), u3 (copy), u1 (copy), u2 (copy), u8 (copy), Pollution (copy)\n    if u9:tickIsBusy() then\n        return;\n    end;\n\n    if not u4:hasPower(120000) then\n        State.Value = \"Idle\";\n\n        return;\n    end;\n\n    if not u3:canHoldXMore(20) then\n        State.Value = \"Idle\";\n\n        return;\n    end;\n\n    local v10, v11, v12;\n\n    if u1:getBuffer() < u2:getBuffer() then\n        v10 = u2:getBuffer();\n        v11 = u2:getItem();\n        v12 = 2;\n    else\n        v10 = u1:getBuffer();\n        v11 = u1:getItem();\n        v12 = 1;\n    end;\n\n    local u13 = nil;\n\n    for i, v in pairs(u8) do\n        if v11 == i and v10 >= v.needed then\n            u13 = v;\n        end;\n    end;\n\n    if u13 == nil then\n        State.Value = \"Idle\";\n    else\n        if v12 == 1 then\n            u1:removeItem(u13.needed);\n        else\n            u2:removeItem(u13.needed);\n        end;\n\n        State.Value = u13.time;\n        u4:removePower(120000);\n        u9:nextTicks(u13.time, function(p14) -- Line: 111\n            -- upvalues: Pollution (ref), u3 (ref), u13 (ref), State (ref)\n            local v15 = Pollution;\n            v15.Value = v15.Value + 45;\n\n            if p14 == 1 then\n                u3:setUsedTemperature(u13.output[3]);\n                u3:addItemAmount(u13.output[1], u13.output[2]);\n                State.Value = \"Output\";\n            end;\n        end);\n    end;\nend;\n\nreturn v5;"
};
