export default {
  id: "AdvancedDieselRefinery",
  category: "Factories",
  tier: 2,
  cost: 10000,
  base: {
    height: 28,
    offset: {
      y: -12,
      x: -12
    },
    width: 28
  },
  nodes: [
    {
      name: "Out2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: -1,
        x: 1.714752197265625
      },
      gameOffset: {
        y: 1.5238513946533203,
        x: 1.714752197265625,
        z: -1
      },
      tip: "Diesel output"
    },
    {
      name: "InMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 1.7147216796875,
        x: -1.00030517578125
      },
      gameOffset: {
        y: 1.5238656997680664,
        x: -1.00030517578125,
        z: 1.7147216796875
      },
      tip: "Diesel in to upgrade (Refined Diesel is max)"
    },
    {
      name: "OilInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 1.7147216796875,
        x: -3.00030517578125
      },
      gameOffset: {
        y: 1.5238656997680664,
        x: -3.00030517578125,
        z: 1.7147216796875
      },
      tip: "Machine Oil (needed to operate)"
    },
    {
      name: "OutMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 1,
        x: 1.714752197265625
      },
      gameOffset: {
        y: 1.5238513946533203,
        x: 1.714752197265625,
        z: 1
      },
      tip: "Residue output"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 3000000,
      transferAmount: 0,
      siteOffset: {
        y: 0.66552734375,
        x: -20.06365966796875
      },
      gameOffset: {
        y: 7.553997993469238,
        x: -20.06365966796875,
        z: 0.66552734375
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.OilInMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal _ = Items.CrudeDiesel;\nlocal PoorQualityDiesel = Items.PoorQualityDiesel;\nlocal Diesel = Items.Diesel;\nlocal RefinedDiesel = Items.RefinedDiesel;\nlocal Residue = Items.Residue;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal v6 = {};\nlocal State = script.Parent.State;\n\nfunction v6.localUpdate() -- Line: 29\n    -- upvalues: State (copy)\n    if State.Value == \"Running\" then\n        script.Parent.Base.Generator:Play();\n\n        return;\n    end;\n\n    script.Parent.Base.Generator:Stop();\nend;\n\nfunction v6.tick() -- Line: 38\n    -- upvalues: u2 (copy), u3 (copy), State (copy), u5 (copy), u4 (copy), u1 (copy), Pollution (copy), PoorQualityDiesel (copy), Residue (copy), Diesel (copy), RefinedDiesel (copy), Achievements (copy)\n    if not (u2:hasAmount(3) and u3:hasAmountOf(\"Machine Oil\", 0.15)) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not (u5:canHoldXMore(0.3) and u4:canHoldXMore(3)) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    if not u1:hasPower(1000000) then\n        State.Value = \"\";\n\n        return;\n    end;\n\n    u1:removePower(1000000);\n    State.Value = \"Running\";\n    local v7 = Pollution;\n    v7.Value = v7.Value + 30;\n    local v8 = u2:getItem();\n\n    if v8 == \"Crude Diesel\" then\n        u2:removeItem(3.15);\n        u4:addItem(2.87, PoorQualityDiesel.DisplayName);\n        u5:addItem(0.28, Residue.DisplayName);\n    elseif v8 == \"Poor Quality Diesel\" then\n        u2:removeItem(2.87);\n        u4:addItem(2.59, Diesel.DisplayName);\n        u5:addItem(0.28, Residue.DisplayName);\n    elseif v8 == \"Diesel\" then\n        u2:removeItem(2.59);\n        u4:addItem(2.38, RefinedDiesel.DisplayName);\n        u5:addItem(0.21, Residue.DisplayName);\n    elseif v8 == \"Refined Diesel\" then\n        u2:removeItem(2.38);\n        u4:addItem(2.17, \"Gasoline\");\n        u5:addItem(0.21, Residue.DisplayName);\n        Achievements.giveBadge(2151444753);\n    end;\n\n    u3:removeItem(0.15);\nend;\n\nreturn v6;"
};
