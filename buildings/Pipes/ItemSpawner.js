export default {
  id: "ItemSpawner",
  category: "Pipes",
  tier: 2,
  cost: {
    m: null,
    t: "numeric",
    v: "inf"
  },
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 120,
      transferAmount: 20,
      siteOffset: {
        y: 0,
        x: 0
      },
      gameOffset: {
        y: 1.4669990539550781,
        x: 0,
        z: 0
      }
    }
  ],
  data: {
    Text: "",
    Rate: 20,
    Amount: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.MachineSettingsRelay).new();\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal v3 = {};\nlocal ProximityPrompt = script.Parent.PromptPart.ProximityPrompt;\nlocal Text = script.Parent.ModelData.Text;\nlocal u4 = \"\";\nlocal Rate = script.Parent.ModelData.Rate;\nlocal Amount = script.Parent.ModelData.Amount;\nlocal Left = Amount.Left;\nu1:addSetting(4, Text, \"Item Name (As shown in Recipe Book)\");\nu1:addSetting(1, Rate, \"How many items per second\", 1, 120);\nu1:addSetting(1, Amount, \"Amount of items to spawn (0 for infinite)\", 0, 999999);\nProximityPrompt.Enabled = true;\nProximityPrompt.Triggered:Connect(function(p5) -- Line: 23\n    -- upvalues: u1 (copy)\n    u1:openMenu(p5);\nend);\n\nlocal function itemUpdated() -- Line: 27\n    -- upvalues: Text (copy), u4 (ref), Items (copy)\n    if Text.Value == u4 then\n        return;\n    end;\n\n    local DisplayName = Items.findItemByClosestDisplayName(Text.Value).DisplayName;\n    u4 = DisplayName;\n    Text.Value = DisplayName;\nend;\n\nText:GetPropertyChangedSignal(\"Value\"):Connect(itemUpdated);\n\nif Text.Value ~= u4 then\n    local DisplayName = Items.findItemByClosestDisplayName(Text.Value).DisplayName;\n    u4 = DisplayName;\n    Text.Value = DisplayName;\nend;\n\nAmount:GetPropertyChangedSignal(\"Value\"):Connect(function() -- Line: 38\n    -- upvalues: Left (copy), Amount (copy)\n    Left.Value = Amount.Value;\nend);\n\nfunction v3.tick() -- Line: 42\n    -- upvalues: Text (copy), Rate (copy), Amount (copy), Left (copy), u2 (copy), Items (copy)\n    if Text.Value == \"\" or Text.Value == nil then\n        return;\n    end;\n\n    local Value = Rate.Value;\n    local v6;\n\n    if Amount.Value > 0 and Left.Value > 0 then\n        local Value2 = Left.Value;\n        local v7 = u2:getMax() - u2:getBuffer();\n        v6 = math.clamp(Value2, 0, v7);\n        local v8 = Left;\n        v8.Value = v8.Value - v6;\n    else\n        v6 = Amount.Value > 0 and 0 or Value;\n    end;\n\n    if Items.findItemByDisplayName(Text.Value) ~= Items.None then\n        u2:addItemAmount(Text.Value, v6);\n    end;\nend;\n\nreturn v3;"
};
