export default {
  id: "ElectricFurnace",
  category: "Factories",
  cost: 190,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: 4
    },
    width: 12
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 15000,
      transferAmount: 0,
      siteOffset: {
        y: 8.679317474365234,
        x: -1.01397705078125
      },
      gameOffset: {
        y: 3.799896478652954,
        x: -1.01397705078125,
        z: 8.679317474365234
      }
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 5,
      transferAmount: 2,
      siteOffset: {
        y: -1,
        x: -2.050048828125
      },
      gameOffset: {
        y: 2.243290662765503,
        x: -2.050048828125,
        z: -1
      }
    },
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 5,
      transferAmount: 2,
      siteOffset: {
        y: 9,
        x: -2.04986572265625
      },
      gameOffset: {
        y: 2.243290662765503,
        x: -2.04986572265625,
        z: 9
      }
    },
    {
      name: "FluidOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 15,
      transferAmount: 2,
      siteOffset: {
        y: 1,
        x: 9.96612548828125
      },
      gameOffset: {
        y: 2.250096082687378,
        x: 9.96612548828125,
        z: 1
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.FluidOutMainPipe);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v5 = {};\nlocal u6 = {\n    [\"Raw Copper\"] = {\n        needed = 1,\n        time = 3,\n        output = { \"Liquid Copper\", 1, 1800 },\n        color = Color3.fromRGB(255, 158, 47)\n    },\n    [\"Raw Iron\"] = {\n        needed = 1,\n        time = 5,\n        output = { \"Liquid Iron\", 1, 1800 },\n        color = Color3.fromRGB(255, 201, 146)\n    },\n    [\"Iron Ingot\"] = {\n        needed = 1,\n        time = 10,\n        output = { \"Liquid Iron\", 1.8, 1800 },\n        color = Color3.fromRGB(255, 201, 146)\n    },\n    [\"Copper Ingot\"] = {\n        needed = 1,\n        time = 6,\n        output = { \"Liquid Copper\", 1.8, 1400 },\n        color = Color3.fromRGB(255, 158, 47)\n    },\n    [\"Copper Mix\"] = {\n        needed = 2.665,\n        time = 3,\n        output = { \"Liquid Copper\", 5.2, 1800 },\n        color = Color3.fromRGB(255, 126, 20)\n    },\n    [\"Iron Mix\"] = {\n        needed = 3.2,\n        time = 5,\n        output = { \"Liquid Iron\", 7, 1800 },\n        color = Color3.fromRGB(255, 139, 38)\n    },\n    Sulfur = {\n        needed = 5,\n        time = 5,\n        output = { \"Liquid Sulfur\", 10, 180 },\n        color = Color3.fromRGB(255, 222, 34)\n    }\n};\nlocal u7 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal ParticleEmitter = script.Parent.SmokeStack1.ParticleEmitter;\nlocal Lava = script.Parent.Lava;\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u8 = nil;\n\nfunction v5.localUpdate() -- Line: 70\n    -- upvalues: State (copy), ParticleEmitter (copy), TweenService (copy), Lava (copy), u6 (copy), u8 (ref)\n    if State.Value == \"\" then\n        if State.Value == \"\" then\n            ParticleEmitter.Enabled = false;\n            ParticleEmitter.Parent.furnace:Pause();\n\n            if u8 ~= nil then\n                u8:Cancel();\n                u8:Destroy();\n            end;\n\n            TweenService:Create(Lava, TweenInfo.new(2, Enum.EasingStyle.Quad), {\n                Color = Color3.fromRGB(0, 0, 0)\n            }):Play();\n        end;\n\n        return;\n    end;\n\n    ParticleEmitter.Enabled = true;\n    ParticleEmitter.Parent.furnace:Resume();\n    TweenService:Create(Lava, TweenInfo.new(1, Enum.EasingStyle.Quad), {\n        Color = u6[State.Value].color:Lerp(Color3.fromRGB(0, 0, 0), 0.5)\n    }):Play();\n    task.wait(1);\n    u8 = TweenService:Create(Lava, TweenInfo.new(3, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, -1, true), {\n        Color = u6[State.Value].color\n    }):Play();\nend;\n\nfunction v5.tick() -- Line: 89\n    -- upvalues: u7 (copy), u4 (copy), State (copy), u3 (copy), u1 (copy), u2 (copy), u6 (copy), Pollution (copy)\n    if u7:tickIsBusy() then\n        return;\n    end;\n\n    if not u4:hasPower(1200) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u3:canHoldXMore(1) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v9, v10, v11;\n\n    if u1:getBuffer() < u2:getBuffer() then\n        v9 = u2:getBuffer();\n        v10 = u2:getItem();\n        v11 = 2;\n    else\n        v9 = u1:getBuffer();\n        v10 = u1:getItem();\n        v11 = 1;\n    end;\n\n    local u12 = nil;\n    local v13 = \"\";\n\n    for i, v in pairs(u6) do\n        if v10 == i and v9 >= v.needed then\n            v13 = i;\n            u12 = v;\n        end;\n    end;\n\n    if u12 == nil then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if v11 == 1 then\n        u1:removeItem(u12.needed);\n    else\n        u2:removeItem(u12.needed);\n    end;\n\n    State.Value = v13;\n    u4:removePower(1200);\n    u7:nextTicks(u12.time, function(p14) -- Line: 123\n        -- upvalues: Pollution (ref), u3 (ref), u12 (ref)\n        local v15 = Pollution;\n        v15.Value = v15.Value + 22.5;\n\n        if p14 == 1 then\n            u3:setUsedTemperature(u12.output[3]);\n            u3:addItemAmount(u12.output[1], u12.output[2]);\n        end;\n    end);\nend;\n\nreturn v5;"
};
