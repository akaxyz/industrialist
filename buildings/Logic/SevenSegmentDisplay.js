export default {
  id: "SevenSegmentDisplay",
  category: "Logic",
  cost: 35000,
  base: {
    height: 6,
    offset: {
      y: 1,
      x: 0
    },
    width: 4
  },
  nodes: [
    {
      name: "In1MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: -0.5,
        x: -1.92498779296875
      },
      gameOffset: {
        y: 0.7249999642372131,
        x: -1.92498779296875,
        z: -0.5
      },
      tip: "Bit 4"
    },
    {
      name: "Out1MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 1000,
      siteOffset: {
        y: -0.050048828125,
        x: 1.92498779296875
      },
      gameOffset: {
        y: 0.7249999642372131,
        x: 1.92498779296875,
        z: -0.050048828125
      },
      tip: "Bit 3"
    },
    {
      name: "In2MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 0.49993896484375,
        x: -1.92498779296875
      },
      gameOffset: {
        y: 0.7249999642372131,
        x: -1.92498779296875,
        z: 0.49993896484375
      },
      tip: "Bit 3"
    },
    {
      name: "In3MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 1.49993896484375,
        x: -1.92498779296875
      },
      gameOffset: {
        y: 0.7249999642372131,
        x: -1.92498779296875,
        z: 1.49993896484375
      },
      tip: "Bit 2"
    },
    {
      name: "In4MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 2.49993896484375,
        x: -1.92498779296875
      },
      gameOffset: {
        y: 0.7249999642372131,
        x: -1.92498779296875,
        z: 2.49993896484375
      },
      tip: "Bit 1"
    },
    {
      name: "Out2MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 1000,
      siteOffset: {
        y: 0.949951171875,
        x: 1.92498779296875
      },
      gameOffset: {
        y: 0.7249999642372131,
        x: 1.92498779296875,
        z: 0.949951171875
      },
      tip: "Bit 2"
    },
    {
      name: "Out3MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 10000,
      transferAmount: 1000,
      siteOffset: {
        y: 1.949951171875,
        x: 1.92498779296875
      },
      gameOffset: {
        y: 0.7249999642372131,
        x: 1.92498779296875,
        z: 1.949951171875
      },
      tip: "Bit 1"
    }
  ],
  data: [],
  updateEvery: 5,
script: (nodes, data) => {
  const inputIndexes = [0, 2, 3, 4];
  const outputIndexes = [1, 5, 6];
  const decode = {
    "0000": ['000', [true, true, true, false, true, true, true, false]],
    "0001": ['000', [false, false, true, false, false, true, false, false]],
    "0010": ['000', [true, false, true, true, true, false, true, false]],
    "0011": ['000', [true, false, true, true, false, true, true, false]],
    "0100": ['000', [false, true, true, true, false, true, false, false]],
    "0101": ['000', [true, true, false, true, false, true, true, false]],
    "0110": ['000', [true, true, false, true, true, true, true, false]],
    "0111": ['000', [true, false, true, false, false, true, false, false]],
    "1000": ['000', [true, true, true, true, true, true, true, false]],
    "1001": ['000', [true, true, true, true, false, true, true, false]],
    "1010": ['001', [true, true, true, false, true, true, true, true]],
    "1011": ['010', [false, false, true, false, false, true, false, true]],
    "1100": ['011', [true, false, true, true, true, false, true, true]],
    "1101": ['100', [true, false, true, true, false, true, true, true]],
    "1110": ['101', [false, true, true, true, false, true, false, true]],
    "1111": ['110', [true, true, false, true, false, true, true, true]],
  };
  const inputValue = inputIndexes.reduce(
    (value, index, bit) => value + (nodes[index].hasPower(1) ? 2 ** bit : 0),
    0,
  );
  const [overflow, segments] = decode[inputValue.toString(2).padStart(4, '0')];

  inputIndexes.forEach((index) => {
    if (nodes[index].hasPower(1)) nodes[index].remove(nodes[index].getBuffer());
  });
  data.segments = segments;
  // PSEUDOCODE: color the eight display segment parts from data.segments.

  outputIndexes.forEach((index, bit) => {
    if (overflow[bit] === '1') nodes[index].add(1000);
  });
},
};
