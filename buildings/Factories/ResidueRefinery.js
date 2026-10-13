export default {
  id: "ResidueRefinery",
  category: "Factories",
  tier: 4,
  cost: 200000,
  base: {
    height: 10,
    offset: {
      y: 3,
      x: -4.5
    },
    width: 13
  },
  nodes: [
    {
      name: "OutPipe1",
      kind: "item",
      direction: "output",
      maxAmount: 100,
      transferAmount: 5,
      siteOffset: {
        y: -1.7500190734863281,
        x: 1
      },
      gameOffset: {
        y: 2.224492073059082,
        x: 1,
        z: -1.7500190734863281
      },
      tip: "Product output"
    },
    {
      name: "OutPipe2",
      kind: "item",
      direction: "output",
      maxAmount: 100,
      transferAmount: 5,
      siteOffset: {
        y: -1.7500190734863281,
        x: -3
      },
      gameOffset: {
        y: 2.224492073059082,
        x: -3,
        z: -1.7500190734863281
      },
      tip: "Product output"
    },
    {
      name: "InPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 5,
      siteOffset: {
        y: -2.1000213623046875,
        x: -5
      },
      gameOffset: {
        y: 2.224492073059082,
        x: -5,
        z: -2.1000213623046875
      },
      tip: "Residue input"
    },
    {
      name: "OutPipe3",
      kind: "item",
      direction: "output",
      maxAmount: 100,
      transferAmount: 5,
      siteOffset: {
        y: -1.7500190734863281,
        x: -1
      },
      gameOffset: {
        y: 2.224492073059082,
        x: -1,
        z: -1.7500190734863281
      },
      tip: "Product output"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 200000000,
      transferAmount: 0,
      siteOffset: {
        y: 0.1882476806640625,
        x: -9.74029541015625
      },
      gameOffset: {
        y: 2.4494848251342773,
        x: -9.74029541015625,
        z: 0.1882476806640625
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OutPipe1);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutPipe2);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OutPipe3);\nlocal u6 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\n\nreturn {\n    localUpdate = function() -- Line: 15, Name: localUpdate\n    end,\n\n    tick = function() -- Line: 18, Name: tick\n        -- upvalues: u1 (copy), u2 (copy), u3 (copy), u4 (copy), u6 (copy), u5 (copy)\n        if not u1:tickIsFree() then\n            return;\n        end;\n\n        if not (u2:hasAmountOf(\"Residue\", 100) and (u3:canHoldXMoreOf(\"Crude Oil\", 10) and (u4:canHoldXMoreOf(\"Heavy Oil\", 15) and (u4:canHoldXMoreOf(\"Crude Diesel\", 5) and u6:hasPower(180000000))))) then\n            if script.Parent.Base.Conveyor.Playing == true then\n                script.Parent.Base.Conveyor:Stop();\n            end;\n\n            return;\n        end;\n\n        u2:removeItem(100);\n        u1:nextTicks(60, function(p7) -- Line: 23\n            -- upvalues: u6 (ref), u3 (ref), u4 (ref), u5 (ref)\n            if script.Parent.Base.Conveyor.Playing == false then\n                script.Parent.Base.Conveyor:Play();\n            end;\n\n            u6:removePower(3000000);\n            u3:addItemAmount(\"Crude Oil\", 0.16666666666666666);\n            u4:addItemAmount(\"Heavy Oil\", 0.25);\n            u5:addItemAmount(\"Crude Diesel\", 0.08333333333333333);\n        end);\n    end\n};"
};
