local v_u_1 = require(script.Parent:WaitForChild("PlacementSystemClient"))
local v_u_2 = nil
local v_u_3 = 0
local v4 = game:GetService("UserInputService")
local v5 = game:GetService("TweenService")
local v6 = game.Players.LocalPlayer
local v_u_7 = v6.PlayerGui
local v_u_8 = v5:Create(workspace.Limits.Texture, TweenInfo.new(0.5, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {
    ["Transparency"] = 0.5
})
local v_u_9 = v5:Create(workspace.Limits.Texture, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
    ["Transparency"] = 1
})
local v10 = game.ReplicatedStorage.PlacementSystem.Buildings
local v_u_11 = v_u_7:WaitForChild("TutorialRestrictions").AutoConnect
local v_u_12 = nil
local v_u_13 = game.ReplicatedStorage.Values.IsMobile
local v_u_14 = v_u_7:WaitForChild("HUD").MobileButtonFrame
local v_u_15 = false
local _ = {
    Enum.UserInputType.MouseButton1,
    Enum.UserInputType.MouseButton2,
    Enum.UserInputType.MouseButton3,
    Enum.UserInputType.MouseMovement,
    Enum.UserInputType.MouseWheel
}
local v_u_16 = false
v4.TouchTap:Connect(function() end)
v6.PlayerGui:WaitForChild("PlayerPermissions")
require(game.Players.LocalPlayer.PlayerScripts:WaitForChild("uiScripts").Modules:WaitForChild("HandleAnimationVisibility"))
v4.TouchTapInWorld:Connect(function(_, p17)
-- upvalues: (ref) v_u_2, (copy) v_u_13
if not p17 then
    if v_u_2 ~= nil and v_u_13.Value then
        v_u_2.mobileTap()
        end
        end
        end)
