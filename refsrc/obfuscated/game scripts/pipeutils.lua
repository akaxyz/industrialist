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
    local v5 = {
        ["folder"] = require(game:GetService("ServerScriptService").Main.Nodes).pipeNodes[p3.Parent.Parent.Name][p3.Parent.Name][p3.Name],
        ["Pipe"] = p3.Pipe,
        ["runTemp"] = 18,
        ["tempUtils"] = require(script.Parent.HeatExchange),
        ["enums"] = require(script.Parent.Enums.Items),
        ["Track"] = not p4
    }
    local v6 = u1
    setmetatable(v5, v6)
    return v5
end
function u1.setUsedTemperature(p7, p8) --[[ Line: 32 ]]
    p7.runTemp = p8
end
function u1.setTemp(p9, p10) --[[ Line: 36 ]]
    p9.folder.Temperature = p10
end
function u1.diffuseTemp(p11, p12, p13, p14) --[[ Line: 40 ]]
    local v15 = p14 == nil and 1 or p14
    local v16 = p11.enums
    local v17 = p11.tempUtils
    if typeof(p13) == "string" then
        p13 = v16.findItemByDisplayName(p13).HeatDifuseModifier or 100
    elseif typeof(p13) == "table" then
        p13 = p13.HeatDifuseModifier or 100
    else
        local _ = typeof(p13) == "number"
    end
    return v17.heatDilute(v16.findItemByDisplayName(p11.folder.Item), p11.folder.Buffer, p11.folder.Temperature, p12, v15) * (100 / p13)
end
function u1.addItem(p18, p19, p20) --[[ Line: 58 ]]
    --[[
    Upvalues:
        [1] = u2
    --]]
    if p18.folder.Buffer == 0 then
        p18.folder.Item = p20
    elseif p20 ~= p18.folder.Item then
        return -1
    end
    local v21 = p18.folder.Buffer
    local v22 = p18.folder.Temperature
    local v23 = p18.folder.Buffer + p19
    if p18.folder.Max <= v23 then
        v23 = p18.folder.Max
    end
    p18.folder.Buffer = v23
    p18.folder.Temperature = p18.tempUtils.newHeat(v21, v22, v23, p18.runTemp)
    if u2.Value and p18.Track then
        local v24 = shared.itemsProduced
        v24[p20] = v24[p20] + (v23 - v21)
    end
    return v23
end
function u1.addItemAmount(p25, p26, p27) --[[ Line: 83 ]]
    --[[
    Upvalues:
        [1] = u1
    --]]
    return u1.addItem(p25, p27, p26)
end
function u1.setItem(p28, p29, p30) --[[ Line: 87 ]]
    --[[
    Upvalues:
        [1] = u2
    --]]
    if u2.Value and (p28.Track and p29 == 0) then
        local v31 = shared.itemsConsumed
        local v32 = p28.folder.Item
        v31[v32] = v31[v32] + p28.folder.Buffer
    end
    p28.folder.Buffer = p29
    p28.folder.Item = p30
    p28.folder.Temperature = p28.runTemp
end
function u1.removeItem(p33, p34) --[[ Line: 100 ]]
    --[[
    Upvalues:
        [1] = u2
    --]]
    local v35 = p33.folder.Buffer - p34
    local v36 = p33.folder.Buffer
    local v37 = false
    if u2.Value and p33.Track then
        local v38 = shared.itemsConsumed
        local v39 = p33.folder.Item
        v38[v39] = v38[v39] + (v36 - math.max(v35, 0))
    end
    if v35 <= 0 then
        p33.folder.Item = ""
        v35 = 0
        v37 = true
    end
    p33.folder.Buffer = v35
    return v36 - v35, v35, v37
end
function u1.hasAmount(p40, p41) --[[ Line: 122 ]]
    return p40.folder.Buffer - p41 >= 0
end
function u1.canHoldXMore(p42, p43) --[[ Line: 130 ]]
    return p42.folder.Max - p42.folder.Buffer - p43 >= 0
end
function u1.canHoldXMoreOf(p44, p45, p46) --[[ Line: 140 ]]
    --[[
    Upvalues:
        [1] = u1
    --]]
    if u1.isEmpty(p44) then
        return true
    elseif u1.isEmptyOrHas(p44, p45) == false then
        return false
    else
        return u1.canHoldXMore(p44, p46)
    end
end
function u1.isEmpty(p47) --[[ Line: 153 ]]
    return p47.folder.Buffer == 0 and p47.folder.Item == ""
end
function u1.has(p48, p49) --[[ Line: 160 ]]
    return p48.folder.Item == p49
end
function u1.isEmptyOrHas(p50, p51) --[[ Line: 167 ]]
    return p50.folder.Item == "" or p50.folder.Item == p51
end
function u1.isEmptyOrHasAndIsNotFull(p52, p53) --[[ Line: 174 ]]
    if p52.folder.Buffer == p52.folder.Max then
        return false
    else
        return p52.folder.Item == "" or p52.folder.Item == p53
    end
end
function u1.hasAmountOf(p54, p55, p56) --[[ Line: 184 ]]
    --[[
    Upvalues:
        [1] = u1
    --]]
    if u1.has(p54, p55) then
        return u1.hasAmount(p54, p56) and true or false
    else
        return false
    end
end
function u1.canHold(p57, p58, p59) --[[ Line: 190 ]]
    --[[
    Upvalues:
        [1] = u1
    --]]
    if u1.isEmptyOrHas(p57, p58) then
        return u1.canHoldXMore(p57, p59) and true or false
    else
        return false
    end
end
function u1.isFull(p60) --[[ Line: 196 ]]
    return p60.folder.Buffer >= p60.folder.Max
end
function u1.getBuffer(p61) --[[ Line: 205 ]]
    return p61.folder.Buffer
end
function u1.getMax(p62) --[[ Line: 208 ]]
    return p62.folder.Max
end
function u1.getItem(p63) --[[ Line: 211 ]]
    return p63.folder.Item
end
function u1.getTemp(p64) --[[ Line: 214 ]]
    return p64.folder.Temperature
end
function u1.getFlow(p65) --[[ Line: 217 ]]
    return p65.folder.Inflow or 0
end
function u1.setFlow(p66, p67) --[[ Line: 220 ]]
    p66.folder.Inflow = p67 or 0
end
function u1.getNodeName(p68) --[[ Line: 224 ]]
    return p68.Pipe.Parent.Name
end
return u1
