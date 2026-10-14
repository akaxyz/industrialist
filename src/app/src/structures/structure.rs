use crate::node::*;

pub struct Structure {
    pub version: u32,
    pub title: String,
    pub description: String,
    pub creator: String,
    pub tags: Vec<String>,

    pub content: StructureContent,
}

impl Structure {
    pub fn new(version: u32, title: &str, description: &str, creator: &str, tags: Vec<&str>, content: StructureContent) -> Structure {
        Structure { version, title: title.to_owned(), description: description.to_owned(), creator: creator.to_owned(), tags: tags.iter().map(|&s| s.to_string()).collect(), content }
    }
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
