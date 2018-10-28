import {TreeItem, getNodeAtPath, GetNodeKeyFunction} from "react-sortable-tree";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
export * from "./expansionManagement";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as React from "react";
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
export function renderLabel(fieldProps: ITextFieldProps|undefined, infoText:string | undefined) {
    const info = infoText ? (
        <TooltipHost content={infoText} calloutProps={{ gapSpace: 0 }}>
          <Icon iconName="Info" className="sd_site_hierarchy_node_info_icon" />
        </TooltipHost>
      ) : (
        ""
      );
    return (
      <label className="ms-Label root-113">

        {fieldProps && fieldProps.label}{info} 
      </label>
    );
  }
var getNodeKey = ({treeIndex} : any) => treeIndex;
export {getNodeKey};
export * from './treeActions';