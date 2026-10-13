export default {
  id: "BlastFurnaceMK2",
  category: "Factories",
  tier: 3,
  cost: 5000000,
  base: {
    height: 32,
    offset: {
      y: -14,
      x: 0
    },
    width: 32
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 25000000,
      transferAmount: 0,
      siteOffset: {
        y: -28.173274993896484,
        x: -1.6324462890625
      },
      gameOffset: {
        y: 14.570856094360352,
        x: -1.6324462890625,
        z: -28.173274993896484
      }
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 700,
      transferAmount: 20,
      siteOffset: {
        y: 1.42498779296875,
        x: -1
      },
      gameOffset: {
        y: 1.325005054473877,
        x: -1,
        z: 1.42498779296875
      }
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: 1.42498779296875,
        x: 1
      },
      gameOffset: {
        y: 1.325005054473877,
        x: 1,
        z: 1.42498779296875
      }
    },
    {
      name: "InCoalMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 400,
      transferAmount: 20,
      siteOffset: {
        y: 1.42498779296875,
        x: 3
      },
      gameOffset: {
        y: 1.325005054473877,
        x: 3,
        z: 1.42498779296875
      },
      tip: "Input for Coal, Coke Fuel"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.EffectUtils).new(script);\nlocal u2 = require(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InCoalMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u6 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal TweenService = game:GetService(\"TweenService\");\nlocal State = script.Parent.State;\nlocal Particles = script.Parent.Particles;\nlocal u7 = false;\nlocal u8 = 0;\nlocal v9 = {\n    localUpdate = function() -- Line: 25, Name: localUpdate\n        -- upvalues: State (copy), Particles (copy)\n        if State.Value ~= \"running\" then\n            if State.Value == \"\" then\n                Particles.Smoke.Attachment.Smoke.Enabled = false;\n                script.Parent.Base.running:Stop();\n            end;\n\n            return;\n        end;\n\n        Particles.Smoke.Attachment.Smoke.Enabled = true;\n        script.Parent.Base.running:Play();\n    end\n};\n\nfunction firststartup(p10)\n    -- upvalues: Particles (copy), TweenService (copy)\n    Particles.Fire1[\"BURNING FLOOR\"].Enabled = p10;\n    Particles.Fire1.FLAMES.Enabled = p10;\n    Particles.Fire1.SPECKS.Enabled = p10;\n    Particles.Fire2[\"BURNING FLOOR\"].Enabled = p10;\n    Particles.Fire2.FLAMES.Enabled = p10;\n    Particles.Fire2.SPECKS.Enabled = p10;\n    Particles.Steam.Steam.Enabled = p10;\n\n    if not p10 then\n        TweenService:Create(script.Parent.Vent, TweenInfo.new(6), {\n            Color = Color3.fromRGB(171, 171, 171)\n        }):Play();\n\n        return;\n    end;\n\n    script.Parent.Base.Alarm:Play();\n    script.Parent.Base.Fire:Play();\n    TweenService:Create(script.Parent.Vent, TweenInfo.new(2), {\n        Color = Color3.fromRGB(171, 100, 100)\n    }):Play();\nend;\n\nlocal u11 = { { { \"Coal\", 300 }, { \"Iron Ingot\", 100 }, { \"Steel Ingot\", 200 }, 20, 25000000, 50 }, { { \"Coal\", 200 }, { \"Oak Log\", 50 }, { \"Coke Fuel\", 300 }, 20, 25000000, 50 }, { { \"Coke Fuel\", 200 }, { \"Oak Log\", 10 }, { \"Coke Fuel\", 300 }, 20, 25000000, 50 }, { { \"Coke Fuel\", 50 }, { \"Iron Ingot\", 100 }, { \"Steel Ingot\", 300 }, 20, 25000000, 50 } };\n\nfunction v9.tick() -- Line: 90\n    -- upvalues: u2 (copy), u11 (copy), u3 (copy), State (copy), u4 (copy), u5 (copy), u6 (copy), u8 (ref), u7 (ref), TweenService (copy), u1 (copy), Pollution (copy)\n    if not u2:tickIsFree() then\n        return;\n    end;\n\n    for _, v in pairs(u11) do\n        if u3:hasAmountOf(v[1][1], v[1][2]) then\n            if u4:hasAmountOf(v[2][1], v[2][2]) then\n                if u5:canHoldXMoreOf(v[3][1], v[3][2]) then\n                    if not u6:hasPower(v[5]) then\n                        State.Value = \"\";\n                        u8 = u8 - 1;\n\n                        return;\n                    end;\n\n                    u4:removeItem(v[2][2]);\n                    State.Value = \"running\";\n\n                    if u7 == false then\n                        firststartup(true);\n                        u7 = true;\n                    end;\n\n                    TweenService:Create(script.Parent.Vent, TweenInfo.new(v[4] / 2), {\n                        Color = Color3.fromRGB(171, 100, 100)\n                    }):Play();\n                    u2:nextTicks(v[4], function(p12) -- Line: 108\n                        -- upvalues: u5 (ref), v (copy), u1 (ref), u6 (ref), u3 (ref), Pollution (ref), TweenService (ref)\n                        if p12 == 1 then\n                            u5:setUsedTemperature(300);\n                            u5:addItemAmount(v[3][1], v[3][2]);\n                            u1:setState(\"running\", false);\n                        end;\n\n                        u6:removePower(v[5] / v[4]);\n                        u3:removeItem(v[1][2] / v[4]);\n                        local v13 = Pollution;\n                        v13.Value = v13.Value + v[6];\n\n                        if p12 == v[4] - 4 then\n                            firststartup(false);\n                            script.Parent.Base.Fire:Stop();\n                            script.Parent.Base.Alarm:Stop();\n                        end;\n\n                        if p12 == v[4] / 2 then\n                            TweenService:Create(script.Parent.Vent, TweenInfo.new(v[4] / 2), {\n                                Color = Color3.fromRGB(171, 171, 171)\n                            }):Play();\n                        end;\n                    end);\n\n                    return;\n                end;\n\n                State.Value = \"\";\n            else\n                State.Value = \"\";\n            end;\n        else\n            State.Value = \"\";\n        end;\n    end;\nend;\n\nreturn v9;"
};
