export default {
  id: "RGBLLED",
  category: "Logic",
  cost: 10000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "G128MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -1.9250030517578125,
        x: -1.050018310546875
      },
      gameOffset: {
        y: 1.125,
        x: -1.050018310546875,
        z: -1.9250030517578125
      },
      tip: "Green Input (changes value by 128"
    },
    {
      name: "G64MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -1.9250030517578125,
        x: -0.350006103515625
      },
      gameOffset: {
        y: 1.125,
        x: -0.350006103515625,
        z: -1.9250030517578125
      },
      tip: "Green Input (changes value by 64)"
    },
    {
      name: "G32MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -1.9250030517578125,
        x: 0.350006103515625
      },
      gameOffset: {
        y: 1.125,
        x: 0.350006103515625,
        z: -1.9250030517578125
      },
      tip: "Green Input (changes value by 32)"
    },
    {
      name: "G16MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -1.9250030517578125,
        x: 1.050018310546875
      },
      gameOffset: {
        y: 1.125,
        x: 1.050018310546875,
        z: -1.9250030517578125
      },
      tip: "Green Input (changes value by 16)"
    },
    {
      name: "B16MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -1.0750045776367188,
        x: -1.91998291015625
      },
      gameOffset: {
        y: 1.125,
        x: -1.91998291015625,
        z: -1.0750045776367188
      },
      tip: "Blue Input (changes value by 16)"
    },
    {
      name: "B32MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -0.37499237060546875,
        x: -1.91998291015625
      },
      gameOffset: {
        y: 1.125,
        x: -1.91998291015625,
        z: -0.37499237060546875
      },
      tip: "Blue Input (changes value by 32)"
    },
    {
      name: "B64MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0.32501983642578125,
        x: -1.91998291015625
      },
      gameOffset: {
        y: 1.125,
        x: -1.91998291015625,
        z: 0.32501983642578125
      },
      tip: "Blue Input (changes value by 64)"
    },
    {
      name: "B128MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.0250320434570312,
        x: -1.91998291015625
      },
      gameOffset: {
        y: 1.125,
        x: -1.91998291015625,
        z: 1.0250320434570312
      },
      tip: "Blue Input (changes value by 128"
    },
    {
      name: "R128MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.9150009155273438,
        x: -1.050018310546875
      },
      gameOffset: {
        y: 1.125,
        x: -1.050018310546875,
        z: 1.9150009155273438
      },
      tip: "Red Input (changes value by 128"
    },
    {
      name: "R64MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.9150009155273438,
        x: -0.350006103515625
      },
      gameOffset: {
        y: 1.125,
        x: -0.350006103515625,
        z: 1.9150009155273438
      },
      tip: "Red Input (changes value by 64)"
    },
    {
      name: "R32MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.9150009155273438,
        x: 0.350006103515625
      },
      gameOffset: {
        y: 1.125,
        x: 0.350006103515625,
        z: 1.9150009155273438
      },
      tip: "Red Input (changes value by 32)"
    },
    {
      name: "R16MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.9150009155273438,
        x: 1.050018310546875
      },
      gameOffset: {
        y: 1.125,
        x: 1.050018310546875,
        z: 1.9150009155273438
      },
      tip: "Red Input (changes value by 16)"
    }
  ],
  data: [],
  updateEvery: 5,
script: (nodes, data) => {
  const channel = (indexes) => indexes.reduce(
    (value, nodeIndex, index) => value + (nodes[nodeIndex].hasPower(1) ? 128 >> index : 0),
    0,
  );
  const green = channel([0, 1, 2, 3]);
  const blue = channel([7, 6, 5, 4]);
  const red = channel([8, 9, 10, 11]);

  nodes.forEach((node) => node.remove(node.getBuffer()));
  data.color = { red, green, blue };
  // PSEUDOCODE: set Light.Color from the computed RGB values.
},
};
