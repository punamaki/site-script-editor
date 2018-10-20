import * as React from "react";
import "./site-hierarchy.css";
import SortableTree, {
  TreeItem,
  ExtendedNodeData,
  PreviousAndNextLocation,
  NodeData
} from "react-sortable-tree";
import {
  ISiteScriptContainer,
  INodeProps,
  TSetNodeTypeProps,
  INodeTypeProps,
  IDictionary
} from "../../types";
import "react-sortable-tree/style.css";
import { autobind } from "@uifabric/utilities";
import * as nodes from "../../components/nodes/";


interface ISiteHierarchyProps {
  setSiteScriptContainer: (siteScriptContainer: ISiteScriptContainer) => void;
  setTreeAndScriptData: (treeData: TreeItem[]) => void;
  treeData: TreeItem[];
  setNodeTypeProps: TSetNodeTypeProps;
  setAllNodeTypeProps: (propsAll: IDictionary<INodeTypeProps>) => void;
  nodeTypesProps: IDictionary<INodeTypeProps>;
  reloadTree: () => void;
}

export class SiteHierarchy extends React.Component<ISiteHierarchyProps, any> {
  constructor(props: ISiteHierarchyProps) {
    super(props);
    props.setAllNodeTypeProps(nodes.nodeProps);
  }

  private setNode(nodeProps: INodeProps) {
   const nodeName = this.convertToElementName(nodeProps.node.type);
    return React.createElement(nodes[nodeName], nodeProps);
    // return <NodeAddUser {...nodeProps}/>
  }
  private convertToElementName(nodeName: string) {
    return "Node" + nodeName.charAt(0).toUpperCase() + nodeName.slice(1);
  }
  @autobind
  private calcRowHeight(data: any) {
    if (
      this.props.nodeTypesProps &&
      this.props.nodeTypesProps[data.node.type]
    ) {
      return this.props.nodeTypesProps[data.node.type].height;
    }
    return 72;
  }
  @autobind
  private canDrag(data: ExtendedNodeData) {
    if (
      this.props.nodeTypesProps &&
      this.props.nodeTypesProps[data.node.type]
    ) {
      return this.props.nodeTypesProps[data.node.type].canDrag;
    }
    return false;
  }
  @autobind
  private canDrop(data: PreviousAndNextLocation & NodeData) {
    if (
      this.props.nodeTypesProps &&
      this.props.nodeTypesProps[data.node.type]
    ) {
      return this.props.nodeTypesProps[data.node.type].canDrop;
    }
    return false;
  }
  // @autobind
  // private setNodeTypeProps(nodeType: string, nodeTypeProps: INodeTypeProps) {
  //   if (!this.props.nodeTypesProps[nodeType]) {
  //     this.props.setNodeTypeProps(nodeType, nodeTypeProps);
  //   }
  // }

  public render() {
    var { treeData, setTreeAndScriptData, reloadTree } = this.props;

    return (
      <div
        style={{
          height: "100%",
          overflowY: "auto"
        }}
      >
        <div className="sd_site_hierarchy_tree">
          <SortableTree
            treeData={treeData}
            onChange={data => {
              setTreeAndScriptData(data);
              reloadTree();
            }}
            rowHeight={this.calcRowHeight}
            generateNodeProps={({ node, path }) => ({
              title: this.setNode({
                node,
                path,
                setTreeAndScriptData,
                treeData
              }),
              className: classType(node)
            })}
            canDrag={this.canDrag}
            canDrop={this.canDrop}
          />
        </div>
      </div>
    );

    function classType(node: TreeItem): string {
      var type = "";
      if (node.type) {
        type = " sd_site_hierarchy_node_type_" + node.type;
      }
      return "sd_site_hierarchy_node_wrapper" + type;
    }
  }
}
