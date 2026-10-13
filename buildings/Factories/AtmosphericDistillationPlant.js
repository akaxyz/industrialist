export default {
  id: "AtmosphericDistillationPlant",
  category: "Factories",
  tier: 3,
  cost: 1000000,
  base: {
    height: 32,
    offset: {
      y: -10,
      x: -14
    },
    width: 32
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 5000000,
      transferAmount: 0,
      siteOffset: {
        y: -4.6015625,
        x: -6.16839599609375
      },
      gameOffset: {
        y: 18.176164627075195,
        x: -6.16839599609375,
        z: -4.6015625
      }
    },
    {
      name: "Out2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -11.000244140625,
        x: 1.10028076171875
      },
      gameOffset: {
        y: 2.430767059326172,
        x: 1.10028076171875,
        z: -11.000244140625
      },
      tip: "Output for Heavy Oil/Distilled Water"
    },
    {
      name: "Out3MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -13.000244140625,
        x: 1.10028076171875
      },
      gameOffset: {
        y: 2.430767059326172,
        x: 1.10028076171875,
        z: -13.000244140625
      },
      tip: "Output for Light Oil"
    },
    {
      name: "Out5MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -19.000244140625,
        x: 1.10028076171875
      },
      gameOffset: {
        y: 2.430767059326172,
        x: 1.10028076171875,
        z: -19.000244140625
      },
      tip: "Output for Gasoline"
    },
    {
      name: "Out4MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -17.000244140625,
        x: 1.10028076171875
      },
      gameOffset: {
        y: 2.430767059326172,
        x: 1.10028076171875,
        z: -17.000244140625
      },
      tip: "Output for Naphta"
    },
    {
      name: "Out6MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 800,
      transferAmount: 20,
      siteOffset: {
        y: -21.000244140625,
        x: 1.10028076171875
      },
      gameOffset: {
        y: 2.430767059326172,
        x: 1.10028076171875,
        z: -21.000244140625
      },
      tip: "Output for Water-Free Gas"
    },
    {
      name: "Out7MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -23.000244140625,
        x: 1.10028076171875
      },
      gameOffset: {
        y: 2.430767059326172,
        x: 1.10028076171875,
        z: -23.000244140625
      },
      tip: "Output for Crude Oil"
    },
    {
      name: "Out1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -9.000244140625,
        x: 1.10028076171875
      },
      gameOffset: {
        y: 2.430767059326172,
        x: 1.10028076171875,
        z: -9.000244140625
      },
      tip: "Output for Residue/Concentrated Salt Solution"
    },
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 800,
      transferAmount: 20,
      siteOffset: {
        y: 1.11297607421875,
        x: 1.15167236328125
      },
      gameOffset: {
        y: 3.0107154846191406,
        x: 1.15167236328125,
        z: 1.11297607421875
      },
      tip: "Input for Fracking Oil/Water"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal State = script.Parent.State;\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.Out3MainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.Out4MainPipe);\nlocal u8 = PipeUtilsV2.loadConnector(script.Parent.Out5MainPipe);\nlocal u9 = PipeUtilsV2.loadConnector(script.Parent.Out6MainPipe);\nlocal u10 = PipeUtilsV2.loadConnector(script.Parent.Out7MainPipe);\nlocal u11 = 0;\nlocal u12 = \"\";\n\nreturn {\n    localUpdate = function() -- Line: 27, Name: localUpdate\n        -- upvalues: State (copy), u11 (ref)\n        if State.Value == \"Running\" then\n            script.Parent.Base[\"Oil Refinery Ambience 2 (SFX)\"]:Play();\n\n            if u11 > 0 then\n                script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = true;\n            end;\n        elseif State.Value == \"\" then\n            script.Parent.Base[\"Oil Refinery Ambience 2 (SFX)\"]:stop();\n            script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = false;\n        end;\n    end,\n\n    tick = function() -- Line: 39, Name: tick\n        -- upvalues: u1 (copy), u2 (copy), State (copy), u3 (copy), u4 (copy), u5 (copy), u6 (copy), u7 (copy), u8 (copy), u9 (copy), u10 (copy), u12 (ref), u11 (ref), Pollution (copy)\n        if not u1:tickIsFree() then\n            return;\n        end;\n\n        if not u2:hasPower(5000000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if u3:hasAmountOf(\"Fracking Oil\", 200) then\n            if not u4:canHoldXMoreOf(\"Residue\", 10) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u5:canHoldXMoreOf(\"Heavy Oil\", 40) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u6:canHoldXMoreOf(\"Light Oil\", 80) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u7:canHoldXMoreOf(\"Naphtha\", 10) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u8:canHoldXMoreOf(\"Gasoline\", 20) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u9:canHoldXMoreOf(\"Water-Free Gas\", 720) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u10:canHoldXMoreOf(\"Crude Oil\", 20) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u12 = \"Fracking\";\n            u11 = 90;\n        else\n            if not u3:hasAmountOf(\"Water\", 200) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u4:canHoldXMoreOf(\"Concentrated Salt Solution\", 64) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            if not u5:canHoldXMoreOf(\"Distilled Water\", 136) then\n                State.Value = \"\";\n\n                return;\n            end;\n\n            u12 = \"Water\";\n            u11 = 0;\n        end;\n\n        State.Value = \"Running\";\n        u1:nextTicks(8, function(p13) -- Line: 59\n            -- upvalues: u3 (ref), u2 (ref), Pollution (ref), u11 (ref), u12 (ref), u5 (ref), u6 (ref), u7 (ref), u8 (ref), u9 (ref), u10 (ref), u4 (ref)\n            u3:removeItem(25);\n            u2:removePower(625000);\n            local v14 = Pollution;\n            v14.Value = v14.Value + u11;\n\n            if u12 == \"Fracking\" then\n                u5:addItemAmount(\"Heavy Oil\", 5);\n                u6:addItemAmount(\"Light Oil\", 10);\n                u7:addItemAmount(\"Naphtha\", 1.25);\n                u8:addItemAmount(\"Gasoline\", 2.5);\n                u9:addItemAmount(\"Water-Free Gas\", 90);\n                u10:addItemAmount(\"Crude Oil\", 2.5);\n\n                if p13 == 1 then\n                    u4:addItemAmount(\"Residue\", 10);\n                end;\n            elseif u12 == \"Water\" then\n                u4:addItemAmount(\"Concentrated Salt Solution\", 8);\n                u5:addItemAmount(\"Distilled Water\", 17);\n            end;\n        end);\n    end\n};"
};
