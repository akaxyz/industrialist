export default {
  id: "LogicAssembler",
  category: "Logic",
  tier: 4,
  cost: 25000000,
  base: {
    height: 24,
    offset: {
      y: -2,
      x: 19.999969482421875
    },
    width: 44
  },
  nodes: [
    {
      name: "In3MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: -1.0100250244140625,
        x: -1.339935302734375
      },
      gameOffset: {
        y: 1.339500904083252,
        x: -1.339935302734375,
        z: -1.0100250244140625
      },
      tip: "Input for Semiconductors"
    },
    {
      name: "Out1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 30,
      transferAmount: 2,
      siteOffset: {
        y: -3,
        x: 41.330047607421875
      },
      gameOffset: {
        y: 1.329662799835205,
        x: 41.330047607421875,
        z: -3
      },
      tip: "Normal Output"
    },
    {
      name: "Out2MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: 9.262985229492188,
        x: 15.063018798828125
      },
      gameOffset: {
        y: 1.199657917022705,
        x: 15.063018798828125,
        z: 9.262985229492188
      },
      tip: "Has it failed?"
    },
    {
      name: "Out2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 30,
      transferAmount: 2,
      siteOffset: {
        y: -1,
        x: 41.330047607421875
      },
      gameOffset: {
        y: 1.3294987678527832,
        x: 41.330047607421875,
        z: -1
      },
      tip: "Failed output"
    },
    {
      name: "OutputLogicMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 9.262985229492188,
        x: 13.688018798828125
      },
      gameOffset: {
        y: 1.199657917022705,
        x: 13.688018798828125,
        z: 9.262985229492188
      },
      tip: "Makes machine output"
    },
    {
      name: "In4MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 30,
      transferAmount: 2,
      siteOffset: {
        y: 1.009979248046875,
        x: -1.32000732421875
      },
      gameOffset: {
        y: 1.339500904083252,
        x: -1.32000732421875,
        z: 1.009979248046875
      },
      tip: "Input for Gold Wire"
    },
    {
      name: "Out1MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: 9.262985229492188,
        x: 14.438018798828125
      },
      gameOffset: {
        y: 1.199657917022705,
        x: 14.438018798828125,
        z: 9.262985229492188
      },
      tip: "On = Idle or has not enough items, Off = not idle"
    },
    {
      name: "ClockLogicMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 9.262985229492188,
        x: 13.063018798828125
      },
      gameOffset: {
        y: 1.199657917022705,
        x: 13.063018798828125,
        z: 9.262985229492188
      },
      tip: "Starts machine with the selected item"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 25000000,
      transferAmount: 0,
      siteOffset: {
        y: 6.1874847412109375,
        x: 1.93756103515625
      },
      gameOffset: {
        y: 12.636957168579102,
        x: 1.93756103515625,
        z: 6.1874847412109375
      }
    },
    {
      name: "In1MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: -5,
        x: -1.32000732421875
      },
      gameOffset: {
        y: 1.3396596908569336,
        x: -1.32000732421875,
        z: -5
      },
      tip: "Input for Logic Plates"
    },
    {
      name: "In2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 30,
      transferAmount: 2,
      siteOffset: {
        y: -3,
        x: -1.339935302734375
      },
      gameOffset: {
        y: 1.3396596908569336,
        x: -1.339935302734375,
        z: -3
      },
      tip: "Input for Copper Wires"
    },
    {
      name: "FluidMainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 40,
      transferAmount: 2,
      siteOffset: {
        y: 0.9901275634765625,
        x: 41.399871826171875
      },
      gameOffset: {
        y: 1.3565020561218262,
        x: 41.399871826171875,
        z: 0.9901275634765625
      },
      tip: "Machine Oil"
    },
    {
      name: "Item1LogicMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 9.262985229492188,
        x: 10.563018798828125
      },
      gameOffset: {
        y: 1.199657917022705,
        x: 10.563018798828125,
        z: 9.262985229492188
      },
      tip: "Input to select Logic Plates for next item"
    },
    {
      name: "Item2LogicMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 9.262985229492188,
        x: 11.188018798828125
      },
      gameOffset: {
        y: 1.199657917022705,
        x: 11.188018798828125,
        z: 9.262985229492188
      },
      tip: "Input to select Copper wire for next item"
    },
    {
      name: "Item3LogicMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 9.262985229492188,
        x: 11.81304931640625
      },
      gameOffset: {
        y: 1.199657917022705,
        x: 11.81304931640625,
        z: 9.262985229492188
      },
      tip: "Input to select Semiconductors for next item"
    },
    {
      name: "Item4LogicMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 9.262985229492188,
        x: 12.438018798828125
      },
      gameOffset: {
        y: 1.199657917022705,
        x: 12.438018798828125,
        z: 9.262985229492188
      },
      tip: "Input to select Gold Wire for next item"
    }
  ],
  data: {
    History: ""
  },
  updateEvery: 5,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal ModelTweenUtils = require(ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u1 = ModelTweenUtils.new(script.Parent.RoboticArm);\nlocal u2 = ModelTweenUtils.new(script.Parent.RoboticArm.Vertical);\nrequire(ReplicatedStorage.Modules.NextTicks).new(script);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.In1MainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.In2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.In3MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.In4MainPipe);\nlocal u7 = PipeUtilsV2.loadConnector(script.Parent.Out2MainPipe);\nlocal u8 = PipeUtilsV2.loadConnector(script.Parent.Out1MainPipe);\nlocal u9 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal v10 = PowerUtilsV2.loadConnector(script.Parent.Item1LogicMainConnector);\nlocal v11 = PowerUtilsV2.loadConnector(script.Parent.Item2LogicMainConnector);\nlocal v12 = PowerUtilsV2.loadConnector(script.Parent.Item3LogicMainConnector);\nlocal v13 = PowerUtilsV2.loadConnector(script.Parent.Item4LogicMainConnector);\nlocal u14 = PowerUtilsV2.loadConnector(script.Parent.ClockLogicMainConnector);\nlocal u15 = PowerUtilsV2.loadConnector(script.Parent.OutputLogicMainConnector);\nlocal u16 = PowerUtilsV2.loadConnector(script.Parent.Out1MainConnector);\nlocal u17 = PowerUtilsV2.loadConnector(script.Parent.Out2MainConnector);\nlocal u18 = PipeUtilsV2.loadConnector(script.Parent.FluidMainPipe);\nlocal v19 = {};\nlocal State = script.Parent.State;\nlocal u20 = script.Parent.CalibrationPoint1.Position - script.Parent.CalibrationPoint2.Position;\nlocal u21 = false;\n\nfunction v19.localStart() -- Line: 44\n    -- upvalues: u20 (copy)\n    local u22 = nil;\n    u22 = game:GetService(\"RunService\").RenderStepped:Connect(function(p23) -- Line: 46\n        -- upvalues: u22 (ref), u20 (ref)\n        if script.Parent == nil then\n            u22:Disconnect();\n\n            return;\n        end;\n\n        local v24 = nil;\n\n        if math.floor(u20.Z) == 0 then\n            if math.floor(u20.X) ~= 0 then\n                v24 = Vector3.new(script.Parent.RoboticArm.Calibration.Position.X, script.Parent.RoboticArm.Calibration.Position.Y, script.Parent.CalibrationPoint1.Position.Z);\n            end;\n        else\n            v24 = Vector3.new(script.Parent.CalibrationPoint1.Position.X, script.Parent.RoboticArm.Calibration.Position.Y, script.Parent.RoboticArm.Calibration.Position.Z);\n        end;\n\n        local Orientation = script.Parent.RoboticArm.Calibration.Orientation;\n        script.Parent.SecondaryArm:PivotTo(CFrame.new(v24) * CFrame.Angles(0, math.rad(Orientation.Y + 90), 0));\n    end);\nend;\n\nlocal u25 = CFrame.Angles(0, math.rad(script.Parent.CalibrationPoint1.Orientation.Y - 90), 0);\n\nfunction v19.localUpdate() -- Line: 69\n    -- upvalues: State (copy), u1 (copy), u25 (ref), u21 (ref), u2 (copy)\n    if State.Value == \"\" then\n        return;\n    end;\n\n    local v26 = string.split(script.Parent.State.Value, \"|\");\n    local v27 = v26[1];\n    local v28 = script.Parent[v26[2]];\n    script.Parent.RoboticArm.Calibration.Motor:Play();\n    u1:newTween(TweenInfo.new(3 * v27), CFrame.new((Vector3.new(v28.Position.X, 10.94, v28.Position.Z))) * u25):Play();\n    task.wait(3 * v27);\n    script.Parent.RoboticArm.Calibration.Motor:Stop();\n    u21 = true;\n    script.Parent.RoboticArm.Calibration.RoboticArm.PlaybackSpeed = 1;\n    script.Parent.RoboticArm.Calibration.RoboticArm:Play();\n    u2:newTween(TweenInfo.new(1 * v27), u2:GetPivot() * CFrame.new(Vector3.new(3, 0, 0))):Play();\n    task.wait(1 * v27);\n    script.Parent.RoboticArm.Calibration.RoboticArm:Stop();\n    script.Parent.RoboticArm.Calibration.FirstClick:Play();\n    script.Parent.RoboticArm.Calibration.RoboticArm.PlaybackSpeed = 0.9;\n    script.Parent.RoboticArm.Calibration.RoboticArm:Play();\n    u2:newTween(TweenInfo.new(1 * v27), script.Parent.RoboticArm.Follow.CFrame):Play();\n    task.wait(1 * v27);\n    script.Parent.RoboticArm.Calibration.RoboticArm:Stop();\n    u21 = false;\nend;\n\nlocal u29 = {};\nlocal u30 = {\n    [\"Logic Plate\"] = {\n        u3,\n        v10,\n        3,\n        script.Parent.One\n    },\n    [\"Copper Wire\"] = {\n        u4,\n        v11,\n        12,\n        script.Parent.Two\n    },\n    Semiconductor = {\n        u5,\n        v12,\n        3,\n        script.Parent.Three\n    },\n    [\"Gold Wire\"] = {\n        u6,\n        v13,\n        6,\n        script.Parent.Four\n    }\n};\nlocal u31 = {\n    v10,\n    v11,\n    v12,\n    v13,\n    u14,\n    u15\n};\nlocal u32 = { \"2x Microchip\", \"4x Microchip\", \"8x Microchip\", \"16x Microchip\", \"32x Microchip\", \"64x Microchip\", \"2x64x Microchip\", \"3x64x Microchip\", \"4x64x Microchip\", \"5x64x Microchip\", \"6x64x Microchip\", \"7x64x Microchip\", \"8x64x Microchip\" };\n\nlocal function checkOrder() -- Line: 151\n    -- upvalues: u29 (ref)\n    local v33 = 0;\n    local v34 = 0;\n    local v35 = false;\n\n    for _, v in ipairs(u29) do\n        if v == \"Logic Plate\" and v33 == 0 then\n            v33 = 1;\n        elseif v == \"Copper Wire\" and v33 == 1 then\n            v33 = 2;\n        elseif v == \"Semiconductor\" and v33 == 2 then\n            v33 = 3;\n        else\n            if v ~= \"Gold Wire\" or v33 ~= 3 then\n                v35 = true;\n                break;\n            end;\n\n            v33 = 0;\n\n            if v34 >= 48 then\n                v35 = true;\n                break;\n            end;\n\n            v34 = v34 + 1;\n        end;\n    end;\n\n    local v36;\n\n    if v34 > 6 then\n        v36 = math.floor((v34 - 6) / 6) + 6;\n    else\n        v36 = v34;\n    end;\n\n    return v36, not v35, v34;\nend;\n\nlocal u37 = false;\nlocal u38 = 1;\nlocal Frame = script.Parent.Monitor.Screen.SurfaceGui.Frame;\nlocal u39 = {};\n\nlocal function update() -- Line: 190\n    -- upvalues: Frame (copy), u39 (copy)\n    for _, child in pairs(Frame.Container:GetChildren()) do\n        if child:IsA(\"TextLabel\") and table.find(u39, child) == nil then\n            child:Destroy();\n        end;\n    end;\nend;\n\nlocal function addLog(p40, p41) -- Line: 200\n    -- upvalues: u39 (copy), Frame (copy), update (copy)\n    if #u39 > 9 then\n        table.remove(u39, 1);\n    end;\n\n    local v42 = script.TextLabel:Clone();\n    v42.Text = p40;\n    v42.Name = tick();\n    v42.Parent = Frame.Container;\n    table.insert(u39, v42);\n\n    if p41 then\n        Frame.Parent.Parent.Error:Play();\n        v42.TextColor3 = Color3.fromRGB(255, 77, 32);\n    else\n        Frame.Parent.Parent.Log:Play();\n    end;\n\n    update();\nend;\n\nif game.Players.LocalPlayer == nil then\n    if #u39 > 9 then\n        table.remove(u39, 1);\n    end;\n\n    local v43 = script.TextLabel:Clone();\n    v43.Text = \"Hello world!\";\n    v43.Name = tick();\n    v43.Parent = Frame.Container;\n    table.insert(u39, v43);\n    Frame.Parent.Parent.Log:Play();\n    update();\nend;\n\nfunction v19.tick() -- Line: 223\n    -- upvalues: u29 (ref), u39 (copy), Frame (copy), update (copy), u9 (copy), u18 (copy), u38 (ref), checkOrder (copy), u15 (copy), u37 (ref), u32 (copy), State (copy), u8 (copy), u7 (copy), u14 (copy), u30 (copy), addLog (copy), u3 (copy), u4 (copy), u5 (copy), u6 (copy), u16 (copy), u17 (copy), u31 (copy)\n    if #u29 == 0 and script.Parent.ModelData.History.Value ~= \"\" then\n        u29 = string.split(script.Parent.ModelData.History.Value, \"|\");\n\n        if #u39 > 9 then\n            table.remove(u39, 1);\n        end;\n\n        local v44 = script.TextLabel:Clone();\n        v44.Text = \"Loaded old data!\";\n        v44.Name = tick();\n        v44.Parent = Frame.Container;\n        table.insert(u39, v44);\n        Frame.Parent.Parent.Log:Play();\n        update();\n    end;\n\n    if not u9:hasPower(500000) then\n        return;\n    end;\n\n    u9:removePower(500000);\n\n    if u18:hasAmountOf(\"Filtered Water\", 1) then\n        u38 = 2;\n        u18:removeItem(1);\n    elseif u18:hasAmountOf(\"Machine Oil\", 0.05) then\n        u38 = 5;\n        u18:removeItem(0.05);\n    else\n        u38 = 1;\n    end;\n\n    local v45, v46, _ = checkOrder();\n\n    if u15:hasPower(1) and (v46 and (v45 ~= 0 and not u37)) then\n        local u47 = u32[v45];\n        table.clear(u29);\n        script.Parent.ModelData.History.Value = \"\";\n        u37 = true;\n\n        if #u39 > 9 then\n            table.remove(u39, 1);\n        end;\n\n        local v48 = script.TextLabel:Clone();\n        v48.Text = \">output item\";\n        v48.Name = tick();\n        v48.Parent = Frame.Container;\n        table.insert(u39, v48);\n        Frame.Parent.Parent.Log:Play();\n        update();\n        task.spawn(function() -- Line: 258\n            -- upvalues: State (ref), u8 (ref), u47 (copy), u39 (ref), Frame (ref), update (ref), u37 (ref)\n            State.Value = \"1|Center\";\n            task.wait(5);\n            State.Value = \"1|Normal\";\n            task.wait(5);\n            u8:addItemAmount(u47, 1);\n            local v49 = `{u47} has been output!`;\n\n            if #u39 > 9 then\n                table.remove(u39, 1);\n            end;\n\n            local v50 = script.TextLabel:Clone();\n            v50.Text = v49;\n            v50.Name = tick();\n            v50.Parent = Frame.Container;\n            table.insert(u39, v50);\n            Frame.Parent.Parent.Log:Play();\n            update();\n            u37 = false;\n        end);\n    elseif u15:hasPower(1) and not (v46 or u37) then\n        local _, _, v51 = checkOrder();\n        table.clear(u29);\n        script.Parent.ModelData.History.Value = \"\";\n        u37 = true;\n\n        if #u39 > 9 then\n            table.remove(u39, 1);\n        end;\n\n        local v52 = script.TextLabel:Clone();\n        v52.Text = \">output item\";\n        v52.Name = tick();\n        v52.Parent = Frame.Container;\n        table.insert(u39, v52);\n        Frame.Parent.Parent.Log:Play();\n        update();\n        u7:addItemAmount(\"Microchip Scrap\", v51);\n        task.spawn(function() -- Line: 275\n            -- upvalues: State (ref), u39 (ref), Frame (ref), update (ref), u37 (ref)\n            State.Value = \"1|Center\";\n            task.wait(5);\n            State.Value = \"1|FailedOut\";\n            task.wait(5);\n\n            if #u39 > 9 then\n                table.remove(u39, 1);\n            end;\n\n            local v53 = script.TextLabel:Clone();\n            v53.Text = \"Scrap has been output!\";\n            v53.Name = tick();\n            v53.Parent = Frame.Container;\n            table.insert(u39, v53);\n            Frame.Parent.Parent.Log:Play();\n            update();\n            u37 = false;\n        end);\n    end;\n\n    if u14:hasPower(1) and not u37 then\n        for i, v in pairs(u30) do\n            if v[2]:hasPower(1) and v[1]:hasAmountOf(i, v[3]) then\n                v[1]:removeItem(v[3]);\n                u37 = true;\n                local v54 = `>add {i}`;\n\n                if #u39 > 9 then\n                    table.remove(u39, 1);\n                end;\n\n                local v55 = script.TextLabel:Clone();\n                v55.Text = v54;\n                v55.Name = tick();\n                v55.Parent = Frame.Container;\n                table.insert(u39, v55);\n                Frame.Parent.Parent.Log:Play();\n                update();\n                task.spawn(function() -- Line: 294\n                    -- upvalues: u38 (ref), State (ref), v (copy), u29 (ref), i (copy), u39 (ref), Frame (ref), update (ref), checkOrder (ref), addLog (ref), u32 (ref), u37 (ref)\n                    math.randomseed(tick());\n                    local v56 = math.random(33, 300) / 100 / u38;\n                    State.Value = v56 .. \"|\" .. v[4].Name;\n                    task.wait(6 * v56);\n                    math.randomseed(tick());\n                    local v57 = math.random(33, 300) / 100 / u38;\n                    State.Value = v57 .. \"|\" .. script.Parent.Center.Name;\n                    table.insert(u29, i);\n                    local v58 = `Added {i}!`;\n\n                    if #u39 > 9 then\n                        table.remove(u39, 1);\n                    end;\n\n                    local v59 = script.TextLabel:Clone();\n                    v59.Text = v58;\n                    v59.Name = tick();\n                    v59.Parent = Frame.Container;\n                    table.insert(u39, v59);\n                    Frame.Parent.Parent.Log:Play();\n                    update();\n                    local v60, v61, v62 = checkOrder();\n\n                    if v61 then\n                        if i == \"Gold Wire\" then\n                            local v63 = `Current item: {u32[v60]} (stage {v62})`;\n\n                            if #u39 > 9 then\n                                table.remove(u39, 1);\n                            end;\n\n                            local v64 = script.TextLabel:Clone();\n                            v64.Text = v63;\n                            v64.Name = tick();\n                            v64.Parent = Frame.Container;\n                            table.insert(u39, v64);\n                            Frame.Parent.Parent.Log:Play();\n                            update();\n                        end;\n                    else\n                        addLog(\"This was not the right order!\", true);\n                    end;\n\n                    task.wait(6 * v57);\n                    u37 = false;\n                end);\n                break;\n            end;\n        end;\n    end;\n\n    if u37 == false and (u3:hasAmount(3) and (u4:hasAmount(12) and (u5:hasAmount(3) and u6:hasAmount(6)))) then\n        u16:addPower(1000);\n    else\n        u16:removePower(1000);\n    end;\n\n    local v65, v66, _ = checkOrder();\n\n    if v65 == 0 then\n        script.Parent.Center.SurfaceGui.TextLabel.Text = \"\";\n    else\n        script.Parent.Center.SurfaceGui.TextLabel.Text = u32[v65];\n    end;\n\n    if v66 == false then\n        u17:addPower(1000);\n        script.Parent.Center.SurfaceGui.TextLabel.Text = \"Scrap\";\n    else\n        u17:removePower(1000);\n    end;\n\n    for _, v in pairs(u31) do\n        v:removePower(6000);\n    end;\n\n    script.Parent.ModelData.History.Value = table.concat(u29, \"|\");\nend;\n\nreturn v19;"
};
