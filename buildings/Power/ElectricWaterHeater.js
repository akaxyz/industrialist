export default {
  id: "ElectricWaterHeater",
  category: "Power",
  tier: 3,
  cost: 100020,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: 3
    },
    width: 10
  },
  nodes: [
    {
      name: "WaterMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 1,
      siteOffset: {
        y: 1.57916259765625,
        x: 1.00030517578125
      },
      gameOffset: {
        y: 1.3747100830078125,
        x: 1.00030517578125,
        z: 1.57916259765625
      },
      tip: "Cold Water in"
    },
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 10,
      siteOffset: {
        y: -13.559234619140625,
        x: 0.99969482421875
      },
      gameOffset: {
        y: 1.4497108459472656,
        x: 0.99969482421875,
        z: -13.559234619140625
      },
      tip: "Hot Water out"
    },
    {
      name: "HVMainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 10000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.9962005615234375,
        x: 5.43365478515625
      },
      gameOffset: {
        y: 7.644457817077637,
        x: 5.43365478515625,
        z: -0.9962005615234375
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 5000000,
      transferAmount: 0,
      siteOffset: {
        y: -8.896209716796875,
        x: 5.43365478515625
      },
      gameOffset: {
        y: 7.644457817077637,
        x: 5.43365478515625,
        z: -8.896209716796875
      }
    }
  ],
  data: {
    Temp: 220
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.WaterMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = PowerUtilsV2.loadConnector(script.Parent.HVMainConnector);\nlocal State = script.Parent.State;\nlocal Temp = script.Parent.ModelData.Temp;\nscript.Parent[\"120\"].ClickDetector.MouseClick:Connect(function() -- Line: 15\n    -- upvalues: Temp (copy)\n    Temp.Value = 120;\nend);\nscript.Parent[\"220\"].ClickDetector.MouseClick:Connect(function() -- Line: 18\n    -- upvalues: Temp (copy)\n    Temp.Value = 220;\nend);\nscript.Parent[\"320\"].ClickDetector.MouseClick:Connect(function() -- Line: 21\n    -- upvalues: Temp (copy)\n    Temp.Value = 320;\nend);\nlocal v5 = {};\nlocal Lights = script.Parent.Lights;\nlocal u6 = Color3.fromRGB(255, 0, 0);\nlocal u7 = Color3.fromRGB(0, 255, 0);\nlocal u8 = script.Parent.Base[\"Electrical Humming\"];\n\nfunction v5.localUpdate() -- Line: 33\n    -- upvalues: State (copy), Lights (copy), u8 (copy), u7 (copy), u6 (copy)\n    local v9 = tonumber(State.Value) or 0;\n\n    for _, child in pairs(Lights.Leds:GetChildren()) do\n        if tonumber(child.Name) < v9 then\n            child.Material = Enum.Material.Neon;\n        else\n            child.Material = Enum.Material.SmoothPlastic;\n        end;\n    end;\n\n    if v9 == 3 then\n        if u8.Playing == false then\n            u8:Play();\n        end;\n\n        u8.Volume = 0.2;\n        u8.Pitch = 1;\n        Lights.FirstHeater.a.Color = u7;\n        Lights.FirstHeater.b.Color = u7;\n        Lights.SecondHeater.a.Color = u6;\n        Lights.SecondHeater.b.Color = u6;\n        Lights.ThirdHeater.a.Color = u6;\n        Lights.ThirdHeater.b.Color = u6;\n\n        return;\n    end;\n\n    if v9 == 6 then\n        if u8.Playing == false then\n            u8:Play();\n        end;\n\n        u8.Volume = 0.4;\n        u8.Pitch = 0.9;\n        Lights.FirstHeater.a.Color = u7;\n        Lights.FirstHeater.b.Color = u7;\n        Lights.SecondHeater.a.Color = u7;\n        Lights.SecondHeater.b.Color = u7;\n        Lights.ThirdHeater.a.Color = u6;\n        Lights.ThirdHeater.b.Color = u6;\n\n        return;\n    end;\n\n    if v9 ~= 9 then\n        Lights.FirstHeater.a.Color = u6;\n        Lights.FirstHeater.b.Color = u6;\n        Lights.SecondHeater.a.Color = u6;\n        Lights.SecondHeater.b.Color = u6;\n        Lights.ThirdHeater.a.Color = u6;\n        Lights.ThirdHeater.b.Color = u6;\n        u8:Stop();\n\n        return;\n    end;\n\n    if u8.Playing == false then\n        u8:Play();\n    end;\n\n    u8.Volume = 0.5;\n    u8.Pitch = 0.8;\n    Lights.FirstHeater.a.Color = u7;\n    Lights.FirstHeater.b.Color = u7;\n    Lights.SecondHeater.a.Color = u7;\n    Lights.SecondHeater.b.Color = u7;\n    Lights.ThirdHeater.a.Color = u7;\n    Lights.ThirdHeater.b.Color = u7;\nend;\n\nlocal function blink(p10) -- Line: 103\n    -- upvalues: Lights (copy)\n    local v11 = Lights.Leds[p10];\n\n    if v11.Material == Enum.Material.SmoothPlastic then\n        v11.Material = Enum.Material.Neon;\n\n        return;\n    end;\n\n    v11.Material = Enum.Material.SmoothPlastic;\nend;\n\nlocal u12 = nil;\nlocal u13 = 1;\n\nfunction v5.tick() -- Line: 115\n    -- upvalues: u1 (copy), u12 (ref), Lights (copy), u7 (copy), u6 (copy), State (copy), u2 (copy), u13 (ref), Temp (copy), u3 (copy), u4 (copy)\n    if not (u1:hasAmountOf(\"Water\", 6) or (u1:hasAmountOf(\"Filtered Water\", 6) or u1:hasAmountOf(\"Distilled Water\", 6))) then\n        Lights.Input.Color = u6;\n        State.Value = \"0\";\n\n        return;\n    end;\n\n    u12 = u1:getItem();\n    Lights.Input.Color = u7;\n\n    if not u2:canHoldXMoreOf(tostring(u12), 6) then\n        Lights.Output.Color = u6;\n        State.Value = \"0\";\n\n        return;\n    end;\n\n    Lights.Output.Color = u7;\n    u13 = 1;\n\n    if tostring(u12) == \"Distilled Water\" then\n        u13 = 4;\n    end;\n\n    if Temp.Value == 120 and u3:hasPower(u13 * 300000) then\n        State.Value = \"3\";\n        u3:removePower(u13 * 300000);\n        u2:setUsedTemperature(120);\n        local v14 = Lights.Leds[3];\n\n        if v14.Material == Enum.Material.SmoothPlastic then\n            v14.Material = Enum.Material.Neon;\n        else\n            v14.Material = Enum.Material.SmoothPlastic;\n        end;\n    elseif Temp.Value == 220 and u3:hasPower(u13 * 800000) then\n        State.Value = \"6\";\n        u3:removePower(u13 * 800000);\n        u2:setUsedTemperature(220);\n        local v15 = Lights.Leds[6];\n\n        if v15.Material == Enum.Material.SmoothPlastic then\n            v15.Material = Enum.Material.Neon;\n        else\n            v15.Material = Enum.Material.SmoothPlastic;\n        end;\n    else\n        if Temp.Value ~= 320 or not u4:hasPower(u13 * 1500000) then\n            State.Value = \"0\";\n\n            return;\n        end;\n\n        State.Value = \"9\";\n        u4:removePower(u13 * 1500000);\n        u2:setUsedTemperature(320);\n        local v16 = Lights.Leds[9];\n\n        if v16.Material == Enum.Material.SmoothPlastic then\n            v16.Material = Enum.Material.Neon;\n        else\n            v16.Material = Enum.Material.SmoothPlastic;\n        end;\n    end;\n\n    u1:removeItem(6);\n    u2:addItemAmount(tostring(u12), 6);\nend;\n\nreturn v5;"
};
