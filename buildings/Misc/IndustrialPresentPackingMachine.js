export default {
  id: "IndustrialPresentPackingMachine",
  category: "Misc",
  cost: 7500,
  base: {
    height: 90,
    offset: {
      y: -43,
      x: -5
    },
    width: 50
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 300000,
      transferAmount: 0,
      siteOffset: {
        y: 0.3143310546875,
        x: 19.4888916015625
      },
      gameOffset: {
        y: 12.529809951782227,
        x: 19.4888916015625,
        z: 0.3143310546875
      }
    },
    {
      name: "BoxPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.81658935546875,
        x: -0.994384765625
      },
      gameOffset: {
        y: 1.2220215797424316,
        x: -0.994384765625,
        z: 1.81658935546875
      },
      tip: "Present box in"
    },
    {
      name: "ItemPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 3,
      transferAmount: 1,
      siteOffset: {
        y: 1.81658935546875,
        x: -2.994384765625
      },
      gameOffset: {
        y: 1.2220215797424316,
        x: -2.994384765625,
        z: 1.81658935546875
      },
      tip: "Any item, the higher the RP Multipliers (their average) the more snowflakes gained. Make sure to supply many different similar RP value items for more snowflakes. Info on RP multiplier can be found in the recipe book."
    },
    {
      name: "CoalPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.81658935546875,
        x: 17.005615234375
      },
      gameOffset: {
        y: 1.2220215797424316,
        x: 17.005615234375,
        z: 1.81658935546875
      },
      tip: "Oak log input"
    }
  ],
  data: {
    TotalShellValue: 0,
    ShellStorage: "",
    ShellValue: 0,
    InternalStorage: ""
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(game.ReplicatedStorage.Modules.Achievements);\nPipeUtilsV2.loadConnector(script.Parent.ItemPipeIn);\nPipeUtilsV2.loadConnector(script.Parent.BoxPipeIn);\nPipeUtilsV2.loadConnector(script.Parent.CoalPipeIn);\nPowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal _ = script.Parent.State;\nlocal ModelData = script.Parent.ModelData;\nscript.Parent.Door.ClickDetector.MouseClick:Connect(function() -- Line: 17\n    script.DoorOpen.Value = not script.DoorOpen.Value;\n\n    if script.DoorOpen.Value then\n        script.Parent.Animation:FireAllClients(\"opendoor\");\n\n        return;\n    end;\n\n    script.Parent.Animation:FireAllClients(\"closedoor\");\nend);\nscript.Synchronize.OnServerEvent:Connect(function(p1, p2, p3) -- Line: 26\n    if p1.UserId == game.ReplicatedStorage.WorldOwner.Value then\n        script.Synchronize:FireAllClients(p2, p3);\n    end;\nend);\n\nlocal function compileTableToString(p4) -- Line: 35\n    local v5 = \"\";\n\n    for i, v in pairs(p4) do\n        v5 = v5 .. i .. \":\" .. v .. \",\";\n    end;\n\n    return v5;\nend;\n\nlocal function decompileStringToTable(p6) -- Line: 43\n    local v7 = {};\n\n    for _, v in pairs(string.split(p6, \",\")) do\n        if v ~= \"\" then\n            local v8 = string.split(v, \":\");\n\n            if #v8 == 2 then\n                v7[v8[1]] = tonumber(v8[2]);\n            end;\n        end;\n    end;\n\n    return v7;\nend;\n\nlocal u9 = decompileStringToTable(ModelData.InternalStorage.Value);\nlocal u10 = decompileStringToTable(ModelData.ShellStorage.Value);\nlocal v11 = {};\nlocal v12 = {};\n\nfor i, _ in pairs(u9) do\n    table.insert(v11, i);\nend;\n\ntable.sort(v11);\nrequire(game.ReplicatedStorage.Modules.Enums.Items);\nlocal Body = script.Parent.Monitor.SurfaceGui.Display.Body;\n\nlocal function updateMonitor(p13, p14) -- Line: 75\n    -- upvalues: u9 (ref), Body (copy)\n    for i, v in pairs(u9) do\n        if Body.ScrollingFrame:FindFirstChild(i) then\n            Body.ScrollingFrame[i].Text = i .. \": \" .. math.round(v * 10) / 10 .. \" units\";\n        else\n            local v15 = script.StoredEver:Clone();\n            v15.Name = i;\n            v15.Parent = Body.ScrollingFrame;\n            v15.Text = i .. \": \" .. math.round(v * 10) / 10 .. \" units\";\n        end;\n    end;\n\n    Body.DifferentItems.Text = \"Different items packed: \" .. p13;\n    Body.PresentsLoaded.Text = \"Presents loaded: \" .. p14 .. \"/100\";\n    Body.CurrentLoadValue.Text = \"Est. Shell value: \" .. 0 .. \" Snowfl.\";\nend;\n\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\n\nlocal function giveCurrency() -- Line: 96\n    -- upvalues: ModelData (copy), Achievements (copy)\n    local Value = ModelData.ShellValue.Value;\n    task.spawn(function() -- Line: 98\n        -- upvalues: Achievements (ref), Value (copy)\n        task.wait(35);\n        Achievements.giveBadge(3517156316373051);\n        local ChristmasCurrency = game.ReplicatedStorage.Statistics.ChristmasCurrency;\n        ChristmasCurrency.Value = ChristmasCurrency.Value + Value;\n        game.ReplicatedStorage.PlacementSystem.RemoteToast:FireAllClients((`Launched a shell worth {math.round(Value)}❄️ to the north pole!`));\n    end);\n    ModelData.ShellValue.Value = 0;\nend;\n\nlocal _ = game.ReplicatedStorage.Pollution;\n\nfunction v12.tick() -- Line: 111\n    -- upvalues: u10 (ref), updateMonitor (copy)\n    local v16 = 0;\n    local v17 = 0;\n\n    for _, v in pairs(u10) do\n        if v ~= nil then\n            v16 = v16 + v;\n            v17 = v17 + 1;\n        end;\n    end;\n\n    updateMonitor(v17, v16);\nend;\n\nreturn v12;"
};
