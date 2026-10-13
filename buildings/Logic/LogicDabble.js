export default {
  id: "LogicDabble",
  category: "Logic",
  cost: 50000,
  base: {
    height: 8,
    offset: {
      y: 2,
      x: -2
    },
    width: 8
  },
  nodes: [
    {
      name: "In3MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 5.9250640869140625,
        x: -1
      },
      gameOffset: {
        y: 0.7750015258789062,
        x: -1,
        z: 5.9250640869140625
      },
      tip: "Bit 3"
    },
    {
      name: "In4MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 5.9250640869140625,
        x: 1
      },
      gameOffset: {
        y: 0.7750015258789062,
        x: 1,
        z: 5.9250640869140625
      },
      tip: "Bit 4"
    },
    {
      name: "Out1MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.9249725341796875,
        x: 1
      },
      gameOffset: {
        y: 0.7750015258789062,
        x: 1,
        z: -1.9249725341796875
      },
      tip: "Bit 1"
    },
    {
      name: "In2MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 5.9250640869140625,
        x: -2.9000091552734375
      },
      gameOffset: {
        y: 0.7750015258789062,
        x: -2.9000091552734375,
        z: 5.9250640869140625
      },
      tip: "Bit 2"
    },
    {
      name: "In1MainConnector",
      kind: "logic",
      direction: "input",
      maxAmount: 2000,
      transferAmount: 0,
      siteOffset: {
        y: 5.9250640869140625,
        x: -4.9000091552734375
      },
      gameOffset: {
        y: 0.7750015258789062,
        x: -4.9000091552734375,
        z: 5.9250640869140625
      },
      tip: "Bit 1"
    },
    {
      name: "Out2MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.9249725341796875,
        x: -1
      },
      gameOffset: {
        y: 0.7750015258789062,
        x: -1,
        z: -1.9249725341796875
      },
      tip: "Bit 2"
    },
    {
      name: "Out3MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.9249725341796875,
        x: -2.899993896484375
      },
      gameOffset: {
        y: 0.7750015258789062,
        x: -2.899993896484375,
        z: -1.9249725341796875
      },
      tip: "Bit 3"
    },
    {
      name: "Out4MainConnector",
      kind: "logic",
      direction: "output",
      maxAmount: 1000,
      transferAmount: 1000,
      siteOffset: {
        y: -1.9249725341796875,
        x: -4.899993896484375
      },
      gameOffset: {
        y: 0.7750015258789062,
        x: -4.899993896484375,
        z: -1.9249725341796875
      },
      tip: "Bit 4"
    }
  ],
  data: [],
  updateEvery: 5,
script: (nodes) => {
  const inputs = [nodes[4], nodes[3], nodes[0], nodes[1]];
  const outputs = [nodes[2], nodes[5], nodes[6], nodes[7]];
  const outputBits = [
    '0000', '1000', '0100', '1100',
    '0010', '0001', '1001', '0101',
    '1101', '0011', '0000', '0000',
    '0000', '0000', '0000', '0000',
  ];
  let inputValue = 0;

  inputs.forEach((input, index) => {
    if (input.hasPower(1)) {
      inputValue += 2 ** index;
      input.remove(input.getBuffer());
    }
  });

  const result = outputBits[inputValue];
  outputs.forEach((output, index) => {
    if (result[index] === '1') output.add(1000);
  });
},
};
