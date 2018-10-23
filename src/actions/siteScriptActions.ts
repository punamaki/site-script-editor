import {ISiteScriptContainer, INodeTypeProps, IDictionary} from '../types';
import {TreeItem} from 'react-sortable-tree';

export function setSiteScript(siteScriptContainer : ISiteScriptContainer) {
    return {type: 'SET_SITE_SCRIPT', siteScriptContainer};
}
export function setTreeData(treeData : TreeItem[]) {
    return {type: 'SET_TREE_DATA', treeData};
}
export function setNodeTypeProps(nodeType : string, nodeTypeProps:INodeTypeProps) {
    return {type: 'SET_NODE_TYPE_PROPS', nodeType,nodeTypeProps };
}
export function setAllNodeTypeProps(allProps:IDictionary<INodeTypeProps> ) {
    return {type: 'SET_ALL_NODE_TYPE_PROPS', allProps};
}
export function setCoachMarkState(id:string, isVisible:boolean) {
    return {type: 'SET_COACHMARK_STATE', id,isVisible};
}
export function showCoachmarks(showCoachmarks:boolean) {
    return {type: 'SHOW_COACHMARKS', showCoachmarks};
}