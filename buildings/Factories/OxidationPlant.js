export default {
  id: "OxidationPlant",
  category: "Factories",
  tier: 3,
  cost: 200000,
  base: {
    height: 24,
    offset: {
      y: 6,
      x: 13.99993896484375
    },
    width: 32
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 25000000,
      transferAmount: 0,
      siteOffset: {
        y: 2.96502685546875,
        x: 1.17498779296875
      },
      gameOffset: {
        y: 1.25,
        x: 1.17498779296875,
        z: 2.96502685546875
      }
    },
    {
      name: "OutPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: -1,
        x: -1.93994140625
      },
      gameOffset: {
        y: 2.282992362976074,
        x: -1.93994140625,
        z: -1
      },
      tip: "Acetic Acid/MEG/Liquid Sulfur/Sulfur Trioxide output"
    },
    {
      name: "InPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 100,
      transferAmount: 5,
      siteOffset: {
        y: -2.999969482421875,
        x: -1.9300537109375
      },
      gameOffset: {
        y: 2.3329925537109375,
        x: -1.9300537109375,
        z: -2.999969482421875
      },
      tip: "Ethanol/Ethylene/Hydrogen Sulfide/Sulfur Dioxide input"
    },
    {
      name: "InOxygenPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 100,
      transferAmount: 5,
      siteOffset: {
        y: -4.999969482421875,
        x: -1.9300537109375
      },
      gameOffset: {
        y: 2.3329925537109375,
        x: -1.9300537109375,
        z: -4.999969482421875
      },
      tip: "Oxygen input (OPTIONAL FOR SPEED)"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.InOxygenPipe);\nlocal u5 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal v6 = {};\nlocal State = script.Parent.State;\nlocal u7 = tick();\nlocal Turbine = script.Parent.Turbine;\nlocal u8 = false;\nlocal u9 = 0;\n\nfunction v6.localUpdate() -- Line: 21\n    -- upvalues: State (copy), u7 (ref), Turbine (copy)\n    if State.Value == \"Running\" then\n        script.Parent.Base[\"Electric Motor\"]:Play();\n        local v10 = tick();\n        u7 = v10;\n\n        while wait() and u7 == v10 do\n            Turbine:PivotTo(Turbine:GetPivot() * CFrame.Angles(0.017453292519943295, 0, 0));\n        end;\n    else\n        script.Parent.Base[\"Electric Motor\"]:Stop();\n        u7 = tick();\n    end;\nend;\n\nlocal _ = game.ReplicatedStorage.Pollution;\n\nfunction v6.tick() -- Line: 37\n    -- upvalues: u1 (copy), u8 (ref), u4 (copy), u2 (copy), u3 (copy), u5 (copy), u9 (ref), State (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    local u11 = 1;\n    u8 = false;\n\n    if u4:hasAmountOf(\"Oxygen\", 5) then\n        u8 = true;\n        u11 = 0.5;\n    end;\n\n    if u2:hasAmountOf(\"Ethanol\", 60) and (u3:canHoldXMoreOf(\"Acetic Acid\", 60) and u5:hasPower(u11 * 10000000)) then\n        u2:removeItem(60);\n        u9 = 20;\n\n        if u8 then\n            u9 = u9 * 0.25;\n            u4:removeItem(5);\n        end;\n\n        u1:nextTicks(u9, function(p12) -- Line: 55\n            -- upvalues: State (ref), u5 (ref), u9 (ref), u11 (ref), u3 (ref)\n            State.Value = \"Running\";\n            u5:removePower(10000000 / u9 * u11);\n            u3:addItemAmount(\"Acetic Acid\", 60 / u9);\n        end);\n\n        return;\n    end;\n\n    if u2:hasAmountOf(\"Ethylene\", 24) and (u3:canHoldXMoreOf(\"MEG\", 18) and u5:hasPower(u11 * 10000000)) then\n        u2:removeItem(24);\n        u9 = 20;\n\n        if u8 then\n            u9 = u9 * 0.25;\n            u4:removeItem(5);\n        end;\n\n        u1:nextTicks(u9, function(p13) -- Line: 73\n            -- upvalues: State (ref), u5 (ref), u9 (ref), u11 (ref), u3 (ref)\n            State.Value = \"Running\";\n            u5:removePower(10000000 / u9 * u11);\n            u3:addItemAmount(\"MEG\", 18 / u9);\n        end);\n\n        return;\n    end;\n\n    if u2:hasAmountOf(\"Hydrogen Sulfide\", 20) and (u3:canHoldXMoreOf(\"Liquid Sulfur\", 30) and u5:hasPower(u11 * 10000000)) then\n        u2:removeItem(20);\n        u9 = 20;\n\n        if u8 then\n            u9 = u9 * 0.25;\n            u4:removeItem(5);\n        end;\n\n        u1:nextTicks(u9, function(p14) -- Line: 89\n            -- upvalues: State (ref), u5 (ref), u9 (ref), u11 (ref), u3 (ref)\n            State.Value = \"Running\";\n            u5:removePower(10000000 / u9 * u11);\n            u3:addItemAmount(\"Liquid Sulfur\", 30 / u9);\n        end);\n\n        return;\n    end;\n\n    if not (u2:hasAmountOf(\"Sulfur Dioxide\", 40) and (u3:canHoldXMoreOf(\"Sulfur Trioxide\", 40) and u5:hasPower(u11 * 10000000))) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u2:removeItem(40);\n    u9 = 12;\n\n    if u8 then\n        u9 = u9 * 0.25;\n        u4:removeItem(5);\n    end;\n\n    u1:nextTicks(u9, function(p15) -- Line: 105\n        -- upvalues: State (ref), u5 (ref), u9 (ref), u11 (ref), u3 (ref)\n        State.Value = \"Running\";\n        u5:removePower(10000000 / u9 * u11);\n        u3:addItemAmount(\"Sulfur Trioxide\", 40 / u9);\n    end);\nend;\n\nreturn v6;"
};
