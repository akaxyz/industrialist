export default {
  id: "PipeIntersection",
  category: "Pipes",
  tier: 3,
  cost: 4000,
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
      name: "PipeA",
      kind: "item",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: 0.35003662109375,
        x: -0.350006103515625
      },
      gameOffset: {
        y: 1.5249977111816406,
        x: -0.350006103515625,
        z: 0.35003662109375
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      maxAmount: 20,
      transferAmount: 20,
      siteOffset: {
        y: -0.3499755859375,
        x: 0.350006103515625
      },
      gameOffset: {
        y: 1.5249977111816406,
        x: 0.350006103515625,
        z: -0.3499755859375
      }
    }
  ],
  data: []
};
