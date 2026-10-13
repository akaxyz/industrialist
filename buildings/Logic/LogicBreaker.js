export default {
  id: "LogicBreaker",
  category: "Logic",
  tier: 1,
  cost: 7500,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 1
    },
    width: 6
  },
  nodes: [
    {
      name: "MainConnector2",
      kind: "mv",
      direction: "output",
      maxAmount: 750000,
      transferAmount: 450000,
      siteOffset: {
        y: 1.41241455078125,
        x: -1.03765869140625
      },
      gameOffset: {
        y: 0.7032194137573242,
        x: -1.03765869140625,
        z: 1.41241455078125
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 750000,
      transferAmount: 0,
      siteOffset: {
        y: -1.3875732421875,
        x: -0.9876708984375
      },
      gameOffset: {
        y: 0.7032194137573242,
        x: -0.9876708984375,
        z: -1.3875732421875
      }
    },
    {
      name: "LogicMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0.00006103515625,
        x: -1.97515869140625
      },
      gameOffset: {
        y: 0.4750089645385742,
        x: -1.97515869140625,
        z: 0.00006103515625
      }
    }
  ],
  data: {
    Buffer: 750000
  },
  updateEvery: 5,
  script: (nodes, data) => {
    const [output, input, signal] = nodes;
    input.setMax(data.Buffer);
    output.setMax(data.Buffer);

    if (signal.getBuffer() >= 1) {
      const room = output.getMax() - output.getBuffer();
      const transfer = Math.min(input.getBuffer(), room, 500000);
      output.add(transfer);
      input.remove(transfer);
      // Breaker indicator and zap sound are visual/audio-only.
    }

    signal.remove(signal.getBuffer());
  },
};
