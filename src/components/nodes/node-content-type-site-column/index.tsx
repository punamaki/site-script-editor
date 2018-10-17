import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";



export default function NodeContentTypeSiteColumn(props: INodeProps) {
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
    <NodeWrapper actionProps={actionProps} smallTitle="Site Column" infoText="Subaction to add a previously defined site column directly to a list or content type (existing or created through the site script).">
      <div className="sd_site_hierarchy_node_contentTypeSiteColumn">
      <SDTextField {...props} label="Internal name" fieldName="internalName" />
      </div>
    </NodeWrapper>
  );
}
