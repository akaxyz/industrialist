export default {
  id: "VanDepot",
  category: "Misc",
  tier: 2,
  cost: 160,
  base: {
    height: 16,
    offset: {
      y: -7.999969482421875,
      x: 6.0001373291015625
    },
    width: 20
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 85,
      transferAmount: 2,
      siteOffset: {
        y: -13.000946044921875,
        x: -1.573486328125
      },
      gameOffset: {
        y: 1.4295272827148438,
        x: -1.573486328125,
        z: -13.000946044921875
      }
    }
  ],
  data: {
    X: 0,
    AutoSell: true
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nrequire(game.ReplicatedStorage.Modules.Permissions);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal SurfaceGui = script.Parent.Screen.SurfaceGui;\nlocal Container = SurfaceGui.Main.Container;\nlocal Buttons = SurfaceGui.Buttons;\nlocal v2 = {\n    { Color3.fromRGB(255, 0, 255), Enum.Material.Neon },\n    { Color3.fromRGB(255, 0, 0), Enum.Material.Metal },\n    { Color3.fromRGB(110, 153, 202), Enum.Material.Metal },\n    { Color3.fromRGB(124, 156, 107), Enum.Material.Metal },\n    { Color3.fromRGB(255, 89, 89), Enum.Material.SmoothPlastic },\n    { Color3.fromRGB(124, 156, 107), Enum.Material.Metal },\n    { Color3.fromRGB(239, 184, 56), Enum.Material.Metal },\n    { Color3.fromRGB(231, 231, 236), Enum.Material.Metal },\n    { Color3.fromRGB(255, 152, 220), Enum.Material.Metal },\n    { Color3.fromRGB(82, 124, 174), Enum.Material.Metal },\n    { Color3.fromRGB(255, 89, 89), Enum.Material.Metal }\n};\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal AutoSell = script.Parent.ModelData.AutoSell;\nlocal X = script.Parent.ModelData.X;\n\nif X.Value == 0 then\n    if math.random(1, 10000) == 1 then\n        X.Value = 1;\n    else\n        local v3 = math.random(2, #v2);\n        X.Value = v3 == 5 and 2 or v3;\n    end;\nend;\n\nif X.Value ~= 0 then\n    if v2[X.Value] == nil then\n        X.Value = 5;\n    end;\n\n    script.Parent.Car.ColorPart.Color = v2[X.Value][1];\n    script.Parent.Car.ColorPart.Material = v2[X.Value][2];\nend;\n\nlocal v4 = {};\nlocal u5 = 0;\nlocal u6 = nil;\nlocal u7 = tick();\n\nlocal function drive() -- Line: 58\n    -- upvalues: u7 (ref), State (copy), u5 (ref), u1 (copy), u6 (ref), Items (copy), Pollution (copy), Buttons (copy)\n    u7 = tick() + script.Cooldown.Value;\n    task.wait();\n    State.Value = \"Drive\";\n    u5 = u1:getBuffer();\n    local v8 = u1:getItem();\n    u6 = Items.findItemByDisplayName(v8);\n    local v9 = Pollution;\n    v9.Value = v9.Value + 300;\n    u1:setItem(0, \"\");\n    Buttons.Drive.Text = \"Driving...\";\n    task.wait(script.Drive1.Value);\n    Items.sell(u6, u5);\n    u5 = 0;\n    u6 = nil;\n    task.wait(script.Drive2.Value);\n    State.Value = \"Return\";\n    Buttons.Drive.Text = \"Drive\";\nend;\n\nlocal function autoSellStatusUpdate() -- Line: 85\n    -- upvalues: AutoSell (copy), Buttons (copy)\n    if AutoSell.Value then\n        Buttons.AutoSell.Text = \"Auto Sell ON\";\n        Buttons.AutoSell.BackgroundColor3 = Color3.fromRGB(0, 77, 5);\n\n        return;\n    end;\n\n    Buttons.AutoSell.Text = \"Auto Sell OFF\";\n    Buttons.AutoSell.BackgroundColor3 = Color3.fromRGB(77, 0, 5);\nend;\n\nButtons.AutoSell.MouseButton1Click:Connect(function() -- Line: 95\n    -- upvalues: AutoSell (copy), autoSellStatusUpdate (copy)\n    AutoSell.Value = not AutoSell.Value;\n    autoSellStatusUpdate();\nend);\nautoSellStatusUpdate();\nButtons.Drive.MouseButton1Click:Connect(function() -- Line: 101\n    -- upvalues: u7 (ref), u1 (copy), drive (copy)\n    if u7 < tick() and not u1:isEmpty() then\n        task.spawn(drive);\n    end;\nend);\n\nfunction v4.tick() -- Line: 107\n    -- upvalues: u6 (ref), Container (copy), u1 (copy), Items (copy), u5 (ref), AutoSell (copy), u7 (ref), drive (copy)\n    if u6 == nil then\n        local Buffer = Container.Buffer;\n        local v10 = u1:getBuffer();\n        Buffer.Text = math.floor(v10) .. \"/\" .. u1:getMax() .. \" Units Stored\";\n\n        if u1:getItem() == \"\" then\n            Container.Loading.Text = \"Loading: None\";\n            Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n            Container.Value.Text = \"Est. Value: $0\";\n        else\n            Container.Loading.Text = \"Loading: \" .. u1:getItem();\n            local v11 = Items.findItemByDisplayName(u1:getItem());\n\n            if v11 == nil then\n                Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n            else\n                local Icon = v11.Icon;\n\n                if Icon == nil then\n                    Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n                else\n                    Container.Parent.ImageLabel.Image = \"rbxassetid://\" .. Icon;\n                end;\n\n                local v12 = Items.calculateValue(v11, u1:getBuffer());\n                local v13 = math.floor(v12);\n                Container.Value.Text = \"Est. Value: $\" .. v13;\n            end;\n        end;\n    else\n        Container.Buffer.Text = math.floor(u5) .. \"/\" .. u1:getMax() .. \" Units Loaded\";\n        Container.Loading.Text = \"Loaded: \" .. u6.DisplayName;\n        local Icon = u6.Icon;\n\n        if Icon == nil then\n            Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n        else\n            Container.Parent.ImageLabel.Image = \"rbxassetid://\" .. Icon;\n        end;\n\n        local v14 = Items.calculateValue(u6, u5);\n        local v15 = math.floor(v14);\n        Container.Value.Text = \"Est. Value: $\" .. v15;\n    end;\n\n    if AutoSell.Value and (u1:isFull() and u7 < tick()) then\n        task.spawn(drive);\n    end;\n\n    local v16 = u1:getBuffer() * 24 / u1:getMax();\n    local v17 = math.ceil(v16);\n\n    if script.Parent.State.Value ~= v17 then\n        script.Parent.State.Value = v17;\n    end;\nend;\n\nreturn v4;"
};
