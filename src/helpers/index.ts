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
 
export function ensureListsNode(fullTree : TreeItem[]) {
    var newTree = [...fullTree];
    if (!newTree[0]) {
        newTree.push({title: "", children: []});
    }
    if (!newTree[0].children) {
        newTree[0] = {
            ...newTree[0],
            children: []
        };
    }
    var listsNode = newTree[0].children !.find(child => child.type === 'lists');

    if (!listsNode) {
        listsNode = {
            title: 'Lists',
            children: [],
            type: 'lists',
            expanded: true

        };
        newTree[0].children !.push(listsNode);
    } else {
        listsNode.expanded=true;
    }
    return newTree;
}

export function ensureNavLinksNode(children : TreeItem[]) : TreeItem {
    var listsNode = children.find(child => child.type === 'navLinks');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'navLinks',
            expanded: true
        };
        children.push(listsNode);
    }
    return listsNode;
}
export function ensureRemoveNavLinksNode(children : TreeItem[]) : TreeItem {
    var listsNode = children.find(child => child.type === 'removeNavLinks');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'removeNavLinks',
            expanded: true
        };
        children.push(listsNode);
    }
    return listsNode;
}
export function ensureSiteColumnsNode(children : TreeItem[]) : TreeItem {
    var listsNode = children.find(child => child.type === 'siteColumns');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'siteColumns',
            expanded: true
        };
        children.push(listsNode);
    }
    return listsNode;
}
export function ensureContentTypesNode(children : TreeItem[]) : TreeItem {
    var listsNode = children.find(child => child.type === 'contentTypes');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'contentTypes',
            expanded: true
        };
        children.push(listsNode);
    }
    return listsNode;
}
export function ensureInstallSolutionsNode(children : TreeItem[]) : TreeItem {
    var listsNode = children.find(child => child.type === 'installSolutions');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'installSolutions',
            expanded: true
        };
        children.push(listsNode);
    }
    return listsNode;
}
export function ensureAddUsersNode(children : TreeItem[]) : TreeItem {
    var listsNode = children.find(child => child.type === 'addUsers');
    if (!listsNode) {
        listsNode = {
            children: [],
            type: 'addUsers',
            expanded: true
        };
        children.push(listsNode);
    }
    return listsNode;
}
var getNodeKey = ({treeIndex} : any) => treeIndex;
export {getNodeKey};
export * from './treeActions';