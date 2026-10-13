export default {
  id: "BigAlarm",
  category: "Logic",
  cost: 1000,
  base: {
    height: 8,
    offset: {
      y: 0,
      x: 0
    },
    width: 8
  },
  nodes: [
    {
      name: "MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 2.765716552734375,
        x: -1.0003662109375
      },
      gameOffset: {
        y: 3.181001663208008,
        x: -1.0003662109375,
        z: 2.765716552734375
      }
    }
  ],
  data: {
    Sound: 1,
    Range: 10000,
    Volume: 1,
    State: 0,
    soundPlaying: false,
  },
  updateEvery: 5,
script: (nodes, data) => {
  const [input] = nodes;
  if (input.getBuffer() >= 1) {
    if (!data.soundPlaying) {
      data.State = 1;
      data.soundPlaying = true;
    }
    // PSEUDOCODE: loop the selected sound with the configured range and volume.
  } else if (data.soundPlaying) {
    data.State = 0;
    data.soundPlaying = false;
    // PSEUDOCODE: stop looping the selected sound.
  } else if (data.State !== 0) {
    data.State = 0;
  }

  input.remove(input.getBuffer());
},
};
