use crate::node::*;

#[allow(unused)]
pub struct Structure {
    version: u32,
    title: String,
    description: String,
    creator: String,
    tags: Vec<String>,

    content: StructureContent,
}

pub enum StructureContent {
    Container { children: Vec<Structure> },
    Machine { processor: Box<dyn Processor> },
}

pub trait Processor {
    fn compute(&mut self, inputs: Vec<&mut Node>) -> Vec<Node> {
        inputs.into_iter().map(|item| std::mem::take(item)).collect() // temp thing to jsut return exact input..
    }
}
