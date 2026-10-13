export default {
  id: "Resistor",
  category: "Logic",
  cost: 50000,
  base: {
    height: 4,
    offset: {
      y: 0,
      x: 0
    },
    width: 2
  },
  nodes: [
    {
      name: "MainConnector2",
      kind: "logic",
      direction: "output",
      maxAmount: 50000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.82977294921875,
        x: -0.00018310546875
      },
      gameOffset: {
        y: 0.8747591972351074,
        x: -0.00018310546875,
        z: -1.82977294921875
      }
    },
    {
      name: "MainConnector",
      kind: "mv",
      direction: "input",
      maxAmount: 500000,
      transferAmount: 0,
      siteOffset: {
        y: 1.835205078125,
        x: -0.00018310546875
      },
      gameOffset: {
        y: 0.8747591972351074,
        x: -0.00018310546875,
        z: 1.835205078125
      }
    }
  ],
  data: [],
  updateEvery: 5,
  script: (nodes) => {
    const input = nodes[1];
    const output = nodes[0];
    const amount = Math.floor(input.getBuffer() / 10);
    const room = output.getMax() - output.getBuffer();
    const transfer = Math.min(Math.max(amount, 0), room);

    if (!output.canHoldXMore(transfer - 1)) return;

    input.remove(transfer);
    output.add(transfer);
  },
};
