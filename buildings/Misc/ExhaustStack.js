export default {
  id: "ExhaustStack",
  category: "Misc",
  tier: 4,
  cost: 220000,
  base: {
    height: 48,
    offset: {
      y: -22,
      x: 0
    },
    width: 48
  },
  nodes: [
    {
      name: "FluidInMainPipe",
      kind: "largefluid",
      direction: "input",
      maxAmount: 100000,
      transferAmount: 2000,
      siteOffset: {
        y: 0.17437744140625,
        x: 1.995758056640625
      },
      gameOffset: {
        y: 4.36297607421875,
        x: 1.995758056640625,
        z: 0.17437744140625
      },
      tip: "Input for Exhaust"
    },
    {
      name: "InMainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 60,
      transferAmount: 10,
      siteOffset: {
        y: 0.43719482421875,
        x: -19.0198974609375
      },
      gameOffset: {
        y: 2.129730224609375,
        x: -19.0198974609375,
        z: 0.43719482421875
      },
      tip: "Input for Filters"
    }
  ],
  data: {
    Dirt: 0
  },
  updateEvery: 30,
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nlocal PipeUtilsV2 = require(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal u1 = PipeUtilsV2.loadConnector(script.Parent.FluidInMainPipe);\nlocal u2 = PipeUtilsV2.loadConnector(script.Parent.InMainPipe);\nlocal Pollution = game.ReplicatedStorage.Pollution;\nrequire(ReplicatedStorage.Modules.Achievements);\nlocal v3 = {};\nlocal u4 = false;\n\nlocal function lights() -- Line: 18\n    -- upvalues: u4 (ref)\n    if u4 == false then\n        u4 = true;\n        script.Parent.Lights.Light.SurfaceLight.Enabled = false;\n        script.Parent.Lights.A.Material = Enum.Material.SmoothPlastic;\n        script.Parent.Lights.B.Material = Enum.Material.SmoothPlastic;\n\n        return;\n    end;\n\n    u4 = false;\n    script.Parent.Lights.Light.SurfaceLight.Enabled = true;\n    script.Parent.Lights.A.Material = Enum.Material.Neon;\n    script.Parent.Lights.B.Material = Enum.Material.Neon;\nend;\n\nlocal State = script.Parent.State;\n\nfunction v3.localUpdate() -- Line: 33\n    -- upvalues: State (copy)\n    if script.Parent.BigSmokeStack.SFX.Playing == false then\n        script.Parent.BigSmokeStack.SFX:Play();\n    end;\n\n    script.Parent.BigSmokeStack.ParticleEmitter.Rate = (tonumber(State.Value) or 0) / 6000 * 5;\n    script.Parent.BigSmokeStack.SFX.Volume = (tonumber(State.Value) or 0) / 12000 * 2;\n    local v5 = math.clamp(script.Parent.ModelData.Dirt.Value, 0, 1);\n\n    for _, child in pairs(script.Parent.Dirt.One:GetChildren()) do\n        child.Transparency = 1 - v5;\n    end;\n\n    for _, child in pairs(script.Parent.Dirt.Two:GetChildren()) do\n        child.Transparency = 1 - v5 + 0.45;\n    end;\n\n    for _, child in pairs(script.Parent.Dirt.Three:GetChildren()) do\n        child.Transparency = 1 - v5 + 0.7;\n    end;\nend;\n\nfunction v3.localStart() -- Line: 59\n    while task.wait(1) do\n        script.Parent.BigSmokeStack.ParticleEmitter:Emit(script.Parent.BigSmokeStack.ParticleEmitter.Rate);\n    end;\nend;\n\nlocal u6 = 0;\n\nfunction v3.tick() -- Line: 67\n    -- upvalues: lights (copy), u1 (copy), u2 (copy), State (copy), Pollution (copy), u6 (ref)\n    lights();\n\n    if not u1:has(\"Exhaust\") then\n        return;\n    end;\n\n    u2:getBuffer();\n    local v7 = u1:getBuffer() / 240000;\n    local v8;\n\n    if u2:has(\"Filter\") then\n        if v7 <= u2:getBuffer() then\n            v8 = 0.5;\n        else\n            local v9 = v7 / u2:getBuffer() / 2;\n            v8 = math.clamp(v9, 0.5, 4);\n        end;\n\n        u2:removeItem(v7);\n    else\n        v8 = 4;\n    end;\n\n    local v10 = u1:getBuffer() * v8;\n    State.Value = v10;\n    local v11 = Pollution;\n    v11.Value = v11.Value + v10;\n    u1:removeItem(u1:getBuffer());\n\n    if u6 % 30 == 0 then\n        local Dirt = script.Parent.ModelData.Dirt;\n        Dirt.Value = Dirt.Value + v10 / 1200000;\n    end;\n\n    u6 = u6 + 1;\nend;\n\nreturn v3;"
};
