local v1 = game:GetService("ReplicatedStorage")
local v2 = require(v1.Modules.PowerUtilsV2)
require(v1.Modules.PipeUtilsV2)
require(v1.Modules.Enums.Items)
local v_u_3 = v2.loadConnector(script.Parent.MainConnector, true)
local v_u_4 = v2.loadConnector(script.Parent.MainConnector2, true)
local v_u_5 = v2.loadConnector(script.Parent.LogicMainConnector)
local v_u_6 = false
local v_u_7 = require(game.ReplicatedStorage.Modules.MachineSettingsRelay).new()
script.Parent.Base.ProximityPrompt.Enabled = true
script.Parent.Base.ProximityPrompt.Triggered:Connect(function(p8)
	-- upvalues: (copy) v_u_7
	v_u_7:openMenu(p8)
end)
v_u_7:addSetting(1, script.Parent.ModelData.Buffer, "Power buffer for the breaker", 1, 750000)
return {
	["localUpdate"] = function() -- name: localUpdate end,
	["tick"] = function() -- name: tick
		-- upvalues: (copy) v_u_3, (copy) v_u_4, (copy) v_u_5, (ref) v_u_6
		v_u_3:setMax(script.Parent.ModelData.Buffer.Value)
		v_u_4:setMax(script.Parent.ModelData.Buffer.Value)
		if v_u_5:getBuffer() >= 1 then
			local v9 = v_u_3:getBuffer()
			local v10 = v_u_4:getMax() - v_u_4:getBuffer()
			local v11 = math.clamp(v9, 0, v10)
			local v12 = math.min(v11, 500000)
			v_u_4:addPower(v12)
			v_u_3:removePower(v12)
			if not v_u_6 then
				script.Parent.Base["Electrical Zaps 1 (SFX)"]:Play()
				script.Parent.On.Transparency = 0
				script.Parent.Off.Transparency = 1
				v_u_6 = true
			end
		elseif v_u_6 then
			script.Parent.On.Transparency = 1
			script.Parent.Off.Transparency = 0
			v_u_6 = false
		end
		v_u_5:removePower(v_u_5:getBuffer())
	end
}
