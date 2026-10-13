export default {
  id: "ResearchStation4",
  category: "Misc",
  tier: 4,
  cost: 1500000,
  base: {
    height: 32,
    offset: {
      y: -14.000030517578125,
      x: 21.99993896484375
    },
    width: 48
  },
  nodes: [
    {
      name: "LogicIn5MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -12.043365478515625,
        x: -0.70611572265625
      },
      gameOffset: {
        y: 1.9341800212860107,
        x: -0.70611572265625,
        z: -12.043365478515625
      },
      tip: "Input for 5th bit"
    },
    {
      name: "LogicIn4MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -11.218421936035156,
        x: -0.70611572265625
      },
      gameOffset: {
        y: 1.9341800212860107,
        x: -0.70611572265625,
        z: -11.218421936035156
      },
      tip: "Input for 4th bit"
    },
    {
      name: "LogicIn3MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -10.392021179199219,
        x: -0.70611572265625
      },
      gameOffset: {
        y: 1.9341800212860107,
        x: -0.70611572265625,
        z: -10.392021179199219
      },
      tip: "Input for 3rd bit"
    },
    {
      name: "LogicIn2MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -9.56707763671875,
        x: -0.70611572265625
      },
      gameOffset: {
        y: 1.9341800212860107,
        x: -0.70611572265625,
        z: -9.56707763671875
      },
      tip: "Input for 2nd bit"
    },
    {
      name: "ClockMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -7.517051696777344,
        x: -0.70611572265625
      },
      gameOffset: {
        y: 1.9341800212860107,
        x: -0.70611572265625,
        z: -7.517051696777344
      },
      tip: "Confirm input bits, allows you to get next cycle bits. ONLY PROVIDE SHORT PULSES."
    },
    {
      name: "Out4MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -12.043365478515625,
        x: 1 + -0.70611572265625
      },
      gameOffset: {
        y: 2.5341718196868896,
        x: -0.70611572265625,
        z: -12.043365478515625
      },
      tip: "Output 4th bit."
    },
    {
      name: "Out3MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -11.218421936035156,
        x: 1 + -0.70611572265625
      },
      gameOffset: {
        y: 2.5341718196868896,
        x: -0.70611572265625,
        z: -11.218421936035156
      },
      tip: "Output 3rd bit."
    },
    {
      name: "Out2MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -10.393424987792969,
        x: 1 + -0.70611572265625
      },
      gameOffset: {
        y: 2.5341718196868896,
        x: -0.70611572265625,
        z: -10.393424987792969
      },
      tip: "Output 2nd bit"
    },
    {
      name: "Out1MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -9.568424224853516,
        x: 1 + -0.70611572265625
      },
      gameOffset: {
        y: 2.5341718196868896,
        x: -0.70611572265625,
        z: -9.568424224853516
      },
      tip: "Output 1st bit"
    },
    {
      name: "LogicIn1MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -8.742019653320312,
        x: -0.70611572265625
      },
      gameOffset: {
        y: 1.9341800212860107,
        x: -0.70611572265625,
        z: -8.742019653320312
      },
      tip: "Input for 1st bit. Read the machine description for a short manual."
    },
    {
      name: "CorrectMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -6.928432464599609,
        x: 1 + -0.70611572265625
      },
      gameOffset: {
        y: 2.5341718196868896,
        x: -0.70611572265625,
        z: -6.928432464599609
      },
      tip: "If last cycle was correct"
    },
    {
      name: "MachineMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -7.528411865234375,
        x: 1 + -0.70611572265625
      },
      gameOffset: {
        y: 2.5341718196868896,
        x: -0.70611572265625,
        z: -7.528411865234375
      },
      tip: "If machine is ready for next input."
    }
  ],
  data: {
    LastValue: 0,
    ThisValue: -1,
    lockoutTicks: 0,
    neighborId: -1,
    neighborLogicBuff: null
  },
  updateEvery: 5,
script: (nodes, data, simData) => {
  const inputs = [nodes[9], nodes[3], nodes[2], nodes[1], nodes[0]];
  const clock = nodes[4];
  const outputs = [nodes[8], nodes[7], nodes[6], nodes[5]];
  const correctOutput = nodes[10];
  const machineOutput = nodes[11];
  const cycleOutputs = [...outputs, machineOutput, correctOutput];
  const reset = () => {
    cycleOutputs.forEach((node) => node.remove(1000));
    [...inputs, clock].forEach((node) => node.remove(1000));
  };

  // PSEUDOCODE: resolve/link the neighboring ResearchStation3 by world proximity.
  // Synchronize data.neighborLogicBuff with that building when the link exists.
  if (data.neighborId == null) {
    reset();
    return;
  }

  cycleOutputs.forEach((node) => node.remove(1000));
  if (data.ThisValue === -1) data.ThisValue = 7;

  if (data.lockoutTicks > 0) {
    data.lockoutTicks--;
  } else {
    machineOutput.add(1000);
  }

  if (clock.hasPower(1) && data.lockoutTicks === 0) {
    const actualValue = inputs.reduce(
      (value, input, index) => value + (input.hasPower(1) ? 2 ** index : 0),
      0,
    );
    const expectedValue = data.ThisValue + data.LastValue;
    data.LastValue = data.ThisValue;
    data.ThisValue = Math.floor(Math.random() * 16);

    if (actualValue === expectedValue) {
      if (data.neighborLogicBuff !== null) {
        data.neighborLogicBuff += 5;
        if (data.neighborLogicBuff >= 10) {
          // PSEUDOCODE: award the ResearchStation4 completion badge.
        }
      } else {
        // PSEUDOCODE: add 5 LogicBuff to the linked ResearchStation3.
      }
      simData.RS4Logic = (simData.RS4Logic ?? 0) + 1;
      correctOutput.add(1000);
    } else {
      if (data.neighborLogicBuff !== null) data.neighborLogicBuff = -1;
      // PSEUDOCODE: reset the linked ResearchStation3 LogicBuff and play wrong-answer audio.
      data.lockoutTicks = 90;
    }
  } else if (clock.hasPower(1)) {
    // PSEUDOCODE: play the clock-during-lockout error sound.
  }

  for (let index = 0; index < outputs.length; index++) {
    if ((data.ThisValue & (1 << index)) !== 0) outputs[index].add(1000);
  }

  [...inputs, clock].forEach((node) => node.remove(10000));
},
};
