export default {
  id: "AdvancedOilSeparator",
  category: "Factories",
  tier: 3,
  cost: 1250000,
  base: {
    height: 44,
    offset: {
      y: 19.999969482421875,
      x: -2
    },
    width: 44
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 25000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.125,
        x: -6.25
      },
      gameOffset: {
        y: 24.049999237060547,
        x: -6.25,
        z: -0.125
      }
    },
    {
      name: "SteamInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 1000,
      transferAmount: 20,
      siteOffset: {
        y: -1.42498779296875,
        x: 3.0001220703125
      },
      gameOffset: {
        y: 1.467759609222412,
        x: 3.0001220703125,
        z: -1.42498779296875
      },
      tip: "Input for Steam"
    },
    {
      name: "MainInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: -1.42498779296875,
        x: -2.9998779296875
      },
      gameOffset: {
        y: 1.467759609222412,
        x: -2.9998779296875,
        z: -1.42498779296875
      },
      tip: "Input for Crude Oil/Heavy Oil/Fracking Oil/Light Oil"
    },
    {
      name: "Out1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 41.550018310546875,
        x: -18.9998779296875
      },
      gameOffset: {
        y: 1.4667582511901855,
        x: -18.9998779296875,
        z: 41.550018310546875
      },
      tip: "Output for Hydrogen Sulfide"
    },
    {
      name: "Out2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 41.550018310546875,
        x: -2.9998779296875
      },
      gameOffset: {
        y: 1.4667582511901855,
        x: -2.9998779296875,
        z: 41.550018310546875
      },
      tip: "Output for Light Oil/Heavy Oil"
    },
    {
      name: "Out3MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 41.550018310546875,
        x: 7.0001220703125
      },
      gameOffset: {
        y: 1.4667582511901855,
        x: 7.0001220703125,
        z: 41.550018310546875
      },
      tip: "Residue output"
    },
    {
      name: "OutItemMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 41.5870361328125,
        x: -10.9998779296875
      },
      gameOffset: {
        y: 1.3247599601745605,
        x: -10.9998779296875,
        z: 41.5870361328125
      },
      tip: "Output for Coke Fuel"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.SteamInMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.MainInMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.Out3MainPipe);\nlocal u8 = PipeUtilsV2.loadConnector(script.Parent.OutItemMainPipe);\nlocal State = script.Parent.State;\nlocal u9 = \"\";\nlocal v10 = {};\nlocal u11 = false;\n\nfunction v10.localUpdate() -- Line: 30\n    -- upvalues: State (copy), u11 (ref)\n    if State.Value ~= \"Running\" then\n        if State.Value == \"\" then\n            u11 = false;\n            script.Parent.Base.SOUNDS:Stop();\n            script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = false;\n            script.Parent.Fire.Attachment.Fire.Enabled = false;\n        end;\n\n        return;\n    end;\n\n    u11 = true;\n    script.Parent.Base.SOUNDS:Play();\n    script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = true;\n    script.Parent.Fire.Attachment.Fire.Enabled = true;\nend;\n\nfunction v10.tick() -- Line: 44\n    -- upvalues: u1 (copy), u3 (copy), State (copy), u4 (copy), u8 (copy), u5 (copy), u6 (copy), u7 (copy), u9 (ref), u2 (copy), Pollution (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u3:hasAmountOf(\"Steam\", 500) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if u4:hasAmountOf(\"Crude Oil\", 40) and (u8:canHoldXMoreOf(\"Coke Fuel\", 4) and (u5:canHoldXMoreOf(\"Hydrogen Sulfide\", 12) and (u6:canHoldXMoreOf(\"Light Oil\", 20) and u7:canHoldXMoreOf(\"Residue\", 5)))) then\n        u9 = \"Crude Oil\";\n    elseif u4:hasAmountOf(\"Heavy Oil\", 40) and (u8:canHoldXMoreOf(\"Coke Fuel\", 44) and u7:canHoldXMoreOf(\"Residue\", 10)) then\n        u9 = \"Heavy Oil\";\n    elseif u4:hasAmountOf(\"Fracking Oil\", 40) and (u6:canHoldXMoreOf(\"Heavy Oil\", 20) and u7:canHoldXMoreOf(\"Residue\", 15)) then\n        u9 = \"Fracking Oil\";\n    else\n        if not (u4:hasAmountOf(\"Light Oil\", 40) and (u5:canHoldXMoreOf(\"Hydrogen Sulfide\", 6) and (u7:canHoldXMoreOf(\"Residue\", 15) and u6:canHoldXMoreOf(\"Heavy Oil\", 10)))) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        u9 = \"Light Oil\";\n    end;\n\n    if not u2:hasPower(25000000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u3:removeItem(500);\n    u4:removeItem(40);\n    State.Value = \"Running\";\n    u1:nextTicks(10, function(p12) -- Line: 60\n        -- upvalues: u9 (ref), u8 (ref), u5 (ref), u6 (ref), u7 (ref), u2 (ref), Pollution (ref)\n        if p12 == 1 and (u9 == \"Crude Oil\" or u9 == \"Heavy Oil\") then\n            u8:addItemAmount(\"Coke Fuel\", 4);\n        end;\n\n        if u9 == \"Crude Oil\" then\n            u5:addItemAmount(\"Hydrogen Sulfide\", 1.2);\n            u6:addItemAmount(\"Light Oil\", 2);\n            u7:addItemAmount(\"Residue\", 0.5);\n        elseif u9 == \"Heavy Oil\" then\n            u8:addItemAmount(\"Coke Fuel\", 4);\n            u7:addItemAmount(\"Residue\", 1);\n        elseif u9 == \"Fracking Oil\" then\n            u7:addItemAmount(\"Residue\", 1.5);\n            u6:addItemAmount(\"Heavy Oil\", 2);\n        elseif u9 == \"Light Oil\" then\n            u5:addItemAmount(\"Hydrogen Sulfide\", 0.6);\n            u6:addItemAmount(\"Heavy Oil\", 1);\n            u7:addItemAmount(\"Residue\", 1.5);\n        end;\n\n        u2:removePower(2500000);\n        local v13 = Pollution;\n        v13.Value = v13.Value + 90;\n    end);\nend;\n\nreturn v10;"
};
