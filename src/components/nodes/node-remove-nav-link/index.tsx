import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import "./index.css";
import SDToggle from "../../../components/sd-toggle";
import SDComboBox from "../../../components/sd-combo-box";

export function NodeRemoveNavLink(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the navigation link removal"
  };
  var options = [
    {
      key: "QuickLaunch",
      text: "QuickLaunch"
    },
    {
      key: "Hub",
      text: "Hub"
    },
    {
      key: "Footer",
      text: "Footer"
    }
  ];
  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="Remove navigation link"
      menuClass="sd_site_hierarchy_node_menu_regular"
      infoText="Use the removeNavLink verb to remove a navigation link from the site."
    >
      <div className="sd_site_hierarchy_node_remove_nav_link">
        <div className="sd_row">
          <div className="sd_col_50">
            <div>
              <SDTextField
                {...props}
                label="Display name"
                fieldName="displayName"
                infoText="The display name of the link."
              />
            </div>
          </div>
          <div className="sd_col_50">
            <div>
              <SDTextField
                {...props}
                label="Url"
                fieldName="url"
                infoText="The url of the link to remove."
              />
            </div>
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <div>
            <SDComboBox
              {...props}
              label="Target component"
              fieldName="navComponent"
              options={options}
              infoText="The component where to add the link, QuickLaunch, Hub or Footer. The default is QuickLaunch."
            />
            </div>
          </div>
          <div className="sd_col_50">
            <div>
              <SDToggle
                {...props}
                label="Is web relative"
                fieldName="isWebRelative"
                infoText="True if the link is web relative; otherwise, false."
              />
            </div>
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
