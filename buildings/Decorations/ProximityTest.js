export default {
  id: "ProximityTest",
  category: "Decorations",
  cost: 1,
  base: {
    height: 4,
    offset: {
      y: -0.000030517578125,
      x: 0.00001621246337890625
    },
    width: 4
  },
  nodes: [],
  data: {
    ShouldItBeFancy: false,
    SomeValue: 10
  },
  script: "local v1 = {};\nlocal u2 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new();\nu2:addSetting(1, script.Parent.ModelData.SomeValue, \"Some Value Test!\", 5, 100);\nu2:addSetting(2, script.Parent.ModelData.ShouldItBeFancy, \"Should it be fancy?\");\nscript.Parent.Base.ProximityPrompt.Triggered:Connect(function(p3) -- Line: 7\n    -- upvalues: u2 (copy)\n    u2:openMenu(p3);\nend);\n\nfunction v1.tick() -- Line: 11\nend;\n\nreturn v1;"
};
