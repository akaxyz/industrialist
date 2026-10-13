export default {
  id: "FluidSpawner",
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
      name: "LargePipeOut",
      kind: "largefluid",
      direction: "output",
      maxAmount: 12000,
      transferAmount: 2000,
      siteOffset: {
        y: -0.5,
        x: 0
      },
      gameOffset: {
        y: 1.4669990539550781,
        x: 0,
        z: -0.5
      },
      tip: "Node for large fluid pipes only!"
    },
    {
      name: "MainPipeOut",
      kind: "fluid",
      direction: "output",
      maxAmount: 12000,
      transferAmount: 2000,
      siteOffset: {
        y: 0.5,
        x: 0
      },
      gameOffset: {
        y: 1.4669990539550781,
        x: 0,
        z: 0.5
      }
    }
  ],
  data: {
    Temperature: 18,
    Text: "",
    Rate: 20,
    Amount: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal u1 = require(ReplicatedStorage.Modules.MachineSettingsRelay).new();\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.LargePipeOut);\nlocal v4 = {};\nlocal ProximityPrompt = script.Parent.PromptPart.ProximityPrompt;\nlocal Text = script.Parent.ModelData.Text;\nlocal u5 = \"\";\nlocal Rate = script.Parent.ModelData.Rate;\nlocal Temperature = script.Parent.ModelData.Temperature;\nlocal Amount = script.Parent.ModelData.Amount;\nlocal Left = Amount.Left;\nu1:addSetting(4, Text, \"Fluid Name (As shown in Recipe Book)\");\nu1:addSetting(1, Rate, \"How many liters per second\", 1, 12000);\nu1:addSetting(1, Temperature, \"Fluid temperature\", -273.15, 1000000);\nu1:addSetting(1, Amount, \"Amount of liters to spawn (0 for infinite)\", 0, 1000000);\nProximityPrompt.Enabled = true;\nProximityPrompt.Triggered:Connect(function(p6) -- Line: 26\n    -- upvalues: u1 (copy)\n    u1:openMenu(p6);\nend);\n\nlocal function itemUpdated() -- Line: 30\n    -- upvalues: Text (copy), u5 (ref), Items (copy)\n    if Text.Value == u5 then\n        return;\n    end;\n\n    local DisplayName = Items.findItemByClosestDisplayName(Text.Value).DisplayName;\n    u5 = DisplayName;\n    Text.Value = DisplayName;\nend;\n\nText:GetPropertyChangedSignal(\"Value\"):Connect(itemUpdated);\n\nif Text.Value ~= u5 then\n    local DisplayName = Items.findItemByClosestDisplayName(Text.Value).DisplayName;\n    u5 = DisplayName;\n    Text.Value = DisplayName;\nend;\n\nAmount:GetPropertyChangedSignal(\"Value\"):Connect(function() -- Line: 40\n    -- upvalues: Left (copy), Amount (copy)\n    Left.Value = Amount.Value;\nend);\n\nfunction v4.tick() -- Line: 44\n    -- upvalues: Text (copy), Rate (copy), Amount (copy), Left (copy), u2 (copy), Items (copy), Temperature (copy), u3 (copy)\n    if Text.Value == \"\" or Text.Value == nil then\n        return;\n    end;\n\n    local Value = Rate.Value;\n    local v7;\n\n    if Amount.Value > 0 and Left.Value > 0 then\n        local Value2 = Left.Value;\n        local v8 = u2:getMax() - u2:getBuffer();\n        v7 = math.clamp(Value2, 0, v8);\n        local v9 = Left;\n        v9.Value = v9.Value - v7;\n    else\n        v7 = Amount.Value > 0 and 0 or Value;\n    end;\n\n    if Items.findItemByDisplayName(Text.Value) ~= Items.None then\n        u2:setUsedTemperature(Temperature.Value);\n        u2:addItemAmount(Text.Value, v7);\n        u3:setUsedTemperature(Temperature.Value);\n        u3:addItemAmount(Text.Value, v7);\n    end;\nend;\n\nreturn v4;"
};
