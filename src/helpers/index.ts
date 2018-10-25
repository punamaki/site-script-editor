import {TreeItem, getNodeAtPath, GetNodeKeyFunction} from "react-sortable-tree";
export * from "./expansionManagement";

export function getChildrenAmount(treeData:TreeItem[], path:string[] | number[], getNodeKey:GetNodeKeyFunction ):number {
    const partialTree =  getNodeAtPath({ treeData, path, getNodeKey });
    if(partialTree && partialTree.node && partialTree.node.children) {
     return partialTree.node.children.length
    } else {
        return 0
    }
 }

export function ensureChildNode(type:string, children : TreeItem[], expanded?:boolean) : TreeItem {
    var listsNode = children.find(child => child.type === type);
    if (!listsNode) {
        listsNode = {
            children: [],
            type,
            expanded: expanded?true:false
        };
        children.push(listsNode);
    } else {
        listsNode.expanded = expanded?true:false
    }
    return listsNode;
}
var getNodeKey = ({treeIndex} : any) => treeIndex;
export {getNodeKey};
export * from './treeActions';