local l__Players__1 = game:GetService("Players");
local l__TweenService__2 = game:GetService("TweenService");
local u1 = TweenInfo.new(0.05, Enum.EasingStyle.Quad);
local u2 = 0;
local u3 = Instance.new("Part");
u3.Size = Vector3.new(0, 0.1, 0);
u3.Parent = game.ReplicatedStorage;
u3.Anchored = true;
u3.CanQuery = false;
u3.CanCollide = false;
u3.Material = Enum.Material.SmoothPlastic;
u3.Transparency = 0;
u3.Shape = Enum.PartType.Cylinder;
u3.TopSurface = "Smooth";
u3.Orientation = Vector3.new(0, 0, 90);
u3.Name = "Highlight";
local u4 = script.SurfaceGui:Clone();
u4.Parent = u3;
local function u10(u5, u6) --[[ Line: 33 ]]
-- upvalues: u2 (ref), u3 (copy), l__TweenService__2 (copy), u1 (copy)
pcall(function() --[[ Line: 34 ]]
-- upvalues: u2 (ref), u5 (copy), u3 (ref), l__TweenService__2 (ref), u1 (ref), u6 (copy)
u2 = u2 + 1;
local u7 = u2;
local u8 = Instance.new("CFrameValue");
u8.Value = u5:GetPrimaryPartCFrame();
u8:GetPropertyChangedSignal("Value"):Connect(function() --[[ Line: 40 ]]
-- upvalues: u2 (ref), u7 (copy), u8 (copy), u5 (ref), u3 (ref)
pcall(function() --[[ Line: 41 ]]
-- upvalues: u2 (ref), u7 (ref), u8 (ref), u5 (ref), u3 (ref)
if u2 ~= u7 then
    u8:Destroy();
end;
u5:SetPrimaryPartCFrame(u8.Value);
u3.Position = u5.Base.Position - Vector3.new(0, 2, 0);
end);
end);
local v9 = l__TweenService__2:Create(u8, u1, {
    Value = u6
});
v9:Play();
v9.Completed:Connect(function() --[[ Line: 54 ]]
-- upvalues: u8 (copy)
u8:Destroy();
end);
end);
end;
local v11 = {};
local u12 = nil;
local u13 = nil;
local function u14() --[[ Line: 63 ]]
-- upvalues: u12 (ref), u13 (ref)
u12 = Instance.new("Handles", game.Players.LocalPlayer.PlayerGui);
u13 = Instance.new("Handles", game.Players.LocalPlayer.PlayerGui);
u12.Style = Enum.HandlesStyle.Movement;
u13.Style = Enum.HandlesStyle.Movement;
u12.Faces = Faces.new(Enum.NormalId.Left, Enum.NormalId.Right);
u13.Faces = Faces.new(Enum.NormalId.Front, Enum.NormalId.Back);
u12.Color3 = Color3.fromRGB(255, 0, 0);
u13.Color3 = Color3.fromRGB(0, 255, 0);
end;
u14();
local l__GuiService__3 = game:GetService("GuiService");
function v11.new(p15) --[[ Line: 78 ]]
-- upvalues: u12 (ref), u13 (ref), u14 (copy), l__GuiService__3 (copy), l__Players__1 (copy), l__TweenService__2 (copy), u3 (copy), u4 (copy), u10 (copy)
local u16 = {
    model = nil,
    limits = nil,
    rotation = 0,
    lastPosition = Vector3.new(0, 0, 0),
    mobile = false,
    _tappedAlready = false,
    positionFixed = nil,
    centerPivot = true,
    events = {}
};
local u17 = p15:GetMouse();
function u16.setRotation(p18) --[[ Line: 94 ]]
-- upvalues: u16 (copy)
if u16.mobile == true and u16.positionFixed ~= nil then
    u16.positionFixed = u16.lastPosition;
end;
u16.rotation = p18;
end;
function u16.setupArrows() --[[ Line: 101 ]]
-- upvalues: u16 (copy), u12 (ref), u13 (ref), u14 (ref), l__GuiService__3 (ref)
if u16.model == nil then
    else
        if u12.Parent == nil then
            u12:Destroy();
        u13:Destroy();
    u14();
