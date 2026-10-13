local ReplicatedStorage = game:GetService("ReplicatedStorage")
local PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2)
require(ReplicatedStorage.Modules.PipeUtilsV2)
require(ReplicatedStorage.Modules.Enums.Items)
local v1 = PowerUtilsV2.loadConnector(script.Parent.InMainConnector)
local v2 = PowerUtilsV2.loadConnector(script.Parent.OutMainConnector)
local v3 = PowerUtilsV2.loadConnector(script.Parent.SupplyMainConnector)
local v4 = PowerUtilsV2.loadConnector(script.Parent.ResetMainConnector)
local signal = script.Parent.ModelData.signal
return {
    localUpdate = function() --[[ localUpdate | Line: 17 ]] end,
    tick = function() --[[ tick | Line: 21 | Upvalues: v1 (copy), signal (copy), v4 (copy), v2 (copy), v3 (copy) ]]
        if v1:hasPower(1) then
            signal.Value = true
        end
        if v4:hasPower(1) then
            v4:removePower(v4:getBuffer())
            signal.Value = false
        end
        if signal.Value then
            v2:addPower(v1:getBuffer() + v3:getBuffer())
            v3:removePower(v3:getBuffer())
        end
        v1:removePower(v1:getBuffer())
    end
}
