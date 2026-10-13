export default {
  id: "IndustrialOilSeparator",
  category: "Factories",
  tier: 3,
  cost: 150000,
  base: {
    height: 16,
    offset: {
      y: 6,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 2500000,
      transferAmount: 0,
      siteOffset: {
        y: 3.795501708984375,
        x: -1.24298095703125
      },
      gameOffset: {
        y: 9.224502563476562,
        x: -1.24298095703125,
        z: 3.795501708984375
      }
    },
    {
      name: "In1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 20,
      siteOffset: {
        y: 2.99749755859375,
        x: -1.97509765625
      },
      gameOffset: {
        y: 1.9745025634765625,
        x: -1.97509765625,
        z: 2.99749755859375
      },
      tip: "Input for Heavy Oil/Light Oil/Fracking Oil"
    },
    {
      name: "In2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 4.99749755859375,
        x: -1.97509765625
      },
      gameOffset: {
        y: 1.9745025634765625,
        x: -1.97509765625,
        z: 4.99749755859375
      },
      tip: "Input for Steam, no speed buff"
    },
    {
      name: "Out3MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 3.022491455078125,
        x: 13.9749755859375
      },
      gameOffset: {
        y: 1.9328441619873047,
        x: 13.9749755859375,
        z: 3.022491455078125
      },
      tip: "Output for Light Oil/Crude Oil"
    },
    {
      name: "Out2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -1.0075225830078125,
        x: 13.9749755859375
      },
      gameOffset: {
        y: 1.9328441619873047,
        x: 13.9749755859375,
        z: -1.0075225830078125
      },
      tip: "Output for Machine Oil/Diesel"
    },
    {
      name: "Out1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 12.972503662109375,
        x: 13.9749755859375
      },
      gameOffset: {
        y: 2.232844352722168,
        x: 13.9749755859375,
        z: 12.972503662109375
      },
      tip: "Residue output"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.Out3MainPipe);\nlocal State = script.Parent.State;\nlocal u8 = \"\";\n\nreturn {\n    localUpdate = function() -- Line: 24, Name: localUpdate\n        -- upvalues: State (copy)\n        if State.Value ~= \"Running\" then\n            if State.Value ~= \"\" then\n                script.Parent.Fire.Attachment.Fire.Enabled = true;\n                script.Parent.Base.Release:Play();\n                task.wait(2.7);\n                script.Parent.Fire.Attachment.Fire.Enabled = false;\n\n                return;\n            end;\n\n            script.Parent.Smoke1.Attachment.ParticleEmitter.Enabled = false;\n            script.Parent.Smoke2.Attachment.ParticleEmitter.Enabled = false;\n            script.Parent.Smoke3.Attachment.ParticleEmitter.Enabled = false;\n            script.Parent.Smoke4.Attachment.ParticleEmitter.Enabled = false;\n            script.Parent.Fire.Attachment.Fire.Enabled = false;\n            script.Parent.Base.ElectricalHumming:Stop();\n\n            return;\n        end;\n\n        script.Parent.Smoke1.Attachment.ParticleEmitter.Enabled = true;\n        script.Parent.Smoke2.Attachment.ParticleEmitter.Enabled = true;\n        script.Parent.Smoke3.Attachment.ParticleEmitter.Enabled = true;\n        script.Parent.Smoke4.Attachment.ParticleEmitter.Enabled = true;\n        script.Parent.Base.ElectricalHumming:Play();\n        script.Parent.Fire.Attachment.Fire.Enabled = true;\n        script.Parent.Base.Release:Play();\n        task.wait(2.7);\n        script.Parent.Fire.Attachment.Fire.Enabled = false;\n    end,\n\n    tick = function() -- Line: 53, Name: tick\n        -- upvalues: u1 (copy), u2 (copy), State (copy), u4 (copy), u3 (copy), u5 (copy), u6 (copy), u7 (copy), u8 (ref), Pollution (copy)\n        if not u1:tickIsFree() then\n            return;\n        end;\n\n        if not u2:hasPower(500000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u4:hasAmountOf(\"Steam\", 20) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if u3:hasAmountOf(\"Heavy Oil\", 4) and (u5:canHoldXMoreOf(\"Residue\", 0.5) and (u6:canHoldXMoreOf(\"Machine Oil\", 2) and u7:canHoldXMoreOf(\"Light Oil\", 1))) then\n            u8 = \"Heavy Oil\";\n            u3:removeItem(4);\n        elseif u3:hasAmountOf(\"Light Oil\", 4) and (u5:canHoldXMoreOf(\"Residue\", 1.5) and (u6:canHoldXMoreOf(\"Diesel\", 2) and u7:canHoldXMoreOf(\"Crude Oil\", 0.5))) then\n            u8 = \"Light Oil\";\n            u3:removeItem(4);\n        else\n            if not (u3:hasAmountOf(\"Fracking Oil\", 40) and (u5:canHoldXMoreOf(\"Residue\", 10) and u7:canHoldXMoreOf(\"Crude Oil\", 30))) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u8 = \"Fracking Oil\";\n            u3:removeItem(40);\n        end;\n\n        u4:removeItem(20);\n\n        if State.Value == \"\" then\n            State.Value = \"Running\";\n        else\n            State.Value = tick();\n        end;\n\n        u1:nextTicks(5, function(p9) -- Line: 77\n            -- upvalues: u8 (ref), u5 (ref), u6 (ref), u7 (ref), u2 (ref), Pollution (ref)\n            if p9 == 1 then\n                if u8 == \"Heavy Oil\" then\n                    u5:addItemAmount(\"Residue\", 0.5);\n                    u6:addItemAmount(\"Machine Oil\", 2);\n                    u7:addItemAmount(\"Light Oil\", 1);\n                elseif u8 == \"Light Oil\" then\n                    u5:addItemAmount(\"Residue\", 1.5);\n                    u6:addItemAmount(\"Diesel\", 2);\n                    u7:addItemAmount(\"Crude Oil\", 0.5);\n                elseif u8 == \"Fracking Oil\" then\n                    u5:addItemAmount(\"Residue\", 10);\n                    u7:addItemAmount(\"Crude Oil\", 30);\n                end;\n            end;\n\n            u2:removePower(100000);\n            local v10 = Pollution;\n            v10.Value = v10.Value + 45;\n        end);\n    end\n};"
};
