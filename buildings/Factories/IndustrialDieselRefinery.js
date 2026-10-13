export default {
  id: "IndustrialDieselRefinery",
  category: "Factories",
  tier: 3,
  cost: 150000,
  base: {
    height: 20,
    offset: {
      y: 8,
      x: -14.000030517578125
    },
    width: 32
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1500000,
      transferAmount: 0,
      siteOffset: {
        y: -0.4375,
        x: 0.4375
      },
      gameOffset: {
        y: 11.11244010925293,
        x: 0.4375,
        z: -0.4375
      }
    },
    {
      name: "DieselOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 15.000171661376953,
        x: -29.520233154296875
      },
      gameOffset: {
        y: 2.14174485206604,
        x: -29.520233154296875,
        z: 15.000171661376953
      },
      tip: "Outputs the refined Diesel"
    },
    {
      name: "DieselInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 7.00018310546875,
        x: 1.1748046875
      },
      gameOffset: {
        y: 1.4677588939666748,
        x: 1.1748046875,
        z: 7.00018310546875
      },
      tip: "Input for the to be refined Diesel"
    },
    {
      name: "OtherInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 9.000179290771484,
        x: 1.1748046875
      },
      gameOffset: {
        y: 1.4677588939666748,
        x: 1.1748046875,
        z: 9.000179290771484
      },
      tip: "Input for Machine Oil"
    },
    {
      name: "ResidueOutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 80,
      transferAmount: 20,
      siteOffset: {
        y: 13.000171661376953,
        x: -29.520233154296875
      },
      gameOffset: {
        y: 2.14174485206604,
        x: -29.520233154296875,
        z: 13.000171661376953
      },
      tip: "Output for Residue"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.DieselInMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OtherInMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.DieselOutMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.ResidueOutMainPipe);\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal Pollution = ReplicatedStorage.Pollution;\nlocal u6 = \"\";\nlocal Diesel = script.Parent.Diesel;\nlocal v7 = {};\nlocal State = script.Parent.State;\n\nfunction v7.localUpdate() -- Line: 25\n    -- upvalues: State (copy)\n    if State.Value == \"Running\" then\n        script.Parent.Base.Generator:Play();\n        script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = true;\n        script.Parent.Smoke2.Attachment.ParticleEmitter.Enabled = true;\n\n        while State.Value == \"Running\" do\n            task.wait(0.01);\n            local v8 = script.Parent[\"Mixing Blades\"];\n            v8.Orientation = v8.Orientation + Vector3.new(0, 2, 0);\n        end;\n    else\n        script.Parent.Base.Generator:Stop();\n        script.Parent.Smoke.Attachment.ParticleEmitter.Enabled = false;\n        script.Parent.Smoke2.Attachment.ParticleEmitter.Enabled = false;\n    end;\nend;\n\nfunction v7.tick() -- Line: 43\n    -- upvalues: u3 (copy), u1 (copy), u2 (copy), u4 (copy), u6 (ref), State (copy), Pollution (copy), u5 (copy), Diesel (copy)\n    if not u3:hasAmountOf(\"Machine Oil\", 0.2) then\n        return;\n    end;\n\n    if not u1:hasPower(750000) then\n        return;\n    end;\n\n    if u2:hasAmountOf(\"Crude Diesel\", 2) and u4:canHoldXMoreOf(\"Poor Quality Diesel\", 1.8) then\n        u6 = \"Crude Diesel\";\n    elseif u2:hasAmountOf(\"Poor Quality Diesel\", 2) and u4:canHoldXMoreOf(\"Diesel\", 1.8) then\n        u6 = \"SRD\";\n    elseif u2:hasAmountOf(\"Diesel\", 2) and u4:canHoldXMoreOf(\"Refined Diesel\", 1.8) then\n        u6 = \"Diesel\";\n    else\n        if not (u2:hasAmountOf(\"Refined Diesel\", 2) and u4:canHoldXMoreOf(\"Gasoline\", 1.8)) then\n            u6 = \"\";\n            State.Value = \"\";\n\n            return;\n        end;\n\n        u6 = \"Refined Diesel\";\n    end;\n\n    u1:removePower(750000);\n    State.Value = \"Running\";\n    local v9 = Pollution;\n    v9.Value = v9.Value + 45;\n    u2:removeItem(2);\n    u3:removeItem(0.2);\n    u5:addItemAmount(\"Residue\", 0.2);\n\n    if u6 == \"Crude Diesel\" then\n        u4:addItemAmount(\"Poor Quality Diesel\", 1.8);\n        Diesel.Color = Color3.fromRGB(107, 95, 73);\n\n        return;\n    end;\n\n    if u6 == \"SRD\" then\n        u4:addItemAmount(\"Diesel\", 1.8);\n        Diesel.Color = Color3.fromRGB(188, 155, 93);\n\n        return;\n    end;\n\n    if u6 ~= \"Diesel\" then\n        if u6 == \"Refined Diesel\" then\n            u4:addItemAmount(\"Gasoline\", 1.8);\n            Diesel.Color = Color3.fromRGB(204, 194, 192);\n        end;\n\n        return;\n    end;\n\n    u4:addItemAmount(\"Refined Diesel\", 1.8);\n    Diesel.Color = Color3.fromRGB(204, 181, 136);\nend;\n\nreturn v7;"
};
