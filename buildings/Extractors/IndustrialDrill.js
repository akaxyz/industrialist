export default {
  id: "IndustrialDrill",
  category: "Extractors",
  tier: 3,
  cost: 100000,
  base: {
    height: 20,
    offset: {
      y: 8,
      x: 0
    },
    width: 20
  },
  nodes: [
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 1000,
      transferAmount: 20,
      siteOffset: {
        y: -1.625,
        x: 1
      },
      gameOffset: {
        y: 1.4120099544525146,
        x: 1,
        z: -1.625
      },
      tip: "Input for Steam"
    },
    {
      name: "OutItemMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: -1.625,
        x: -0.99993896484375
      },
      gameOffset: {
        y: 1.3150100708007812,
        x: -0.99993896484375,
        z: -1.625
      },
      tip: "Ore Output"
    }
  ],
  data: {
    Function: 1
  },
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal ModelTweenUtils = require(ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.OutItemMainPipe);\nlocal u3 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal v4 = {};\nlocal u5 = ModelTweenUtils.new(script.Parent.Hammer);\nlocal u6 = u5:GetPivot();\nlocal State = script.Parent.State;\n\nlocal function flickLightsOn(p7) -- Line: 20\n    for _, child in pairs(script.Parent.Stages:GetChildren()) do\n        if tonumber(child.Name) <= p7 then\n            for _, child2 in pairs(child:GetChildren()) do\n                child2.Material = \"Neon\";\n            end;\n        else\n            for _, child2 in pairs(child:GetChildren()) do\n                child2.Material = \"SmoothPlastic\";\n            end;\n        end;\n    end;\nend;\n\nfunction v4.localUpdate() -- Line: 35\n    -- upvalues: State (copy), flickLightsOn (copy), u5 (copy), u6 (copy)\n    if State.Value == \"1\" then\n        flickLightsOn(1);\n        u5:newTween(TweenInfo.new(3.5, Enum.EasingStyle.Linear), u6):Play();\n        script.Parent.Base[\"Medium Pressure Air Release 4 (SFX)\"]:Play();\n\n        return;\n    end;\n\n    if State.Value == \"2\" then\n        flickLightsOn(2);\n\n        return;\n    end;\n\n    if State.Value ~= \"3\" then\n        if State.Value == \"4\" then\n            flickLightsOn(4);\n            script.Parent.TurbineSteamVent.ParticleEmitter.Enabled = true;\n            u5:newTween(TweenInfo.new(0.4, Enum.EasingStyle.Bounce), u6 - Vector3.new(0, 5, 0)):Play();\n            task.wait(0.6);\n            script.Parent.TurbineSteamVent.ParticleEmitter.Enabled = false;\n        end;\n\n        return;\n    end;\n\n    script.Parent.Base[\"Medium Pressure Air Release 4 (SFX)\"]:Stop();\n    flickLightsOn(3);\nend;\n\nlocal Function = script.Parent.ModelData.Function;\nlocal u8 = {\n    { \"Raw Copper\", 20, script.Parent.Buttons[\"Button 1\"] },\n    { \"Raw Iron\", 20, script.Parent.Buttons[\"Button 2\"] },\n    { \"Bauxite Residue\", 1, script.Parent.Buttons[\"Button 3\"] }\n};\n\nlocal function buttons() -- Line: 62\n    -- upvalues: u8 (copy), Function (copy)\n    for _, child in pairs(script.Parent.Buttons:GetChildren()) do\n        child.Material = \"SmoothPlastic\";\n    end;\n\n    u8[Function.Value][3].Material = \"Neon\";\nend;\n\nscript.Parent.Model.Monitor.ProximityPrompt.Triggered:Connect(function() -- Line: 69\n    -- upvalues: Function (copy), u8 (copy)\n    local v9 = Function;\n    v9.Value = v9.Value + 1;\n\n    if Function.Value == #u8 + 1 then\n        Function.Value = 1;\n    end;\n\n    for _, child in pairs(script.Parent.Buttons:GetChildren()) do\n        child.Material = \"SmoothPlastic\";\n    end;\n\n    u8[Function.Value][3].Material = \"Neon\";\nend);\n\nfor _, child in pairs(script.Parent.Buttons:GetChildren()) do\n    child.Material = \"SmoothPlastic\";\nend;\n\nu8[Function.Value][3].Material = \"Neon\";\n\nfunction v4.tick() -- Line: 79\n    -- upvalues: u3 (copy), u1 (copy), u8 (copy), Function (copy), u2 (copy), State (copy)\n    if u3:tickIsBusy() then\n        return;\n    end;\n\n    if u1:hasAmountOf(\"Steam\", 720) then\n        local v10 = u1:getTemp();\n        u1:removeItem(720);\n        local u11 = u8[Function.Value][1];\n        local u12 = math.ceil(u8[Function.Value][2] * (v10 / 200));\n        u3:nextTicks(48, function(p13) -- Line: 86\n            -- upvalues: u2 (ref), u11 (copy), u12 (copy), State (ref)\n            if p13 == 1 then\n                u2:addItemAmount(u11, u12);\n\n                return;\n            end;\n\n            if p13 == 12 then\n                State.Value = \"4\";\n\n                return;\n            end;\n\n            if p13 == 24 then\n                State.Value = \"3\";\n\n                return;\n            end;\n\n            if p13 == 36 then\n                State.Value = \"2\";\n\n                return;\n            end;\n\n            if p13 == 48 then\n                State.Value = \"1\";\n            end;\n        end);\n    end;\nend;\n\nreturn v4;"
};
