local u1 = {}
u1.__index = u1
local u2 = game.ReplicatedStorage.StartTracking
function u1.loadConnector(p3, p4) --[[ Line: 6 ]]
    --[[
    Upvalues:
        [1] = u1
    --]]
    if game.Players.LocalPlayer ~= nil then
        return u1
    end
    if p4 == nil then
        p4 = false
    end
    local v5 = require(game:GetService("ServerScriptService").Main.Nodes).getNodeFromAdvancedAddress({
        p3.Parent.Parent.Name,
        p3.Parent.Name,
        p3.Name,
        "Power"
    })
    local v6 = p3.Power:GetAttribute("Type") == "Logic" and true or p4
    local v7 = {
        ["folder"] = v5,
        ["Power"] = p3.Power,
        ["Track"] = not v6
    }
    local v8 = u1
    setmetatable(v7, v8)
    return v7
end
function u1.addPower(p9, p10) --[[ Line: 31 ]]
    --[[
    Upvalues:
        [1] = u2
    --]]
    local v11 = p9.folder.Buffer + p10
    if p9.folder.Max < v11 then
        v11 = p9.folder.Max
    end
    if u2.Value and p9.Track then
        shared.powerProduced = shared.powerProduced + (v11 - p9.folder.Buffer)
    end
    p9.folder.Buffer = v11
    return v11
end
function u1.removePower(p12, p13) --[[ Line: 46 ]]
    --[[
    Upvalues:
        [1] = u2
    --]]
    local v14 = p12.folder.Buffer - p13
    local v15 = p12.folder.Buffer
    local v16
    if v14 < 0 then
        v14 = 0
        v16 = true
    else
        v16 = false
    end
    if u2.Value and p12.Track then
        shared.powerConsumed = shared.powerConsumed + (p12.folder.Buffer - v14)
    end
    p12.folder.Buffer = v14
    return v15 - v14, v14, v16
end
function u1.hasPower(p17, p18) --[[ Line: 64 ]]
    return p17.folder.Buffer - p18 >= 0
end
function u1.canHoldXMore(p19, p20) --[[ Line: 72 ]]
    return p19.folder.Buffer + p20 < p19.folder.Max
end
function u1.isFull(p21) --[[ Line: 81 ]]
    return p21.folder.Buffer >= p21.folder.Max
end
function u1.getBuffer(p22) --[[ Line: 90 ]]
    return p22.folder.Buffer
end
function u1.getMax(p23) --[[ Line: 93 ]]
    return p23.folder.Max
end
function u1.getFlow(p24) --[[ Line: 96 ]]
    return p24.folder.Inflow or 0
end
function u1.setFlow(p25, p26) --[[ Line: 100 ]]
    p25.folder.Inflow = p26 or 0
end
function u1.setMax(p27, p28) --[[ Line: 104 ]]
    p27.folder.Max = p28 or 0
end
return u1