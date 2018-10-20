import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import "./index.css";

export function NodeAddUser(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the content type"
  };

  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="User"
      menuClass="sd_site_hierarchy_node_menu_regular"
      infoText="Use the addPrincipalToGroup action to manage addition of users and groups to select default SharePoint groups. This action can be used for licensed users, security groups, and Office 365 Groups. This action currently only supports the Visitors (permission level: read), Members (permission level: contribute or edit, depending on the site template), and Owners (permission level: full control) groups."
    >
      <div className="sd_site_hierarchy_node_nav_link">
        <div>
          <SDTextField
            {...props}
            label="User principal name"
            fieldName="principal"
          />
        </div>
        <div>
          <SDTextField {...props} label="Group" fieldName="group" />
        </div>
      </div>
    </NodeWrapper>
  );
}
