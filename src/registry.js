import buildingFiles from "./buildingFiles.js";
import buildingCategories from "./buildingCategories.js";

const categoryByBuilding = new Map(
  Object.entries(buildingCategories).flatMap(([category, names]) =>
    names.split(/\s+/).map((name) => [name, category]),
  ),
);

const buildings = await Promise.all(
  buildingFiles.map(async (id) => {
    const category = categoryByBuilding.get(id);
    if (!category) throw new Error(`No category registered for building: ${id}`);

    const module = await import(`../buildings/${category}/${id}.js`);
    return [id, module.default];
  }),
);

export default Object.fromEntries(buildings);
