export default {
  id: "NuclearPowerPlant",
  category: "Power",
  tier: 4,
  cost: 200000000,
  base: {
    height: 261.9999694824219,
    offset: {
      y: 129.00001525878906,
      x: -16
    },
    width: 120
  },
  nodes: [
    {
      name: "NVMainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 2000000,
      transferAmount: 100,
      siteOffset: {
        y: 125.88331604003906,
        x: 39.7335205078125
      },
      gameOffset: {
        y: 11.833419799804688,
        x: 39.7335205078125,
        z: 125.88331604003906
      },
      tip: "Emergency Normal Voltage line to power some equipment. Only active in emergencies."
    },
    {
      name: "BoricAcidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 2500,
      transferAmount: 20,
      siteOffset: {
        y: -1.04779052734375,
        x: -3.01025390625
      },
      gameOffset: {
        y: 1.4009246826171875,
        x: -3.01025390625,
        z: -1.04779052734375
      },
      tip: "Input for Boric acid (Needed for proper auto-controlling of the reactor)"
    },
    {
      name: "DataMainConnector",
      kind: "data",
      direction: "input",
      maxAmount: 0,
      transferAmount: 0,
      siteOffset: {
        y: 121.38404846191406,
        x: 40.3529052734375
      },
      gameOffset: {
        y: 8.349288940429688,
        x: 40.3529052734375,
        z: 121.38404846191406
      }
    },
    {
      name: "HVMainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 100000000,
      transferAmount: 0,
      siteOffset: {
        y: 125.87074279785156,
        x: 33.6669921875
      },
      gameOffset: {
        y: 60.472930908203125,
        x: 33.6669921875,
        z: 125.87074279785156
      }
    },
    {
      name: "SpentFuelMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 600,
      transferAmount: 20,
      siteOffset: {
        y: 259.517578125,
        x: -14.9931640625
      },
      gameOffset: {
        y: 1.4003143310546875,
        x: -14.9931640625,
        z: 259.517578125
      },
      tip: "Output for spent fuel"
    },
    {
      name: "ItemIn1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 1,
      transferAmount: 20,
      siteOffset: {
        y: 259.519775390625,
        x: -17.000244140625
      },
      gameOffset: {
        y: 1.4003143310546875,
        x: -17.000244140625,
        z: 259.519775390625
      },
      tip: "Input for Control rods/Fuel rods"
    },
    {
      name: "MainConnector4",
      kind: "logic",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 1000,
      siteOffset: {
        y: 124.93409729003906,
        x: 40.9080810546875
      },
      gameOffset: {
        y: 10.012619018554688,
        x: 40.9080810546875,
        z: 124.93409729003906
      }
    },
    {
      name: "MainConnector3",
      kind: "logic",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 1000,
      siteOffset: {
        y: 125.55909729003906,
        x: 40.9080810546875
      },
      gameOffset: {
        y: 10.012619018554688,
        x: 40.9080810546875,
        z: 125.55909729003906
      }
    },
    {
      name: "MainConnector2",
      kind: "logic",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 1000,
      siteOffset: {
        y: 126.18409729003906,
        x: 40.9080810546875
      },
      gameOffset: {
        y: 10.012619018554688,
        x: 40.9080810546875,
        z: 126.18409729003906
      }
    },
    {
      name: "MainConnector1",
      kind: "logic",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 1000,
      siteOffset: {
        y: 126.80909729003906,
        x: 40.9080810546875
      },
      gameOffset: {
        y: 10.012619018554688,
        x: 40.9080810546875,
        z: 126.80909729003906
      }
    },
    {
      name: "OutFluidMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 3200,
      transferAmount: 2000,
      siteOffset: {
        y: -0.6251220703125,
        x: 33.925048828125
      },
      gameOffset: {
        y: 4.3863983154296875,
        x: 33.925048828125,
        z: -0.6251220703125
      },
      tip: "Output for Contaminated Water from the core via Pump 1. Should be used in heat exchangers to generate steam and then piped back into the input."
    },
    {
      name: "FluidInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 12000,
      transferAmount: 2000,
      siteOffset: {
        y: -0.62518310546875,
        x: 1.91015625
      },
      gameOffset: {
        y: 4.3804779052734375,
        x: 1.91015625,
        z: -0.62518310546875
      },
      tip: "Input for Contaminated Water (to circulate through the core using Coolant Pumps)"
    },
    {
      name: "MakeupInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 100000,
      transferAmount: 2000,
      siteOffset: {
        y: -0.62518310546875,
        x: -30.08984375
      },
      gameOffset: {
        y: 4.3804779052734375,
        x: -30.08984375,
        z: -0.62518310546875
      },
      tip: "Input for Distilled Water (clean water for filling up the loop)"
    },
    {
      name: "LetdownOutMainPipe",
      kind: "largefluid",
      direction: "output",
      maxAmount: 12000,
      transferAmount: 2000,
      siteOffset: {
        y: -0.62518310546875,
        x: -34.08984375
      },
      gameOffset: {
        y: 4.3804779052734375,
        x: -34.08984375,
        z: -0.62518310546875
      },
      tip: "Output of contaminated water from Letdown Valve or Reactor Hall Drain Valve. Needs to be reprocessed in Water Treatment Plant for proper reuse."
    },
    {
      name: "SpentMOXMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 600,
      transferAmount: 20,
      siteOffset: {
        y: 259.517578125,
        x: -12.9931640625
      },
      gameOffset: {
        y: 1.4003143310546875,
        x: -12.9931640625,
        z: 259.517578125
      },
      tip: "Output for spent MOX fuel"
    },
    {
      name: "OutFluidMainPipe2",
      kind: "largefluid",
      direction: "output",
      maxAmount: 3200,
      transferAmount: 2000,
      siteOffset: {
        y: -0.6251220703125,
        x: 29.925048828125
      },
      gameOffset: {
        y: 4.3863983154296875,
        x: 29.925048828125,
        z: -0.6251220703125
      },
      tip: "Output for Contaminated Water from the core via Pump 2. Should be used in heat exchangers to generate steam and then piped back into the input."
    },
    {
      name: "OutFluidMainPipe3",
      kind: "largefluid",
      direction: "output",
      maxAmount: 3200,
      transferAmount: 2000,
      siteOffset: {
        y: -0.6251220703125,
        x: 25.925048828125
      },
      gameOffset: {
        y: 4.3863983154296875,
        x: 25.925048828125,
        z: -0.6251220703125
      },
      tip: "Output for Contaminated Water from the core via Pump 3. Should be used in heat exchangers to generate steam and then piped back into the input."
    },
    {
      name: "OutFluidMainPipe4",
      kind: "largefluid",
      direction: "output",
      maxAmount: 3200,
      transferAmount: 2000,
      siteOffset: {
        y: -0.6251220703125,
        x: 21.925048828125
      },
      gameOffset: {
        y: 4.3863983154296875,
        x: 21.925048828125,
        z: -0.6251220703125
      },
      tip: "Output for Contaminated Water from the core via Pump 4. Should be used in heat exchangers to generate steam and then piped back into the input."
    },
    {
      name: "ItemIn2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 50,
      transferAmount: 20,
      siteOffset: {
        y: 259.519775390625,
        x: -19.000244140625
      },
      gameOffset: {
        y: 1.4003143310546875,
        x: -19.000244140625,
        z: 259.519775390625
      },
      tip: "Input for concrete blocks. Only needed when the reactor has an accident."
    }
  ],
  data: {
    Radiation: 0,
    Maintenance: false,
    MaintenanceCooldown: 0,
    ReactorFlood: 0,
    Data: "",
    SpentFuelData: "",
    ControlRod: 0,
    LowEnrichmentFuelRod: 0,
    RodPartialMelt: false,
    ReactorLidOpen: false,
    DoorOpen: false,
    RunTime: 0,
    StandardFuelRod: 0,
    MOXFuelRod: 0,
    WaterPollutants: 0,
    Accident: 0,
    None: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Nuclear = script.Parent.Nuclear;\nlocal ModelData = script.Parent.ModelData;\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.ItemIn1MainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.ItemIn2MainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.DataMainConnector);\nlocal Container = Nuclear.FuelStorageInfo.SurfaceGui.Frame.Container;\nlocal Container2 = Nuclear.SteamCondensers.SurfaceGui.Frame.Frame.Container;\nlocal Container3 = Nuclear.Polishers.SurfaceGui.Frame.Frame.Container;\nlocal v4 = {};\n\nfunction round(p5, p6)\n    local v7 = 10 ^ (p6 or 0);\n\n    return math.floor(p5 * v7 + 0.5) / v7;\nend;\n\nlocal FX = Nuclear.FX;\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\n\nfunction v4.tick() -- Line: 28\n    -- upvalues: ModelData (copy), Achievements (copy), FX (copy), u2 (copy), u1 (copy), Container (copy), u3 (copy), Container3 (copy), Container2 (copy), Nuclear (copy)\n    if ModelData.Accident.Value == 1 then\n        if ModelData.Radiation.Value == 0 then\n            Achievements.giveBadge(3607786866123423);\n        end;\n\n        script.Parent:SetAttribute(\"NoRefund\", true);\n        local Radiation = game.ReplicatedStorage.Statistics.Radiation;\n        Radiation.Value = Radiation.Value + ModelData.Radiation.Value;\n\n        if FX:FindFirstChild(\"Radiation\") and FX.Radiation:GetAttribute(\"TweeningDone\") < tick() then\n            FX.Radiation.Value = ModelData.Radiation.Value * 10000;\n        end;\n\n        script.Parent.ItemIn2MainPipe:SetAttribute(\"Tip\", (`Input for concrete blocks. {math.round(ModelData.Radiation.Value * 10)} Concrete Blocks left to stop the radiation!`));\n    end;\n\n    if u2:has(\"Concrete Block\") and ModelData.Radiation.Value > 0 then\n        local v8 = u2:getBuffer();\n        u2:setItem(0, \"\");\n        ModelData.Radiation.Value = math.max(ModelData.Radiation.Value - v8 / 10, 0);\n    end;\n\n    if u1:hasAmount(1) then\n        local v9 = string.gsub(u1:getItem(), \" \", \"\");\n\n        if ModelData:FindFirstChild(v9) then\n            local v10 = ModelData[v9];\n            v10.Value = v10.Value + 1;\n            u1:removeItem(1);\n\n            if u1:getBuffer() == 0 then\n                u1:setItem(0, \"\");\n            end;\n        end;\n    end;\n\n    Container.MOXRods.Text = `MOX rods: {ModelData.MOXFuelRod.Value}x`;\n    Container.ControlRods.Text = `Control rods: {ModelData.ControlRod.Value}x`;\n    Container.NormalRods.Text = `Standard rods: {ModelData.StandardFuelRod.Value}x`;\n    Container.LowEnrichmentRods.Text = `Low enrich. rods: {ModelData.LowEnrichmentFuelRod.Value}x`;\n    local v11 = {};\n    local v12 = {};\n    local v13 = {};\n    local v14 = {};\n\n    for _, v in pairs(u3.folder.Inputs) do\n        local v15 = workspace.Plots[v[1]][v[2]];\n        local v16 = v15:GetAttribute(\"Name\");\n\n        if v16 == \"HeatExchanger\" or v16 == \"VerticalHeatExchanger\" then\n            table.insert(v11, v15);\n        elseif v16 == \"SteamCondenser\" then\n            table.insert(v14, v15);\n        elseif v16 == \"TurbineGenerator\" then\n            table.insert(v13, v15);\n        elseif v16 == \"Polisher\" then\n            table.insert(v12, v15);\n        end;\n    end;\n\n    table.sort(v11, function(p17, p18) -- Line: 91\n        return tonumber(p17.Name) < tonumber(p18.Name);\n    end);\n    table.sort(v13, function(p19, p20) -- Line: 94\n        return tonumber(p19.Name) < tonumber(p20.Name);\n    end);\n    local v21 = 0;\n    local v22 = 0;\n    local v23 = 0;\n\n    if #v12 > 0 then\n        for _, v in v12 do\n            v22 = v22 + v.OutTemperature.Value;\n            v21 = v21 + v.ChemicalUsage.Value;\n            v23 = v23 + v.CondensateFlow.Value;\n        end;\n\n        v22 = v22 / #v12;\n        v21 = v21 / #v12;\n        v23 = v23 / #v12;\n    end;\n\n    Container3.Connected.Text = \"Connected Polishers: \" .. #v12;\n\n    if #v12 == 0 then\n        Container3.Chemical.Text = \"Average usage: N/A\";\n        Container3.Temp.Text = \"Average outflow temp: N/A\";\n        Container3.AverageProduction.Text = \"Average flow: N/A\";\n        Container3.Status.Text = \"No polishers connected!\";\n    else\n        Container3.Chemical.Text = \"Average usage: \" .. round(v21, 2) .. \"L/s\";\n        Container3.Temp.Text = \"Average outflow temp: \" .. round(v22, 1) .. \"°C\";\n        Container3.AverageProduction.Text = \"Average flow: \" .. round(v23, 1) .. \"L/s\";\n        Container3.Status.Text = \"\";\n    end;\n\n    local v24 = 0;\n    local v25 = 0;\n    local v26 = 0;\n\n    if #v14 > 0 then\n        for _, v in v14 do\n            v24 = v24 + v.ModelData.Temp.Value;\n            v25 = v25 + v.CondensateProd.Value;\n            v26 = v26 + v.CoolantFlow.Value;\n        end;\n\n        v24 = v24 / #v14;\n        v25 = v25 / #v14;\n        v26 = v26 / #v14;\n    end;\n\n    Container2.Connected.Text = \"Connected Condensers: \" .. #v14;\n\n    if #v14 == 0 then\n        Container2.CoolantFlow.Text = \"Average flow: N/A\";\n        Container2.Temp.Text = \"Average temp: N/A\";\n        Container2.AverageProduction.Text = \"Average production: N/A\";\n        Container2.Status.Text = \"No condensers connected!\";\n    else\n        Container2.CoolantFlow.Text = \"Average flow: \" .. round(v26, 1) .. \"L/s\";\n        Container2.Temp.Text = \"Average temp: \" .. round(v24, 1) .. \"°C\";\n        Container2.AverageProduction.Text = \"Average production: \" .. round(v25, 1) .. \"L/s\";\n        Container2.Status.Text = \"\";\n    end;\n\n    for i = 1, 8 do\n        Nuclear.NPPMain.ConnectedEquipment.HeatExchangers[i].Value = v11[i];\n    end;\n\n    for i = 1, 4 do\n        Nuclear.NPPMain.ConnectedEquipment.TurbineGenerators[i].Value = v13[i];\n\n        if v13[i] ~= nil then\n            v13[i].TurbineNumber.Value = i;\n            v13[i].ModelData.TurbineColor.Value = 1;\n        end;\n    end;\n\n    script.Parent.Nuclear.NPPMain.SpawnWater:Fire();\nend;\n\nreturn v4;"
};
