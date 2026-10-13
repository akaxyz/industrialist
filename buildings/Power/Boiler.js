export default {
  id: "Boiler",
  category: "Power",
  tier: 2,
  cost: 900,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: -4
    },
    width: 12
  },
  nodes: [
    {
      name: "WaterMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 5,
      transferAmount: 1,
      siteOffset: {
        y: 12.999649047851562,
        x: 1.959197998046875
      },
      gameOffset: {
        y: 2.0359959602355957,
        x: 1.959197998046875,
        z: 12.999649047851562
      },
      tip: "Water in (to convert to steam)"
    },
    {
      name: "SteamMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 90,
      transferAmount: 20,
      siteOffset: {
        y: 10.999649047851562,
        x: 1.959197998046875
      },
      gameOffset: {
        y: 2.0359959602355957,
        x: 1.959197998046875,
        z: 10.999649047851562
      },
      tip: "Steam Out (To Turbine)"
    },
    {
      name: "CoolantInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 5,
      siteOffset: {
        y: 4.9996490478515625,
        x: 1.920196533203125
      },
      gameOffset: {
        y: 2.0359959602355957,
        x: 1.920196533203125,
        z: 4.9996490478515625
      },
      tip: "Hot water in"
    },
    {
      name: "CoolantOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 10,
      transferAmount: 5,
      siteOffset: {
        y: 2.9996414184570312,
        x: 1.959197998046875
      },
      gameOffset: {
        y: 2.0359959602355957,
        x: 1.959197998046875,
        z: 2.9996414184570312
      },
      tip: "Used water out"
    }
  ],
  data: {
    Temp: 18
  },
  updateEvery: 10,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.CoolantInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.CoolantOutMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.WaterMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.SteamMainPipe);\nlocal SteamWhistle = script.Parent.SteamWhistle;\nlocal Temp = script.Parent.ModelData.Temp;\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal u5 = 1;\nlocal v6 = {\n    localUpdate = function() -- Line: 24, Name: localUpdate\n        -- upvalues: SteamWhistle (copy)\n        if script.Parent.State.Value == \"Whistle\" then\n            SteamWhistle.ParticleEmitter.Enabled = true;\n\n            return;\n        end;\n\n        SteamWhistle.ParticleEmitter.Enabled = false;\n    end\n};\nlocal u7 = 0;\n\nfunction v6.tick() -- Line: 34\n    -- upvalues: u7 (ref), Temp (copy), u1 (copy), u2 (copy), u5 (ref), Achievements (copy), u3 (copy), u4 (copy)\n    u7 = u7 + 1;\n\n    if u7 % 3 == 0 then\n        script.Parent.Model.Thermostat.SurfaceGui.Frame.TextLabel.Text = math.floor(Temp.Value) .. \"°C\";\n    end;\n\n    local v8 = u1:getTemp();\n\n    if u1:hasAmount(1) and u2:canHoldXMore(1) then\n        local v9 = 25;\n        u5 = 1;\n        local v10 = u1:getItem();\n\n        if v10 == \"Water\" then\n            v9 = 1000;\n            u5 = 1;\n        elseif v10 == \"Hot Crude Oil\" then\n            v9 = 80;\n            u5 = 1;\n        elseif v10 == \"Distilled Water\" then\n            Achievements.giveBadge(4119854850772384);\n            v9 = 1000;\n            u5 = 1.2;\n        elseif v10 == \"Filtered Water\" then\n            v9 = 1000;\n            u5 = 1.1;\n        end;\n\n        local _ = Temp.Value * 75000;\n        local v11 = v8 - Temp.Value;\n        local v12 = Temp;\n        v12.Value = v12.Value + v11 * v9 * u5 / 75000;\n\n        if u3:getTemp() < v8 then\n            u2:setUsedTemperature((math.clamp(v8 - v11 - v8 * 0.1, 18, (1 / 0))));\n        else\n            local v13 = v8 - v11 - u3:getTemp() * 0.1;\n            u2:setUsedTemperature((math.clamp(v13, 18, (1 / 0))));\n        end;\n\n        u1:removeItem(1);\n        u2:addItem(1, v10);\n    elseif Temp.Value > 18 then\n        Temp.Value = Temp.Value - 0.25;\n    end;\n\n    if u3:hasAmountOf(\"Water\", 1) then\n        if u4:canHoldXMore(30) then\n            script.Parent.State.Value = \"\";\n\n            if Temp.Value > 100 then\n                local v14 = u3:getTemp();\n                u3:removeItem(1);\n                local v15 = (Temp.Value - v14) * 1000;\n                u4:setUsedTemperature(Temp.Value);\n\n                if Temp.Value >= 500 then\n                    Achievements.giveBadge(4213326512100053);\n                end;\n\n                u4:addItem(30, \"Steam\");\n                local v16 = Temp;\n                v16.Value = v16.Value - v15 / 75000;\n                Achievements.giveBadge(2151892350);\n            end;\n        else\n            script.Parent.State.Value = \"Whistle\";\n        end;\n    end;\nend;\n\nreturn v6;"
};
