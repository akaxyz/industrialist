

// schema heheh


// project
const project =
{
  format: "project",
  version: 1,

  // Project metadata
  title: "",
  description: "",
  creator: "",
  tags: [],

  // Physical, in-game representation
  physical: {
    buildings: [],
    pipes: [],
    wires: []
  },

  // Logical circuit editor
  editor: {
    buildings: [],
    connections: [],
    comments: []
  },

  // Initial or saved simulation state
  sim: {
    tick: 0,
    nodes: [],
    world: {}
  }
}


// the physical blueprint can be extracted and shared separately too


// physical building
project.physical.buildings[0] =
{
  id: "1",
  name: "ANDGate",
  x: 0,
  z: 0,
  rot: 0,
  config: {},
  updateOrder: 1
}


// physical pipes/wires
project.physical.pipes[0] =
{
  A: "1.out",
  B: "2.in"
}


// abstract buildings, taken from a library
project.editor.buildings[0] =
{
  id: "10",
  name: "sigma-adder",
  x: 0,
  z: 0,
  rot: 0,
  config: {},
  updateOrder: 1
}


// abstract weighted connection
project.editor.connections[0] =
{
  A: "10.out",
  B: "20.in",
  weight: 1/4
}


// comments shown on the editor canvas or property viewer/editor
project.editor.comments[0] =
{
  id: "comment-1",
  x: 0,
  z: 0,
  contents: {
    // text, variables, etc; not sure about the specific format
  }
}


// sim node data
project.sim.nodes[0] =
[
  {
    id: "10.out",
    amount: 4,
    item: "penis",
    temp: 18,
    //etc
  }
]


// sim world data
project.sim.world =
{
  time: 0,
  pollution: 0,
  radiation: 0,
  windSpeed: 0,
  //etc
}


// the project sim data and physical blueprint get compiled to a simulation object
const sim =
{
  tick: 0,

  buildings: [],
  nodes: [],

  world: {
    time: null,
    pollution: 0,
    radiation: 0,
    windSpeed: 0,
    //etc
  }
}


// sim building
sim.buildings[0] =
{
  id: "10",
  nodes: [ /* node references */ ],
  config: {}, // manually configurated data
  state: {}, // not manually configurable
  updateRate: 5,
  script: () => {}
}


// sim node
sim.nodes[0] =
{
  id: "10.output",
  maxAmount: 2000,
  transferRate: 1000,
  flow: 0,
  amount: 0,
  item: "ball",
  temp: 18,
  runTemp: 12233334,
  connections: [],
}


// building and node definition/default values
const building =
{
  id: "ShortFluidPipe",
  displayName: "Short Fluid Pipe",
  category: "pipes", // im too lazy to name them all
  tier: 3, // 1-4
  cost: 120,

  base: {
    width: 2,
    height: 2,
    offset: { x: 0, z: 0 }
  },

  config: {}, // key: value
  data: {}, // key: value

  nodes: [
    {
      name: "PipeA",
      type: "pipe", // power or pipe
      kind: "fluid", // "item", "fluid", "largefluid", "logic", "mv", "hv", "data"
      color: null, // letter A-H, null
      direction: null, // "input", "output", null (bi-directional)
      maxAmount: 40,
      transferAmount: 20,
      physicalOffset: { x: 0, y: 0, z: 0 }, // fallback position; used for wire range validation
      offset: { x: 0, z: 0 },
      wireRange: null // defaults to i forgot for power nodes; null/undefined for item nodes
    }
  ],

  updateEvery: null, // int; null = 1 by default
  script: (parameters) => { doSomething(); } // can also be null
}
