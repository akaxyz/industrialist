export default {
  id: "Alloyer",
  category: "Factories",
  tier: 3,
  cost: 999999,
  base: {
    height: 12,
    offset: {
      y: 2,
      x: 6
    },
    width: 20
  },
  nodes: [
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: 5.000244140625,
        x: 15.7628173828125
      },
      gameOffset: {
        y: 3.035856246948242,
        x: 15.7628173828125,
        z: 5.000244140625
      },
      tip: "Input for Iron Ingots/Gold Ingots/Copper Ingot"
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -0.999755859375,
        x: 15.77276611328125
      },
      gameOffset: {
        y: 3.055856704711914,
        x: 15.77276611328125,
        z: -0.999755859375
      },
      tip: "Input for Aluminium Ingots/Zinc"
    },
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 4.9749755859375,
        x: -3.50604248046875
      },
      gameOffset: {
        y: 1.9210453033447266,
        x: -3.50604248046875,
        z: 4.9749755859375
      },
      tip: "Outputs molten Ferroaluminium Alloy/Purple Gold"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 7000000,
      transferAmount: 0,
      siteOffset: {
        y: -2.67999267578125,
        x: -0.54998779296875
      },
      gameOffset: {
        y: 7.609997749328613,
        x: -0.54998779296875,
        z: -2.67999267578125
      }
    },
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 300,
      transferAmount: 1,
      siteOffset: {
        y: 7.625,
        x: 1.050048828125
      },
      gameOffset: {
        y: 2.1000003814697266,
        x: 1.050048828125,
        z: 7.625
      },
      tip: "Input for Steam (Higher temp = faster)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v6 = {};\nlocal Base = script.Parent.Base;\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u7 = script.Parent[\"Molten Metal\"];\nlocal Position = u7.Position;\n\nfunction v6.localUpdate() -- Line: 25\n    -- upvalues: State (copy), Base (copy), TweenService (copy), u7 (copy), Position (copy)\n    local v8 = tonumber(State.Value);\n\n    if not v8 then\n        if State.Value ~= \"Output\" then\n            if State.Value == \"Idle\" then\n                Base.Steam1.ParticleEmitter.Enabled = false;\n                Base.Steam2.ParticleEmitter.Enabled = false;\n                Base.Lava.ParticleEmitter.Enabled = false;\n                Base.Lava.ParticleEmitter.Rate = 0;\n                Base.furnace:Stop();\n            end;\n\n            return;\n        end;\n\n        Base.Steam1.ParticleEmitter.Enabled = false;\n        Base.Steam2.ParticleEmitter.Enabled = false;\n        Base.Lava.ParticleEmitter.Enabled = false;\n        Base.Lava.ParticleEmitter.Rate = 0;\n        TweenService:Create(u7, TweenInfo.new(2, Enum.EasingStyle.Linear), {\n            Position = Position,\n            Color = Color3.fromRGB(218, 115, 56)\n        }):Play();\n\n        return;\n    end;\n\n    Base.Steam1.ParticleEmitter.Enabled = true;\n    Base.Steam2.ParticleEmitter.Enabled = true;\n\n    if Base.furnace.Playing == false then\n        Base.furnace:Play();\n    end;\n\n    Base.Lava.ParticleEmitter.Enabled = true;\n    task.wait(2);\n    TweenService:Create(u7, TweenInfo.new(v8 - 2), {\n        Position = Position + Vector3.new(0, 0.7, 0),\n        Color = Color3.fromRGB(234, 184, 68)\n    }):Play();\n    TweenService:Create(Base.Lava.ParticleEmitter, TweenInfo.new((v8 - 2) / 2, Enum.EasingStyle.Linear), {\n        Rate = 3\n    }):Play();\nend;\n\nlocal u9 = { { { \"Iron Ingot\", 4 }, { \"Aluminium Ingot\", 2 }, { \"Molten Ferroaluminium Alloy\", 2 }, 40, 150000 }, { { \"Gold Ingot\", 1 }, { \"Aluminium Ingot\", 2 }, { \"Molten Purple Gold\", 2 }, 40, 150000 }, { { \"Copper Ingot\", 6 }, { \"Zinc\", 3 }, { \"Liquid Brass\", 9 }, 40, 150000 } };\nlocal u10 = require(ReplicatedStorage.Modules.NextTicks).new();\n\nfunction v6.tick() -- Line: 82\n    -- upvalues: u10 (copy), u3 (copy), u9 (copy), u1 (copy), u2 (copy), u4 (copy), u5 (copy), State (copy), Pollution (copy)\n    if u10:tickIsBusy() then\n        return;\n    end;\n\n    if not u3:hasAmountOf(\"Steam\", 200) then\n        return;\n    end;\n\n    for _, v in pairs(u9) do\n        local v11 = 1;\n        local v12;\n\n        if u1:hasAmountOf(v[2][1], v[2][2]) then\n            if u2:hasAmountOf(v[1][1], v[1][2]) and u1:hasAmountOf(v[2][1], v[2][2]) then\n                v11 = 2;\n\n                if u4:canHoldXMoreOf(v[3][1], v[3][2]) and u5:hasPower(v[4] * v[5]) then\n                    v12 = 1 + u3:getTemp() / 100;\n\n                    if v11 == 1 then\n                        u1:removeItem(v[1][2]);\n                        u2:removeItem(v[2][2]);\n                    else\n                        u2:removeItem(v[1][2]);\n                        u1:removeItem(v[2][2]);\n                    end;\n\n                    u3:removeItem(200);\n                    State.Value = math.floor(v[4] / v12 + 0.5);\n                    u10:nextTicks(math.ceil(v[4] / v12), function(p13) -- Line: 122\n                        -- upvalues: u4 (ref), v (copy), State (ref), u5 (ref), Pollution (ref)\n                        if p13 == 1 then\n                            u4:setUsedTemperature(2000);\n                            u4:addItemAmount(v[3][1], v[3][2]);\n                            State.Value = \"Output\";\n                        end;\n\n                        u5:removePower(v[5]);\n                        local v14 = Pollution;\n                        v14.Value = v14.Value + 2;\n                    end);\n\n                    return;\n                end;\n            end;\n        elseif u1:hasAmountOf(v[1][1], v[1][2]) and u2:hasAmountOf(v[2][1], v[2][2]) then\n            if u4:canHoldXMoreOf(v[3][1], v[3][2]) and u5:hasPower(v[4] * v[5]) then\n                v12 = 1 + u3:getTemp() / 100;\n\n                if v11 == 1 then\n                    u1:removeItem(v[1][2]);\n                    u2:removeItem(v[2][2]);\n                else\n                    u2:removeItem(v[1][2]);\n                    u1:removeItem(v[2][2]);\n                end;\n\n                u3:removeItem(200);\n                State.Value = math.floor(v[4] / v12 + 0.5);\n                u10:nextTicks(math.ceil(v[4] / v12), function(p13) -- Line: 122\n                    -- upvalues: u4 (ref), v (copy), State (ref), u5 (ref), Pollution (ref)\n                    if p13 == 1 then\n                        u4:setUsedTemperature(2000);\n                        u4:addItemAmount(v[3][1], v[3][2]);\n                        State.Value = \"Output\";\n                    end;\n\n                    u5:removePower(v[5]);\n                    local v14 = Pollution;\n                    v14.Value = v14.Value + 2;\n                end);\n\n                return;\n            end;\n        end;\n    end;\n\n    State.Value = \"Idle\";\nend;\n\nreturn v6;"
};
