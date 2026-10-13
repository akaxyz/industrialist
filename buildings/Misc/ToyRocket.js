export default {
  id: "ToyRocket",
  category: "Misc",
  tier: 1,
  cost: 7201969,
  base: {
    height: 4,
    offset: {
      y: 0.00026035308837890625,
      x: -0.000164031982421875
    },
    width: 4
  },
  nodes: [
    {
      name: "LogicMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 1000,
      transferAmount: 0,
      siteOffset: {
        y: 1.2629995346069336,
        x: 0
      },
      gameOffset: {
        y: 1.0949993133544922,
        x: 0,
        z: 1.2629995346069336
      },
      tip: "Launch Logic Node"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local v1 = {};\nlocal u2 = require(game.ReplicatedStorage.Modules.PowerUtilsV2).loadConnector(script.Parent.LogicMainConnector);\nlocal State = script.Parent.State;\nlocal LaunchPrompt = script.Parent.PromptPart.LaunchPrompt;\nlocal u3 = false;\n\nlocal function Launch() -- Line: 7\n    -- upvalues: u3 (ref), State (copy), LaunchPrompt (copy)\n    if u3 == true then\n        return;\n    end;\n\n    u3 = true;\n    State.Value = \"1\";\n    LaunchPrompt.Enabled = false;\n    task.wait(15);\n    State.Value = \"\";\n    task.wait(1);\n    LaunchPrompt.Enabled = true;\n    u3 = false;\nend;\n\nLaunchPrompt.Triggered:Connect(function() -- Line: 24\n    -- upvalues: u3 (ref), State (copy), LaunchPrompt (copy)\n    if u3 == true then\n        return;\n    end;\n\n    u3 = true;\n    State.Value = \"1\";\n    LaunchPrompt.Enabled = false;\n    task.wait(15);\n    State.Value = \"\";\n    task.wait(1);\n    LaunchPrompt.Enabled = true;\n    u3 = false;\nend);\nLaunchPrompt.Enabled = true;\n\nfunction v1.tick() -- Line: 29\n    -- upvalues: u2 (copy), u3 (ref), Launch (copy)\n    if u2:hasPower(1) then\n        u2:removePower(u2:getBuffer());\n\n        if u3 == false then\n            task.spawn(Launch);\n        end;\n    end;\nend;\n\nreturn v1;"
};
