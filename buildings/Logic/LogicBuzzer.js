export default {
  id: "LogicBuzzer",
  category: "Logic",
  cost: 1000,
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
      name: "MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.925048828125,
        x: 0
      },
      gameOffset: {
        y: 0.7749999165534973,
        x: 0,
        z: 1.925048828125
      }
    }
  ],
  data: {
    Sound: 1,
    Range: 100,
    soundDurationTicks: null,
    nextSoundTick: 0,
    soundPlaying: false,
  },
  updateEvery: 5,
script: (nodes, data, simData) => {
  const [input] = nodes;
  if (input.getBuffer() >= 1) {
    if (simData.tick >= data.nextSoundTick) {
      data.soundPlaying = true;
      if (data.soundDurationTicks !== null) {
        data.nextSoundTick = simData.tick + data.soundDurationTicks;
      }
      // PSEUDOCODE: play the selected sound and read its duration in simulation ticks.
    }
  } else if (data.soundPlaying && simData.tick >= data.nextSoundTick) {
    data.soundPlaying = false;
    // PSEUDOCODE: restore the indicator after the sound finishes.
  }

  input.remove(input.getBuffer());
},
};
