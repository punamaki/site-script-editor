import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import "./index.css";
import SDToggle from "../../../components/sd-toggle";

export default function NodeRemoveNavLink(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the navigation link removal"
  };

  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="Remove navigation link"
      menuClass="sd_site_hierarchy_node_menu_regular"
      infoText="Use the removeNavLink verb to remove a navigation link from the site."
    >
      <div className="sd_site_hierarchy_node_remove_nav_link">
        <div className="sd_row">
          <div className="sd_col_70">
            <div>
              <SDTextField
                {...props}
                label="Display name"
                fieldName="displayName"
              />
            </div>
          </div>
          <div className="sd_col_30">
            <div>
              <SDToggle
                {...props}
                label="Is web relative"
                fieldName="isWebRelative"
              />
            </div>
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
