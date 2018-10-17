import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./node-list-view-deletion.css";

export default function NodeListViewDeletion(props: INodeProps) {
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
    <NodeWrapper actionProps={actionProps} smallTitle="View removal" infoText="Removes a view from a list. This action can also be used to remove a view applied by the site template.">
      <div className="sd_site_hierarchy_node_list_view_deletion">
        <div>
          <SDTextField {...props} label="View name that is removed" fieldName="name" />
        </div>
      </div>
    </NodeWrapper>
  );
}
