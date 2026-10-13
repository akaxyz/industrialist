export default {
  id: "PlasticProductionFacility",
  category: "Factories",
  tier: 3,
  cost: 100000,
  base: {
    height: 30,
    offset: {
      y: 13,
      x: 2
    },
    width: 16
  },
  nodes: [
    {
      name: "MainPipe1",
      kind: "fluid",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -0.772003173828125,
        x: -0.9840087890625
      },
      gameOffset: {
        y: 2.324979543685913,
        x: -0.9840087890625,
        z: -0.772003173828125
      },
      tip: "Input for MEG"
    },
    {
      name: "OutPipe",
      kind: "item",
      direction: "output",
      maxAmount: 160,
      transferAmount: 60,
      siteOffset: {
        y: 27.866302490234375,
        x: 7
      },
      gameOffset: {
        y: 1.874995470046997,
        x: 7,
        z: 27.866302490234375
      },
      tip: "Outputs Plastic pellets. Can then be used in a PlasticMolder to turn into something more useful."
    },
    {
      name: "MainPipe2",
      kind: "fluid",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -0.772003173828125,
        x: 2.96600341796875
      },
      gameOffset: {
        y: 2.324979543685913,
        x: 2.96600341796875,
        z: -0.772003173828125
      },
      tip: "Input for PTA"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 2500000,
      transferAmount: 0,
      siteOffset: {
        y: 23.500030517578125,
        x: 8.412261962890625
      },
      gameOffset: {
        y: 3.1279947757720947,
        x: 8.412261962890625,
        z: 23.500030517578125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe1);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipe2);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal v6 = {};\nlocal State = script.Parent.State;\n\nfunction v6.localUpdate() -- Line: 17\n    -- upvalues: State (copy)\n    if State.Value == \"Running\" then\n        script.Parent.SmokeStack1.ParticleEmitter.Enabled = true;\n        script.Parent.SmokeStack2.ParticleEmitter.Enabled = true;\n        script.Parent.Base[\"Electric Motor\"]:Play();\n\n        return;\n    end;\n\n    script.Parent.SmokeStack1.ParticleEmitter.Enabled = false;\n    script.Parent.SmokeStack2.ParticleEmitter.Enabled = false;\n    script.Parent.Base[\"Electric Motor\"]:Stop();\nend;\n\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nfunction v6.tick() -- Line: 31\n    -- upvalues: u1 (copy), u5 (copy), State (copy), u2 (copy), u3 (copy), u4 (copy), Pollution (copy), Achievements (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u5:hasPower(480000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not (u2:hasAmountOf(\"MEG\", 1) and (u3:hasAmountOf(\"PTA\", 1) and u4:canHoldXMoreOf(\"Plastic Pellets\", 80))) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u2:removeItem(1);\n    u3:removeItem(1);\n    u1:nextTicks(6, function(p7) -- Line: 37\n        -- upvalues: u5 (ref), Pollution (ref), State (ref), u4 (ref), Achievements (ref)\n        u5:removePower(80000);\n        local v8 = Pollution;\n        v8.Value = v8.Value + 60;\n        State.Value = \"Running\";\n\n        if p7 == 1 then\n            u4:addItemAmount(\"Plastic Pellets\", 80);\n            Achievements.giveBadge(2152756195);\n        end;\n    end);\nend;\n\nreturn v6;"
};
