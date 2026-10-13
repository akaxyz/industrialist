export default {
  id: "BatteryCharger",
  category: "Factories",
  tier: 3,
  cost: 100000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 1.9999990463256836
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 0.8375244140625,
        x: -1.3375258445739746
      },
      gameOffset: {
        y: 5.349956512451172,
        x: -1.3375258445739746,
        z: 0.8375244140625
      }
    },
    {
      name: "ItemIn1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 20,
      transferAmount: 10,
      siteOffset: {
        y: -1,
        x: -1.8369140625
      },
      gameOffset: {
        y: 1.862478256225586,
        x: -1.8369140625,
        z: -1
      },
      tip: "Input for Uncharged Lithium Ion Batteries"
    },
    {
      name: "Out1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: -1,
        x: 5.833003044128418
      },
      gameOffset: {
        y: 1.862478256225586,
        x: 5.833003044128418,
        z: -1
      },
      tip: "Output for Charged Lithium Ion Batteries"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.ItemIn1MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal v4 = {};\nlocal State = script.Parent.State;\n\nfunction v4.localUpdate() -- Line: 15\n    -- upvalues: State (copy), TweenService (copy)\n    if tonumber(State.Value) ~= nil then\n        script.Parent.Base.IdleCharging:Play();\n        script.Parent.Base.IdleCharging.Volume = tonumber(State.Value) * 0.14285714285714285;\n        script.Parent.Base.IdleCharging.Pitch = tonumber(State.Value) * 0.02142857142857143 + 0.9;\n        script.Parent.Status.Green.Material = Enum.Material.Glass;\n        script.Parent.Status.Yellow.Material = Enum.Material.Neon;\n        script.Parent.Status.Red.Material = Enum.Material.Glass;\n\n        for i = 1, tonumber(State.Value) do\n            script.Parent.Capacitors.One[i].Material = Enum.Material.Neon;\n            script.Parent.Capacitors.Two[i].Material = Enum.Material.Neon;\n        end;\n\n        for i = tonumber(State.Value) + 1, 7 do\n            script.Parent.Capacitors.One[i].Material = Enum.Material.Glass;\n            script.Parent.Capacitors.Two[i].Material = Enum.Material.Glass;\n        end;\n\n        return;\n    end;\n\n    if State.Value ~= \"zap\" then\n        script.Parent.Status.Green.Material = Enum.Material.Glass;\n        script.Parent.Status.Yellow.Material = Enum.Material.Glass;\n        script.Parent.Status.Red.Material = Enum.Material.Neon;\n\n        return;\n    end;\n\n    script.Parent.Base.IdleCharging:Stop();\n    script.Parent.Base[\"Electric Spark Sound \"].TimePosition = 1;\n    script.Parent.Base[\"Electric Spark Sound \"]:Play();\n    script.Parent.Status.Green.Material = Enum.Material.Neon;\n    script.Parent.Status.Yellow.Material = Enum.Material.Glass;\n    script.Parent.Status.Red.Material = Enum.Material.Glass;\n    TweenService:Create(script.Parent.Rings.RingOne, TweenInfo.new(0.2), {\n        Color = Color3.fromRGB(255, 255, 0)\n    }):Play();\n    TweenService:Create(script.Parent.Rings.RingTwo, TweenInfo.new(0.2), {\n        Color = Color3.fromRGB(255, 225, 0)\n    }):Play();\n    script.Parent.Sparks.One.Attachment.ParticleEmitter.Enabled = true;\n    script.Parent.Sparks.Two.Attachment.ParticleEmitter.Enabled = true;\n    script.Parent.Sparks.One.ParticleEmitter.Enabled = true;\n    script.Parent.Sparks.Two.ParticleEmitter.Enabled = true;\n    task.spawn(function() -- Line: 56\n        -- upvalues: TweenService (ref)\n        task.wait(0.2);\n        TweenService:Create(script.Parent.Rings.RingOne, TweenInfo.new(2.8), {\n            Color = Color3.fromRGB(100, 100, 0)\n        }):Play();\n        TweenService:Create(script.Parent.Rings.RingTwo, TweenInfo.new(2.8), {\n            Color = Color3.fromRGB(100, 100, 0)\n        }):Play();\n\n        for i = 1, 7 do\n            script.Parent.Capacitors.One[i].Material = Enum.Material.Glass;\n            script.Parent.Capacitors.Two[i].Material = Enum.Material.Glass;\n            task.wait(0.05714285714285715);\n        end;\n    end);\n    task.wait(0.3);\n    script.Parent.Sparks.One.Attachment.ParticleEmitter.Enabled = false;\n    script.Parent.Sparks.Two.Attachment.ParticleEmitter.Enabled = false;\n    script.Parent.Sparks.One.ParticleEmitter.Enabled = false;\n    script.Parent.Sparks.Two.ParticleEmitter.Enabled = false;\nend;\n\nlocal u5 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u6 = -1;\n\nfunction v4.tick() -- Line: 86\n    -- upvalues: u5 (copy), u6 (ref), u1 (copy), State (copy), u3 (copy), u2 (copy)\n    if u5:tickIsBusy() then\n        return;\n    end;\n\n    if u6 == -1 then\n        if u2:hasAmountOf(\"Uncharged Lithium-Ion Battery\", 2) and (u6 == -1 and u3:canHoldXMoreOf(\"Charged Lithium-Ion Battery\", 2)) then\n            u2:removeItem(2);\n            u6 = 0;\n        end;\n\n        return;\n    end;\n\n    if u1:hasPower(500000) then\n        u1:removePower(500000);\n        u6 = u6 + 1;\n    end;\n\n    State.Value = tostring(u6);\n\n    if u6 == 7 then\n        State.Value = \"zap\";\n        u5:nextTicks(4, function(p7) -- Line: 98\n            -- upvalues: u3 (ref), State (ref), u6 (ref)\n            if p7 == 1 then\n                u3:addItemAmount(\"Charged Lithium-Ion Battery\", 2);\n                State.Value = \"\";\n                u6 = -1;\n            end;\n        end);\n    end;\nend;\n\nreturn v4;"
};
