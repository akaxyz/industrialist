export default {
  id: "IndustrialPress",
  category: "Factories",
  tier: 3,
  cost: 150000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "InputMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 10,
      transferAmount: 1,
      siteOffset: {
        y: -1.7283935546875,
        x: 1.0214996337890625
      },
      gameOffset: {
        y: 1.7500019073486328,
        x: 1.0214996337890625,
        z: -1.7283935546875
      },
      tip: "Input for metal ingots"
    },
    {
      name: "OutputMainPipe",
      kind: "item",
      direction: "output",
      maxAmount: 24,
      transferAmount: 1,
      siteOffset: {
        y: -1.75,
        x: -4.9999237060546875
      },
      gameOffset: {
        y: 1.7250194549560547,
        x: -4.9999237060546875,
        z: -1.75
      },
      tip: "Output for plates"
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 250000,
      transferAmount: 0,
      siteOffset: {
        y: 0.01153564453125,
        x: -1.1884613037109375
      },
      gameOffset: {
        y: 4.734997749328613,
        x: -1.1884613037109375,
        z: 0.01153564453125
      }
    }
  ],
  data: [],
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nlocal PowerUtilsV2 = require(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nlocal Items = require(ReplicatedStorage.Modules.Enums.Items);\nlocal Recipes = require(ReplicatedStorage.Modules.Recipes);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.OutputMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InputMainPipe);\nlocal u3 = PowerUtilsV2.loadConnector(script.Parent.MainConnector);\nlocal Piston = script.Parent.Piston;\nlocal TweenService = game:GetService(\"TweenService\");\nlocal u4 = TweenService:Create(Piston, TweenInfo.new(1, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {\n    Position = Vector3.new(Piston.Position.X, Piston.Position.Y, Piston.Position.Z)\n});\nlocal u5 = TweenService:Create(Piston, TweenInfo.new(0.5, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), {\n    Position = Vector3.new(Piston.Position.X, Piston.Position.Y - 1.2, Piston.Position.Z)\n});\nlocal u6 = false;\nlocal _ = Items.CopperIngot;\nlocal CopperPlate = Items.CopperPlate;\nlocal _ = Items.CopperIngot;\nlocal IronPlate = Items.IronPlate;\nlocal v7 = Recipes.registerRecipe();\nv7.setRequirements(\"Copper Ingot\");\nv7.setName(\"Copper\");\nlocal v8 = Recipes.registerRecipe();\nv8.setRequirements(\"Iron Ingot\");\nv8.setName(\"Iron\");\nlocal v9 = Recipes.registerRecipe();\nv9.setRequirements(\"Iron Plate\");\nv9.setName(\"IronSquared\");\nlocal v10 = Recipes.registerRecipe();\nv10.setRequirements(\"Planks\");\nv10.setName(\"Planks\");\nlocal v11 = Recipes.registerRecipe();\nv11.setRequirements(\"Steel Ingot\");\nv11.setName(\"Steel\");\nlocal u12 = Recipes.registerRecipeBook();\nu12.addRecipe(v7);\nu12.addRecipe(v8);\nu12.addRecipe(v9);\nu12.addRecipe(v10);\nu12.addRecipe(v11);\n\nlocal function press(p13) -- Line: 57\n    -- upvalues: u6 (ref), u3 (copy), u2 (copy), u5 (copy), Piston (copy), u4 (copy), u1 (copy), Items (copy), CopperPlate (copy), IronPlate (copy)\n    if u6 == true then\n        return;\n    end;\n\n    if p13 == \"Copper\" then\n        u6 = true;\n        u3:removePower(4000);\n        u2:removeItem(1);\n        u5:Play();\n        task.wait(0.5);\n        Piston.Anvil:Play();\n        task.wait(0.5);\n        Piston.Retract:Play();\n        u4:Play();\n        u1:addItem(1, Items.get(CopperPlate));\n        task.wait(1);\n    elseif p13 == \"Iron\" then\n        u6 = true;\n        u3:removePower(4000);\n        u2:removeItem(1);\n        u5:Play();\n        task.wait(0.5);\n        Piston.Anvil:Play();\n        task.wait(1.5);\n        Piston.Retract:Play();\n        u4:Play();\n        u1:addItem(1, Items.get(IronPlate));\n        task.wait(1);\n    elseif p13 == \"Steel\" then\n        if not u3:hasPower(50000) then\n            return;\n        end;\n\n        u6 = true;\n        u3:removePower(50000);\n        u2:removeItem(1);\n        u5:Play();\n        task.wait(0.5);\n        Piston.Anvil:Play();\n        task.wait(1.5);\n        Piston.Retract:Play();\n        u4:Play();\n        u1:addItem(1, \"Steel Plate\");\n        task.wait(1);\n    elseif p13 == \"Planks\" then\n        u6 = true;\n        u3:removePower(4000);\n        u2:removeItem(1);\n        u5:Play();\n        task.wait(0.5);\n        Piston.Anvil:Play();\n        task.wait(1.5);\n        Piston.Retract:Play();\n        u4:Play();\n        u1:addItem(0.25, \"Plank²\");\n        task.wait(1);\n    elseif p13 == \"IronSquared\" then\n        u6 = true;\n        u3:removePower(300);\n        u2:removeItem(1);\n        u5:Play();\n        task.wait(0.5);\n        Piston.Anvil:Play();\n        task.wait(1.5);\n        Piston.Retract:Play();\n        u4:Play();\n        u1:addItem(0.25, \"Iron Plate²\");\n        task.wait(1);\n    end;\n\n    u6 = false;\nend;\n\nreturn {\n    tick = function() -- Line: 135, Name: tick\n        -- upvalues: u1 (copy), u3 (copy), u2 (copy), u6 (ref), u12 (copy), press (copy)\n        if u1:isFull() then\n            return;\n        end;\n\n        if not u3:hasPower(300) then\n            return;\n        end;\n\n        if not u2:hasAmount(1) then\n            return;\n        end;\n\n        if u6 then\n            return;\n        end;\n\n        local u14 = u12.meets(u2:getItem());\n        spawn(function() -- Line: 142\n            -- upvalues: press (ref), u14 (copy)\n            press(u14);\n        end);\n    end\n};"
};