end;
u12.Adornee = u16.model.Base;
u13.Adornee = u16.model.Base;
u16.positionFixed = u16.lastPosition;
table.insert(u16.events, u12.MouseButton1Down:Connect(function(_, _) --[[ Line: 114 ]]
-- upvalues: u16 (ref), l__GuiService__3 (ref)
u16.positionFixed = u16.lastPosition;
workspace.CurrentCamera.CameraType = Enum.CameraType.Scriptable;
l__GuiService__3.TouchControlsEnabled = false;
end));
table.insert(u16.events, u12.MouseButton1Up:Connect(function(_, _) --[[ Line: 120 ]]
-- upvalues: l__GuiService__3 (ref), u16 (ref)
local l__CFrame__4 = workspace.CurrentCamera.CFrame;
workspace.CurrentCamera.CameraType = Enum.CameraType.Custom;
workspace.CurrentCamera.CFrame = l__CFrame__4;
l__GuiService__3.TouchControlsEnabled = true;
u16.positionFixed = nil;
end));
table.insert(u16.events, u12.MouseDrag:Connect(function(p19, p20) --[[ Line: 128 ]]
-- upvalues: u16 (ref)
local l__RightVector__5 = u16.model.Base.CFrame.RightVector;
if p19 == Enum.NormalId.Left then
    l__RightVector__5 = -u16.model.Base.CFrame.RightVector;
end;
u16.lastPosition = u16.positionFixed + l__RightVector__5 * p20;
end));
table.insert(u16.events, u13.MouseButton1Down:Connect(function(_, _) --[[ Line: 136 ]]
-- upvalues: u16 (ref), l__GuiService__3 (ref)
u16.positionFixed = u16.lastPosition;
workspace.CurrentCamera.CameraType = Enum.CameraType.Scriptable;
l__GuiService__3.TouchControlsEnabled = false;
end));
table.insert(u16.events, u13.MouseButton1Up:Connect(function(_, _) --[[ Line: 142 ]]
-- upvalues: l__GuiService__3 (ref), u16 (ref)
local l__CFrame__6 = workspace.CurrentCamera.CFrame;
workspace.CurrentCamera.CameraType = Enum.CameraType.Custom;
workspace.CurrentCamera.CFrame = l__CFrame__6;
l__GuiService__3.TouchControlsEnabled = true;
u16.positionFixed = nil;
end));
table.insert(u16.events, u13.MouseDrag:Connect(function(p21, p22) --[[ Line: 151 ]]
-- upvalues: u16 (ref)
local v23 = -u16.model.Base.CFrame.LookVector;
if p21 == Enum.NormalId.Front then
    v23 = u16.model.Base.CFrame.LookVector;
end;
u16.lastPosition = u16.positionFixed + v23 * p22;
end));
end;
end;
local function u30(p24, p25) --[[ Line: 160 ]]
-- upvalues: u16 (copy), u17 (copy), l__Players__1 (ref)
if u16.mobile == false or p24 ~= nil then
    local v26 = workspace.CurrentCamera:ScreenPointToRay(u17.X, u17.Y);
local v27 = Ray.new(v26.Origin, v26.Direction * 1000);
local v28, v29 = workspace:FindPartOnRayWithIgnoreList(v27, { l__Players__1.LocalPlayer.Character, u16.model });
if p25 then
    return v28;
else
    return v29;
end;
else
    return u16.lastPosition;
end;
end;
function u16.mobileTap() --[[ Line: 179 ]]
-- upvalues: u16 (copy)
if u16._tappedAlready == false then
    u16._tappedAlready = true;
u16.setupArrows();
end;
u16.resetPosition();
end;
function u16.getTarget() --[[ Line: 189 ]]
-- upvalues: u30 (copy)
return u30(true, true);
end;
function u16.resetPosition() --[[ Line: 193 ]]
-- upvalues: u16 (copy), u30 (copy)
u16.lastPosition = u30(true);
end;
function u16.mobileMode() --[[ Line: 197 ]]
-- upvalues: u16 (copy)
u16.mobile = true;
end;
function u16.computerMode() --[[ Line: 201 ]]
-- upvalues: u16 (copy)
u16.mobile = false;
end;
function u16.disposeArrows() --[[ Line: 205 ]]
-- upvalues: u16 (copy), l__GuiService__3 (ref), u12 (ref), u13 (ref)
if u16.mobile then
    l__GuiService__3.TouchControlsEnabled = true;
end;
for _, v31 in pairs(u16.events) do
    v31:Disconnect();
end;
table.clear(u16.events);
u12.Adornee = nil;
u13.Adornee = nil;
end;
function u16.setModel(p32) --[[ Line: 218 ]]
-- upvalues: u16 (copy), l__TweenService__2 (ref), u3 (ref)
if p32 == nil then
    _G.buildToolEquipped = false;
else
    _G.buildToolEquipped = true;
end;
if u16.mobile then
    u16.lastPosition = Vector3.new(0, 0, 0);
end;
u16._tappedAlready = false;
if p32 == nil then
    if u16.model ~= nil then
        u16.disposeArrows();
    u16.stop();
u16.model:Destroy();
u16.model = nil;
end;
l__TweenService__2:Create(u3, TweenInfo.new(1), {
    Size = Vector3.new(0, 0, 0)
}):Play();
else
    if u16.model ~= nil then
        u16.stop();
    u16.model:Destroy();
u16.model = nil;
task.wait(0.01);
if u16.model ~= nil then
    u16.stop();
