export default {
  id: "UndergroundWasteFacility",
  category: "Misc",
  tier: 4,
  cost: 2500000,
  base: {
    height: 48,
    offset: {
      y: 22,
      x: 18
    },
    width: 48
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.64013671875,
        x: 5.589599609375
      },
      gameOffset: {
        y: 7.533844947814941,
        x: 5.589599609375,
        z: -0.64013671875
      }
    },
    {
      name: "In4MaInPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 8000,
      transferAmount: 2,
      siteOffset: {
        y: -1.807861328125,
        x: 2.98651123046875
      },
      gameOffset: {
        y: 1.4807655811309814,
        x: 2.98651123046875,
        z: -1.807861328125
      },
      tip: "Liquid Waste (such as Residue)"
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -1.807861328125,
        x: -3.0064697265625
      },
      gameOffset: {
        y: 1.4499924182891846,
        x: -3.0064697265625,
        z: -1.807861328125
      },
      tip: "Input for Concrete Blocks"
    },
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -1.807861328125,
        x: -1.0059814453125
      },
      gameOffset: {
        y: 1.4499924182891846,
        x: -1.0059814453125,
        z: -1.807861328125
      },
      tip: "Input for Lead Ingots"
    },
    {
      name: "In3MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 8000,
      transferAmount: 20,
      siteOffset: {
        y: -1.807861328125,
        x: 0.98748779296875
      },
      gameOffset: {
        y: 1.4499924182891846,
        x: 0.98748779296875,
        z: -1.807861328125
      },
      tip: "Item waste (such as fission byproduct)"
    }
  ],
  data: {
    Condition: 0,
    LastStored: ""
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.In3MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.In4MaInPipe);\nlocal u6 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Statistics = game.ReplicatedStorage.Statistics;\nlocal Condition = script.Parent.ModelData.Condition;\nlocal LastStored = script.Parent.ModelData.LastStored;\nlocal State = script.Parent.State;\nlocal v7 = {};\nlocal Body = script.Parent.Monitor.SurfaceGui.Display.Body;\n\nlocal function attempt(p8) -- Line: 28\n    -- upvalues: Condition (copy), u2 (copy), Body (copy), u3 (copy), u5 (copy), u4 (copy), Achievements (copy), Statistics (copy), LastStored (copy), State (copy), u1 (copy)\n    if Condition.Value ~= 100 then\n        return false;\n    end;\n\n    if not u2:hasAmountOf(\"Concrete Block\", 140) then\n        Body.Problem.Text = \"Lack of Concrete Blocks\";\n\n        return false;\n    end;\n\n    if not u3:hasAmountOf(\"Lead Ingot\", 70) then\n        Body.Problem.Text = \"Lack of Lead Ingots\";\n\n        return false;\n    end;\n\n    local v9 = nil;\n    local v10 = 0;\n\n    if p8 == false then\n        if u5:hasAmount(7000) then\n            v9 = u5:getItem();\n            u5:removeItem(7000);\n            v10 = 7000;\n\n            if u5:getBuffer() == 0 then\n                u5:setItem(0, \"\");\n            end;\n        end;\n    elseif not u5:isEmpty() then\n        v9 = u5:getItem();\n        v10 = u5:getBuffer();\n        u5:setItem(0, \"\");\n    end;\n\n    if v9 == nil then\n        if p8 == false then\n            if u4:hasAmount(7000) then\n                v9 = u4:getItem();\n                v10 = 7000;\n                u4:removeItem(7000);\n\n                if u4:getBuffer() == 0 then\n                    u4:setItem(0, \"\");\n                end;\n            end;\n        elseif not u4:isEmpty() then\n            v9 = u4:getItem();\n            v10 = u4:getBuffer();\n            u4:setItem(0, \"\");\n        end;\n    end;\n\n    if v9 == nil then\n        Body.Problem.Text = \"Waiting for Waste\";\n\n        return false;\n    end;\n\n    u2:removeItem(140);\n    u3:removeItem(70);\n    Achievements.giveBadge(1568101223240208);\n    Body.Problem.Text = \"Operating..\";\n\n    if Statistics.StoredEver:FindFirstChild(v9) == nil then\n        local NumberValue = Instance.new(\"NumberValue\", Statistics.StoredEver);\n        NumberValue.Name = v9;\n        NumberValue.Value = v10;\n    else\n        local v11 = Statistics.StoredEver[v9];\n        v11.Value = v11.Value + v10;\n    end;\n\n    LastStored.Value = v9;\n    State.Value = tick();\n    u1:nextTicks(70, function(p12) -- Line: 103\n        local _ = p12 == 1;\n    end);\nend;\n\nif game.Players.LocalPlayer == nil then\n    require(ReplicatedStorage.Modules.Permissions);\n    local u13 = false;\n    Body.StoreNow.MouseButton1Click:Connect(function(p14) -- Line: 112\n        -- upvalues: u13 (ref), u1 (copy), attempt (copy), Body (copy)\n        if u13 then\n            return;\n        end;\n\n        u13 = true;\n\n        if u1:getTicksLeft() == 0 and not attempt(true) then\n            Body.StoreNow.Text = \"Unavailable\";\n            task.wait(0.3);\n            Body.StoreNow.Text = \"Store waste now\";\n        end;\n\n        u13 = false;\n    end);\nend;\n\nfunction v7.tick() -- Line: 129\n    -- upvalues: u6 (copy), Condition (copy), Body (copy), LastStored (copy), Statistics (copy), u1 (copy), attempt (copy)\n    if game.Lighting.ClockTime > 8 and (game.Lighting.ClockTime < 21 and script.Parent.Light2.SpotLight.Enabled == true) then\n        script.Parent.Light1.SpotLight.Enabled = false;\n        script.Parent.Light2.SpotLight.Enabled = false;\n        script.Parent.Light1.Material = Enum.Material.Glass;\n        script.Parent.Light2.Material = Enum.Material.Glass;\n    elseif script.Parent.Light2.SpotLight.Enabled == false and (game.Lighting.ClockTime > 21 or game.Lighting.ClockTime < 8) then\n        script.Parent.Light1.SpotLight.Enabled = true;\n        script.Parent.Light2.SpotLight.Enabled = true;\n        script.Parent.Light1.Material = Enum.Material.Neon;\n        script.Parent.Light2.Material = Enum.Material.Neon;\n    end;\n\n    if u6:getBuffer() >= 1000000 then\n        u6:removePower(1000000);\n\n        if math.random(1, 2) == 1 then\n            Condition.Value = math.clamp(Condition.Value + 1, 0, 100);\n        end;\n\n        if Condition.Value ~= 100 then\n            Body.Problem.Text = \"Improving condition\";\n        end;\n    else\n        Body.Problem.Text = \"No power\";\n        Condition.Value = math.clamp(Condition.Value - 1, 0, 100);\n    end;\n\n    if Condition.Value < 100 then\n        Body.Condition.Text = `Condition: {Condition.Value}% (Not ready)`;\n    else\n        Body.Condition.Text = \"Condition: 100% (Ready)\";\n    end;\n\n    if script.Parent.ModelData.LastStored.Value == \"\" then\n        Body.LastStored.Text = \"Last Stored: N/A\";\n        Body.StoredEver.Text = \"Stored ever: N/A\";\n    else\n        Body.LastStored.Text = \"Last Stored: \" .. LastStored.Value;\n        Body.StoredEver.Text = \"Stored ever: \" .. Statistics.StoredEver[LastStored.Value].Value;\n    end;\n\n    if u1:tickIsBusy() then\n        return;\n    end;\n\n    attempt(false);\nend;\n\nreturn v7;"
};
