export default {
  id: "ColorLED",
  category: "Logic",
  cost: 3000,
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
      name: "RMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0.9742431640625,
        x: -0.00018310546875
      },
      gameOffset: {
        y: 1.0997581481933594,
        x: -0.00018310546875,
        z: 0.9742431640625
      },
      tip: "Red Input"
    },
    {
      name: "GMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0.00018310546875,
        x: -0.974151611328125
      },
      gameOffset: {
        y: 1.0999879837036133,
        x: -0.974151611328125,
        z: 0.00018310546875
      },
      tip: "Green Input"
    },
    {
      name: "BMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0.00019073486328125,
        x: 0.9718017578125
      },
      gameOffset: {
        y: 1.0999879837036133,
        x: 0.9718017578125,
        z: 0.00019073486328125
      },
      tip: "Blue Input"
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes, data) => {
    const [redInput, greenInput, blueInput] = nodes;
    const red = redInput.getBuffer() >= 1 ? 255 : 0;
    const green = greenInput.getBuffer() >= 1 ? 255 : 0;
    const blue = blueInput.getBuffer() >= 1 ? 255 : 0;

    redInput.remove(redInput.getBuffer());
    greenInput.remove(greenInput.getBuffer());
    blueInput.remove(blueInput.getBuffer());
    data.color = { red, green, blue };
    // Light.Color = Color3.fromRGB(red, green, blue);
  },
};
