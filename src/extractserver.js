import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = 3000;
const BUILDINGS_DIR = path.resolve("buildings");

fs.mkdirSync(BUILDINGS_DIR, { recursive: true });

// Property order for generated building files.
const buildingOrder = [
  "id",
  "category",
  "tier",
  "cost",
  "base",
  "nodes",
  "data",
  "updateEvery",
  "script",
];

// Property order for generated node objects.
const nodeOrder = [
  "name",
  "kind",
  "color",
  "direction",
  "maxAmount",
  "transferAmount",
  "siteOffset",
  "gameOffset",
  "tip",
  "wireRange",
];

// Reorder an object according to a specified property order.
function orderObject(object, order) {
  const ordered = {};

  for (const key of order) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      ordered[key] = object[key];
    }
  }

  // Keep any unexpected properties at the end.
  for (const [key, value] of Object.entries(object)) {
    if (!Object.prototype.hasOwnProperty.call(ordered, key)) {
      ordered[key] = value;
    }
  }

  return ordered;
}

function prepareBuilding(building) {
  const prepared = {
    ...building,
  };

  if (Array.isArray(prepared.nodes)) {
    prepared.nodes = prepared.nodes.map(node =>
      orderObject(node, nodeOrder)
    );
  }

  return orderObject(prepared, buildingOrder);
}

// Convert data into a readable JavaScript object literal.
function formatValue(value, indent = 0) {
  const spacing = "  ".repeat(indent);
  const nextSpacing = "  ".repeat(indent + 1);

  if (value === null) {
    return "null";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    const entries = value.map(item =>
      `${nextSpacing}${formatValue(item, indent + 1)}`
    );

    return `[\n${entries.join(",\n")}\n${spacing}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value).map(([key, item]) => {
      const formattedKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
        ? key
        : JSON.stringify(key);

      return `${nextSpacing}${formattedKey}: ${formatValue(item, indent + 1)}`;
    });

    if (entries.length === 0) {
      return "{}";
    }

    return `{\n${entries.join(",\n")}\n${spacing}}`;
  }

  throw new Error(`Unsupported value type: ${typeof value}`);
}

function validatePathPart(value, name) {
  if (
    typeof value !== "string" ||
    !/^[A-Za-z0-9_-]+$/.test(value)
  ) {
    throw new Error(`Invalid ${name}: ${value}`);
  }
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/import") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  let body = "";

  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const building = JSON.parse(body);

      if (!building.id) {
        throw new Error("Building is missing an id");
      }

      if (!building.category) {
        throw new Error("Building is missing a category");
      }

      validatePathPart(building.id, "building id");
      validatePathPart(building.category, "building category");

      const categoryDir = path.join(
        BUILDINGS_DIR,
        building.category
      );

      fs.mkdirSync(categoryDir, { recursive: true });

      const filePath = path.join(
        categoryDir,
        `${building.id}.js`
      );

      const preparedBuilding = prepareBuilding(building);

      const source =
        `export default ${formatValue(preparedBuilding)};\n`;

      fs.writeFileSync(filePath, source);

      console.log(
        `Imported ${building.category}/${building.id}`
      );

      res.writeHead(200, {
        "Content-Type": "text/plain"
      });

      res.end("ok");
    } catch (error) {
      console.error("Import failed:", error);

      res.writeHead(400, {
        "Content-Type": "text/plain"
      });

      res.end(String(error));
    }
  });
});

server.listen(PORT, "localhost", () => {
  console.log(
    `Building extraction server listening on http://localhost:${PORT}`
  );

  console.log(
    `Building files will be written to ${BUILDINGS_DIR}`
  );
});