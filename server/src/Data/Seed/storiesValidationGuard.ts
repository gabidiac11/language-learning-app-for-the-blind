import { log } from "../../logger";
import { BuildingBlock, Story } from "../ctx.story.types";

type ItemDependence = {
  id: number;
  dependentOnIds?: number[];
  isStarter?: boolean;
};

/**
 * make sure the dependencies between stories are forming a conex graph where every node is accessible
 * @param stories
 */
function quardStoriesDependencyTree(stories: Story[]) {
  log(`Checking if all stories are accessible.`);
  const storiesAdapted = stories.map(
    (story) =>
      ({
        id: story.id,
        dependentOnIds: story.dependentOnIds,
        isStarter: story.isStarter,
      } as ItemDependence)
  );
  guardIfAllItemsAccesible(storiesAdapted);
}

/**
 * make sure the dependency between blocks forms a conex graph where every node is accessible
 * @param stories
 */
function quardStoryBuildingBlocksDependencyTree(stories: Story[]) {
  stories.forEach((story) => {
    log(`Checking if blocks accessible for story ${story.name}`);
    const blocksAdapted = story.buildingBlocks.map(
      (item) =>
        ({
          id: item.id,
          dependentOnIds: item.dependentOnIds,
          isStarter: item.isStarter,
        } as ItemDependence)
    );
    guardIfAllItemsAccesible(blocksAdapted);
  });
}

/**
 * all items (blocks or stories) should be linked to each other
 * using BFS algorithm we're doing a search from starter nodes - which are the items unlocked from the begining
 * @param itemsTargeted
 */
function guardIfAllItemsAccesible(itemsTargeted: ItemDependence[]) {
  const queue = itemsTargeted.filter((item) => !!item.isStarter);
  const visited = queue.map((i) => i.id);

  // create parent vector and assign root blooks (the one unblocked from the start)
  const accessible: {
    parent: "NONE" | "ROOT" | ItemDependence;
    childBp: ItemDependence;
  }[] = itemsTargeted.map((item) => ({ parent: "NONE", childBp: item }));
  queue.forEach((item) => {
    const accessItem = accessible.find((i) => i.childBp.id === item.id);
    if (accessItem) accessItem.parent = "ROOT";
  });

  let currentItem = queue.shift();
  while (currentItem) {
    const dependentIds = currentItem.dependentOnIds;
    if (!dependentIds) {
      currentItem = queue.shift();
      continue;
    }

    const dependentItems: ItemDependence[] = [];
    dependentIds.forEach((dependentId) => {
      const found = itemsTargeted.find((bp) => bp.id === dependentId);
      if (found) {
        dependentItems.push(found);
      }
    });

    dependentItems.forEach((dependentItem) => {
      if (!visited.some((id) => dependentItem.id === id)) {
        if (!currentItem)
          throw Error("Tagert item should not be null or undefined");

        visited.push(dependentItem.id);
        queue.push(dependentItem);

        // update parent
        const accessItem = accessible.find(
          (i) => i.childBp.id === dependentItem.id
        );
        if (accessItem) accessItem.parent = currentItem;
      }
    });

    currentItem = queue.shift();
  }
  const unAccessible = accessible.filter(
    (accessItem) => accessItem.parent === "NONE"
  );
  if (unAccessible.length > 0) {
    log(`Not all items are accesible`, {
      unAccessible,
    });
    throw Error(`Not all items are accesible`);
  }

  log(`All items are accesible`);
}

export default function guardStories(stories: Story[]) {
    quardStoriesDependencyTree(stories);
    quardStoryBuildingBlocksDependencyTree(stories);
}