import registry from "../../registry.js";
import buildingCategories from "../../buildingCategories.js";
import { startPlacement } from "../canvas/placement.js";

const buildingList = document.getElementById("building-list");

export function populateBuildingPanel() {
  // Clear any existing elements before repopulating
  buildingList.replaceChildren();

  // Iterate over each category defined in buildingCategories.js
  for (const [category, namesString] of Object.entries(buildingCategories)) {
    // buildingCategories uses space-separated strings, so we split them into an array
    const names = namesString.split(/\s+/);

    // Create the native HTML collapsible dropdown container
    const detailsContainer = document.createElement("details");
    detailsContainer.className = "category-dropdown";

    // Create the clickable header for the dropdown
    const summary = document.createElement("summary");
    summary.className = "category-summary";
    summary.textContent = category;
    detailsContainer.appendChild(summary);

    // Create a container for the buttons inside this specific dropdown
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "category-buttons";

    for (const type of names) {
      const definition = registry[type];

      // Skip if the building isn't loaded in the registry for some reason
      if (!definition) continue;

      const button = document.createElement("button");
      button.className = "building-button";
      button.textContent = type;

      button.addEventListener("click", () => {
        startPlacement(type, definition);
      });

      buttonContainer.appendChild(button);
    }

    // Only append the category to the sidebar if it actually contains loaded buildings
    if (buttonContainer.hasChildNodes()) {
      detailsContainer.appendChild(buttonContainer);
      buildingList.appendChild(detailsContainer);
    }
  }
}
