export default {
  id: "DieselEngineFlywheel",
  category: "Modular",
  tier: 2,
  cost: 8000,
  base: {
    height: 12,
    offset: {
      y: 0,
      x: -2
    },
    width: 8
  },
  nodes: [],
  data: [],
  script: "local v1 = {};\nlocal RPM = script.Parent.RPM;\nlocal Flywheel = script.Parent.Flywheel;\n\nfunction v1.localUpdate() -- Line: 6\n    -- upvalues: RPM (copy), Flywheel (copy)\n    while task.wait(0.03333333333333333) do\n        local v2 = RPM.Value / 10000 * 20 * 360 / 30;\n        Flywheel:PivotTo(Flywheel:GetPivot() * CFrame.Angles(math.rad(v2), 0, 0));\n    end;\nend;\n\nfunction v1.tick() -- Line: 14\n    script.Parent.State.Value = \"Run\";\nend;\n\nreturn v1;"
};
