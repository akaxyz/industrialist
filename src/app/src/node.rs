#[derive(Default)]
pub enum NodeType {
    #[default]
    Power,
    LogicPower,
    Item,
}

#[derive(Default)]
pub enum NodeDirection {
    #[default]
    Input,
    Output,
}

#[allow(unused)]
#[derive(Default)]
pub struct Node { // some of these are probably definitely supposed to be i32
    id: String,
    node_type: NodeType,
    node_direction: NodeDirection,
    max_amount: u32,
    transfer_rate: u32,
    flow: u32,
    amount: u32,
    temp: u32,
    run_temp: u32,
    connections: Vec<Node>,
}
