export default {
  id: "CoalLiquefactionPlant",
  category: "Factories",
  tier: 3,
  cost: 750000,
  base: {
    height: 40,
    offset: {
      y: -16,
      x: 18.000011444091797
    },
    width: 40
  },
  nodes: [
    {
      name: "OutOtherMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -29.0050048828125,
        x: -1.510010004043579
      },
      gameOffset: {
        y: 1.4756178855895996,
        x: -1.510010004043579,
        z: -29.0050048828125
      },
      tip: "Output for Residue"
    },
    {
      name: "Out1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -17.0050048828125,
        x: -1.510010004043579
      },
      gameOffset: {
        y: 1.4756178855895996,
        x: -1.510010004043579,
        z: -17.0050048828125
      },
      tip: "Output for Heavy Oil"
    },
    {
      name: "Out2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: -15.0050048828125,
        x: -1.510010004043579
      },
      gameOffset: {
        y: 1.4756178855895996,
        x: -1.510010004043579,
        z: -15.0050048828125
      },
      tip: "Output for Light Oil"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 25000000,
      transferAmount: 0,
      siteOffset: {
        y: 1.43743896484375,
        x: 12.462529182434082
      },
      gameOffset: {
        y: 13.737502098083496,
        x: 12.462529182434082,
        z: 1.43743896484375
      }
    },
    {
      name: "LiquidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: -31.00494384765625,
        x: 37.364986419677734
      },
      gameOffset: {
        y: 1.4870047569274902,
        x: 37.364986419677734,
        z: -31.00494384765625
      },
      tip: "Input for Crude Oil"
    },
    {
      name: "OtherLiquidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 400,
      transferAmount: 20,
      siteOffset: {
        y: -2.99505615234375,
        x: 37.464969635009766
      },
      gameOffset: {
        y: 1.4770050048828125,
        x: 37.464969635009766,
        z: -2.99505615234375
      },
      tip: "Input for Steam, the hotter the faster the machine"
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: -29,
        x: 37.349918365478516
      },
      gameOffset: {
        y: 1.3099761009216309,
        x: 37.349918365478516,
        z: -29
      },
      tip: "Input for Coal"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = 0;\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OtherLiquidInMainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.LiquidInMainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.OutOtherMainPipe);\nlocal u8 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u9 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal Spin = script.Parent.Spin;\nlocal State = script.Parent.State;\nlocal v10 = {};\nlocal u11 = false;\n\nfunction v10.localUpdate() -- Line: 33\n    -- upvalues: State (copy), u11 (ref), Spin (copy)\n    if State.Value == \"Running\" then\n        u11 = true;\n        script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = true;\n        script.Parent.Smoke2.Attachment.ParticleEmitter.Enabled = true;\n        script.Parent.Base.sound:Play();\n\n        while u11 do\n            task.wait(0.01);\n            Spin.Orientation = Spin.Orientation + Vector3.new(0, 2, 0);\n        end;\n    elseif State.Value == \"\" then\n        u11 = false;\n        script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = false;\n        script.Parent.Smoke2.Attachment.ParticleEmitter.Enabled = false;\n        script.Parent.Base.sound:Stop();\n    end;\nend;\n\nfunction v10.tick() -- Line: 54\n    -- upvalues: u1 (copy), u4 (copy), State (copy), u5 (copy), u6 (copy), u3 (copy), u7 (copy), u9 (copy), u8 (copy), u2 (ref), Pollution (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u4:hasAmountOf(\"Coal\", 40) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u5:hasAmountOf(\"Steam\", 200) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u6:hasAmountOf(\"Crude Oil\", 10) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u3:hasPower(10000000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u7:canHoldXMoreOf(\"Residue\", 10) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u9:canHoldXMoreOf(\"Light Oil\", 30) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u8:canHoldXMoreOf(\"Heavy Oil\", 40) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    local v12 = u5:getTemp() * 1.1;\n\n    if v12 > 350 then\n        u2 = 10;\n    else\n        u2 = math.round(10 + 2000 / v12);\n    end;\n\n    u6:removeItem(10);\n    u5:removeItem(200);\n    u4:removeItem(40);\n    State.Value = \"Running\";\n    u1:nextTicks(u2, function(p13) -- Line: 75\n        -- upvalues: u7 (ref), u9 (ref), u8 (ref), u3 (ref), Pollution (ref)\n        if p13 == 1 then\n            u7:addItemAmount(\"Residue\", 10);\n            u9:addItemAmount(\"Light Oil\", 30);\n            u8:addItemAmount(\"Heavy Oil\", 40);\n        end;\n\n        u3:removePower(1000000);\n        local v14 = Pollution;\n        v14.Value = v14.Value + 450;\n    end);\nend;\n\nreturn v10;"
};
