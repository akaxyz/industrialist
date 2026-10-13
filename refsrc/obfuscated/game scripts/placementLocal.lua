local l__PlacementSystemClient__1 = require(script.Parent:WaitForChild("PlacementSystemClient"));
local u1 = nil;
local u2 = 0;
local l__UserInputService__2 = game:GetService("UserInputService");
local l__TweenService__3 = game:GetService("TweenService");
local l__LocalPlayer__4 = game.Players.LocalPlayer;
local l__PlayerGui__5 = l__LocalPlayer__4.PlayerGui;
local u3 = l__TweenService__3:Create(workspace.Limits.Texture, TweenInfo.new(0.5, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {
    Transparency = 0.5
});
local u4 = l__TweenService__3:Create(workspace.Limits.Texture, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
    Transparency = 1
});
local l__Buildings__6 = game.ReplicatedStorage.PlacementSystem.Buildings;
local l__AutoConnect__7 = l__PlayerGui__5:WaitForChild("TutorialRestrictions").AutoConnect;
local u5 = nil;
local l__IsMobile__8 = game.ReplicatedStorage.Values.IsMobile;
local l__MobileButtonFrame__9 = l__PlayerGui__5:WaitForChild("HUD").MobileButtonFrame;
local u6 = false;
local _ = {
    Enum.UserInputType.MouseButton1,
    Enum.UserInputType.MouseButton2,
    Enum.UserInputType.MouseButton3,
    Enum.UserInputType.MouseMovement,
    Enum.UserInputType.MouseWheel
};
local u7 = false;
l__UserInputService__2.TouchTap:Connect(function() --[[ Line: 43 ]] end);
l__LocalPlayer__4.PlayerGui:WaitForChild("PlayerPermissions");
require(game.Players.LocalPlayer.PlayerScripts:WaitForChild("uiScripts").Modules:WaitForChild("HandleAnimationVisibility"));
l__UserInputService__2.TouchTapInWorld:Connect(function(_, p8) --[[ Line: 50 ]]
-- upvalues: u1 (ref), l__IsMobile__8 (copy)
if p8 then
    else
        if u1 ~= nil and l__IsMobile__8.Value then
            u1.mobileTap();
        end;
    end;
end);
local function u11() --[[ Line: 65 ]]
-- upvalues: u1 (ref), l__PlacementSystemClient__1 (copy), l__IsMobile__8 (copy), u5 (ref)
u1 = l__PlacementSystemClient__1.new(game.Players.LocalPlayer);
if l__IsMobile__8.Value then
    u1.mobileMode();
else
    u1.computerMode();
local v9, v10 = pcall(function() --[[ Line: 71 ]]
-- upvalues: u1 (ref)
u1.disposeArrows();
end);
if v9 == false then
    warn(v10);
