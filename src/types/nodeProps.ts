import { TreeItem } from "react-sortable-tree";
import { INodeTypeProps } from "types";

export interface INodeProps {
    node : TreeItem;
    path : string[] | number[];
    setTreeAndScriptData : (treeData : TreeItem[]) => void;
    treeData : TreeItem[];
    children?: React.ReactNode;
}
export type TSetNodeTypeProps = (nodeType:string, nodeTypeProps:INodeTypeProps)=>void;