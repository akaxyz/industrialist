export default {
  id: "Foundry",
  category: "Factories",
  tier: 4,
  cost: 2000000,
  base: {
    height: 42,
    offset: {
      y: -19,
      x: 25
    },
    width: 54
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 0,
      siteOffset: {
        y: -2.4375,
        x: 2
      },
      gameOffset: {
        y: 17.612518310546875,
        x: 2,
        z: -2.4375
      }
    },
    {
      name: "InFuelMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 500,
      transferAmount: 500,
      siteOffset: {
        y: 1.5849609375,
        x: 18.989990234375
      },
      gameOffset: {
        y: 1.3250007629394531,
        x: 18.989990234375,
        z: 1.5849609375
      },
      tip: "Input for Coke Fuel or Coal (needs 10x more Coal than Coke Fuel!)"
    },
    {
      name: "LiquidInMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 800,
      transferAmount: 20,
      siteOffset: {
        y: 1.575439453125,
        x: 30.9952392578125
      },
      gameOffset: {
        y: 1.4770011901855469,
        x: 30.9952392578125,
        z: 1.575439453125
      },
      tip: "Water Input (needs a LOT of water for molding!)"
    },
    {
      name: "InOreMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 2400,
      transferAmount: 20,
      siteOffset: {
        y: 1.5849609375,
        x: 21
      },
      gameOffset: {
        y: 1.3250007629394531,
        x: 21,
        z: 1.5849609375
      },
      tip: "Input for Ores (check recipes)"
    },
    {
      name: "OutMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 600,
      transferAmount: 20,
      siteOffset: {
        y: 1.5849609375,
        x: 28.99017333984375
      },
      gameOffset: {
        y: 1.3247566223144531,
        x: 28.99017333984375,
        z: 1.5849609375
      },
      tip: "Output for Ingots"
    }
  ],
  data: {
    RightCrucible: "",
    LeftCrucible: ""
  },
  updateEvery: 30,
  script: "local v1 = {};\nlocal PowerUtilsV2 = require(game.ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(game.ReplicatedStorage.Modules.PipeUtilsV2);\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InFuelMainPipe);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.InOreMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.LiquidInMainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.OutMainPipe);\nlocal u6 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u7 = script.Parent.CalibrationPoint1.Position - script.Parent.CalibrationPoint2.Position;\nlocal _ = script.Parent.CalibrationPoint1.Position - script.Parent.CalibrationPoint3.Position;\nlocal Parent = script.Parent;\nlocal CraneArm = Parent.CraneArm;\nlocal SideCrane = Parent.SideCrane;\nlocal Crane = Parent.Crane;\nscript.Position.Value = Parent.Positions.Resting.Position;\nModelTweenUtils.new(SideCrane);\nlocal u8 = 0;\nlocal u9 = Parent.LeftCrucible:GetPivot();\nlocal u10 = Parent.RightCrucible:GetPivot();\nlocal Molds = Parent.Molds;\nlocal u11 = ModelTweenUtils.new(Molds);\nlocal u12 = false;\nlocal CFrame2 = Molds.Mold.CFrame;\nlocal CFrame3 = Molds[\"1\"].PrimaryPart.CFrame;\nlocal u13 = 7;\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u14 = false;\n\nlocal function moveMold(p15) -- Line: 44\n    -- upvalues: u14 (ref), u11 (copy), Molds (copy), u13 (ref), CFrame3 (copy), TweenService (copy), CFrame2 (copy)\n    u14 = true;\n    task.wait(0.03);\n    u11:newTween(TweenInfo.new(0.09000000000000001, Enum.EasingStyle.Quad), Molds:GetPivot() + Molds:GetPivot().LookVector * 2.278):Play();\n    task.wait(0.1);\n    Molds[u13]:PivotTo(CFrame3);\n    Molds[u13].Mold.Position = CFrame3.Position - Vector3.new(0, 0.5, 0);\n    local v16 = u13 - 4;\n\n    if v16 < 1 then\n        v16 = v16 + 7;\n    end;\n\n    if p15 then\n        local v17 = Molds[v16];\n        TweenService:Create(v17.Mold, TweenInfo.new(0.09000000000000001), {\n            Position = v17.Mold.Position + Vector3.new(0, 0.67, 0)\n        }):Play();\n    end;\n\n    u13 = u13 - 1;\n    local v18;\n\n    if u13 == 0 then\n        u13 = 7;\n        Molds.Mold.Position = CFrame2.Position;\n        u11:PivotTo(CFrame2);\n        v18 = true;\n    else\n        v18 = false;\n    end;\n\n    task.wait(0.1);\n\n    if v18 then\n        local _ = Molds.Mold.CFrame == CFrame2;\n    end;\n\n    u14 = false;\nend;\n\nlocal u19 = 0;\n\nfunction v1.localStart() -- Line: 83\n    -- upvalues: TweenService (copy), Parent (copy), u14 (ref), moveMold (copy), u19 (ref), CraneArm (copy), u7 (copy), Crane (copy), SideCrane (copy), u8 (ref)\n    local u20 = nil;\n    u20 = game:GetService(\"RunService\").Heartbeat:Connect(function(p21) -- Line: 85\n        -- upvalues: u20 (ref), TweenService (ref), Parent (ref), u14 (ref), moveMold (ref), u19 (ref), CraneArm (ref), u7 (ref), Crane (ref), SideCrane (ref), u8 (ref)\n        if script.Parent == nil then\n            u20:Disconnect();\n\n            return;\n        end;\n\n        TweenService:Create(Parent.Lava, TweenInfo.new(5.041666666666667), {\n            Size = Vector3.new(0.5 + script.Liquid.Value / 2000 * 10, 6.4, 6.4)\n        }):Play();\n\n        if script.Liquid.Value > 0 and script.Liquid:GetAttribute(\"Mold\") == true then\n            script.Parent.Base.Conveyor:Resume();\n\n            if not u14 then\n                task.spawn(moveMold, true);\n            end;\n\n            Parent.MolderLava.Mold1.Transparency = 0;\n            Parent.MolderLava.Mold2.Transparency = 0;\n            u19 = 3;\n        else\n            script.Parent.Base.Conveyor:Pause();\n\n            if not u14 and u19 > 0 then\n                u19 = u19 - 1;\n                task.spawn(moveMold, false);\n            end;\n\n            Parent.MolderLava.Mold1.Transparency = 1;\n            Parent.MolderLava.Mold2.Transparency = 1;\n        end;\n\n        local Value = script.Position.Value;\n        CraneArm:PivotTo(CFrame.new(Value) * CFrame.Angles(0, math.rad(script.Parent.Base.Orientation.Y), 0));\n        local v22 = nil;\n        local v23 = nil;\n\n        if math.floor(u7.Z) == 0 then\n            if math.floor(u7.X) ~= 0 then\n                local X = Value.X;\n                local Y = Crane:GetPivot().Position.Y;\n                v22 = Vector3.new(X, Y, Parent.CalibrationPoint1.Position.Z);\n                local X2 = Value.X;\n                local Y2 = SideCrane:GetPivot().Position.Y;\n                v23 = Vector3.new(X2, Y2, Value.Z);\n            end;\n        else\n            local X = Parent.CalibrationPoint1.Position.X;\n            local Y = Crane:GetPivot().Position.Y;\n            v22 = Vector3.new(X, Y, Value.Z);\n            local X2 = Value.X;\n            local Y2 = SideCrane:GetPivot().Position.Y;\n            v23 = Vector3.new(X2, Y2, Value.Z);\n        end;\n\n        Crane:PivotTo(CFrame.new(v22) * CFrame.Angles(-1.5707963267948966, 0, (math.rad(script.Parent.Base.Orientation.Y - 90))));\n        SideCrane:PivotTo(CFrame.new(v23) * CFrame.Angles(-1.5707963267948966, 0, (math.rad(script.Parent.Base.Orientation.Y - 90))));\n\n        if u8 == 1 then\n            Parent.LeftCrucible:PivotTo(CraneArm:GetPivot() * CFrame.Angles(math.rad(script.Angle.Value), 0, 0));\n\n            return;\n        end;\n\n        if u8 == 2 then\n            Parent.RightCrucible:PivotTo(CraneArm:GetPivot() * CFrame.Angles(math.rad(script.Angle.Value), 0, 0));\n        end;\n    end);\nend;\n\nlocal u24 = tick();\nlocal State = script.Parent.State;\n\nfunction v1.localUpdate() -- Line: 148\n    -- upvalues: State (copy), u12 (ref), Parent (copy), TweenService (copy), u8 (ref), u9 (copy), u10 (copy)\n    if State.Value == \"mold\" then\n        u12 = true;\n\n        return;\n    end;\n\n    if State.Value ~= \"\" then\n        script.Parent.CraneArm.Pivot.Motor:Resume();\n        local v25 = string.split(State.Value, \"|\");\n        local Position = Parent.Positions[v25[1]].Position;\n        local v26 = v25[2];\n        local v27 = tonumber(v25[3]);\n        TweenService:Create(script.Position, TweenInfo.new(v27, Enum.EasingStyle.Linear), {\n            Value = Position\n        }):Play();\n        task.wait(v27);\n\n        if v26 == \"dropoff\" then\n            if v25[1] == \"Crucible1\" or v25[1] == \"Crucible2\" then\n                TweenService:Create(script.Position, TweenInfo.new(2, Enum.EasingStyle.Linear), {\n                    Value = Position - Vector3.new(0, 6.685, 0)\n                }):Play();\n                task.wait(2);\n\n                if u8 == 1 then\n                    Parent.LeftCrucible:PivotTo(u9);\n                else\n                    Parent.RightCrucible:PivotTo(u10);\n                end;\n\n                u8 = 0;\n                task.wait(1);\n                TweenService:Create(script.Position, TweenInfo.new(3, Enum.EasingStyle.Linear), {\n                    Value = Position\n                }):Play();\n                task.wait(3);\n            end;\n        elseif v26 == \"pickup\" then\n            if v25[1] == \"Crucible1\" or v25[1] == \"Crucible2\" then\n                TweenService:Create(script.Position, TweenInfo.new(2, Enum.EasingStyle.Linear), {\n                    Value = Position - Vector3.new(0, 6.685, 0)\n                }):Play();\n                task.wait(2);\n\n                if v25[1] == \"Crucible1\" then\n                    u8 = 1;\n                else\n                    u8 = 2;\n                end;\n\n                task.wait(1);\n                TweenService:Create(script.Position, TweenInfo.new(3, Enum.EasingStyle.Linear), {\n                    Value = Position\n                }):Play();\n                task.wait(3);\n            end;\n        elseif v26 == \"pour\" then\n            TweenService:Create(script.Angle, TweenInfo.new(1.25, Enum.EasingStyle.Linear), {\n                Value = 100\n            }):Play();\n\n            if u8 == 1 then\n                TweenService:Create(Parent.LeftCrucible.Lava, TweenInfo.new(0.03, Enum.EasingStyle.Linear), {\n                    Transparency = 1\n                }):Play();\n            elseif u8 == 2 then\n                TweenService:Create(Parent.RightCrucible.Lava, TweenInfo.new(0.03, Enum.EasingStyle.Linear), {\n                    Transparency = 1\n                }):Play();\n            end;\n\n            for i = 2, 121 do\n                script.Parent.LavaAnimation[i].Transparency = 0;\n                script.Parent.LavaAnimation[i - 1].Transparency = 1;\n                task.wait(0.041666666666666664);\n            end;\n\n            task.wait(0.45833333333333304);\n            script.Parent.LavaAnimation[\"121\"].Transparency = 1;\n            TweenService:Create(script.Angle, TweenInfo.new(3, Enum.EasingStyle.Linear), {\n                Value = 0\n            }):Play();\n            task.wait(3.5);\n        end;\n\n        script.Parent.CraneArm.Pivot.Motor:Pause();\n    end;\nend;\n\nlocal u28 = {\n    {\n        { \"Raw Copper\", 1000 },\n        120,\n        { \"Liquid Copper\" },\n        Color3.fromRGB(152, 113, 88)\n    },\n    {\n        { \"Raw Iron\", 1000 },\n        120,\n        { \"Liquid Iron\" },\n        Color3.fromRGB(152, 152, 152)\n    },\n    {\n        { \"Treated Raw Iron\", 200 },\n        120,\n        { \"Liquid Iron2\" },\n        Color3.fromRGB(200, 200, 200)\n    },\n    {\n        { \"Treated Raw Copper\", 200 },\n        120,\n        { \"Liquid Copper2\" },\n        Color3.fromRGB(145, 93, 50)\n    },\n    {\n        { \"Raw Lead\", 1000 },\n        120,\n        { \"Liquid Lead\" },\n        Color3.fromRGB(65, 65, 65)\n    }\n};\nlocal ModelData = script.Parent.ModelData;\nlocal RightCrucible = ModelData.RightCrucible;\nlocal LeftCrucible = ModelData.LeftCrucible;\nlocal State2 = script.Parent.State;\nlocal u29 = false;\nlocal u30 = {\n    [\"Liquid Copper\"] = { { 20, 10, \"Copper Ingot\" }, { 20, 10, \"???\" }, { 20, 10, \"???\" } },\n    [\"Liquid Iron\"] = { { 20, 10, \"Iron Ingot\" }, { 20, 10, \"???\" }, { 20, 10, \"???\" } },\n    [\"Liquid Copper2\"] = { { 20, 12, \"Copper Ingot\" }, { 20, 10, \"???\" }, { 20, 10, \"???\" } },\n    [\"Liquid Iron2\"] = { { 20, 12, \"Iron Ingot\" }, { 20, 10, \"???\" }, { 20, 10, \"???\" } },\n    [\"Liquid Lead\"] = { { 20, 10, \"Lead Ingot\" }, { 20, 10, \"???\" }, { 20, 10, \"???\" } }\n};\nlocal SteamVent = script.Parent.SteamVent;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u31 = Color3.fromRGB(255, 77, 42);\n\nlocal function crucibleFX(p32, p33) -- Line: 297\n    -- upvalues: u31 (copy), RightCrucible (copy), SteamVent (copy)\n    local v34 = 1 - p33:GetAttribute(\"TimeLeft\") / 120;\n\n    for _, child in pairs(p32.Ore:GetChildren()) do\n        child.Transparency = v34 ^ 2;\n        child.Color = p33:GetAttribute(\"Color\"):Lerp(u31, v34);\n    end;\n\n    p32.Lava.Transparency = 1 - v34;\n\n    if p33 == RightCrucible then\n        SteamVent.RightCrucible.ParticleEmitter.Enabled = true;\n        SteamVent.RightCrucible.ParticleEmitter.Rate = v34 * 4;\n\n        return;\n    end;\n\n    SteamVent.LeftCrucible.ParticleEmitter.Enabled = true;\n    SteamVent.LeftCrucible.ParticleEmitter.Rate = v34 * 4;\nend;\n\nlocal function crucibleMainCode(p35, p36) -- Line: 315\n    -- upvalues: u29 (ref), State2 (copy), SteamVent (copy)\n    u29 = true;\n    State2.Value = p35 .. \"|pickup|2\";\n    task.wait(8);\n    State2.Value = \"Resting|none|2\";\n    task.wait(2.2);\n    State2.Value = \"Pouring|pour|1\";\n\n    if p35 == \"Crucible2\" then\n        SteamVent.RightCrucible.ParticleEmitter.Enabled = false;\n    elseif p35 == \"Crucible1\" then\n        SteamVent.LeftCrucible.ParticleEmitter.Enabled = false;\n    end;\n\n    script.Liquid:SetAttribute(\"Mold\", false);\n    script.Item.Value = p36.Value;\n    task.wait(2.5);\n    script.Liquid.Value = 1000;\n    task.wait(5.041666666666667);\n    script.Liquid:SetAttribute(\"Mold\", true);\n    task.wait(3);\n    State2.Value = \"Resting|none|2\";\n    task.wait(2.2);\n    State2.Value = p35 .. \"|dropoff|2\";\n    task.wait(8);\n    p36.Value = \"\";\n    u29 = false;\nend;\n\nlocal Container = script.Parent.Monitor.SurfaceGui.Frame.Container;\n\nlocal function barSize(p37, p38) -- Line: 350\n    local v39 = \"\";\n\n    for _ = 1, p37 do\n        v39 = v39 .. \"|\";\n    end;\n\n    for _ = 1, p38 - p37 do\n        v39 = v39 .. \".\";\n    end;\n\n    return v39;\nend;\n\nfunction round(p40, p41)\n    local v42 = 10 ^ (p41 or 0);\n\n    return math.floor(p40 * v42 + 0.5) / v42;\nend;\n\nfunction v1.tick() -- Line: 368\n    -- upvalues: u24 (copy), RightCrucible (copy), LeftCrucible (copy), u28 (copy), u3 (copy), u2 (copy), u6 (copy), crucibleFX (copy), u29 (ref), crucibleMainCode (copy), u4 (copy), u30 (copy), u5 (copy), Pollution (copy), SteamVent (copy), Container (copy), barSize (copy)\n    if tick() - u24 < 20 then\n        return;\n    end;\n\n    if RightCrucible.Value == \"\" or LeftCrucible.Value == \"\" then\n        for _, v in pairs(u28) do\n            if u3:hasAmountOf(v[1][1], v[1][2]) then\n                if RightCrucible.Value == \"\" then\n                    RightCrucible.Value = v[3][1];\n                    RightCrucible:SetAttribute(\"TimeLeft\", v[2]);\n                    RightCrucible:SetAttribute(\"Color\", v[4]);\n                    u3:removeItem(v[1][2]);\n                elseif LeftCrucible.Value == \"\" then\n                    LeftCrucible.Value = v[3][1];\n                    LeftCrucible:SetAttribute(\"TimeLeft\", v[2]);\n                    LeftCrucible:SetAttribute(\"Color\", v[4]);\n                    u3:removeItem(v[1][2]);\n                end;\n            end;\n        end;\n    end;\n\n    local v43 = u2:getBuffer();\n    local v44 = 0;\n    local v45 = 0;\n\n    if not u2:has(\"Coke Fuel\") then\n        v43 = not u2:has(\"Coal\") and 0 or v43 * 0.1;\n    end;\n\n    if RightCrucible:GetAttribute(\"TimeLeft\") > 0 then\n        v45 = v45 + 1;\n    end;\n\n    if LeftCrucible:GetAttribute(\"TimeLeft\") > 0 then\n        v45 = v45 + 1;\n    end;\n\n    if u6:hasPower(3000000) then\n        if RightCrucible:GetAttribute(\"TimeLeft\") > 0 and v43 >= 1 then\n            u6:removePower(3000000);\n            v44 = v44 + 0.7;\n            RightCrucible:SetAttribute(\"TimeLeft\", RightCrucible:GetAttribute(\"TimeLeft\") - 1);\n            crucibleFX(script.Parent.RightCrucible, RightCrucible);\n        elseif RightCrucible.Value ~= \"\" and (RightCrucible:GetAttribute(\"TimeLeft\") == 0 and (u29 == false and script.Liquid.Value == 0)) then\n            u6:removePower(3000000);\n            task.spawn(crucibleMainCode, \"Crucible2\", RightCrucible);\n        end;\n    end;\n\n    if u6:hasPower(3000000) then\n        if LeftCrucible:GetAttribute(\"TimeLeft\") > 0 and v43 >= 1 then\n            u6:removePower(3000000);\n            v44 = v44 + 0.7;\n            LeftCrucible:SetAttribute(\"TimeLeft\", LeftCrucible:GetAttribute(\"TimeLeft\") - 1);\n            crucibleFX(script.Parent.LeftCrucible, LeftCrucible);\n        elseif LeftCrucible.Value ~= \"\" and (LeftCrucible:GetAttribute(\"TimeLeft\") == 0 and (u29 == false and script.Liquid.Value == 0)) then\n            u6:removePower(3000000);\n            task.spawn(crucibleMainCode, \"Crucible1\", LeftCrucible);\n        end;\n    end;\n\n    if script.Liquid.Value >= 0.01 and u4:hasAmountOf(\"Water\", 50) then\n        script.Liquid:SetAttribute(\"Mold\", true);\n        local v46 = u30[script.Item.Value][1];\n        local v47 = math.clamp(script.Liquid.Value, 0, v46[1]) / v46[1];\n        local Liquid = script.Liquid;\n        Liquid.Value = Liquid.Value - v46[1] * v47;\n        u5:setUsedTemperature(400);\n        u5:addItemAmount(v46[3], v46[2] * v47);\n        u4:removeItem(35);\n        local v48 = Pollution;\n        v48.Value = v48.Value + 5;\n    elseif script.Liquid.Value < 0.01 then\n        script.Liquid.Value = 0;\n    elseif script.Liquid.Value >= 0.01 then\n        script.Liquid:SetAttribute(\"Mold\", false);\n    end;\n\n    if v44 == 0 then\n        SteamVent.Attachment.ParticleEmitter.Enabled = false;\n        SteamVent.Attachment.ParticleEmitter.Rate = 0;\n    else\n        local v49 = u2:has(\"Coal\") and 10 or 1;\n        local v50 = Pollution;\n        v50.Value = v50.Value + v44 / 32 * 240 * v49;\n        u2:removeItem(v44 * v49);\n        SteamVent.Attachment.ParticleEmitter.Enabled = true;\n        SteamVent.Attachment.ParticleEmitter.Rate = v44 * v49;\n    end;\n\n    script.Parent.Base.Base.Volume = v45 * 1;\n\n    if RightCrucible.Value == \"\" or LeftCrucible.Value == \"\" then\n        script.Parent.Base.furnace:Stop();\n        script.Parent.Base.Base:Stop();\n    else\n        script.Parent.Base.furnace:Resume();\n        script.Parent.Base.Base:Resume();\n    end;\n\n    if LeftCrucible.Value == \"\" then\n        Container.Unit1.Text = \"U1: \" .. barSize(0, 20) .. \" 0%\";\n    else\n        local Unit1 = Container.Unit1;\n        local v51 = (120 - LeftCrucible:GetAttribute(\"TimeLeft\")) / 120 * 20;\n        local v52 = \"\";\n\n        for _ = 1, v51 do\n            v52 = v52 .. \"|\";\n        end;\n\n        for _ = 1, 20 - v51 do\n            v52 = v52 .. \".\";\n        end;\n\n        Unit1.Text = \"U1: \" .. v52 .. \" \" .. round(100 - LeftCrucible:GetAttribute(\"TimeLeft\") / 120 * 100, 0) .. \"%\";\n    end;\n\n    if RightCrucible.Value == \"\" then\n        Container.Unit2.Text = \"U2: \" .. barSize(0, 20) .. \" 0%\";\n    else\n        local Unit2 = Container.Unit2;\n        local v53 = (120 - RightCrucible:GetAttribute(\"TimeLeft\")) / 120 * 20;\n        local v54 = \"\";\n\n        for _ = 1, v53 do\n            v54 = v54 .. \"|\";\n        end;\n\n        for _ = 1, 20 - v53 do\n            v54 = v54 .. \".\";\n        end;\n\n        Unit2.Text = \"U2: \" .. v54 .. \" \" .. round(100 - RightCrucible:GetAttribute(\"TimeLeft\") / 120 * 100, 0) .. \"%\";\n    end;\n\n    local v55;\n\n    if LeftCrucible.Value == \"\" then\n        v55 = RightCrucible.Value;\n    else\n        v55 = LeftCrucible.Value;\n    end;\n\n    if v55 == \"\" then\n        Container.Smelting.Text = \"Smelting: N/A\";\n    else\n        Container.Smelting.Text = \"Smelting: \" .. v55;\n    end;\n\n    if script.Liquid.Value == 0 then\n        Container.Molding.Text = \"Molding: N/A\";\n\n        return;\n    end;\n\n    Container.Molding.Text = \"Molding: \" .. u30[script.Item.Value][1][3];\nend;\n\nreturn v1;"
};
