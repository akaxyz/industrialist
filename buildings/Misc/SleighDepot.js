export default {
  id: "SleighDepot",
  category: "Misc",
  cost: 1000,
  base: {
    height: 20,
    offset: {
      y: 8,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 111,
      transferAmount: 2,
      siteOffset: {
        y: 3.0076904296875,
        x: -1.535787582397461
      },
      gameOffset: {
        y: 2.1249918937683105,
        x: -1.535787582397461,
        z: 3.0076904296875
      }
    }
  ],
  data: {
    AutoSell: true
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nrequire(game.ReplicatedStorage.Modules.Permissions);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal SurfaceGui = script.Parent.Screen.SurfaceGui;\nlocal Container = SurfaceGui.Main.Container;\nlocal Buttons = SurfaceGui.Buttons;\nlocal State = script.Parent.State;\nlocal _ = game.ReplicatedStorage.Pollution;\nlocal AutoSell = script.Parent.ModelData.AutoSell;\nlocal v2 = {};\nlocal u3 = 0;\nlocal u4 = nil;\nlocal u5 = tick();\n\nlocal function drive() -- Line: 24\n    -- upvalues: u5 (ref), State (copy), u3 (ref), u1 (copy), u4 (ref), Items (copy), Buttons (copy)\n    u5 = tick() + script.Cooldown.Value;\n    task.wait();\n    State.Value = \"Drive\";\n    u3 = u1:getBuffer();\n    local v6 = u1:getItem();\n    u4 = Items.findItemByDisplayName(v6);\n    u1:setItem(0, \"\");\n    Buttons.Drive.Text = \"Flying...\";\n    task.wait(script.Drive1.Value);\n    Items.sell(u4, u3);\n    u3 = 0;\n    u4 = nil;\n    task.wait(script.Drive2.Value);\n    State.Value = \"Return\";\n    Buttons.Drive.Text = \"Drive\";\nend;\n\nlocal function autoSellStatusUpdate() -- Line: 50\n    -- upvalues: AutoSell (copy), Buttons (copy)\n    if AutoSell.Value then\n        Buttons.AutoSell.Text = \"Auto Sell ON\";\n        Buttons.AutoSell.BackgroundColor3 = Color3.fromRGB(0, 77, 5);\n\n        return;\n    end;\n\n    Buttons.AutoSell.Text = \"Auto Sell OFF\";\n    Buttons.AutoSell.BackgroundColor3 = Color3.fromRGB(77, 0, 5);\nend;\n\nButtons.AutoSell.MouseButton1Click:Connect(function() -- Line: 60\n    -- upvalues: AutoSell (copy), autoSellStatusUpdate (copy)\n    AutoSell.Value = not AutoSell.Value;\n    autoSellStatusUpdate();\nend);\nautoSellStatusUpdate();\nButtons.Drive.MouseButton1Click:Connect(function() -- Line: 66\n    -- upvalues: u5 (ref), u1 (copy), drive (copy)\n    if u5 < tick() and not u1:isEmpty() then\n        task.spawn(drive);\n    end;\nend);\n\nfunction v2.tick() -- Line: 72\n    -- upvalues: u4 (ref), Container (copy), u1 (copy), Items (copy), u3 (ref), AutoSell (copy), u5 (ref), drive (copy)\n    if u4 == nil then\n        local Buffer = Container.Buffer;\n        local v7 = u1:getBuffer();\n        Buffer.Text = math.floor(v7) .. \"/\" .. u1:getMax() .. \" Units Stored\";\n\n        if u1:getItem() == \"\" then\n            Container.Loading.Text = \"Loading: None\";\n            Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n            Container.Value.Text = \"Est. Value: $0\";\n        else\n            Container.Loading.Text = \"Loading: \" .. u1:getItem();\n            local v8 = Items.findItemByDisplayName(u1:getItem());\n\n            if v8 == nil then\n                Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n            else\n                local Icon = v8.Icon;\n\n                if Icon == nil then\n                    Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n                else\n                    Container.Parent.ImageLabel.Image = \"rbxassetid://\" .. Icon;\n                end;\n\n                local v9 = Items.calculateValue(v8, u1:getBuffer());\n                local v10 = math.floor(v9);\n                Container.Value.Text = \"Est. Value: $\" .. v10;\n            end;\n        end;\n    else\n        Container.Buffer.Text = math.floor(u3) .. \"/\" .. u1:getMax() .. \" Units Loaded\";\n        Container.Loading.Text = \"Loaded: \" .. u4.DisplayName;\n        local Icon = u4.Icon;\n\n        if Icon == nil then\n            Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n        else\n            Container.Parent.ImageLabel.Image = \"rbxassetid://\" .. Icon;\n        end;\n\n        local v11 = Items.calculateValue(u4, u3);\n        local v12 = math.floor(v11);\n        Container.Value.Text = \"Est. Value: $\" .. v12;\n    end;\n\n    if AutoSell.Value and (u1:isFull() and u5 < tick()) then\n        task.spawn(drive);\n    end;\n\n    local v13 = u1:getBuffer() * 10 / u1:getMax();\n    local v14 = math.ceil(v13);\n\n    if script.Parent.State.Value ~= v14 then\n        script.Parent.State.Value = v14;\n    end;\nend;\n\nreturn v2;"
};
