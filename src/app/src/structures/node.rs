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

#[derive(Default)]
pub struct Node {
    pub id: String,
    pub node_type: NodeType,
    pub node_direction: NodeDirection,
    pub max_amount: i64,
    pub transfer_rate: i64,
    pub flow: i64,
    pub amount: i64,
    pub temp: i64,
    pub run_temp: i64,
    pub connections: Vec<Node>,
}
