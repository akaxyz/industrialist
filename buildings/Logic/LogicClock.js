export default {
  id: "LogicClock",
  category: "Logic",
  cost: 4000,
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
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.7750000357627869,
        x: 0,
        z: 1.92498779296875
      }
    },
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0,
        z: -1.92498779296875
      }
    }
  ],
  data: {
    TickAmount: 2,
    SignalLength: 1
  },
  updateEvery: 5,
  script: (nodes, data) => {
    const [input, output] = nodes;
    data.intervalRemaining ??= 0;
    data.signalRemaining ??= 0;

    if (data.intervalRemaining <= 0) {
      if (data.signalRemaining <= 0) {
        if (input.getBuffer() >= 1) {
          data.intervalRemaining = data.TickAmount;
          data.signalRemaining = data.SignalLength;
        }
      } else {
        data.signalRemaining--;
        const amount = input.getBuffer();
        output.add(amount);
        input.remove(amount);
      }
    } else {
      data.intervalRemaining--;
    }
  },
};
