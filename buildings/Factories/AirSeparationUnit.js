export default {
  id: "AirSeparationUnit",
  category: "Factories",
  tier: 3,
  cost: 1500000,
  base: {
    height: 58,
    offset: {
      y: 27.000030517578125,
      x: -22
    },
    width: 48
  },
  nodes: [
    {
      name: "OutResidueMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 1.0040283203125,
        x: -45.4298095703125
      },
      gameOffset: {
        y: 1.4879229068756104,
        x: -45.4298095703125,
        z: 1.0040283203125
      },
      tip: "Outputs the Residue"
    },
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 125000000,
      transferAmount: 0,
      siteOffset: {
        y: 53.29693603515625,
        x: -43.62939453125
      },
      gameOffset: {
        y: 21.469776153564453,
        x: -43.62939453125,
        z: 53.29693603515625
      }
    },
    {
      name: "OutNitrogenMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 2000,
      transferAmount: 20,
      siteOffset: {
        y: 22.994110107421875,
        x: 1.4818115234375
      },
      gameOffset: {
        y: 1.4178621768951416,
        x: 1.4818115234375,
        z: 22.994110107421875
      },
      tip: "Output for Nitrogen"
    },
    {
      name: "OutOxygenMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 20,
      siteOffset: {
        y: 36.994110107421875,
        x: 1.4818115234375
      },
      gameOffset: {
        y: 1.4178621768951416,
        x: 1.4818115234375,
        z: 36.994110107421875
      },
      tip: "Output for Oxygen"
    },
    {
      name: "OutArgonMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 500,
      transferAmount: 20,
      siteOffset: {
        y: 50.9940185546875,
        x: 1.4818115234375
      },
      gameOffset: {
        y: 1.4178621768951416,
        x: 1.4818115234375,
        z: 50.9940185546875
      },
      tip: "Output for Argon"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutArgonMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutOxygenMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutNitrogenMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OutResidueMainPipe);\nlocal Pollution = ReplicatedStorage.Pollution;\nlocal State = script.Parent.State;\nlocal Base = script.Parent.Base;\nlocal Nitrogen = script.Parent.Base.Nitrogen;\nlocal Oxygen = script.Parent.Base.Oxygen;\nlocal Argon = script.Parent.Base.Argon;\n\nreturn {\n    localUpdate = function() -- Line: 26, Name: localUpdate\n        -- upvalues: State (copy), Nitrogen (copy), Oxygen (copy), Argon (copy), Base (copy)\n        if tonumber(State.Value) >= 100 then\n            Nitrogen.ParticleEmitter.Enabled = true;\n\n            if Nitrogen.Venting.Playing == false then\n                Nitrogen.Venting:Play();\n            end;\n        else\n            Nitrogen.ParticleEmitter.Enabled = false;\n\n            if Nitrogen.Venting.Playing == true then\n                Nitrogen.Venting:Stop();\n            end;\n        end;\n\n        if tonumber(State.Value) - 100 >= 10 then\n            Oxygen.ParticleEmitter.Enabled = true;\n\n            if Oxygen.Venting.Playing == false then\n                Oxygen.Venting:Play();\n            end;\n        elseif tonumber(State.Value) >= 10 and tonumber(State.Value) < 100 then\n            Oxygen.ParticleEmitter.Enabled = true;\n\n            if Oxygen.Venting.Playing == false then\n                Oxygen.Venting:Play();\n            end;\n        else\n            Oxygen.ParticleEmitter.Enabled = false;\n\n            if Oxygen.Venting.Playing == true then\n                Oxygen.Venting:Stop();\n            end;\n        end;\n\n        if tonumber(State.Value) % 2 == 1 then\n            Argon.ParticleEmitter.Enabled = true;\n\n            if Argon.Venting.Playing == false then\n                Argon.Venting:Play();\n            end;\n        else\n            Argon.ParticleEmitter.Enabled = false;\n\n            if Argon.Venting.Playing == true then\n                Argon.Venting:Stop();\n            end;\n        end;\n\n        if State.Value == \"111\" or tonumber(State.Value) <= 0 then\n            Base.CoolerShort.ParticleEmitter.Enabled = false;\n        else\n            Base.CoolerShort.ParticleEmitter.Enabled = true;\n        end;\n\n        if tonumber(State.Value) >= 1 then\n            Base.CoolerTall.ParticleEmitter.Enabled = true;\n\n            if Base.Sound.Playing == false then\n                Base.Sound:Play();\n            end;\n        else\n            Base.CoolerTall.ParticleEmitter.Enabled = false;\n\n            if Base.Sound.Playing == true then\n                Base.Sound:Stop();\n            end;\n        end;\n    end,\n\n    tick = function() -- Line: 83, Name: tick\n        -- upvalues: u1 (copy), State (copy), Pollution (copy), u5 (copy), u4 (copy), u3 (copy), u2 (copy)\n        if u1:getBuffer() < 20000000 then\n            State.Value = \"0\";\n\n            return;\n        end;\n\n        local v6 = math.clamp(Pollution.Value / 500000 / 10, 1, 20);\n\n        if not u5:canHoldXMoreOf(\"Residue\", v6) then\n            State.Value = \"0\";\n\n            return;\n        end;\n\n        local v7 = 0;\n\n        if not u4:isFull() then\n            v7 = v7 + 100;\n        end;\n\n        if not u3:isFull() then\n            v7 = v7 + 10;\n        end;\n\n        if not u2:isFull() then\n            v7 = v7 + 1;\n        end;\n\n        State.Value = v7;\n        u1:removePower(20000000);\n        u5:addItemAmount(\"Residue\", v6);\n        u4:setUsedTemperature(-205);\n        local v8 = u4:getMax() - u4:getBuffer();\n        u4:addItemAmount(\"Liquid Nitrogen\", (math.clamp(60, 0, v8)));\n        u3:setUsedTemperature(-190);\n        local v9 = u3:getMax() - u3:getBuffer();\n        u3:addItemAmount(\"Liquid Oxygen\", (math.clamp(15, 0, v9)));\n        u2:setUsedTemperature(-195);\n        local v10 = u2:getMax() - u2:getBuffer();\n        u2:addItemAmount(\"Liquid Argon\", (math.clamp(3, 0, v10)));\n    end\n};"
};
