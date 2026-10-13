export default {
  id: "GoldAcidRefinery",
  category: "Factories",
  tier: 3,
  cost: 1000000,
  base: {
    height: 36,
    offset: {
      y: 16,
      x: -8
    },
    width: 20
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 510000,
      transferAmount: 0,
      siteOffset: {
        y: 28.47900390625,
        x: -2.9122314453125
      },
      gameOffset: {
        y: 14.217826843261719,
        x: -2.9122314453125,
        z: 28.47900390625
      }
    },
    {
      name: "In1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -1.67254638671875,
        x: -5.009521484375
      },
      gameOffset: {
        y: 1.4829487800598145,
        x: -5.009521484375,
        z: -1.67254638671875
      },
      tip: "Input for Acetic Acid/Sulfuric Acid/Hydrochloric Acid"
    },
    {
      name: "InItemMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -1.68792724609375,
        x: -7.01275634765625
      },
      gameOffset: {
        y: 1.465230941772461,
        x: -7.01275634765625,
        z: -1.68792724609375
      },
      tip: "Item Input"
    },
    {
      name: "In2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -1.67254638671875,
        x: -9.009521484375
      },
      gameOffset: {
        y: 1.4829487800598145,
        x: -9.009521484375,
        z: -1.67254638671875
      },
      tip: "Input for Water"
    },
    {
      name: "OutItemMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: 33.66845703125,
        x: -13.0474853515625
      },
      gameOffset: {
        y: 1.4406919479370117,
        x: -13.0474853515625,
        z: 33.66845703125
      },
      tip: "Item Output"
    },
    {
      name: "OutFluidMainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 33.77984619140625,
        x: -2.99346923828125
      },
      gameOffset: {
        y: 1.5131027698516846,
        x: -2.99346923828125,
        z: 33.77984619140625
      },
      tip: "Fluid Output"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.EffectUtils).new(script);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.InItemMainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.OutFluidMainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.OutItemMainPipe);\nlocal u8 = require(ReplicatedStorage.Modules.EffectUtils).new(script);\nlocal u9 = false;\nu8:registerState(\"running\", true, function() -- Line: 26\n    -- upvalues: u9 (ref)\n    u9 = true;\n    script.Parent.Base[\"Whirling spinning\"]:Play();\n    script.Parent.SmokeStack1.ParticleEmitter.Enabled = true;\n    script.Parent.SmokeStack2.ParticleEmitter.Enabled = true;\n\n    while wait() and u9 do\n        script.Parent.Spin1.Orientation = script.Parent.Spin1.Orientation + Vector3.new(0, 10, 0);\n        script.Parent.Spin2.Orientation = script.Parent.Spin2.Orientation - Vector3.new(0, 10, 0);\n    end;\nend);\nu8:registerState(\"running\", false, function() -- Line: 37\n    -- upvalues: u9 (ref)\n    u9 = false;\n    script.Parent.Base[\"Whirling spinning\"]:Stop();\n    script.Parent.SmokeStack1.ParticleEmitter.Enabled = false;\n    script.Parent.SmokeStack2.ParticleEmitter.Enabled = false;\nend);\nlocal v10 = {\n    localUpdate = function() -- Line: 47, Name: localUpdate\n        -- upvalues: u8 (copy)\n        u8:localUpdate();\n    end\n};\nlocal u11 = {\n    { { \"Acetic Acid\", 2 }, { \"Water\", 6 }, { \"Rich Soil\", 1 }, { \"Residue\", 8 }, { \"10 Karat Gold\", 1 } },\n    { { \"Acetic Acid\", 2 }, { \"Water\", 6 }, { \"12 Karat Gold\", 1 }, { \"Residue\", 8 }, { \"18 Karat Gold\", 1 } },\n    { { \"Sulfuric Acid\", 4 }, { \"Water\", 4 }, { \"Rich Soil\", 1 }, { \"Residue\", 8 }, { \"18 Karat Gold\", 1 } },\n    { { \"Sulfuric Acid\", 1 }, { \"Water\", 5 }, { \"Shallow Earth Fragment\", 4 }, { \"Residue\", 8 }, { \"Bauxite Residue\", 1 } },\n    { { \"Acetic Acid\", 2 }, { \"Water\", 5 }, { \"Medium Earth Fragment\", 2 }, { \"Residue\", 4 }, { \"Raw Zinc\", 4 } },\n    { { \"Sulfuric Acid\", 2 }, { \"Water\", 5 }, { \"Medium Earth Fragment\", 3 }, { \"Residue\", 6 }, { \"Coal\", 10 } },\n    { { \"Hydrochloric Acid\", 2 }, { \"Water\", 5 }, { \"Medium Earth Fragment\", 5 }, { \"Lithium Brine\", 10 }, { \"Rich Soil\", 5 } },\n    { { \"Hydrochloric Acid\", 2 }, { \"Water\", 5 }, { \"Deep Earth Fragment\", 5 }, { \"Residue\", 5 }, { \"Coal\", 10 } },\n    { { \"Sulfuric Acid\", 2 }, { \"Water\", 5 }, { \"Deep Earth Fragment\", 5 }, { \"Residue\", 5 }, { \"Coal\", 20 } },\n    { { \"Acetic Acid\", 2 }, { \"Water\", 5 }, { \"Deep Earth Fragment\", 5 }, { \"Residue\", 5 }, { \"Coal\", 5 } },\n    { { \"Acetic Acid\", 1 }, { \"Water\", 5 }, { \"Treated Rock\", 5 }, { \"Residue\", 5 }, { \"8 Karat Gold\", 5 } }\n};\n\nfunction v10.tick() -- Line: 147\n    -- upvalues: u1 (copy), u3 (copy), u2 (copy), u11 (copy), u4 (copy), u5 (copy), u6 (copy), u7 (copy), u8 (copy), Pollution (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if u3:has(\"Sulfuric Acid\") then\n        script.Parent.Sign.SurfaceGui.TextLabel.Text = \"Sulfuric Acid\";\n        script.Parent.AcidLabel.Blue.SurfaceGui.TextLabel.Text = \"3\";\n        script.Parent.AcidLabel.Red.SurfaceGui.TextLabel.Text = \"0\";\n        script.Parent.AcidLabel.Yellow.SurfaceGui.TextLabel.Text = \"2\";\n        script.Parent.AcidLabel.White.SurfaceGui.TextLabel.Text = \"OX\";\n    elseif u3:has(\"Acetic Acid\") then\n        script.Parent.Sign.SurfaceGui.TextLabel.Text = \"Acetic Acid\";\n        script.Parent.AcidLabel.Blue.SurfaceGui.TextLabel.Text = \"3\";\n        script.Parent.AcidLabel.Red.SurfaceGui.TextLabel.Text = \"2\";\n        script.Parent.AcidLabel.Yellow.SurfaceGui.TextLabel.Text = \"0\";\n        script.Parent.AcidLabel.White.SurfaceGui.TextLabel.Text = \"\";\n    elseif u3:has(\"Hydrochloric Acid\") then\n        script.Parent.Sign.SurfaceGui.TextLabel.Text = \"Hydrochloric Acid\";\n        script.Parent.AcidLabel.Blue.SurfaceGui.TextLabel.Text = \"3\";\n        script.Parent.AcidLabel.Red.SurfaceGui.TextLabel.Text = \"0\";\n        script.Parent.AcidLabel.Yellow.SurfaceGui.TextLabel.Text = \"1\";\n        script.Parent.AcidLabel.White.SurfaceGui.TextLabel.Text = \"\";\n    end;\n\n    if not u2:hasPower(500000) then\n        return;\n    end;\n\n    for _, v in pairs(u11) do\n        if u3:hasAmountOf(v[1][1], v[1][2]) and (u4:hasAmountOf(v[2][1], v[2][2]) and (u5:hasAmountOf(v[3][1], v[3][2]) and (u6:canHoldXMoreOf(v[4][1], v[4][2]) and u7:canHoldXMoreOf(v[5][1], v[5][2])))) then\n            u3:removeItem(v[1][2]);\n            u4:removeItem(v[2][2]);\n            u5:removeItem(v[3][2]);\n            u8:setState(\"running\", true);\n            u1:nextTicks(5, function(p12) -- Line: 183\n                -- upvalues: u6 (ref), v (copy), u7 (ref), u8 (ref), u2 (ref), Pollution (ref)\n                if p12 == 1 then\n                    u6:setUsedTemperature(70);\n                    u6:addItemAmount(v[4][1], v[4][2]);\n                    u7:addItemAmount(v[5][1], v[5][2]);\n                    u8:setState(\"running\", false);\n                end;\n\n                u2:removePower(100000);\n                local v13 = Pollution;\n                v13.Value = v13.Value + 1;\n            end);\n\n            return;\n        end;\n    end;\nend;\n\nreturn v10;"
};
