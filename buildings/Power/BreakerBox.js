export default {
  id: "BreakerBox",
  category: "Power",
  tier: 3,
  cost: 75000,
  base: {
    height: 6,
    offset: {
      y: 1,
      x: 1
    },
    width: 6
  },
  nodes: [
    {
      name: "Out4MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 450000,
      siteOffset: {
        y: 0.9449710845947266,
        x: 3.1475372314453125
      },
      gameOffset: {
        y: 13.25238037109375,
        x: 3.1475372314453125,
        z: 0.9449710845947266
      }
    },
    {
      name: "Out3MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 450000,
      siteOffset: {
        y: 0.9449710845947266,
        x: 3.1475372314453125
      },
      gameOffset: {
        y: 12.389881134033203,
        x: 3.1475372314453125,
        z: 0.9449710845947266
      }
    },
    {
      name: "Out2MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 450000,
      siteOffset: {
        y: 0.9449710845947266,
        x: 3.1475372314453125
      },
      gameOffset: {
        y: 11.52737045288086,
        x: 3.1475372314453125,
        z: 0.9449710845947266
      }
    },
    {
      name: "Out1MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 1000000,
      transferAmount: 450000,
      siteOffset: {
        y: 0.9449710845947266,
        x: 3.1475372314453125
      },
      gameOffset: {
        y: 10.664886474609375,
        x: 3.1475372314453125,
        z: 0.9449710845947266
      }
    },
    {
      name: "In1MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 1.7762451171875,
        x: 2.3912601470947266
      },
      gameOffset: {
        y: 10.29738998413086,
        x: 2.3912601470947266,
        z: 1.7762451171875
      }
    },
    {
      name: "In2MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 1.7762451171875,
        x: 2.3912601470947266
      },
      gameOffset: {
        y: 11.159889221191406,
        x: 2.3912601470947266,
        z: 1.7762451171875
      }
    },
    {
      name: "In4MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 1.7762451171875,
        x: 2.3912601470947266
      },
      gameOffset: {
        y: 12.884891510009766,
        x: 2.3912601470947266,
        z: 1.7762451171875
      }
    },
    {
      name: "In3MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: 1.7762451171875,
        x: 2.3912601470947266
      },
      gameOffset: {
        y: 12.022384643554688,
        x: 2.3912601470947266,
        z: 1.7762451171875
      }
    }
  ],
  data: {
    BreakerData: "0|0|0|0"
  },
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal _ = script.Parent.ModelData;\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.In1MainConnector, true);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.In2MainConnector, true);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.In3MainConnector, true);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.In4MainConnector, true);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.Out1MainConnector, true);\nlocal u6 = PowerUtilsV2.loadConnector(script.Parent.Out2MainConnector, true);\nlocal u7 = PowerUtilsV2.loadConnector(script.Parent.Out3MainConnector, true);\nlocal u8 = PowerUtilsV2.loadConnector(script.Parent.Out4MainConnector, true);\nlocal u9 = {\n    script.Parent.Line1,\n    script.Parent.Line2,\n    script.Parent.Line3,\n    script.Parent.Line4\n};\nlocal BreakerData = script.Parent.ModelData.BreakerData;\n\nlocal function button(p10, p11) -- Line: 32\n    -- upvalues: u9 (copy)\n    local v12 = u9[p10];\n\n    if p11 ~= false then\n        if p11 == true then\n            v12.Light.Color = Color3.fromRGB(0, 255, 0);\n            v12.OtherThing.Color = Color3.fromRGB(0, 255, 0);\n            v12.On.Transparency = 0;\n            v12.Off.Transparency = 1;\n            script.Parent.Base[\"breaker (not flyswatter)\"]:Play();\n        end;\n\n        return;\n    end;\n\n    v12.Light.Color = Color3.fromRGB(255, 0, 0);\n    v12.OtherThing.Color = Color3.fromRGB(255, 0, 0);\n    v12.On.Transparency = 1;\n    v12.Off.Transparency = 0;\n    script.Parent.Base[\"breaker (not flyswatter)\"]:Play();\nend;\n\nlocal u13 = 0;\nlocal u14 = nil;\n\nfor i = 1, 4 do\n    if game.Players.LocalPlayer ~= nil then\n        break;\n    end;\n\n    u9[i].Part.ClickDetector.MouseClick:Connect(function() -- Line: 53\n        -- upvalues: BreakerData (copy), i (copy), u9 (copy), u14 (ref)\n        local v15 = string.split(BreakerData.Value, \"|\");\n\n        if v15[i] == \"1\" then\n            v15[i] = \"0\";\n            local v16 = u9[i];\n            v16.Light.Color = Color3.fromRGB(255, 0, 0);\n            v16.OtherThing.Color = Color3.fromRGB(255, 0, 0);\n            v16.On.Transparency = 1;\n            v16.Off.Transparency = 0;\n            script.Parent.Base[\"breaker (not flyswatter)\"]:Play();\n        else\n            v15[i] = \"1\";\n            local v17 = u9[i];\n            v17.Light.Color = Color3.fromRGB(0, 255, 0);\n            v17.OtherThing.Color = Color3.fromRGB(0, 255, 0);\n            v17.On.Transparency = 0;\n            v17.Off.Transparency = 1;\n            script.Parent.Base[\"breaker (not flyswatter)\"]:Play();\n        end;\n\n        u14 = v15;\n        BreakerData.Value = table.concat(v15, \"|\");\n    end);\nend;\n\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u18 = false;\nlocal u19 = ModelTweenUtils.new(script.Parent.Door);\nlocal CFrame = script.Parent.HingeOpen.CFrame;\nlocal u20 = u19:GetPivot();\nlocal v21 = {\n    localUpdate = function() -- Line: 80, Name: localUpdate\n        -- upvalues: u19 (copy), CFrame (copy), u20 (copy)\n        if script.Parent.State.Value == \"true\" then\n            script.Parent.Base[\"Door Opening\"]:Play();\n            u19:newTween(TweenInfo.new(1), CFrame):Play();\n\n            return;\n        end;\n\n        script.Parent.Base[\"Door Close\"]:Play();\n        u19:newTween(TweenInfo.new(0.5), u20):Play();\n    end\n};\n\nif game.Players.LocalPlayer == nil then\n    script.Parent.Door.Door.ClickDetector.MouseClick:Connect(function() -- Line: 92\n        -- upvalues: u18 (ref)\n        u18 = not u18;\n        script.Parent.State.Value = tostring(u18);\n    end);\nend;\n\nfunction v21.tick() -- Line: 107\n    -- upvalues: u14 (ref), BreakerData (copy), u9 (copy), u13 (ref), u1 (copy), u5 (copy), u2 (copy), u6 (copy), u3 (copy), u7 (copy), u4 (copy), u8 (copy)\n    if u14 == nil then\n        u14 = string.split(BreakerData.Value, \"|\");\n\n        for i, v in ipairs(u14) do\n            if v == \"1\" then\n                local v22 = u9[i];\n                v22.Light.Color = Color3.fromRGB(0, 255, 0);\n                v22.OtherThing.Color = Color3.fromRGB(0, 255, 0);\n                v22.On.Transparency = 0;\n                v22.Off.Transparency = 1;\n                script.Parent.Base[\"breaker (not flyswatter)\"]:Play();\n            end;\n        end;\n    end;\n\n    if u14[1] == \"1\" then\n        local v23 = u1:getBuffer();\n        u13 = math.clamp(v23, 0, 250000);\n        local v24 = u5:getMax() - u5:getBuffer();\n        u13 = math.clamp(v24, 0, u13);\n        u5:addPower(u13);\n        u1:removePower(u13);\n    end;\n\n    if u14[2] == \"1\" then\n        local v25 = u2:getBuffer();\n        u13 = math.clamp(v25, 0, 250000);\n        local v26 = u6:getMax() - u6:getBuffer();\n        u13 = math.clamp(v26, 0, u13);\n        u6:addPower(u13);\n        u2:removePower(u13);\n    end;\n\n    if u14[3] == \"1\" then\n        local v27 = u3:getBuffer();\n        u13 = math.clamp(v27, 0, 250000);\n        local v28 = u7:getMax() - u7:getBuffer();\n        u13 = math.clamp(v28, 0, u13);\n        u7:addPower(u13);\n        u3:removePower(u13);\n    end;\n\n    if u14[4] == \"1\" then\n        local v29 = u4:getBuffer();\n        u13 = math.clamp(v29, 0, 250000);\n        local v30 = u8:getMax() - u8:getBuffer();\n        u13 = math.clamp(v30, 0, u13);\n        u8:addPower(u13);\n        u4:removePower(u13);\n    end;\nend;\n\nreturn v21;"
};
