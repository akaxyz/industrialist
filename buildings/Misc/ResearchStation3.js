export default {
  id: "ResearchStation3",
  category: "Misc",
  tier: 3,
  cost: 100000,
  base: {
    height: 32,
    offset: {
      y: -13.99993896484375,
      x: -18
    },
    width: 48
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 700000,
      transferAmount: 0,
      siteOffset: {
        y: -2.516265869140625,
        x: 4.97467041015625
      },
      gameOffset: {
        y: 7.066991806030273,
        x: 4.97467041015625,
        z: -2.516265869140625
      }
    },
    {
      name: "MainPipe2",
      kind: "item",
      direction: "input",
      maxAmount: 4,
      transferAmount: 4,
      siteOffset: {
        y: 1.199920654296875,
        x: 1.021240234375
      },
      gameOffset: {
        y: 1.3750553131103516,
        x: 1.021240234375,
        z: 1.199920654296875
      }
    },
    {
      name: "MainPipe1",
      kind: "item",
      direction: "input",
      maxAmount: 4,
      transferAmount: 4,
      siteOffset: {
        y: 1.199951171875,
        x: -0.978759765625
      },
      gameOffset: {
        y: 1.375229835510254,
        x: -0.978759765625,
        z: 1.199951171875
      }
    }
  ],
  data: {
    LogicBuff: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe1);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe2);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal _ = script.Parent.State;\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal Body = script.Parent.Monitor.SurfaceGui.Display.Body;\nlocal v4 = {};\nlocal u5 = require(game:GetService(\"ReplicatedStorage\").FormatNumber.Main).NumberFormatter.with();\nlocal u6 = 0;\n\nfunction round(p7, p8)\n    if p8 == 0 then\n        return math.floor(p7 + 0.5);\n    end;\n\n    local v9 = 10 ^ (p8 or 0);\n\n    return math.floor(p7 * v9 + 0.5) / v9;\nend;\n\nlocal TweenService = game:GetService(\"TweenService\");\nlocal CFrame = script.Parent.RS4Move.CFrame;\nlocal CFrame2 = script.Parent.RS4Connection.CFrame;\n\nlocal function upd(p10) -- Line: 36\n    -- upvalues: CFrame (copy), TweenService (copy), CFrame2 (copy)\n    if script.Parent.Neighbor.Value ~= nil or p10 then\n        if script.Parent.Neighbor.Value ~= nil then\n            script.Parent.RS4Remove.Transparency = 1;\n            script.Parent.RS4Move.Position = CFrame.Position + CFrame.LookVector * 0.8;\n            TweenService:Create(script.Parent.RS4Connection, TweenInfo.new(3.8, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut), {\n                Position = CFrame2.Position + CFrame2.RightVector * 7\n            }):Play();\n            script.Parent.RS4Connection.Hydraulic:Play();\n            task.wait(3.7);\n            script.Parent.RS4Connection[\"Metal Door Close\"]:Play();\n        end;\n\n        return;\n    end;\n\n    script.Parent.RS4Remove.Transparency = 0;\n    script.Parent.RS4Move.Position = CFrame.Position;\n    script.Parent.RS4Connection.HydraulicEnd:Play();\n    TweenService:Create(script.Parent.RS4Connection, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut), {\n        Position = CFrame2.Position\n    }):Play();\nend;\n\nscript.Parent.Neighbor:GetPropertyChangedSignal(\"Value\"):Connect(upd);\ntask.spawn(upd, true);\nlocal Detector = script.Parent.Detector;\nlocal v11 = RaycastParams.new();\nv11.FilterDescendantsInstances = { workspace.Plots.Misc };\nv11.FilterType = Enum.RaycastFilterType.Include;\nlocal v12 = workspace:Raycast(Detector.Position, Detector.CFrame.LookVector * 6, v11);\n\nif v12 and (v12.Instance.Name == \"Detector\" and v12.Instance.Parent:GetAttribute(\"Name\") == \"ResearchStation4\") then\n    script.Parent.Neighbor.Value = v12.Instance.Parent;\n    v12.Instance.Parent.Neighbor.Value = script.Parent;\nend;\n\nlocal u13 = false;\nlocal Radiation = game.ReplicatedStorage.Statistics.Radiation;\n\nfunction v4.tick() -- Line: 74\n    -- upvalues: u13 (ref), u3 (copy), Body (copy), u6 (ref), u5 (copy), u1 (copy), u2 (copy), Items (copy), Radiation (copy)\n    if script.Parent.Neighbor.Value and script.Parent.Neighbor.Value.Parent == nil then\n        script.Parent.Neighbor.Value = nil;\n    end;\n\n    if script.Parent.ModelData.LogicBuff.Value > 0 then\n        local LogicBuff = script.Parent.ModelData.LogicBuff;\n        LogicBuff.Value = LogicBuff.Value - 1;\n    elseif script.Parent.ModelData.LogicBuff.Value == -1 then\n        script.Parent.ModelData.LogicBuff.Value = 0;\n    end;\n\n    local v14 = 600000;\n\n    if script.Parent.Neighbor.Value then\n        v14 = 5000000;\n\n        if not u13 then\n            u13 = true;\n            u3:setMax(5500000);\n        end;\n    elseif u13 then\n        u13 = false;\n        u3:setMax(700000);\n    end;\n\n    local v15 = 1;\n\n    if not u3:hasPower(v14) then\n        Body.Parent.Parent.Enabled = false;\n        script.Parent.State.Value = \"\";\n        u6 = 0;\n\n        return;\n    end;\n\n    Body.Parent.Parent.Enabled = true;\n\n    if script.Parent.Neighbor.Value then\n        local ResearchCap = Body.ResearchCap;\n        local v16 = workspace:GetAttribute(\"ResearchStation4Cap\");\n        ResearchCap.Text = `RS4 Efficient Cap: {u5:Format((math.floor(v16)))}RP`;\n        Body.Parent.Frame.TextLabel.Text = \"Research Station 4\";\n        Body.Information0.Visible = true;\n        Body.Information00.Visible = true;\n        Body.Information0.Text = \"Research station 4 active.\";\n\n        if script.Parent.ModelData.LogicBuff.Value > 0 then\n            Body.Information00.Text = `Logic buff active ({script.Parent.ModelData.LogicBuff.Value}s left)`;\n            v15 = 2;\n        else\n            Body.Information00.Text = \"Logic buff inactive (check description)\";\n        end;\n    else\n        local ResearchCap = Body.ResearchCap;\n        local v17 = workspace:GetAttribute(\"ResearchStation3Cap\");\n        ResearchCap.Text = `RS3 Efficient Cap: {u5:Format((math.floor(v17)))}RP`;\n        Body.Parent.Frame.TextLabel.Text = \"Research Station 3\";\n        Body.Information0.Visible = false;\n        Body.Information00.Visible = false;\n    end;\n\n    Body.GlobalResearch.Text = `Global Research speed: {u5:Format(round(workspace:GetAttribute(\"ResearchPointGain\"), 2))}RP/s`;\n    Body.Information1.Text = \"\";\n    Body.Information2.Text = \"\";\n    local v18 = { false, false };\n\n    if not u1:hasAmount(0.1) then\n        script.Parent.State.Value = \"\";\n        Body.Item1.Text = \"Item 1: LACK OF INPUT\";\n        u6 = 0;\n        v18[1] = true;\n    end;\n\n    if not u2:hasAmount(0.1) then\n        script.Parent.State.Value = \"\";\n        Body.Item2.Text = \"Item 2: LACK OF INPUT\";\n        u6 = 0;\n        v18[2] = true;\n    end;\n\n    if v18[2] or v18[1] then\n        return;\n    end;\n\n    local v19 = u1:getItem();\n    local v20 = u2:getItem();\n    local v21 = Items.findItemByDisplayName(v19);\n    local v22 = Items.findItemByDisplayName(v20);\n    local v23 = v21.RPMultiplier or 1;\n    local v24 = v22.RPMultiplier or 1;\n    local v25 = 2.9 * ((v21.Price or 0) + (v22.Price or 0)) / 2;\n\n    if v21.Radiation ~= nil then\n        local v26 = Radiation;\n        v26.Value = v26.Value + v21.Radiation * 10;\n    end;\n\n    if v22.Radiation ~= nil then\n        local v27 = Radiation;\n        v27.Value = v27.Value + v22.Radiation * 10;\n    end;\n\n    local v28 = v25 / 600;\n    local v29;\n\n    if v28 < 1 then\n        local v30 = math.clamp(v28, -0, 1) + 1;\n        v29 = math.log(v30, 2);\n    else\n        v29 = math.log(v28, 4) + 1;\n    end;\n\n    local v31 = v19 == v20 and 0.7 or 1;\n\n    if u6 % 2 == 1 or u6 == 0 then\n        Body.Item1.Text = `Item 1: {v19}`;\n        Body.Item2.Text = `Item 2: {v20}`;\n\n        if v19 == v20 then\n            Body.Information1.Text = \"Item1 and Item2 are the same!\";\n            Body.Information2.Text = \"RS3 suffers a 30% speed loss.\";\n        elseif v25 < 600 then\n            Body.Information1.Text = \"Average item value is below $600!\";\n            Body.Information2.Text = `RS3 suffers a {math.floor((1 - v29) * 100)}% cap loss.`;\n        elseif v25 >= 600 then\n            Body.Information1.Text = \"Average item value is above $600!\";\n            Body.Information2.Text = `RS3 benefits a {math.floor((v29 - 1) * 100)}% cap gain.`;\n        end;\n    end;\n\n    u6 = u6 + 1;\n    u1:removeItem(0.1);\n    u2:removeItem(0.1);\n    script.Parent.State.Value = tostring(v23 + v24);\n    u3:removePower(v14);\n\n    if script.Parent.Neighbor.Value then\n        workspace:SetAttribute(\"ResearchStation4ActiveRaw\", workspace:GetAttribute(\"ResearchStation4ActiveRaw\") + 1);\n        workspace:SetAttribute(\"ResearchStation4Active\", workspace:GetAttribute(\"ResearchStation4Active\") + v29 * v15);\n        workspace:SetAttribute(\"ResearchStation4Speed\", workspace:GetAttribute(\"ResearchStation4Speed\") + (v23 + v24) * v31);\n\n        return;\n    end;\n\n    workspace:SetAttribute(\"ResearchStation3ActiveRaw\", workspace:GetAttribute(\"ResearchStation3ActiveRaw\") + 1);\n    workspace:SetAttribute(\"ResearchStation3Active\", workspace:GetAttribute(\"ResearchStation3Active\") + v29);\n    workspace:SetAttribute(\"ResearchStation3Speed\", workspace:GetAttribute(\"ResearchStation3Speed\") + (v23 + v24) * v31);\nend;\n\nreturn v4;"
};
