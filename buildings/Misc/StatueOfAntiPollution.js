export default {
  id: "StatueOfAntiPollution",
  category: "Misc",
  tier: 3,
  cost: 10000,
  base: {
    height: 8,
    offset: {
      y: -2,
      x: 2
    },
    width: 8
  },
  nodes: [],
  data: [],
  script: "local ReplicatedStorage = game:GetService(\"ReplicatedStorage\");\nrequire(ReplicatedStorage.Modules.PowerUtilsV2);\nrequire(ReplicatedStorage.Modules.PipeUtilsV2);\nrequire(ReplicatedStorage.Modules.Enums.Items);\nlocal v1 = {};\nlocal SpotLight = script.Parent.Light1.SpotLight;\nlocal SpotLight2 = script.Parent.Light2.SpotLight;\nlocal Value = game.ReplicatedStorage.Pollution.Value;\nlocal u2 = tick();\nlocal u3 = 0;\n\nfunction v1.tick() -- Line: 17\n    -- upvalues: u2 (ref), u3 (ref), Value (ref), SpotLight (copy), SpotLight2 (copy)\n    if tick() - u2 > 1 then\n        u2 = tick();\n        local Value2 = game.ReplicatedStorage.Pollution.Value;\n        u3 = (Value2 - Value) / 500;\n        Value = Value2;\n    end;\n\n    SpotLight.Brightness = u3 * -1;\n    SpotLight2.Brightness = u3 * -1;\nend;\n\nreturn v1;"
};
