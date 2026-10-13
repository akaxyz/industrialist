export default {
  id: "Tree",
  category: "Modular",
  cost: 80,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: -2
    },
    width: 8
  },
  nodes: [],
  data: {
    Stage: 1,
    Ticks: 0
  },
  script: "local v1 = {};\nlocal State = script.Parent.State;\nlocal Stages = script.Parent.Stages;\nState.Value = script.Parent.ModelData.Stage.Value;\n\nfunction v1.localUpdate() -- Line: 8\n    -- upvalues: Stages (copy), State (copy)\n    for _, child in pairs(Stages:GetChildren()) do\n        if child.Name == State.Value then\n            for _, descendant in pairs(child:GetDescendants()) do\n                descendant.Transparency = 0;\n            end;\n        else\n            for _, descendant in pairs(child:GetDescendants()) do\n                descendant.Transparency = 1;\n            end;\n        end;\n    end;\nend;\n\nfunction v1.tick() -- Line: 22\nend;\n\nreturn v1;"
};
