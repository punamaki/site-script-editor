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


export function ensureNavLinksNode(children : TreeItem[], expanded?:boolean) : TreeItem {
    var listsNode = children.find(child => child.type === 'navLinks');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'navLinks',
            expanded: expanded?true:false
        };
        children.push(listsNode);
    } else{
        listsNode.expanded = expanded?true:false
    }
    return listsNode;
}
export function ensureRemoveNavLinksNode(children : TreeItem[], expanded?:boolean) : TreeItem {
    var listsNode = children.find(child => child.type === 'removeNavLinks');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'removeNavLinks',
            expanded: expanded?true:false
        };
        children.push(listsNode);
    }else{
        listsNode.expanded = expanded?true:false
    }
    return listsNode;
}
export function ensureSiteColumnsNode(children : TreeItem[], expanded?:boolean) : TreeItem {
    var listsNode = children.find(child => child.type === 'siteColumns');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'siteColumns',
            expanded: expanded?true:false
        };
        children.push(listsNode);
    } else{
        listsNode.expanded = expanded?true:false
    }
    return listsNode;
}
export function ensureContentTypesNode(children : TreeItem[], expanded?:boolean) : TreeItem {
    var listsNode = children.find(child => child.type === 'contentTypes');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'contentTypes',
            expanded: expanded?true:false
        };
        children.push(listsNode);
    } else{
        listsNode.expanded = expanded?true:false
    }
    return listsNode;
}
export function ensureInstallSolutionsNode(children : TreeItem[], expanded?:boolean) : TreeItem {
    var listsNode = children.find(child => child.type === 'installSolutions');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'installSolutions',
            expanded: expanded?true:false
        };
        children.push(listsNode);
    } else{
        listsNode.expanded = expanded?true:false
    }
    return listsNode;
}
export function ensureAddUsersNode(children : TreeItem[], expanded?:boolean) : TreeItem {
    var listsNode = children.find(child => child.type === 'addUsers');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'addUsers',
            expanded: expanded?true:false
        };
        children.push(listsNode);
    } else {
        listsNode.expanded = expanded?true:false
    }
    return listsNode;
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