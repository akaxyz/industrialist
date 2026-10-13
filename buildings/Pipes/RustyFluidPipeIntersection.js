export default {
  id: "RustyFluidPipeIntersection",
  category: "Pipes",
  cost: 250,
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
      name: "PipeA",
      kind: "fluid",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: -0.0875244140625,
        x: 1.0374755859375
      },
      gameOffset: {
        y: 1.4857521057128906,
        x: 1.0374755859375,
        z: -0.0875244140625
      }
    },
    {
      name: "MainPipe",
      kind: "fluid",
      maxAmount: 6,
      transferAmount: 1,
      siteOffset: {
        y: 1.01251220703125,
        x: 0.0625
      },
      gameOffset: {
        y: 1.4857521057128906,
        x: 0.0625,
        z: 1.01251220703125
      }
    }
  ],
  data: []
};
