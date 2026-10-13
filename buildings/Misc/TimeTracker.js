export default {
  id: "TimeTracker",
  category: "Misc",
  tier: 1,
  cost: 120,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [],
  data: {
    Time: "0"
  },
  updateEvery: 30,
  script: "local v1 = {};\nlocal u2 = tick();\nlocal Time = script.Parent.ModelData.Time;\n\nfunction v1.tick() -- Line: 8\n    -- upvalues: u2 (ref), Time (copy)\n    local v3 = tick() - u2;\n    local v4 = Time;\n    v4.Value = v4.Value + v3;\n    u2 = tick();\n    script.Parent.Rate.SurfaceGui.TextLabel.Text = math.floor(Time.Value / 60) .. \" minutes old\";\nend;\n\nreturn v1;"
};
