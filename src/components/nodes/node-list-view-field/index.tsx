import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./node-list-view-field.css";



export  function NodeListViewField(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the list"
  };

  return (
    <NodeWrapper actionProps={actionProps} smallTitle="View field" infoText="Column that is shown in the view">
      <div className="sd_site_hierarchy_node_list_view_field">
      <SDTextField {...props} label="Field" fieldName="viewField" />
      </div>
    </NodeWrapper>
  );
}
