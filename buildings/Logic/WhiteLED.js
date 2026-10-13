export default {
  id: "WhiteLED",
  category: "Logic",
  cost: 1000,
  base: {
    height: 2,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0.9742431640625,
        x: -0.0001678466796875
      },
      gameOffset: {
        y: 1.0997573137283325,
        x: -0.0001678466796875,
        z: 0.9742431640625
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes, data) => {
    const [input] = nodes;
    const isPowered = input.getBuffer() >= 1;

    if (isPowered) input.remove(input.getBuffer());
    data.color = isPowered ? { red: 255, green: 255, blue: 255 } : { red: 0, green: 0, blue: 0 };
    // Light.Color = Color3.fromRGB(data.color.red, data.color.green, data.color.blue);
  },
};
