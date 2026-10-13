export default {
  id: "ConcretePlant",
  category: "Factories",
  tier: 2,
  cost: 2000,
  base: {
    height: 20,
    offset: {
      y: -7.99993896484375,
      x: 1.999969482421875
    },
    width: 31.999958038330078
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 50000,
      transferAmount: 0,
      siteOffset: {
        y: -3.38311767578125,
        x: -8.719230651855469
      },
      gameOffset: {
        y: 11.454681396484375,
        x: -8.719230651855469,
        z: -3.38311767578125
      }
    },
    {
      name: "InFluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.20587158203125,
        x: -4.999549865722656
      },
      gameOffset: {
        y: 1.4496674537658691,
        x: -4.999549865722656,
        z: 1.20587158203125
      },
      tip: "Input for Water"
    },
    {
      name: "InItem2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.30584716796875,
        x: 1
      },
      gameOffset: {
        y: 1.3467631340026855,
        x: 1,
        z: 1.30584716796875
      },
      tip: "Input for Iron Powder/Limestone /Aggregate/Steel Rod"
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 1.39031982421875,
        x: 3.03228759765625
      },
      gameOffset: {
        y: 1.3722834587097168,
        x: 3.03228759765625,
        z: 1.39031982421875
      },
      tip: "Output for Clay Brick/Wet Concrete/Concrete Block/Reinforced Concrete Block"
    },
    {
      name: "InItem1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 1.30584716796875,
        x: -0.999542236328125
      },
      gameOffset: {
        y: 1.346489429473877,
        x: -0.999542236328125,
        z: 1.30584716796875
      },
      tip: "Input for Clay/Cement/Wet Concrete"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InItem1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.InItem2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.InFluidMainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\n\nreturn {\n    tick = function() -- Line: 19, Name: tick\n        -- upvalues: u1 (copy), u2 (copy), State (copy), u6 (copy), u3 (copy), u5 (copy), u4 (copy), Pollution (copy)\n        if u1:tickIsBusy() then\n            return;\n        end;\n\n        if not u2:hasPower(40000) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        if not u6:canHoldXMore(10) then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        local u7 = nil;\n        local u8 = 10;\n\n        if u3:hasAmountOf(\"Clay\", 10) and u5:hasAmountOf(\"Water\", 60) then\n            u3:removeItem(10);\n            u5:removeItem(60);\n\n            if u4:hasAmountOf(\"Iron Powder\", 10) then\n                u4:removeItem(10);\n                u8 = 20;\n            elseif u4:hasAmountOf(\"Limestone\", 10) then\n                u4:removeItem(10);\n                u8 = 15;\n            end;\n\n            u7 = \"Clay Brick\";\n        elseif u3:hasAmountOf(\"Cement\", 10) and (u4:hasAmountOf(\"Aggregate\", 20) and u5:hasAmountOf(\"Water\", 60)) then\n            u3:removeItem(10);\n            u5:removeItem(60);\n            u4:removeItem(20);\n            u7 = \"Wet Concrete\";\n            u8 = 20;\n        elseif u3:hasAmountOf(\"Wet Concrete\", 10) and u4:hasAmountOf(\"Steel Rod\", 40) then\n            u3:removeItem(10);\n            u4:removeItem(40);\n            u7 = \"Reinforced Concrete Block\";\n            u8 = 10;\n        elseif u3:hasAmountOf(\"Wet Concrete\", 20) and u5:hasAmountOf(\"Water\", 10) then\n            u3:removeItem(20);\n            u5:removeItem(10);\n            u7 = \"Concrete Block\";\n            u8 = 20;\n        end;\n\n        if u7 == nil then\n            State.Value = \"\";\n\n            return;\n        end;\n\n        u2:removePower(40000);\n        State.Value = u7;\n        u1:nextTicks(10, function(p9) -- Line: 72\n            -- upvalues: Pollution (ref), u6 (ref), u7 (ref), u8 (ref), State (ref)\n            local v10 = Pollution;\n            v10.Value = v10.Value + 55;\n\n            if p9 == 1 then\n                u6:addItemAmount(u7, u8);\n                State.Value = \"0\";\n            end;\n        end);\n    end\n};"
};