local function v_u_20() -- name: newSystem
-- upvalues: (ref) v_u_2, (copy) v_u_1, (copy) v_u_13, (ref) v_u_12
v_u_2 = v_u_1.new(game.Players.LocalPlayer)
if v_u_13.Value then
    v_u_2.mobileMode()
    else
        v_u_2.computerMode()
        local v18, v19 = pcall(function()
        -- upvalues: (ref) v_u_2
        v_u_2.disposeArrows()
        end)
        if v18 == false then
            warn(v19)
            end
            end
            task.spawn(function()
            -- upvalues: (ref) v_u_2, (ref) v_u_12
            if v_u_2 ~= nil then
                v_u_2.setLimitsUsingPart(workspace.Limits)
                v_u_2.setModel(v_u_12)
                end
                end)
            end
            local v_u_21 = game:GetService("GuiService")
            script.Parent.ToolEvent.Event:Connect(function(p22)
            -- upvalues: (ref) v_u_15, (copy) v_u_14, (copy) v_u_9, (ref) v_u_2, (copy) v_u_7, (copy) v_u_21, (ref) v_u_12, (copy) v_u_8, (copy) v_u_20, (ref) v_u_3
            if p22 == "unequip" then
                v_u_15 = false
                v_u_14.ButtonHolder.Visible = false
                v_u_9:Play()
                v_u_2.dispose()
                v_u_2 = nil
                v_u_7.Inventory.Frame.InventoryMain.Events.Event:Fire(false)
                if game.ReplicatedStorage.Values.IsMobile.Value then
                    local v23 = workspace.CurrentCamera.CFrame
                    workspace.CurrentCamera.CameraType = Enum.CameraType.Custom
                    workspace.CurrentCamera.CFrame = v23
                    v_u_21.TouchControlsEnabled = true
                    return
                    end
                    elseif p22 == "equip" then
                        v_u_15 = true
                        v_u_12 = nil
                        v_u_14.ButtonHolder.Visible = true
                        v_u_8:Play()
                        v_u_20()
                        v_u_3 = 0
                        v_u_7.Inventory.Frame.InventoryMain.Events.Event:Fire(true)
                        end
                        end)
            v_u_14.ButtonHolder.Done.MouseButton1Click:Connect(function()
            -- upvalues: (ref) v_u_16, (ref) v_u_2, (ref) v_u_12
            v_u_16 = true
            if v_u_2 ~= nil and v_u_12 ~= nil then
                script.dragPlace.PlaybackSpeed = 2
                script.plop:Play()
                game.ReplicatedStorage.PlacementSystem.Place:FireServer(v_u_12, v_u_2.getPosition(), nil, _G.autobuy or false)
                end
                end)
            v_u_14.ButtonHolder.Rotate.MouseButton1Click:Connect(function()
            -- upvalues: (ref) v_u_16, (ref) v_u_3, (ref) v_u_2
            v_u_16 = true
            v_u_3 = (v_u_3 + 1) % 4
            if v_u_2 ~= nil then
                script.Rotate:Play()
                v_u_2.setRotation(v_u_3 * 90)
                end
                end)
            v_u_14.ButtonHolder.Inventory.MouseButton1Click:Connect(function()
            -- upvalues: (ref) v_u_16, (ref) v_u_2, (ref) v_u_12, (copy) v_u_7
            v_u_16 = true
            if v_u_2 ~= nil then
                v_u_12 = nil
                v_u_2.setModel(v_u_12)
                v_u_7.Inventory.Frame.InventoryMain.Events.Event:Fire()
                end
                end)
            game.ReplicatedStorage.PlacementSystem.InventorySelect.Event:Connect(function(p24)
            -- upvalues: (ref) v_u_12, (ref) v_u_2
            v_u_12 = p24
            v_u_2.setModel(v_u_12)
            end)
            local v_u_25 = false
            local v_u_26 = nil
            local v_u_27 = Vector3.new(0, 0, 0)
            local v_u_28 = game.Players.LocalPlayer:GetMouse()
            local function v_u_30(p29) -- name: getModelFromPart
            if p29 == nil then
                return
                elseif not p29:FindFirstChild("Shop") then
                    for _ = 1, 4 do
                        p29 = p29.Parent
                        if p29 == nil then
                            return nil
                            end
                            if p29 == workspace then
                                return nil
                                end
                                if p29:FindFirstChild("Shop") then
                                    return p29
                                    end
                                    end
                                    end
                                    end
                                    local function v_u_34() -- name: getTarget
                                    -- upvalues: (copy) v_u_28
                                    local v31 = workspace.CurrentCamera:ScreenPointToRay(v_u_28.X, v_u_28.Y)
                                    local v32 = Ray.new(v31.Origin, v31.Direction * 1000)
                                    local v33, _ = workspace:FindPartOnRayWithWhitelist(v32, { workspace.Plots })
                                    return v33
                                    end
                                    local v_u_35 = game.ReplicatedStorage.PlacementSystem
                                    local v_u_36 = 999999999999999
                                    local v_u_37 = {
                                        {
                                            v10.Pipes.ShortFluidPipe2,
                                            v10.Pipes.FluidPipeJunction2,
                                            v10.Pipes.FluidPipeTurn2,
                                            v10.Pipes.FluidPipeSection2
                                        },
                                        {
                                            v10.Pipes.ShortPipe2,
                                            v10.Pipes.PipeJunction2,
                                            v10.Pipes.PipeTurn2,
                                            v10.Pipes.PipeSection2
                                        },
                                        {
                                            v10.Pipes.ShortPipe,
                                            v10.Pipes.PipeJunction,
                                            v10.Pipes.PipeTurn,
                                            v10.Pipes.PipeSection
                                        },
                                        {
                                            v10.Pipes.ShortFluidPipe,
                                            v10.Pipes.FluidPipeJunction,
                                            v10.Pipes.FluidPipeTurn,
                                            v10.Pipes.FluidPipeSection
                                        },
                                        {
                                            v10.Pipes.LargeFluidPipe,
                                            v10.Pipes.ShortLargeFluidPipe,
                                            v10.Pipes.LongLargeFluidPipe,
                                            v10.Pipes.LargeFluidPipeTurn,
                                            v10.Pipes.LargeFluidPipeJunction,
                                            v10.Pipes.LargeFluidPipeSection,
                                            v10.Pipes.LargeFluidPipeIntersection
                                        }
                                    }
                                    v4.InputBegan:Connect(function(p38, p39)
                                    -- upvalues: (ref) v_u_3, (ref) v_u_2, (ref) v_u_27, (ref) v_u_26, (ref) v_u_12, (copy) v_u_7, (copy) v_u_13, (ref) v_u_25, (ref) v_u_36, (copy) v_u_35, (copy) v_u_11, (ref) v_u_15, (copy) v_u_34, (copy) v_u_30, (copy) v_u_20, (copy) v_u_37
                                    if not p39 then
                                        if p38.KeyCode == Enum.KeyCode.R or p38.KeyCode == Enum.KeyCode.ButtonX then
                                            v_u_3 = (v_u_3 + 1) % 4
                                            if v_u_2 ~= nil then
                                                script.Rotate:Play()
                                                v_u_2.setRotation(v_u_3 * 90)
                                                end
                                                if v_u_27 ~= Vector3.new(0, 0, 0) then
                                                    local v40 = v_u_2.getPosition().Position
                                                    if v_u_27.X == 0 then
                                                        local v41 = v40.X
                                                        v_u_27 = Vector3.new(v41, 0, 0)
                                                        v_u_26 = v40
                                                        else
                                                            local v42 = v40.Z
                                                            v_u_27 = Vector3.new(0, 0, v42)
                                                            v_u_26 = v40
                                                            end
                                                            end
                                                            elseif p38.KeyCode == Enum.KeyCode.E or p38.KeyCode == Enum.KeyCode.ButtonB then
                                                                if v_u_2 ~= nil then
                                                                    v_u_12 = nil
                                                                    v_u_2.setModel(v_u_12)
                                                                    v_u_7.Inventory.Frame.InventoryMain.Events.Event:Fire()
                                                                    return
                                                                    end
                                                                    elseif p38.UserInputType == Enum.UserInputType.MouseButton1 or (p38.KeyCode == Enum.KeyCode.ButtonR2 or p38.KeyCode == Enum.KeyCode.ButtonA) then
                                                                        if v_u_13.Value == true then
                                                                            return
                                                                            end
                                                                            v_u_25 = true
                                                                            v_u_36 = tick()
                                                                            v_u_27 = Vector3.new(0, 0, 0)
                                                                            v_u_26 = nil
                                                                            if v_u_2 ~= nil and v_u_12 ~= nil then
                                                                                if v_u_35.PlaceBind:InvokeServer(v_u_12, v_u_2.getPosition(), nil, _G.autobuy or false, true, v_u_11.Value) == false then
                                                                                    script.Error:Play()
                                                                                    else
                                                                                        script.dragPlace.PlaybackSpeed = 2
                                                                                        script.plop:Play()
                                                                                        end
                                                                                        end
                                                                                        elseif p38.UserInputType == Enum.UserInputType.MouseButton3 or p38.KeyCode == Enum.KeyCode.ButtonL3 then
                                                                                            if v_u_7.DeleteConfirmation.Enabled then
                                                                                                return
                                                                                                end
                                                                                                if v_u_15 == false then
                                                                                                    script.Parent.Parent.Parent.Master:Fire(1)
                                                                                                    end
                                                                                                    local v43 = v_u_34()
                                                                                                    if v43 == nil then
                                                                                                        return
                                                                                                        end
                                                                                                        local v44 = v_u_30(v43)
                                                                                                        if v44 ~= nil then
                                                                                                            if v_u_2 == nil then
                                                                                                                v_u_20()
                                                                                                                end
                                                                                                                local v45 = v44.PrimaryPart.Orientation.Y / 90 + 0.5
                                                                                                                v_u_3 = math.floor(v45)
                                                                                                                if v_u_3 < 0 then
                                                                                                                    v_u_3 = v_u_3 + 4
                                                                                                                    end
                                                                                                                    v_u_2.setRotation(v_u_3 * 90)
                                                                                                                    v_u_12 = v_u_35.Buildings[v44:GetAttribute("Category")][v44:GetAttribute("Name")]
                                                                                                                    local _ = v44:FindFirstChild("ModelStats") and v44.ModelStats:GetChildren()
                                                                                                                    v_u_7.Inventory.Frame.InventoryMain.Events.SelectModel:Fire(v_u_12)
                                                                                                                    v_u_7.Inventory.Frame.InventoryMain.Events.Event:Fire(false)
                                                                                                                    v_u_2.setModel(v_u_12)
                                                                                                                    return
                                                                                                                    end
                                                                                                                    elseif p38.KeyCode == Enum.KeyCode.Q then
                                                                                                                        if v_u_12 == nil then
                                                                                                                            return
                                                                                                                            end
                                                                                                                            if v_u_15 == nil then
                                                                                                                                return
                                                                                                                                end
                                                                                                                                local v46 = 0
                                                                                                                                local v47 = nil
                                                                                                                                for _, v48 in pairs(v_u_37) do
                                                                                                                                    local v49 = table.find(v48, v_u_12)
                                                                                                                                    if v49 ~= nil then
                                                                                                                                        v47 = v48
                                                                                                                                        v46 = v49
                                                                                                                                        end
                                                                                                                                        end
                                                                                                                                        local v50 = v46 + 1
                                                                                                                                        local v51 = #v47 < v50 and 1 or v50
                                                                                                                                        v_u_12 = v47[v51]
                                                                                                                                        v_u_2.setModel(v47[v51])
                                                                                                                                        end
                                                                                                                                        end
                                                                                                                                        end)
                                    v4.InputEnded:Connect(function(p52)
                                    -- upvalues: (copy) v_u_13, (ref) v_u_25, (ref) v_u_36
                                    if p52.UserInputType == Enum.UserInputType.MouseButton1 or (p52.KeyCode == Enum.KeyCode.ButtonR2 or p52.KeyCode == Enum.KeyCode.ButtonA) then
                                        if v_u_13.Value == true then
                                            return
                                            end
                                            v_u_25 = false
                                            v_u_36 = 999999999999999
                                            end
                                            end)
                                    local _ = game.ReplicatedStorage.PlacementSystem.Buildings
                                    game.Players.LocalPlayer:GetMouse()
                                    game:GetService("RunService").RenderStepped:Connect(function()
                                    -- upvalues: (ref) v_u_25, (ref) v_u_2, (ref) v_u_12, (ref) v_u_36, (ref) v_u_26, (ref) v_u_27, (copy) v_u_11
                                    if v_u_25 and (v_u_2 ~= nil and (v_u_12 ~= nil and tick() - v_u_36 > 0.2)) then
                                        if v_u_2.getPosition() == nil then
                                            return
                                            end
                                            if v_u_26 == nil then
                                                v_u_26 = v_u_2.getPosition().Position
                                                elseif v_u_26 ~= v_u_2.getPosition().Position and v_u_27 == Vector3.new(0, 0, 0) then
                                                    local v53 = v_u_2.getPosition().Position - v_u_26
                                                    local v54 = v53.X
                                                    local v55 = math.abs(v54)
                                                    local v56 = v53.Z
                                                    if math.abs(v56) < v55 then
                                                        local v57 = v_u_26.Z
                                                        v_u_27 = Vector3.new(0, 0, v57)
                                                        else
                                                            local v58 = v_u_26.X
                                                            v_u_27 = Vector3.new(v58, 0, 0)
                                                            end
                                                            end
                                                            if v_u_2.getTarget() == workspace.Limits then
                                                                local v59 = v_u_2.getPosition().Position
                                                                if v_u_27.X == 0 then
                                                                    if v_u_27.Z ~= 0 then
                                                                        local v60 = v59.X
                                                                        local v61 = v59.Y
                                                                        local v62 = v_u_27.Z
                                                                        v59 = Vector3.new(v60, v61, v62)
                                                                        end
                                                                        else
                                                                            local v63 = v_u_27.X
                                                                            local v64 = v59.Y
                                                                            local v65 = v59.Z
                                                                            v59 = Vector3.new(v63, v64, v65)
                                                                            end
                                                                            local v66 = CFrame.new(v59)
                                                                            local v67 = CFrame.Angles
                                                                            local v68 = v_u_2.rotation
                                                                            local v69 = v66 * v67(0, math.rad(v68), 0)
                                                                            if game.ReplicatedStorage.PlacementSystem.OptimizedPlaceBind:InvokeServer(v_u_12.Parent.Name, v_u_12.Name, v69, v_u_11.Value, true) == false then
                                                                                return
                                                                                end
                                                                                local v70 = script.dragPlace
                                                                                local v71 = script.dragPlace.PlaybackSpeed + 0.01
                                                                                v70.PlaybackSpeed = math.clamp(v71, 2, 4)
                                                                                script.dragPlace:Play()
                                                                                end
                                                                                end
                                                                                end)
