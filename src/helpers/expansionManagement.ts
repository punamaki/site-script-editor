import { TreeItem } from "react-sortable-tree";

export function collapseTree(treeItem:TreeItem[] ):TreeItem[] {
    if(treeItem[0].children) {
        treeItem[0].children = treeItem[0].children!.map(child=>({...child, expanded:false}))
    }
    return treeItem;
}