u16.model:Destroy();
u16.model = nil;
end;
end;
local v33 = p32:Clone();
u16.model = v33;
v33.PrimaryPart = v33.Base;
u16.offset = v33.Root.CFrame:ToObjectSpace(v33.Base.CFrame);
for _, v34 in pairs(v33:GetDescendants()) do
    if v34:IsA("BasePart") then
        if v34.Transparency == 1 and (v34.Name ~= "Root" and (v34.Name ~= "Base" and v34.Name ~= "Guide")) then
            v34:Destroy();
        end;
    v34.CanCollide = false;
v34.CanQuery = false;
if not (string.find(v34.Name, "Connector") or string.find(v34.Name, "Pipe")) then
    v34.Transparency = 0.5;
end;
if v34.Name == "Guide" then
    v34.SurfaceGui.Enabled = true;
end;
end;
end;
u16.resetPosition();
v33:PivotTo(u16.getPosition());
v33.Parent = workspace.PlacingModels;
u16.start();
end;
end;
local function u48(p35, p36, p37, p38, p39, p40, p41) --[[ Line: 286 ]]
local v42 = p35 % p38;
local v43 = p37 % p38;
local v44 = p36 % p38;
local v45 = p35 - v42;
local v46 = p36 - v44 + 0;
local v47 = p37 - v43;
if p39 == 2 and (p40 == 4 or p40 == 8) and (p41.rotation == 270 or p41.rotation == 90) then
    v45 = v45 - 1;
v47 = v47 - 1;
elseif p39 == 2 and (p40 == 6 and (p41.rotation == 0 or p41.rotation == 180)) then
    v45 = v45 + 1;
v47 = v47 + 1;
end;
if p39 == 2 and (p40 == 4 or p40 == 8) then
    return v45 + 1, v46, v47 + 2;
end;
if p39 == 2 then
    v47 = v47 + 1;
end;
if p40 == 2 then
    v45 = v45 + 1;
end;
return v45, v46, v47;
end;
local u49 = RaycastParams.new();
u49.FilterType = Enum.RaycastFilterType.Exclude;
function u16.start() --[[ Line: 327 ]]
-- upvalues: u16 (copy), u49 (copy), u3 (ref), u4 (ref), l__TweenService__2 (ref), u30 (copy), u10 (ref)
u16.loop = true;
u49.FilterDescendantsInstances = { u16.model, workspace.ItemProps };
local v52, v53 = pcall(function() --[[ Line: 330 ]]
-- upvalues: u16 (ref), u3 (ref), u4 (ref), l__TweenService__2 (ref), u30 (ref), u10 (ref)
if u16.model then
    local v50 = (u16.model:GetAttribute("_VisualRange") or 0) * 2;
u3.Parent = workspace;
u4.Enabled = true;
if v50 == 0 then
    l__TweenService__2:Create(u3, TweenInfo.new(1), {
        Size = Vector3.new(0, 0, 0)
    }):Play();
else
    u3.Position = u16.model.Base.Position - Vector3.new(0, 2, 0);
l__TweenService__2:Create(u3, TweenInfo.new(1), {
    Size = Vector3.new(1, v50, v50)
}):Play();
end;
end;
u16.loop = game:GetService("RunService").RenderStepped:Connect(function() --[[ Line: 344 ]]
-- upvalues: u16 (ref), u30 (ref), u10 (ref)
print("run");
if u16.model == nil then
    u16.loop:Disconnect();
else
    u30();
local v51 = u16.getPosition();
if v51 == nil then
    else
        task.spawn(u10, u16.model, v51);
    end;
end;
end);
end);
if v52 == false then
    warn(v53);
end;
end;
function u16.dispose() --[[ Line: 368 ]]
-- upvalues: u16 (copy), u3 (ref), u4 (ref)
u16.disposeArrows();
_G.buildToolEquipped = false;
if u16.loop ~= nil then
    u16.loop:Disconnect();
u16.loop = nil;
end;
if u16.model ~= nil then
    u16.model:Destroy();
u3.Size = Vector3.new(0, 0, 0);
u4.Enabled = false;
u3.Parent = game.ReplicatedStorage;
u16.model = nil;
end;
end;
function u16.getPosition() --[[ Line: 387 ]]
-- upvalues: u30 (copy), u16 (copy), u48 (copy)
local v54 = u30();
local _ = u16.model.Base.CFrame.Position - u16.model.Root.CFrame.Position;
if u16.model ~= nil then
    local v55, _, v56 = u48(v54.X, v54.Y, v54.Z, u16.model.Root.Size.X, u16.model.Base.Size.X, u16.model.Base.Size.Z, u16);
return CFrame.new(v55, 2.075000047683716, v56) * CFrame.Angles(0, math.rad(u16.rotation), 0);
end;
end;
return u16;
end;
return v11;
