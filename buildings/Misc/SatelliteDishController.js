export default {
  id: "SatelliteDishController",
  category: "Misc",
  tier: 3,
  cost: 250000,
  base: {
    height: 20,
    offset: {
      y: -8,
      x: 13
    },
    width: 30
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 100000,
      transferAmount: 0,
      siteOffset: {
        y: -15.42822265625,
        x: 6.13970947265625
      },
      gameOffset: {
        y: 18.347911834716797,
        x: 6.13970947265625,
        z: -15.42822265625
      }
    },
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 4,
      transferAmount: 4,
      siteOffset: {
        y: -1.0003662109375,
        x: -1.6497802734375
      },
      gameOffset: {
        y: 1.554567575454712,
        x: -1.6497802734375,
        z: -1.0003662109375
      },
      tip: "Liquid in, Can be anything. Higher RP value of the item = better results. Check recipe book item entry to find out the RP value. Do not feed Water, as it has 0 RP value."
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.NextTicks).new();\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal _ = script.Parent.State;\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\n\nreturn {\n    tick = function() -- Line: 15, Name: tick\n        -- upvalues: u2 (copy), u1 (copy), Items (copy)\n        if not u2:hasPower(75000) then\n            script.Parent.State.Value = \"\";\n\n            return;\n        end;\n\n        if not u1:hasAmount(0.5) then\n            script.Parent.State.Value = \"\";\n\n            return;\n        end;\n\n        local v3 = Items.findItemByDisplayName(u1:getItem()).RPMultiplier or 1;\n        u1:removeItem(0.5);\n        script.Parent.State.Value = tostring(v3);\n        u2:removePower(75000);\n        workspace:SetAttribute(\"SateliteDishControllerActive\", (workspace:GetAttribute(\"SateliteDishControllerActive\") or 0) + 1);\n        workspace:SetAttribute(\"SateliteDishControllerSpeed\", (workspace:GetAttribute(\"SateliteDishControllerSpeed\") or 0) + v3);\n    end\n};"
};
