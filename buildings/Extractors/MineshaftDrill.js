export default {
  id: "MineshaftDrill",
  category: "Extractors",
  tier: 4,
  cost: 1100000,
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
      name: "ItemIn2MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: 1.399993896484375,
        x: -13
      },
      gameOffset: {
        y: 1.457003116607666,
        x: -13,
        z: 1.399993896484375
      },
      tip: "Input for Dynamite (optional to drill down faster, doesn't gain more resources)"
    },
    {
      name: "ItemOut4MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -14.980010986328125,
        x: 1.56500244140625
      },
      gameOffset: {
        y: 1.2950079441070557,
        x: 1.56500244140625,
        z: -14.980010986328125
      },
      tip: "Output for ..."
    },
    {
      name: "ItemOut3MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -12.980010986328125,
        x: 1.56500244140625
      },
      gameOffset: {
        y: 1.2950079441070557,
        x: 1.56500244140625,
        z: -12.980010986328125
      },
      tip: "Output for ..."
    },
    {
      name: "ItemOut2MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -10.980010986328125,
        x: 1.56500244140625
      },
      gameOffset: {
        y: 1.2950079441070557,
        x: 1.56500244140625,
        z: -10.980010986328125
      },
      tip: "Output for ..."
    },
    {
      name: "ItemOut1MainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -8.980010986328125,
        x: 1.56500244140625
      },
      gameOffset: {
        y: 1.2950079441070557,
        x: 1.56500244140625,
        z: -8.980010986328125
      },
      tip: "Output for ..."
    },
    {
      name: "FluidOut2MainPipe",
      kind: "fluid",
      direction: "output",
      maxAmount: 100,
      transferAmount: 20,
      siteOffset: {
        y: 1.399993896484375,
        x: -11.02001953125
      },
      gameOffset: {
        y: 1.457003116607666,
        x: -11.02001953125,
        z: 1.399993896484375
      },
      tip: "Unused node."
    },
    {
      name: "FluidIn2MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -11.005157470703125,
        x: -25.4151611328125
      },
      gameOffset: {
        y: 1.4669990539550781,
        x: -25.4151611328125,
        z: -11.005157470703125
      },
      tip: "Input for Machine Oil"
    },
    {
      name: "ItemInMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 1,
      transferAmount: 20,
      siteOffset: {
        y: -5.1099853515625,
        x: 0.94000244140625
      },
      gameOffset: {
        y: 1.4060039520263672,
        x: 0.94000244140625,
        z: -5.1099853515625
      },
      tip: "Input for Drill Heads"
    },
    {
      name: "FluidIn1MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 200,
      transferAmount: 20,
      siteOffset: {
        y: -13.005157470703125,
        x: -25.4151611328125
      },
      gameOffset: {
        y: 1.4669990539550781,
        x: -25.4151611328125,
        z: -13.005157470703125
      },
      tip: "Input for Any Acid or Water. Better acid = less durability usage."
    },
    {
      name: "MainConnector",
      kind: "hv",
      direction: "input",
      maxAmount: 50000000,
      transferAmount: 0,
      siteOffset: {
        y: -0.2073974609375,
        x: -24.0555419921875
      },
      gameOffset: {
        y: 37.36249923706055,
        x: -24.0555419921875,
        z: -0.2073974609375
      }
    }
  ],
  data: {
    Durability: 0,
    Analyzed: 0,
    DrillDepth: 0,
    Type: 0,
    TargetDepth: 0,
    Depth: 0,
    Output: false
  },
  updateEvery: 30,
  script: "local v1 = {};\nlocal Achievements = require(game.ReplicatedStorage.Modules.Achievements);\nlocal PipeUtilsV2 = require(game.ReplicatedStorage.Modules.PipeUtilsV2);\nlocal PowerUtilsV2 = require(game.ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(game.ReplicatedStorage.Modules.Permissions);\nlocal u2 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.ItemInMainPipe);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.ItemIn2MainPipe);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.FluidIn1MainPipe);\nlocal u6 = PipeUtilsV2.loadConnector(script.Parent.FluidIn2MainPipe);\nlocal u7 = {\n    PipeUtilsV2.loadConnector(script.Parent.ItemOut1MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.ItemOut2MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.ItemOut3MainPipe),\n    PipeUtilsV2.loadConnector(script.Parent.ItemOut4MainPipe)\n};\nlocal State = script.Parent.State;\nlocal ModelData = script.Parent.ModelData;\nlocal Durability = ModelData.Durability;\nlocal Type = ModelData.Type;\nlocal Drill = script.Parent.Drill.Drill;\nrequire(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal u8 = nil;\nlocal u9 = nil;\ngame:GetService(\"TweenService\");\nlocal u10 = 0;\nlocal u11 = 0;\nlocal u12 = 0;\nlocal u13 = 0;\nlocal GrinderParticles = script.Parent.GrinderParticles;\n\nfunction v1.localStart() -- Line: 48\n    -- upvalues: u8 (ref), Drill (copy), u9 (ref), ModelData (copy), u12 (ref), u10 (ref), u11 (ref), u13 (ref), GrinderParticles (copy)\n    u8 = Drill:GetPivot();\n    u9 = u8 - Vector3.new(0, 10, 0);\n    local u14 = 0;\n    local u15 = nil;\n    u15 = game:GetService(\"RunService\").RenderStepped:Connect(function(p16) -- Line: 54\n        -- upvalues: ModelData (ref), u15 (ref), u12 (ref), u10 (ref), Drill (ref), u11 (ref), u13 (ref), u8 (ref), u9 (ref), GrinderParticles (ref), u14 (ref)\n        if ModelData == nil then\n            u15:Disconnect();\n\n            return;\n        end;\n\n        if ModelData.Parent == nil then\n            u15:Disconnect();\n\n            return;\n        end;\n\n        if u12 >= 1 and u10 < 60 then\n            u10 = math.clamp(u10 + 6 * p16, 0, 60);\n\n            for _, child in pairs(Drill.Drills:GetChildren()) do\n                child:PivotTo(child:GetPivot() * CFrame.Angles(0, 0, (math.rad(u10))));\n            end;\n        elseif u12 == -1 and u10 > 0 then\n            u10 = math.clamp(u10 - 20 * p16, 0, 60);\n\n            for _, child in pairs(Drill.Drills:GetChildren()) do\n                child:PivotTo(child:GetPivot() * CFrame.Angles(0, 0, (math.rad(u10))));\n            end;\n        end;\n\n        if u12 == 2 and u11 < 100 then\n            u13 = u13 + p16;\n            u11 = math.clamp(u11 + 40 * p16, 0, 100);\n            Drill:PivotTo(u8:Lerp(u9, u11 / 100) * CFrame.Angles(math.rad(u11 ^ 1.3 * u13), 0, 0));\n        elseif u12 == -1 and u11 > 0 then\n            u13 = u13 - p16;\n            u11 = math.clamp(u11 - 40 * p16, 0, 100);\n            Drill:PivotTo(u8:Lerp(u9, u11 / 100) * CFrame.Angles(math.rad(u11 ^ 1.3 * u13), 0, 0));\n        end;\n\n        if ModelData.Output.Value and ModelData.Depth.Value == ModelData.TargetDepth.Value then\n            if GrinderParticles.GrinderLoop.Playing == false then\n                GrinderParticles.GrinderLoop:Play();\n                GrinderParticles.dust2.Enabled = true;\n                local v17 = ColorSequence.new(Color3.fromRGB(255, 255, 255):Lerp(Color3.fromRGB(38, 38, 38), ModelData.Depth.Value / 12000));\n                script.Parent.Hole.Debri1.debri.Color = v17;\n                script.Parent.Hole.Debri2.debri.Color = v17;\n                script.Parent.Hole.Debri1.debri.Enabled = true;\n                script.Parent.Hole.Debri2.debri.Enabled = true;\n            end;\n\n            u14 = u14 + 1;\n\n            if u14 % 2 == 0 then\n                script.Parent.Shredder.ShredderIn.CFrame = script.Parent.Shredder.ShredderIn.CFrame * CFrame.Angles(0, 0, 0.17453292519943295);\n                script.Parent.Shredder.ShredderOut.CFrame = script.Parent.Shredder.ShredderOut.CFrame * CFrame.Angles(0, 0, 0.17453292519943295);\n            end;\n        elseif GrinderParticles.GrinderLoop.Playing == true then\n            GrinderParticles.GrinderLoop:Stop();\n            GrinderParticles.dust2.Enabled = false;\n            script.Parent.Hole.Debri1.debri.Enabled = false;\n            script.Parent.Hole.Debri2.debri.Enabled = false;\n        end;\n    end);\nend;\n\nfunction v1.localUpdate() -- Line: 117\n    -- upvalues: State (copy), u13 (ref), u12 (ref)\n    if State.Value == \"0\" or State.Value == \"\" then\n        if State.Value == \"0\" then\n            u12 = -1;\n        end;\n\n        return;\n    end;\n\n    u13 = 0;\n    u12 = 1;\n    task.wait(4);\n    u12 = 2;\nend;\n\nlocal Display = script.Parent.Monitors.MainMonitor.SurfaceGui.Display;\nlocal u18 = { 300, 900, 1200, 1500, 1800 };\n\nif game.Players.LocalPlayer == nil then\n    Display.Buttons.AddDepth.MouseButton1Click:Connect(function(...) -- Line: 141\n        -- upvalues: ModelData (copy), u18 (copy)\n        local Value = ModelData.TargetDepth.Value;\n\n        for _, v in pairs(u18) do\n            if v >= Value then\n                if Value < v then\n                    ModelData.TargetDepth.Value = v;\n\n                    return;\n                end;\n            end;\n        end;\n\n        ModelData.TargetDepth.Value = math.clamp(ModelData.TargetDepth.Value + 200, 0, 9000);\n    end);\n    Display.Buttons.MinusDepth.MouseButton1Click:Connect(function() -- Line: 156\n        -- upvalues: ModelData (copy), u18 (copy)\n        local Value = ModelData.TargetDepth.Value;\n\n        for i = #u18, 1, -1 do\n            local v19 = u18[i];\n\n            if Value >= v19 then\n                if v19 < Value and math.abs(Value - v19) <= 1500 then\n                    ModelData.TargetDepth.Value = v19;\n\n                    return;\n                end;\n            end;\n        end;\n\n        ModelData.TargetDepth.Value = math.clamp(ModelData.TargetDepth.Value - 200, 0, 9000);\n    end);\n    Display.Buttons.Output.MouseButton1Click:Connect(function() -- Line: 172\n        -- upvalues: Display (copy), ModelData (copy)\n        if Display.Buttons.Output.Text == \"NOT AT TARGET\" then\n            return;\n        end;\n\n        if not ModelData.Output.Value and ModelData.Depth.Value == ModelData.TargetDepth.Value then\n            Display.Buttons.Output.Text = \"OUTPUT IS ON\";\n            ModelData.Output.Value = true;\n\n            return;\n        end;\n\n        if ModelData.Output.Value then\n            Display.Buttons.Output.Text = \"OUTPUT IS OFF\";\n            ModelData.Output.Value = false;\n\n            return;\n        end;\n\n        Display.Buttons.Output.Text = \"NOT AT TARGET\";\n        task.wait(1);\n        Display.Buttons.Output.Text = \"OUTPUT IS OFF\";\n    end);\n    Display.Buttons.Void.MouseButton1Click:Connect(function() -- Line: 187\n        -- upvalues: u7 (copy), u5 (copy)\n        for _, v in pairs(u7) do\n            v:removeItem(5000);\n        end;\n\n        u5:setItem(0, \"\");\n    end);\n\n    if ModelData.Type.Value == 0 then\n        for _, descendant in pairs(script.Parent.Drill.Drill:GetDescendants()) do\n            if descendant:IsA(\"BasePart\") then\n                descendant.Transparency = 1;\n            end;\n        end;\n    end;\nend;\n\nif ModelData.Output.Value then\n    Display.Buttons.Output.Text = \"OUTPUT IS ON\";\nelse\n    Display.Buttons.Output.Text = \"OUTPUT IS OFF\";\nend;\n\nlocal Value = ModelData.Type.Value;\n\nfor _, descendant in pairs(script.Parent.Drill.Drill:GetDescendants()) do\n    if descendant:IsA(\"BasePart\") then\n        descendant.Material = Enum.Material.Metal;\n\n        if Value == 1 then\n            descendant.Color = Color3.fromRGB(220, 112, 35);\n        elseif Value == 2 then\n            descendant.Color = Color3.fromRGB(220, 220, 220);\n        elseif Value == 3 then\n            descendant.Color = Color3.fromRGB(168, 144, 127);\n        elseif Value == 4 then\n            descendant.Color = Color3.fromRGB(89, 89, 89);\n        elseif Value == 5 then\n            descendant.Color = Color3.fromRGB(74, 89, 79);\n        end;\n    end;\nend;\n\nlocal lootTable = require(game.ReplicatedStorage.Modules.DepthProceduralPregenerator).lootTable;\n\nlocal function getCurrentStageDifficulty() -- Line: 229\n    -- upvalues: ModelData (copy), lootTable (copy)\n    local Value2 = ModelData.Depth.Value;\n\n    for i = #lootTable, 1, -1 do\n        local v20 = lootTable[i];\n\n        if v20[1] <= Value2 then\n            return v20;\n        end;\n    end;\n\n    return lootTable[1];\nend;\n\nlocal Value2 = ModelData.Depth.Value;\nlocal u21 = { 0, 10, 3, 1, 1.5 };\nlocal u22;\n\nfor i = #lootTable, 1, -1 do\n    u22 = lootTable[i];\n\n    if u22[1] <= Value2 then\n        break;\n    end;\nend;\n\nlocal u23 = 0;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u24 = 0;\nlocal u25 = tick();\nlocal u26 = false;\n\nfunction v1.tick() -- Line: 263\n    -- upvalues: u2 (copy), Display (copy), u23 (ref), u3 (copy), u5 (copy), u22 (ref), ModelData (copy), lootTable (copy), u6 (copy), Type (copy), u21 (copy), u7 (copy), Pollution (copy), u4 (copy), u25 (ref), u26 (ref), State (copy), Durability (copy), Achievements (copy), u24 (ref)\n    if u2:hasPower(100000) then\n        u2:removePower(100000);\n\n        if Display.Parent.Enabled == false then\n            Display.Parent.Enabled = true;\n            script.Parent.Monitors.Depth.SurfaceGui.Enabled = true;\n        end;\n    elseif Display.Parent.Enabled == true then\n        Display.Parent.Enabled = false;\n        script.Parent.Monitors.Depth.SurfaceGui.Enabled = false;\n    end;\n\n    u23 = u23 + 1;\n\n    if u3:getBuffer() == 0 then\n        u3:setItem(0, \"\");\n    end;\n\n    if u5:getBuffer() == 0 then\n        u5:setItem(0, \"\");\n    end;\n\n    local Value3 = ModelData.Depth.Value;\n    local v27;\n\n    for i = #lootTable, 1, -1 do\n        v27 = lootTable[i];\n\n        if v27[1] <= Value3 then\n            break;\n        end;\n    end;\n\n    u22 = v27;\n    local v28, v29;\n\n    if u6:hasAmountOf(\"Machine Oil\", 2) then\n        v28 = 2;\n        v29 = 1.1;\n    else\n        v28 = 1;\n        v29 = 1;\n    end;\n\n    local Value4 = Type.Value;\n\n    if Value4 == 0 then\n        if u26 == false and u2:hasPower(500000) then\n            u2:removePower(500000);\n            ModelData.Depth.Value = ModelData.Depth.Value - math.clamp(ModelData.Depth.Value, v28 * -50, v28 * 50);\n            Display.Body.Status.Text = \"MOVING UP FOR REPLACEMENT\";\n\n            if v28 == 2 then\n                u6:removeItem(2);\n            end;\n\n            if ModelData.Depth.Value == 0 and u26 == false then\n                Display.Body.Status.Text = \"REPLACING DRILL\";\n                local u30 = u3:hasAmountOf(\"Tungsten Carbide Drill Head\", 1) and 5 or (u3:hasAmountOf(\"Steel Drill Head\", 1) and 4 or (u3:hasAmountOf(\"Iron Drill Head\", 1) and 3 or (u3:hasAmountOf(\"Aluminium Drill Head\", 1) and 2 or (u3:hasAmountOf(\"Copper Drill Head\", 1) and 1 or 0))));\n\n                if u30 ~= 0 then\n                    u3:removeItem(1);\n                    u26 = true;\n                    State.Value = \"0\";\n                    task.spawn(function() -- Line: 465\n                        -- upvalues: u30 (ref), State (ref), u26 (ref), Durability (ref), Type (ref)\n                        task.wait(4);\n\n                        for _, descendant in pairs(script.Parent.Drill.Drill:GetDescendants()) do\n                            if descendant:IsA(\"BasePart\") then\n                                descendant.Transparency = 1;\n                                descendant.Material = Enum.Material.Metal;\n\n                                if u30 == 1 then\n                                    descendant.Color = Color3.fromRGB(220, 112, 35);\n                                elseif u30 == 2 then\n                                    descendant.Color = Color3.fromRGB(220, 220, 220);\n                                elseif u30 == 3 then\n                                    descendant.Color = Color3.fromRGB(168, 144, 127);\n                                elseif u30 == 4 then\n                                    descendant.Color = Color3.fromRGB(89, 89, 89);\n                                elseif u30 == 5 then\n                                    descendant.Color = Color3.fromRGB(74, 89, 79);\n                                end;\n                            end;\n                        end;\n\n                        task.wait(2);\n\n                        for _, descendant in pairs(script.Parent.Drill.Drill:GetDescendants()) do\n                            if descendant:IsA(\"BasePart\") then\n                                descendant.Transparency = 0;\n                            end;\n                        end;\n\n                        State.Value = \"1\";\n                        task.wait(6);\n                        u26 = false;\n                        Durability.Value = 100;\n                        Type.Value = u30;\n                    end);\n                end;\n            end;\n        end;\n    else\n        local Value5 = ModelData.TargetDepth.Value;\n\n        if ModelData.Depth.Value < ModelData.DrillDepth.Value and (ModelData.Depth.Value < Value5 and u2:hasPower(500000)) then\n            u2:removePower(500000);\n            ModelData.Depth.Value = math.clamp(ModelData.Depth.Value + v28 * 50, 0, ModelData.DrillDepth.Value);\n            Display.Body.Status.Text = \"MOVING DOWN\";\n\n            if v28 == 2 then\n                u6:removeItem(2);\n            end;\n\n            if script.Parent.Hole[\"Buzzing lights\"].Playing == true and script.Parent.Hole[\"Buzzing lights (other)\"].Playing == false then\n                script.Parent.Hole[\"Buzzing lights\"]:Pause();\n                script.Parent.Hole[\"Drill Loop\"]:Pause();\n                script.Parent.Hole[\"Buzzing lights (other)\"]:Resume();\n            end;\n        elseif ModelData.Durability.Value >= 0 and (ModelData.Depth.Value <= Value5 and (Value5 ~= 0 and u2:hasPower(2000000))) then\n            local v31 = u5:getItem();\n            local v32 = u5:getBuffer();\n            local v33 = v31 == \"Water\" and 2 or (v31 == \"Acetic Acid\" and 3 or (v31 == \"Sulfuric Acid\" and 4 or (v31 == \"Hydrochloric Acid\" and 5 or 1)));\n            local v34 = v32 < u21[v33] and 1 or v33;\n            local v35 = u22[2][Value4] * u22[3][v34] * 0.5;\n\n            if ModelData.Depth.Value == Value5 and ModelData.Output.Value == true then\n                u2:removePower(2000000);\n\n                for i, v in ipairs(u22[4]) do\n                    u7[i]:addItemAmount(v[1], v[2] * v29);\n                end;\n\n                Display.Body.Status.Text = \"SCAVENGING\";\n\n                if v28 == 2 then\n                    u6:removeItem(2);\n                end;\n\n                u5:removeItem(u21[v34]);\n                local Durability2 = ModelData.Durability;\n                Durability2.Value = Durability2.Value - v35 * v29;\n                local v36 = Pollution;\n                v36.Value = v36.Value + Value5 / 100;\n\n                if u23 % 3 == 0 then\n                    script.Parent.Hole.Drill:Play();\n                end;\n\n                if script.Parent.Hole[\"Buzzing lights\"].Playing == false then\n                    script.Parent.Hole[\"Buzzing lights\"]:Play();\n                    script.Parent.Hole[\"Drill Loop\"]:Resume();\n                    script.Parent.Hole[\"Buzzing lights (other)\"]:Pause();\n                end;\n            elseif ModelData.Depth.Value < Value5 then\n                u2:removePower(2000000);\n\n                if v28 == 2 then\n                    u6:removeItem(2);\n                end;\n\n                if u4:hasAmountOf(\"Dynamite\", 1) and tick() - u25 >= 4 then\n                    u4:removeItem(1);\n                    u25 = tick();\n                    script.Parent.Hole.explosion:Play();\n                    local Depth = ModelData.Depth;\n                    Depth.Value = Depth.Value + 24;\n                    local DrillDepth = ModelData.DrillDepth;\n                    DrillDepth.Value = DrillDepth.Value + 24;\n                end;\n\n                local Depth = ModelData.Depth;\n                Depth.Value = Depth.Value + v28 * 1;\n                local DrillDepth = ModelData.DrillDepth;\n                DrillDepth.Value = DrillDepth.Value + v28 * 1;\n                Display.Body.Status.Text = \"DRILLING DOWN\";\n                u5:removeItem(u21[v34]);\n                local Durability2 = ModelData.Durability;\n                Durability2.Value = Durability2.Value - v35 * v28;\n\n                if u23 % 3 == 0 then\n                    script.Parent.Hole.Drill:Play();\n                end;\n\n                if script.Parent.Hole[\"Buzzing lights\"].Playing == false then\n                    script.Parent.Hole[\"Buzzing lights\"]:Play();\n                    script.Parent.Hole[\"Drill Loop\"]:Resume();\n                    script.Parent.Hole[\"Buzzing lights (other)\"]:Pause();\n                end;\n            else\n                Display.Body.Status.Text = \"IDLE\";\n            end;\n        elseif ModelData.Durability.Value >= 0 and (u2:hasPower(500000) and Value5 < ModelData.Depth.Value) then\n            u2:removePower(500000);\n\n            if script.Parent.Hole[\"Buzzing lights\"].Playing == true and script.Parent.Hole[\"Buzzing lights (other)\"].Playing == false then\n                script.Parent.Hole[\"Buzzing lights\"]:Pause();\n                script.Parent.Hole[\"Drill Loop\"]:Pause();\n                script.Parent.Hole[\"Buzzing lights (other)\"]:Resume();\n            end;\n\n            if v28 == 2 then\n                u6:removeItem(2);\n            end;\n\n            ModelData.Depth.Value = ModelData.Depth.Value - math.clamp(ModelData.Depth.Value - Value5, v28 * -50, v28 * 50);\n            Display.Body.Status.Text = \"MOVING UP\";\n        else\n            Display.Body.Status.Text = \"UNKNOWN\";\n            script.Parent.Hole[\"Buzzing lights\"]:Pause();\n            script.Parent.Hole[\"Drill Loop\"]:Pause();\n            script.Parent.Hole[\"Buzzing lights (other)\"]:Resume();\n        end;\n\n        if ModelData.Durability.Value <= 0 then\n            for _, descendant in pairs(script.Parent.Drill.Drill:GetDescendants()) do\n                if descendant:IsA(\"BasePart\") then\n                    descendant.Material = Enum.Material.CorrodedMetal;\n                end;\n            end;\n\n            for _, child in pairs(script.Parent.Drill.Drill.Drills:GetChildren()) do\n                child.Transparency = 1;\n            end;\n\n            Type.Value = 0;\n            script.Parent.Hole.DrillBreak:Play();\n            script.Parent.Hole[\"Buzzing lights\"]:Pause();\n            script.Parent.Hole[\"Drill Loop\"]:Pause();\n            script.Parent.Hole[\"Buzzing lights (other)\"]:Resume();\n        end;\n    end;\n\n    if Durability.Value >= 0 and State.Value == \"\" then\n        State.Value = \"1\";\n    end;\n\n    if ModelData.DrillDepth.Value >= 9000 then\n        Achievements.giveBadge(3690428393496648);\n    end;\n\n    script.Parent.Hole.Drill.EqualizerSoundEffect.HighGain = -ModelData.Depth.Value / 2000;\n    script.Parent.Hole.Drill.EqualizerSoundEffect.MidGain = -ModelData.Depth.Value / 4000;\n    script.Parent.Hole[\"Drill Loop\"].EqualizerSoundEffect.HighGain = -ModelData.Depth.Value / 2000;\n    script.Parent.Hole[\"Drill Loop\"].EqualizerSoundEffect.MidGain = -ModelData.Depth.Value / 4000;\n    script.Parent.Hole.DrillBreak.EqualizerSoundEffect.HighGain = -ModelData.Depth.Value / 2000;\n    script.Parent.Hole.DrillBreak.EqualizerSoundEffect.MidGain = -ModelData.Depth.Value / 4000;\n    script.Parent.Hole.explosion.EqualizerSoundEffect.HighGain = -ModelData.Depth.Value / 2000;\n    script.Parent.Hole.explosion.EqualizerSoundEffect.MidGain = -ModelData.Depth.Value / 4000;\n    script.Parent.Monitors.Depth.SurfaceGui.TextLabel.Text = ModelData.Depth.Value;\n    local v37 = u24 - ModelData.Durability.Value;\n    u24 = ModelData.Durability.Value;\n    local v38 = math.clamp(v37, 0, (1 / 0)) * 1000;\n    local v39 = math.round(v38) / 1000;\n    local v40 = math.clamp(ModelData.Durability.Value, 0, 100) * 10;\n    local v41 = math.round(v40) / 10;\n    Display.Body.Durability.Text = \"DURABILITY: \" .. v41 .. \"% (\" .. v39 .. \"%/s)\";\n    Display.Body.Depth.Text = \"TARGET DEPTH: \" .. ModelData.TargetDepth.Value .. \"M\";\n    Display.Body.HoleDepth.Text = \"HOLE DEPTH: \" .. ModelData.DrillDepth.Value .. \"M\";\n\n    for i, v in ipairs(u22[4]) do\n        local v42 = string.sub(v[1], 1, 19);\n\n        if string.len(v42) < string.len(v[1]) then\n            v42 = v42 .. \".\";\n        end;\n\n        Display.Body[\"Item\" .. i].Text = `- {v42} - {math.round(v[2] * v29 * 10) / 10}/s `;\n    end;\n\n    for i = 1, 4 - #u22[4] do\n        Display.Body[\"Item\" .. 5 - i].Text = \"\";\n    end;\nend;\n\nreturn v1;"
};
