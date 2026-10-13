export default {
  id: "ResearchStation1",
  category: "Misc",
  cost: 75,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 3000,
      transferAmount: 0,
      siteOffset: {
        y: -3.47412109375,
        x: -1.0387039184570312
      },
      gameOffset: {
        y: 3.584095001220703,
        x: -1.0387039184570312,
        z: -3.47412109375
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.NextTicks).new();\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal _ = script.Parent.State;\n\nreturn {\n    tick = function() -- Line: 12, Name: tick\n        -- upvalues: u1 (copy)\n        if u1:getBuffer() ~= 0 and script.Parent.Powered.Value == false then\n            script.Parent.Powered.Value = true;\n        end;\n\n        if not u1:hasPower(2100) then\n            script.Parent.State.Value = \"\";\n\n            return;\n        end;\n\n        script.Parent.State.Value = \"Working\";\n        u1:removePower(2100);\n        workspace:SetAttribute(\"ResearchStation1Active\", workspace:GetAttribute(\"ResearchStation1Active\") + 1);\n    end\n};"
};
