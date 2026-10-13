export default {
  id: "SteamCrackingPlant",
  category: "Factories",
  tier: 3,
  cost: 150000,
  base: {
    height: 16,
    offset: {
      y: -6,
      x: 6
    },
    width: 16
  },
  nodes: [
    {
      name: "MainPipe2",
      kind: "fluid",
      direction: "input",
      maxAmount: 600,
      transferAmount: 50,
      siteOffset: {
        y: 1.29803466796875,
        x: 7.005859375
      },
      gameOffset: {
        y: 1.4307022094726562,
        x: 7.005859375,
        z: 1.29803466796875
      },
      tip: "Steam input. Hotter steam = faster reaction speed"
    },
    {
      name: "MainPipeOut2",
      kind: "fluid",
      direction: "output",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: 1.5,
        x: 3.017486572265625
      },
      gameOffset: {
        y: 2.203399658203125,
        x: 3.017486572265625,
        z: 1.5
      },
      tip: "Outputs Ethylene/Residue"
    },
    {
      name: "MainPipe1",
      kind: "fluid",
      direction: "input",
      maxAmount: 40,
      transferAmount: 1,
      siteOffset: {
        y: 1.79876708984375,
        x: -1.0152740478515625
      },
      gameOffset: {
        y: 1.9882888793945312,
        x: -1.0152740478515625,
        z: 1.79876708984375
      },
      tip: "Input for Crude Oil/Light Oil/Heavy Oil/Naphta"
    },
    {
      name: "MainPipeOut",
      kind: "fluid",
      direction: "output",
      maxAmount: 40,
      transferAmount: 10,
      siteOffset: {
        y: 1.5,
        x: 1.017486572265625
      },
      gameOffset: {
        y: 2.203399658203125,
        x: 1.017486572265625,
        z: 1.5
      },
      tip: "Outputs Paraxylene/Crude Diesel/Light Oil/Naphta"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 1000000,
      transferAmount: 0,
      siteOffset: {
        y: -2.00457763671875,
        x: 13.263639450073242
      },
      gameOffset: {
        y: 8.981498718261719,
        x: 13.263639450073242,
        z: -2.00457763671875
      }
    }
  ],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal u1 = require(ReplicatedStorage.Modules.NextTicks).new();\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.MainPipe1);\nlocal u3 = PipeUtilsV2.loadConnector(script.Parent.MainPipe2);\nlocal u4 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal u5 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut2);\nlocal u6 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nrequire(game.ReplicatedStorage.Modules.Achievements);\nlocal v7 = {};\nlocal State = script.Parent.State;\n\nfunction v7.localUpdate() -- Line: 18\n    -- upvalues: State (copy)\n    if State.Value == \"Running\" then\n        script.Parent.SmokeStack.ParticleEmitter.Enabled = true;\n        script.Parent.Base[\"Electric Motor\"]:Play();\n\n        return;\n    end;\n\n    script.Parent.SmokeStack.ParticleEmitter.Enabled = false;\n    script.Parent.Base[\"Electric Motor\"]:Stop();\nend;\n\nlocal Pollution = game.ReplicatedStorage.Pollution;\nlocal u8 = \"\";\nlocal u9 = 0;\n\nfunction v7.tick() -- Line: 32\n    -- upvalues: u1 (copy), u6 (copy), u9 (ref), u3 (copy), u2 (copy), u4 (copy), u5 (copy), u8 (ref), Pollution (copy), State (copy)\n    if not u1:tickIsFree() then\n        return;\n    end;\n\n    if not u6:hasPower(666666.6666666667) then\n        return;\n    end;\n\n    u9 = u3:getTemp() * 1.1;\n\n    if u3:hasAmountOf(\"Steam\", 150) then\n        if u2:hasAmountOf(\"Crude Oil\", 2) and (u4:canHoldXMoreOf(\"Paraxylene\", 2) and u5:canHoldXMoreOf(\"Ethylene\", 3)) then\n            u8 = \"Crude Oil\";\n            u2:removeItem(2);\n        elseif u2:hasAmountOf(\"Light Oil\", 15) and (u4:canHoldXMoreOf(\"Crude Diesel\", 12) and u5:canHoldXMoreOf(\"Residue\", 3)) then\n            u8 = \"Light Oil\";\n            u2:removeItem(15);\n        else\n            if not (u2:hasAmountOf(\"Heavy Oil\", 20) and (u4:canHoldXMoreOf(\"Light Oil\", 12) and u5:canHoldXMoreOf(\"Residue\", 8))) then\n                return;\n            end;\n\n            u8 = \"Heavy Oil\";\n            u2:removeItem(20);\n        end;\n\n        u3:removeItem(150);\n    else\n        if not u3:hasAmountOf(\"Hydrogen\", 3) then\n            return;\n        end;\n\n        if u2:hasAmountOf(\"Heavy Oil\", 20) and (u4:canHoldXMoreOf(\"Naphtha\", 15) and u5:canHoldXMoreOf(\"Residue\", 5)) then\n            u8 = \"Naphtha\";\n            u2:removeItem(20);\n        else\n            if not (u2:hasAmountOf(\"Naphtha\", 20) and (u4:canHoldXMoreOf(\"Light Oil\", 15) and u5:canHoldXMoreOf(\"Residue\", 5))) then\n                return;\n            end;\n\n            u8 = \"Hydrogen Light Oil\";\n            u2:removeItem(20);\n        end;\n\n        u9 = 400;\n        u3:removeItem(3);\n    end;\n\n    local v10 = math.clamp(1 - u9 / 400, 0.1, 1) * 900;\n    u1:nextTicks(math.ceil(v10), function(p11) -- Line: 61\n        -- upvalues: u6 (ref), Pollution (ref), State (ref), u8 (ref), u4 (ref), u5 (ref)\n        u6:removePower(2000);\n        local v12 = Pollution;\n        v12.Value = v12.Value + 2;\n        State.Value = \"Running\";\n\n        if p11 == 1 then\n            if u8 == \"Crude Oil\" then\n                u4:addItemAmount(\"Paraxylene\", 2);\n                u5:addItemAmount(\"Ethylene\", 3);\n            elseif u8 == \"Light Oil\" then\n                u4:addItemAmount(\"Crude Diesel\", 12);\n                u5:addItemAmount(\"Residue\", 3);\n            elseif u8 == \"Heavy Oil\" then\n                u4:addItemAmount(\"Light Oil\", 12);\n                u5:addItemAmount(\"Residue\", 8);\n            elseif u8 == \"Naphtha\" then\n                u4:addItemAmount(\"Naphtha\", 15);\n                u5:addItemAmount(\"Residue\", 5);\n            else\n                if u8 ~= \"Hydrogen Light Oil\" then\n                    return;\n                end;\n\n                u4:addItemAmount(\"Light Oil\", 15);\n                u5:addItemAmount(\"Residue\", 5);\n            end;\n\n            State.Value = \"\";\n        end;\n    end);\nend;\n\nreturn v7;"
};
