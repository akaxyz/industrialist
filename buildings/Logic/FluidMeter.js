export default {
  id: "FluidMeter",
  category: "Logic",
  tier: 1,
  cost: 7500,
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
      kind: "fluid",
      maxAmount: 40,
      transferAmount: 20,
      siteOffset: {
        y: 0,
        x: 0
      },
      gameOffset: {
        y: 1.3669919967651367,
        x: 0,
        z: 0
      }
    },
    {
      name: "InMainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -0.5998382568359375,
        x: -1.02471923828125
      },
      gameOffset: {
        y: 1.0087560415267944,
        x: -1.02471923828125,
        z: -0.5998382568359375
      }
    },
    {
      name: "OutMainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: 0.6001739501953125,
        x: -1.02471923828125
      },
      gameOffset: {
        y: 1.0087560415267944,
        x: -1.02471923828125,
        z: 0.6001739501953125
      }
    }
  ],
  data: {
    Function: 1,
    Level: 6,
    GreaterThan: false,
      flowTotal: 0,
      flowAverage: 0,
      lastFlowSampleTick: null,
    },
  updateEvery: 5,
script: (nodes, data, simData) => {
  const [pipe, input, output] = nodes;
  data.lastFlowSampleTick ??= simData.tick;
  data.flowTotal += pipe.getFlow();
  pipe.setFlow(0);

  const elapsedTicks = simData.tick - data.lastFlowSampleTick;
  if (elapsedTicks > 30) {
    const flowRate = data.flowTotal / (elapsedTicks / 30);
    data.flowAverage = (data.flowAverage + flowRate) / 2;
    data.flowTotal = 0;
    data.lastFlowSampleTick = simData.tick;
  }

  if (input.hasPower(1)) {
    let measuredValue = null;
    if (data.Function === 1) measuredValue = pipe.temp;
    if (data.Function === 2) measuredValue = pipe.getBuffer();
    if (data.Function === 3) measuredValue = data.flowAverage;
    const matches = data.GreaterThan
      ? measuredValue > data.Level
      : measuredValue < data.Level;
    if (measuredValue !== null && matches) output.add(1000);
  }

  input.remove(input.getBuffer());
},
};
