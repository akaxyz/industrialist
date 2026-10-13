export default {
  id: "Grinder",
  category: "Factories",
  tier: 2,
  cost: 10000,
  base: {
    height: 12,
    offset: {
      y: 4,
      x: 2
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 500000,
      transferAmount: 0,
      siteOffset: {
        y: 3.943115234375,
        x: 0.75146484375
      },
      gameOffset: {
        y: 1.5579032897949219,
        x: 0.75146484375,
        z: 3.943115234375
      }
    },
    {
      name: "MainPipeIn",
      kind: "item",
      direction: "input",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: -1.350341796875,
        x: -1.0140380859375
      },
      gameOffset: {
        y: 1.9965009689331055,
        x: -1.0140380859375,
        z: -1.350341796875
      },
      tip: "Input for Items"
    },
    {
      name: "LiquidPipeIn",
      kind: "fluid",
      direction: "input",
      maxAmount: 20,
      transferAmount: 1,
      siteOffset: {
        y: 3.0013427734375,
        x: -1.6251220703125
      },
      gameOffset: {
        y: 1.4520034790039062,
        x: -1.6251220703125,
        z: 3.0013427734375
      },
      tip: "Input for Fluids"
    },
    {
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: 9.382415771484375,
        x: -1.0255126953125
      },
      gameOffset: {
        y: 1.9958009719848633,
        x: -1.0255126953125,
        z: 9.382415771484375
      },
      tip: "Output"
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Elevator = script.Parent.Elevator;\nlocal Door1 = script.Parent.Door1;\nlocal Door2 = script.Parent.Door2;\nlocal State = script.Parent.State;\nlocal ModelTweenUtils = require(game.ReplicatedStorage.Modules.ModelTweenUtils);\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u1 = ModelTweenUtils.new(Elevator);\nlocal u2 = ModelTweenUtils.new(Door1);\nlocal u3 = ModelTweenUtils.new(Door2);\nlocal u4 = Elevator.Hinge.Position - Elevator.Box.Position;\nlocal u5 = Elevator.Hinge.Orientation - Elevator.Box.Orientation;\nlocal u6 = Door1:GetPivot();\nlocal u7 = Door2:GetPivot();\nlocal u8 = u1:GetPivot();\nlocal v9 = {};\nlocal u10 = false;\n\nfunction v9.localUpdate() -- Line: 51\n    -- upvalues: State (copy), u10 (ref), Elevator (copy), u8 (copy), u4 (copy), u5 (copy), u2 (copy), u6 (copy), u3 (copy), u7 (copy), u1 (copy), TweenService (copy)\n    if State.Value ~= \"\" then\n        if State.Value == \"Working\" and u10 == false then\n            u10 = true;\n            Elevator:PivotTo(u8);\n            Elevator.Box.Position = Elevator.Hinge.Position - u4;\n            Elevator.Box.Orientation = Elevator.Hinge.Orientation - u5;\n            Elevator.Box.Transparency = 0;\n            u2:newTween(TweenInfo.new(1), u6 * CFrame.Angles(0, 0, -1.5707963267948966)):Play();\n            u3:newTween(TweenInfo.new(1), u7 * CFrame.Angles(0, 0, 1.5707963267948966)):Play();\n            u1:newTween(TweenInfo.new(4), Elevator:GetPivot() + Vector3.new(0, 4.3, 0)):Play();\n            task.wait(4);\n            task.spawn(function() -- Line: 75\n                -- upvalues: u10 (ref)\n                while u10 and task.wait() do\n                    script.Parent[\"Shredder.001\"].CFrame = script.Parent[\"Shredder.001\"].CFrame * CFrame.Angles(0, 0, 0.039269908169872414);\n                    script.Parent.Shredder.CFrame = script.Parent.Shredder.CFrame * CFrame.Angles(0, 0, -0.039269908169872414);\n                end;\n            end);\n            TweenService:Create(Elevator.Box, TweenInfo.new(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {\n                CFrame = script.Parent.Box.CFrame\n            }):Play();\n            u1:newTween(TweenInfo.new(0.2), Elevator:GetPivot() * CFrame.Angles(-1.5707963267948966, 0, 0)):Play();\n            task.wait(0.4);\n            TweenService:Create(Elevator.Box, TweenInfo.new(0.2, Enum.EasingStyle.Linear), {\n                CFrame = script.Parent.Particles.CFrame,\n                Transparency = 1\n            }):Play();\n            script.Parent.Particles.Sparks.Enabled = true;\n            script.Parent.Particles.Sparks2.Enabled = true;\n            script.Parent.Particles.dust.Enabled = true;\n            script.Parent.Particles.dust2.Enabled = true;\n            script.Parent.Particles[\"Metal Blade Grind 1 (SFX)\"]:Play();\n            u1:newTween(TweenInfo.new(0.2), Elevator:GetPivot() * CFrame.Angles(1.5707963267948966, 0, 0)):Play();\n            task.wait(0.2);\n            u1:newTween(TweenInfo.new(4), u8):Play();\n            task.wait(4);\n            u2:newTween(TweenInfo.new(1), u6):Play();\n            u3:newTween(TweenInfo.new(1), u7):Play();\n        end;\n\n        return;\n    end;\n\n    script.Parent.Particles.Sparks.Enabled = false;\n    script.Parent.Particles.Sparks2.Enabled = false;\n    script.Parent.Particles.dust.Enabled = false;\n    script.Parent.Particles.dust2.Enabled = false;\n    script.Parent.Particles[\"Metal Blade Grind 1 (SFX)\"]:Stop();\n    u10 = false;\nend;\n\nlocal u11 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal u12 = PipeUtilsV2.loadConnector(script.Parent.LiquidPipeIn);\nlocal u13 = PipeUtilsV2.loadConnector(script.Parent.MainPipeIn);\nlocal u14 = PipeUtilsV2.loadConnector(script.Parent.MainPipeOut);\nlocal u15 = require(game.ReplicatedStorage.Modules.NextTicks).new();\nlocal u16 = {\n    { { \"Coal\", 4 }, nil, { \"Black Dye\", 3 } },\n    { { \"Oak Log\", 4 }, { \"Water\", 10 }, { \"Paper\", 3 } },\n    { { \"Raw Iron\", 3.2 }, nil, { \"Iron Powder\", 1.9 } },\n    { { \"Iron Ingot\", 6 }, nil, { \"Iron Powder\", 0.5 } },\n    { { \"Raw Copper\", 5.33 }, nil, { \"Copper Powder\", 2.66 } },\n    { { \"Copper Ingot\", 6 }, nil, { \"Copper Powder\", 0.5 } },\n    { { \"Gravel\", 8 }, nil, { \"Sand\", 10 } },\n    { { \"Bauxite Residue\", 8 }, nil, { \"Crushed Bauxite\", 6 } },\n    { { \"Alumina\", 4 }, nil, { \"Alumina Dust\", 4 } },\n    { { \"Microchip Scrap\", 5 }, { \"Sulfuric Acid\", 0.5 }, { \"Gold Ingot\", 0.5 } },\n    { { \"Soil\", 12 }, nil, { \"Gravel\", 12 } },\n    { { \"Rock\", 12 }, nil, { \"Gravel\", 12 } },\n    { { \"Shallow Earth Fragment\", 6 }, { \"Filtered Water\", 4 }, { \"Raw Iron\", 6 } },\n    { { \"Shallow Earth Fragment\", 6 }, nil, { \"Rock\", 6 } },\n    { { \"Rock\", 12 }, nil, { \"Gravel\", 12 } },\n    { { \"Medium Earth Fragment\", 3 }, { \"Machine Oil\", 2 }, { \"Shallow Earth Fragment\", 6 } },\n    { { \"Deep Earth Fragment\", 3 }, nil, { \"Treated Rock\", 6 } },\n    { { \"Treated Rock\", 6 }, nil, { \"Rich Soil\", 6 } }\n};\n\nfunction v9.tick() -- Line: 210\n    -- upvalues: u15 (copy), State (copy), u11 (copy), u16 (copy), u13 (copy), u12 (copy), u14 (copy)\n    if u15:tickIsBusy() then\n        return;\n    end;\n\n    if State.Value == \"Working\" then\n        return;\n    end;\n\n    if not u11:hasPower(400000) then\n        return;\n    end;\n\n    for _, v in pairs(u16) do\n        if u13:hasAmountOf(v[1][1], v[1][2]) and (v[2] == nil or u12:hasAmountOf(v[2][1], v[2][2])) and u14:canHoldXMoreOf(v[3][1], v[3][2]) then\n            u11:removePower(400000);\n            u13:removeItem(v[1][2]);\n\n            if v[2] ~= nil then\n                u12:removeItem(v[2][2]);\n            end;\n\n            State.Value = \"Working\";\n            u15:nextTicks(12, function(p17) -- Line: 228\n                -- upvalues: State (ref), u14 (ref), v (copy)\n                if p17 == 1 then\n                    State.Value = \"\";\n                    u14:addItemAmount(v[3][1], v[3][2]);\n                end;\n            end);\n\n            return;\n        end;\n    end;\nend;\n\nreturn v9;"
};