end;
end;
task.spawn(function() --[[ Line: 76 ]]
-- upvalues: u1 (ref), u5 (ref)
if u1 ~= nil then
    u1.setLimitsUsingPart(workspace.Limits);
u1.setModel(u5);
end;
end);
end;
local l__GuiService__10 = game:GetService("GuiService");
script.Parent.ToolEvent.Event:Connect(function(p12) --[[ Line: 90 ]]
-- upvalues: u6 (ref), l__MobileButtonFrame__9 (copy), u4 (copy), u1 (ref), l__PlayerGui__5 (copy), l__GuiService__10 (copy), u5 (ref), u3 (copy), u11 (copy), u2 (ref)
if p12 == "unequip" then
    u6 = false;
l__MobileButtonFrame__9.ButtonHolder.Visible = false;
u4:Play();
u1.dispose();
u1 = nil;
l__PlayerGui__5.Inventory.Frame.InventoryMain.Events.Event:Fire(false);
if game.ReplicatedStorage.Values.IsMobile.Value then
    local l__CFrame__11 = workspace.CurrentCamera.CFrame;
workspace.CurrentCamera.CameraType = Enum.CameraType.Custom;
workspace.CurrentCamera.CFrame = l__CFrame__11;
l__GuiService__10.TouchControlsEnabled = true;
end;
elseif p12 == "equip" then
    u6 = true;
u5 = nil;
l__MobileButtonFrame__9.ButtonHolder.Visible = true;
u3:Play();
u11();
u2 = 0;
l__PlayerGui__5.Inventory.Frame.InventoryMain.Events.Event:Fire(true);
end;
end);
l__MobileButtonFrame__9.ButtonHolder.Done.MouseButton1Click:Connect(function() --[[ Line: 119 ]]
-- upvalues: u7 (ref), u1 (ref), u5 (ref)
u7 = true;
if u1 ~= nil and u5 ~= nil then
    script.dragPlace.PlaybackSpeed = 2;
script.plop:Play();
game.ReplicatedStorage.PlacementSystem.Place:FireServer(u5, u1.getPosition(), nil, _G.autobuy or false);
end;
end);
l__MobileButtonFrame__9.ButtonHolder.Rotate.MouseButton1Click:Connect(function() --[[ Line: 127 ]]
-- upvalues: u7 (ref), u2 (ref), u1 (ref)
u7 = true;
u2 = (u2 + 1) % 4;
if u1 ~= nil then
    script.Rotate:Play();
u1.setRotation(u2 * 90);
end;
end);
l__MobileButtonFrame__9.ButtonHolder.Inventory.MouseButton1Click:Connect(function() --[[ Line: 137 ]]
-- upvalues: u7 (ref), u1 (ref), u5 (ref), l__PlayerGui__5 (copy)
u7 = true;
if u1 ~= nil then
    u5 = nil;
u1.setModel(u5);
l__PlayerGui__5.Inventory.Frame.InventoryMain.Events.Event:Fire();
end;
end);
game.ReplicatedStorage.PlacementSystem.InventorySelect.Event:Connect(function(p13) --[[ Line: 160 ]]
-- upvalues: u5 (ref), u1 (ref)
u5 = p13;
u1.setModel(u5);
end);
local u14 = false;
local u15 = nil;
local u16 = Vector3.new(0, 0, 0);
local u17 = game.Players.LocalPlayer:GetMouse();
local function u19(p18) --[[ Line: 173 ]]
if p18 == nil then
    elseif p18:FindFirstChild("Shop") then
        else
            for _ = 1, 4 do
                p18 = p18.Parent;
            if p18 == nil then
                return nil;
            end;
        if p18 == workspace then
            return nil;
        end;
    if p18:FindFirstChild("Shop") then
        return p18;
    end;
    end;
    end;
    end;
    local function u23() --[[ Line: 185 ]]
    -- upvalues: u17 (copy)
    local v20 = workspace.CurrentCamera:ScreenPointToRay(u17.X, u17.Y);
    local v21 = Ray.new(v20.Origin, v20.Direction * 1000);
    local v22, _ = workspace:FindPartOnRayWithWhitelist(v21, { workspace.Plots });
    return v22;
    end;
    local l__PlacementSystem__12 = game.ReplicatedStorage.PlacementSystem;
    local u24 = 999999999999999;
    local u25 = {
        {
            l__Buildings__6.Pipes.ShortFluidPipe2,
            l__Buildings__6.Pipes.FluidPipeJunction2,
            l__Buildings__6.Pipes.FluidPipeTurn2,
            l__Buildings__6.Pipes.FluidPipeSection2
        },
        {
            l__Buildings__6.Pipes.ShortPipe2,
            l__Buildings__6.Pipes.PipeJunction2,
            l__Buildings__6.Pipes.PipeTurn2,
            l__Buildings__6.Pipes.PipeSection2
        },
        {
            l__Buildings__6.Pipes.ShortPipe,
            l__Buildings__6.Pipes.PipeJunction,
            l__Buildings__6.Pipes.PipeTurn,
            l__Buildings__6.Pipes.PipeSection
        },
        {
            l__Buildings__6.Pipes.ShortFluidPipe,
            l__Buildings__6.Pipes.FluidPipeJunction,
            l__Buildings__6.Pipes.FluidPipeTurn,
            l__Buildings__6.Pipes.FluidPipeSection
        },
        {
            l__Buildings__6.Pipes.LargeFluidPipe,
            l__Buildings__6.Pipes.ShortLargeFluidPipe,
            l__Buildings__6.Pipes.LongLargeFluidPipe,
            l__Buildings__6.Pipes.LargeFluidPipeTurn,
            l__Buildings__6.Pipes.LargeFluidPipeJunction,
            l__Buildings__6.Pipes.LargeFluidPipeSection,
            l__Buildings__6.Pipes.LargeFluidPipeIntersection
        }
    };
    l__UserInputService__2.InputBegan:Connect(function(p26, p27) --[[ Line: 239 ]]
    -- upvalues: u2 (ref), u1 (ref), u16 (ref), u15 (ref), u5 (ref), l__PlayerGui__5 (copy), l__IsMobile__8 (copy), u14 (ref), u24 (ref), l__PlacementSystem__12 (copy), l__AutoConnect__7 (copy), u6 (ref), u23 (copy), u19 (copy), u11 (copy), u25 (copy)
    if p27 then
        else
            if p26.KeyCode == Enum.KeyCode.R or p26.KeyCode == Enum.KeyCode.ButtonX then
                u2 = (u2 + 1) % 4;
            if u1 ~= nil then
                script.Rotate:Play();
            u1.setRotation(u2 * 90);
        end;
    if u16 ~= Vector3.new(0, 0, 0) then
        local l__Position__13 = u1.getPosition().Position;
    if u16.X == 0 then
        u16 = Vector3.new(l__Position__13.X, 0, 0);
    u15 = l__Position__13;
    else
        u16 = Vector3.new(0, 0, l__Position__13.Z);
    u15 = l__Position__13;
    end;
    end;
    elseif p26.KeyCode == Enum.KeyCode.E or p26.KeyCode == Enum.KeyCode.ButtonB then
        if u1 ~= nil then
            u5 = nil;
        u1.setModel(u5);
    l__PlayerGui__5.Inventory.Frame.InventoryMain.Events.Event:Fire();
    end;
    elseif p26.UserInputType == Enum.UserInputType.MouseButton1 or (p26.KeyCode == Enum.KeyCode.ButtonR2 or p26.KeyCode == Enum.KeyCode.ButtonA) then
        if l__IsMobile__8.Value == true then
            return;
        end;
    u14 = true;
    u24 = tick();
    u16 = Vector3.new(0, 0, 0);
    u15 = nil;
    if u1 ~= nil and u5 ~= nil then
        if l__PlacementSystem__12.PlaceBind:InvokeServer(u5, u1.getPosition(), nil, _G.autobuy or false, true, l__AutoConnect__7.Value) == false then
            script.Error:Play();
        else
            script.dragPlace.PlaybackSpeed = 2;
        script.plop:Play();
    end;
    end;
    elseif p26.UserInputType == Enum.UserInputType.MouseButton3 or p26.KeyCode == Enum.KeyCode.ButtonL3 then
        if l__PlayerGui__5.DeleteConfirmation.Enabled then
            return;
        end;
    if u6 == false then
        script.Parent.Parent.Parent.Master:Fire(1);
    end;
    local v28 = u23();
    if v28 == nil then
        return;
    end;
    local v29 = u19(v28);
    if v29 ~= nil then
        if u1 == nil then
            u11();
        end;
    u2 = math.floor(v29.PrimaryPart.Orientation.Y / 90 + 0.5);
    if u2 < 0 then
        u2 = u2 + 4;
    end;
    u1.setRotation(u2 * 90);
    u5 = l__PlacementSystem__12.Buildings[v29:GetAttribute("Category")][v29:GetAttribute("Name")];
    local _ = v29:FindFirstChild("ModelStats") and v29.ModelStats:GetChildren();
    l__PlayerGui__5.Inventory.Frame.InventoryMain.Events.SelectModel:Fire(u5);
    l__PlayerGui__5.Inventory.Frame.InventoryMain.Events.Event:Fire(false);
    u1.setModel(u5);
    end;
    elseif p26.KeyCode == Enum.KeyCode.Q then
        if u5 == nil then
            return;
        end;
    if u6 == nil then
        return;
    end;
    local v30 = 0;
    local v31 = nil;
    for _, v32 in pairs(u25) do
        local v33 = table.find(v32, u5);
    if v33 ~= nil then
        v31 = v32;
    v30 = v33;
    end;
    end;
    local v34 = v30 + 1;
    local v35 = #v31 < v34 and 1 or v34;
    u5 = v31[v35];
    u1.setModel(v31[v35]);
    end;
    end;
    end);
    l__UserInputService__2.InputEnded:Connect(function(p36) --[[ Line: 343 ]]
    -- upvalues: l__IsMobile__8 (copy), u14 (ref), u24 (ref)
    if p36.UserInputType == Enum.UserInputType.MouseButton1 or (p36.KeyCode == Enum.KeyCode.ButtonR2 or p36.KeyCode == Enum.KeyCode.ButtonA) then
        if l__IsMobile__8.Value == true then
            return;
        end;
    u14 = false;
    u24 = 999999999999999;
    end;
    end);
    local _ = game.ReplicatedStorage.PlacementSystem.Buildings;
    game.Players.LocalPlayer:GetMouse();
    game:GetService("RunService").RenderStepped:Connect(function() --[[ Line: 356 ]]
    -- upvalues: u14 (ref), u1 (ref), u5 (ref), u24 (ref), u15 (ref), u16 (ref), l__AutoConnect__7 (copy)
    if u14 and (u1 ~= nil and (u5 ~= nil and tick() - u24 > 0.2)) then
        if u1.getPosition() == nil then
            return;
        end;
    if u15 == nil then
        u15 = u1.getPosition().Position;
    elseif u15 ~= u1.getPosition().Position and u16 == Vector3.new(0, 0, 0) then
        local v37 = u1.getPosition().Position - u15;
    if math.abs(v37.X) > math.abs(v37.Z) then
        u16 = Vector3.new(0, 0, u15.Z);
    else
        u16 = Vector3.new(u15.X, 0, 0);
    end;
    end;
    if u1.getTarget() == workspace.Limits then
        local l__Position__14 = u1.getPosition().Position;
    if u16.X == 0 then
        if u16.Z ~= 0 then
            l__Position__14 = Vector3.new(l__Position__14.X, l__Position__14.Y, u16.Z);
        end;
    else
        l__Position__14 = Vector3.new(u16.X, l__Position__14.Y, l__Position__14.Z);
    end;
    local v38 = CFrame.new(l__Position__14) * CFrame.Angles(0, math.rad(u1.rotation), 0);
    if game.ReplicatedStorage.PlacementSystem.OptimizedPlaceBind:InvokeServer(u5.Parent.Name, u5.Name, v38, l__AutoConnect__7.Value, true) == false then
        return;
    end;
    script.dragPlace.PlaybackSpeed = math.clamp(script.dragPlace.PlaybackSpeed + 0.01, 2, 4);
    script.dragPlace:Play();
    end;
    end;
    end);
