use crate::structures::{structure::*, node::*};

pub static BUILDINGS: &[Structure] = &[
    Structure::new(
        0,
        "Short Fluid Pipe",
        "this pipe is short and fluid probably",
        "mamytema",
        vec![],
        StructureContent::Machine { processor: (ShortFluidPipe) },
    ),
];

pub fn get_building(name: &str) -> Option<&Structure> {
    BUILDINGS.iter().find(|bld| bld.title == title)
}

impl Processor for ShortFluidPipe {
    fn compute(&mut self, inputs: Vec<&mut Node>) -> Vec<Node> {
        vec![]
    }
}