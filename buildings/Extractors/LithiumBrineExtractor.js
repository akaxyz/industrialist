export default {
  id: "LithiumBrineExtractor",
  category: "Extractors",
  tier: 3,
  cost: 100000,
  base: {
    height: 36,
    offset: {
      y: 0,
      x: -16
    },
    width: 36
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 2500000,
      transferAmount: 0,
      siteOffset: {
        y: 2.3874969482421875,
        x: -15.6875
      },
      gameOffset: {
        y: 23.738496780395508,
        x: -15.6875,
        z: 2.3874969482421875
      }
    },
    {
      name: "InFluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: -0.99981689453125,
        x: -33.42474365234375
      },
      gameOffset: {
        y: 1.4670040607452393,
        x: -33.42474365234375,
        z: -0.99981689453125
      },
      tip: "Input for Water"
    },
    {
      name: "OutFluid2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: -0.9998016357421875,
        x: 1.47528076171875
      },
      gameOffset: {
        y: 1.4670040607452393,
        x: 1.47528076171875,
        z: -0.9998016357421875
      },
      tip: "Output for Residue"
    },
    {
      name: "OutFluid1MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 300,
      transferAmount: 10,
      siteOffset: {
        y: 1.0001983642578125,
        x: 1.47528076171875
      },
      gameOffset: {
        y: 1.4670040607452393,
        x: 1.47528076171875,
        z: 1.0001983642578125
      },
      tip: "Output for Lithium Brine"
    }
  ],
  data: {
    Stage: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InFluidMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.OutFluid1MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OutFluid2MainPipe);\nlocal Stage = script.Parent.ModelData.Stage;\nlocal State = script.Parent.State;\nlocal Brine = script.Parent.Brine;\nlocal Residue = script.Parent.Residue;\nlocal Position = Brine.Position;\n\nreturn {\n    localUpdate = function() -- Line: 24, Name: localUpdate\n        -- upvalues: State (copy), TweenService (copy), Brine (copy), Position (copy), Residue (copy), Stage (copy)\n        if State.Value == \"1\" then\n            script.Parent.Base[\"Oil Refinery Ambience 1 (SFX)\"]:Play();\n            TweenService:Create(Brine, TweenInfo.new(5, Enum.EasingStyle.Linear), {\n                Size = Vector3.new(4, 29.75, 29.75),\n                Position = Position + Vector3.new(0, 2, 0)\n            }):Play();\n        elseif State.Value == \"2\" then\n            TweenService:Create(Brine, TweenInfo.new(3, Enum.EasingStyle.Linear), {\n                Size = Vector3.new(0.05, 29.75, 29.75),\n                Position = Position\n            }):Play();\n        elseif State.Value == \"3\" then\n            TweenService:Create(Brine, TweenInfo.new(3, Enum.EasingStyle.Linear), {\n                Size = Vector3.new(0.05, 29.75, 29.75),\n                Position = Position\n            }):Play();\n            TweenService:Create(Residue, TweenInfo.new(3, Enum.EasingStyle.Linear), {\n                Size = Vector3.new(0.05, 29.75, 29.75),\n                Position = Position\n            }):Play();\n        elseif State.Value == \"0\" then\n            script.Parent.Base[\"Oil Refinery Ambience 1 (SFX)\"]:Stop();\n        end;\n\n        if State.Value ~= \"3\" then\n            TweenService:Create(Residue, TweenInfo.new(7, Enum.EasingStyle.Linear), {\n                Size = Vector3.new(0.8 * Stage.Value + 0.01, 29.75, 29.75),\n                Position = Position + Vector3.new(0, (0.5 * Stage.Value + 0.01) / 2, 0)\n            }):Play();\n        end;\n    end,\n\n    tick = function() -- Line: 44, Name: tick\n        -- upvalues: u1 (copy), u3 (copy), u2 (copy), u4 (copy), u5 (copy), State (copy), Stage (copy)\n        if u1:tickIsBusy() then\n            return;\n        end;\n\n        if not (u3:hasAmountOf(\"Water\", 60) and u2:hasPower(2000000)) then\n            State.Value = \"0\";\n\n            return;\n        end;\n\n        if not (u4:canHoldXMore(120) and u5:canHoldXMore(10)) then\n            State.Value = \"0\";\n\n            return;\n        end;\n\n        u3:removeItem(60);\n        local v6 = Stage;\n        v6.Value = v6.Value + 1;\n        State.Value = \"1\";\n        u1:nextTicks(20, function(p7) -- Line: 51\n            -- upvalues: u2 (ref), Stage (ref), State (ref), u5 (ref), u4 (ref)\n            u2:removePower(100000);\n\n            if p7 ~= 5 or Stage.Value < 5 then\n                if p7 == 5 then\n                    State.Value = \"2\";\n                end;\n\n                return;\n            end;\n\n            Stage.Value = 0;\n            State.Value = \"3\";\n            u5:addItemAmount(\"Residue\", 10);\n            u4:addItemAmount(\"Lithium Brine\", 120);\n        end);\n    end\n};"
};
