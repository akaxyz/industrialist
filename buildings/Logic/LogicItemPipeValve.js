export default {
  id: "LogicItemPipeValve",
  category: "Logic",
  tier: 1,
  cost: 7500,
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
      name: "MainPipeOut",
      kind: "item",
      direction: "output",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: -1.5499267578125,
        x: -1
      },
      gameOffset: {
        y: 1.3119959831237793,
        x: -1,
        z: -1.5499267578125
      }
    },
    {
      name: "MainPipe",
      kind: "item",
      direction: "input",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 1.2999267578125,
        x: -1
      },
      gameOffset: {
        y: 1.3119959831237793,
        x: -1,
        z: 1.2999267578125
      }
    },
    {
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.07733154296875,
        x: 1.37237548828125
      },
      gameOffset: {
        y: 1.0039191246032715,
        x: 1.37237548828125,
        z: 1.07733154296875
      }
    }
  ],
  data: {
    State: "1",
    Played: false
  },
  updateEvery: 5,
script: (nodes, data) => {
  const [output, input, power] = nodes;
  if (power.getBuffer() >= 1) {
    power.remove(power.getBuffer());
    const amount = Math.min(input.getBuffer(), output.getMax() - output.getBuffer());
    if (amount <= 0) return;
    output.setUsedTemperature(input.temp);
    output.addItemAmount(input.item, amount);
    input.remove(amount);
    if (!data.Played) {
      data.Played = true;
      // PSEUDOCODE: play the valve-open sound.
    }
  } else if (data.Played) {
    data.Played = false;
    // PSEUDOCODE: play the valve-close sound.
  }
},
};
