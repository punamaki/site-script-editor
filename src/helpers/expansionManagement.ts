import { TreeItem } from "react-sortable-tree";

export function collapseTree(treeItem: TreeItem[]): TreeItem[] {
  if (treeItem[0].children) {
    treeItem[0].children = treeItem[0].children!.map(child => ({
      ...child,
      expanded: false
    }));
  }
  return treeItem;
}

export function setupExpansion(oldRoot: TreeItem, newRoot: TreeItem): TreeItem {
  if (oldRoot.children) {
    oldRoot.children!.forEach(oldChild => {
      const newElemFound = newRoot.children!.find(
        newChild => newChild.type === oldChild.type
      );
      if (newElemFound) {
        newElemFound.expanded = oldChild.expanded;
      }
    });
  }
  return newRoot;
}
