export default {
  id: "LogicDelay",
  category: "Logic",
  cost: 2000,
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
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 1000,
      transferAmount: 0,
      siteOffset: {
        y: 0.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.7750000357627869,
        x: 0,
        z: 0.92498779296875
      }
    },
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -0.92498779296875,
        x: 0
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0,
        z: -0.92498779296875
      }
    }
  ],
  data: {
    Delay: 1,
    queue: [],
  },
  updateEvery: 5,
script: (nodes, data) => {
  const [input, output] = nodes;
  if (input.getBuffer() >= 1) {
    data.queue.push({
      amount: input.getBuffer(),
      ticksRemaining: data.Delay - 1,
    });
  }

  for (let index = 0; index < data.queue.length; index++) {
    const pulse = data.queue[index];
    if (pulse.ticksRemaining > 0) {
      pulse.ticksRemaining--;
    } else {
      output.add(pulse.amount);
      data.queue.splice(index, 1);
    }
  }

  input.remove(input.getBuffer());
},
};
