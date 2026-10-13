export default {
  id: "LargeDieselEngine",
  category: "Power",
  tier: 3,
  cost: 100000,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: 12
    },
    width: 28
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "output",
      maxAmount: 75000000,
      transferAmount: 4000000,
      siteOffset: {
        y: -3.798980712890625,
        x: 0.7320175170898438
      },
      gameOffset: {
        y: 4.568051338195801,
        x: 0.7320175170898438,
        z: -3.798980712890625
      }
    },
    {
      name: "In3MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 0.98968505859375,
        x: -1.6918067932128906
      },
      gameOffset: {
        y: 1.6382701396942139,
        x: -1.6918067932128906,
        z: 0.98968505859375
      },
      tip: "Input for Machine Oil"
    },
    {
      name: "In1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -7.01031494140625,
        x: -1.6918067932128906
      },
      gameOffset: {
        y: 1.6382701396942139,
        x: -1.6918067932128906,
        z: -7.01031494140625
      },
      tip: "Input for Diesel Variants"
    },
    {
      name: "In2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: -3.01031494140625,
        x: -1.6918067932128906
      },
      gameOffset: {
        y: 1.6382701396942139,
        x: -1.6918067932128906,
        z: -3.01031494140625
      },
      tip: "Input for Water or Filtered/Distilled Water, Filtered Water boosts power production"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.In3MainPipe);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal ParticleEmitter = script.Parent.SmokeStack1.Attachment.ParticleEmitter;\nlocal ParticleEmitter2 = script.Parent.SmokeStack2.Attachment.ParticleEmitter;\nlocal u6 = 0;\nlocal v7 = {};\nlocal u8 = 0;\n\nfunction v7.localUpdate() -- Line: 31\n    -- upvalues: State (copy), ParticleEmitter (copy), ParticleEmitter2 (copy)\n    if State.Value ~= \"Running\" then\n        if State.Value == \"\" then\n            script.Parent.Base.Generator:Stop();\n            ParticleEmitter.Enabled = false;\n            ParticleEmitter2.Enabled = false;\n        end;\n\n        return;\n    end;\n\n    script.Parent.Base.Generator:Play();\n    ParticleEmitter.Enabled = true;\n    ParticleEmitter2.Enabled = true;\nend;\n\nfunction v7.tick() -- Line: 43\n    -- upvalues: u1 (copy), u4 (copy), u8 (ref), u6 (ref), State (copy), u5 (copy), u2 (copy), u3 (copy), Pollution (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if u4:hasAmountOf(\"Water\", 20) then\n        u8 = 5000000;\n        u6 = 900;\n    elseif u4:hasAmountOf(\"Filtered Water\", 7.5) then\n        u8 = 6000000;\n        u6 = 900;\n    else\n        if not u4:hasAmountOf(\"Distilled Water\", 15) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        u8 = 6000000;\n        u6 = 600;\n    end;\n\n    if not u5:hasAmountOf(\"Machine Oil\", 1) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u2:canHoldXMore(u8 * 10) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if u3:hasAmountOf(\"Crude Diesel\", 20) then\n        State.Value = \"Running\";\n        u3:removeItem(20);\n    elseif u3:hasAmountOf(\"Poor Quality Diesel\", 15) then\n        State.Value = \"Running\";\n        u3:removeItem(15);\n    elseif u3:hasAmountOf(\"Diesel\", 10) then\n        State.Value = \"Running\";\n        u3:removeItem(10);\n    else\n        if not u3:hasAmountOf(\"Refined Diesel\", 7) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        State.Value = \"Running\";\n        u3:removeItem(7);\n    end;\n\n    if u8 == 5000000 then\n        u4:removeItem(20);\n    elseif u8 == 6000000 and u6 == 900 then\n        u4:removeItem(7.5);\n    else\n        u4:removeItem(15);\n    end;\n\n    u5:removeItem(1);\n    u1:nextTicks(10, function(p9) -- Line: 81\n        -- upvalues: u2 (ref), u8 (ref), Pollution (ref), u6 (ref)\n        u2:addPower(u8);\n        local v10 = Pollution;\n        v10.Value = v10.Value + u6;\n    end);\nend;\n\nreturn v7;"
};
