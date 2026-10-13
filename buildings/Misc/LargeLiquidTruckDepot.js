export default {
  id: "LargeLiquidTruckDepot",
  category: "Misc",
  tier: 3,
  cost: 50000,
  base: {
    height: 16,
    offset: {
      y: -11.9957275390625,
      x: 6
    },
    width: 44
  },
  nodes: [
    {
      name: "MainPipe",
      kind: "fluid",
      direction: "input",
      maxAmount: 4000,
      transferAmount: 20,
      siteOffset: {
        y: -1.0159912109375,
        x: -1.61474609375
      },
      gameOffset: {
        y: 1.4325907230377197,
        x: -1.61474609375,
        z: -1.0159912109375
      }
    }
  ],
  data: {
    X: 0,
    AutoSell: true
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nrequire(game.ReplicatedStorage.Modules.Permissions);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.MainPipe);\nlocal SurfaceGui = script.Parent.Screen.SurfaceGui;\nlocal Container = SurfaceGui.Main.Container;\nlocal Buttons = SurfaceGui.Buttons;\nlocal v2 = {\n    { Color3.fromRGB(255, 0, 255), Enum.Material.Neon },\n    { Color3.fromRGB(255, 0, 0), Enum.Material.Metal },\n    { Color3.fromRGB(110, 153, 202), Enum.Material.Metal },\n    { Color3.fromRGB(76, 86, 179), Enum.Material.Metal },\n    { Color3.fromRGB(127, 142, 100), Enum.Material.Metal },\n    { Color3.fromRGB(255, 251, 134), Enum.Material.Metal },\n    { Color3.fromRGB(239, 184, 56), Enum.Material.Metal },\n    { Color3.fromRGB(231, 231, 236), Enum.Material.Metal },\n    { Color3.fromRGB(255, 152, 220), Enum.Material.Metal },\n    { Color3.fromRGB(82, 124, 174), Enum.Material.Metal },\n    { Color3.fromRGB(255, 89, 89), Enum.Material.Metal }\n};\nlocal State = script.Parent.State;\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal AutoSell = script.Parent.ModelData.AutoSell;\nlocal X = script.Parent.ModelData.X;\n\nif X.Value == 0 then\n    if math.random(1, 10000) == 1 then\n        X.Value = 1;\n    else\n        local v3 = math.random(2, #v2);\n        X.Value = v3 == 5 and 2 or v3;\n    end;\nend;\n\nif X.Value ~= 0 then\n    if v2[X.Value] == nil then\n        X.Value = 5;\n    end;\n\n    script.Parent.Car.ColorPart.Color = v2[X.Value][1];\n    script.Parent.Car.ColorPart.Material = v2[X.Value][2];\nend;\n\nlocal v4 = {};\nlocal u5 = 0;\nlocal u6 = nil;\nlocal u7 = tick();\n\nlocal function drive() -- Line: 58\n    -- upvalues: u7 (ref), State (copy), u5 (ref), u1 (copy), u6 (ref), Items (copy), Pollution (copy), Buttons (copy)\n    u7 = tick() + script.Cooldown.Value;\n    task.wait();\n    State.Value = \"Drive\";\n    u5 = u1:getBuffer();\n    local v8 = u1:getItem();\n    u6 = Items.findItemByDisplayName(v8);\n    local v9 = Pollution;\n    v9.Value = v9.Value + 400;\n    u1:setItem(0, \"\");\n    Buttons.Drive.Text = \"Driving...\";\n    task.wait(script.Drive1.Value);\n    Items.sell(u6, u5);\n    u5 = 0;\n    u6 = nil;\n    task.wait(script.Drive2.Value);\n    State.Value = \"Return\";\n    Buttons.Drive.Text = \"Drive\";\nend;\n\nlocal function autoSellStatusUpdate() -- Line: 85\n    -- upvalues: AutoSell (copy), Buttons (copy)\n    if AutoSell.Value then\n        Buttons.AutoSell.Text = \"Auto Sell ON\";\n        Buttons.AutoSell.BackgroundColor3 = Color3.fromRGB(0, 77, 5);\n\n        return;\n    end;\n\n    Buttons.AutoSell.Text = \"Auto Sell OFF\";\n    Buttons.AutoSell.BackgroundColor3 = Color3.fromRGB(77, 0, 5);\nend;\n\nButtons.AutoSell.MouseButton1Click:Connect(function() -- Line: 95\n    -- upvalues: AutoSell (copy), autoSellStatusUpdate (copy)\n    AutoSell.Value = not AutoSell.Value;\n    autoSellStatusUpdate();\nend);\nautoSellStatusUpdate();\nButtons.Drive.MouseButton1Click:Connect(function() -- Line: 101\n    -- upvalues: u7 (ref), u1 (copy), drive (copy)\n    if u7 < tick() and not u1:isEmpty() then\n        task.spawn(drive);\n    end;\nend);\n\nfunction v4.tick() -- Line: 107\n    -- upvalues: u6 (ref), Container (copy), u1 (copy), Items (copy), u5 (ref), AutoSell (copy), u7 (ref), drive (copy)\n    if u6 == nil then\n        local Buffer = Container.Buffer;\n        local v10 = u1:getBuffer();\n        Buffer.Text = math.floor(v10) .. \"/\" .. u1:getMax() .. \" Liters Stored\";\n\n        if u1:getItem() == \"\" then\n            Container.Loading.Text = \"Loading: None\";\n            Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n            Container.Value.Text = \"Est. Value: $0\";\n        else\n            Container.Loading.Text = \"Loading: \" .. u1:getItem();\n            local v11 = Items.findItemByDisplayName(u1:getItem());\n\n            if v11 == nil then\n                Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n            else\n                local Icon = v11.Icon;\n\n                if Icon == nil then\n                    Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n                else\n                    Container.Parent.ImageLabel.Image = \"rbxassetid://\" .. Icon;\n                end;\n\n                local v12 = Items.calculateValue(v11, u1:getBuffer());\n                local v13 = math.floor(v12);\n                Container.Value.Text = \"Est. Value: $\" .. v13;\n            end;\n        end;\n    else\n        Container.Buffer.Text = math.floor(u5) .. \"/\" .. u1:getMax() .. \" Liters Loaded\";\n        Container.Loading.Text = \"Loaded: \" .. u6.DisplayName;\n        local Icon = u6.Icon;\n\n        if Icon == nil then\n            Container.Parent.ImageLabel.Image = \"rbxassetid://15476451150\";\n        else\n            Container.Parent.ImageLabel.Image = \"rbxassetid://\" .. Icon;\n        end;\n\n        local v14 = Items.calculateValue(u6, u5);\n        local v15 = math.floor(v14);\n        Container.Value.Text = \"Est. Value: $\" .. v15;\n    end;\n\n    if AutoSell.Value and (u1:isFull() and u7 < tick()) then\n        task.spawn(drive);\n    end;\nend;\n\nreturn v4;"
};
