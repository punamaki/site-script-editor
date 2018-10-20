import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";



export  function NodeInstallSolution(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Install solution"
  };

  return (
    <NodeWrapper actionProps={actionProps} smallTitle="Install an add-in or solution" infoText="Use the installSolution action to install a deployed add-in or SharePoint Framework solution from the tenant app catalog.">
      <div className="sd_site_hierarchy_node_InstallSolution">
      <SDTextField {...props} label="Id" fieldName="id" />
      </div>
    </NodeWrapper>
  );
}
