import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import "./node-nav-link.css";
import SDToggle from "../../../components/sd-toggle";
import SDComboBox from "../../../components/sd-combo-box";

export function NodeNavLink(props: INodeProps) {
  const { path, treeData, setTreeAndScriptData } = props;
  const actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the navigation link"
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
      smallTitle="Navigation link"
      menuClass="sd_site_hierarchy_node_menu_regular"
      infoText="Use the addNavLink verb to add a new navigation link to the site."
    >
      <div className="sd_site_hierarchy_node_nav_link">
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Display name"
              fieldName="displayName"
              infoText="The display name of the link."
            />
          </div>
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Url"
              fieldName="url"
              infoText="The url of the link to add."
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDToggle
              {...props}
              label="Is web relative"
              fieldName="isWebRelative"
              infoText="true if the link is web relative; otherwise, false. The default is false."
            />
          </div>
          <div className="sd_col_50">
            {" "}
            <SDComboBox
              {...props}
              label="Target component"
              fieldName="navComponent"
              options={options}
              infoText="The component where to add the link, QuickLaunch, Hub or Footer. The default is QuickLaunch."
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
          <SDTextField
              {...props}
              label="Parent display name"
              fieldName="parentDisplayName"
              infoText="An optional parameter. If provided, it makes this navigation link a child (sub link) of the navigation link with this displayName. If both this and parentUrl are provided, it searches for a link that matches both to be the parent."
            />
          </div>
          <div className="sd_col_50">
            {" "}
            <SDTextField
              {...props}
              label="Parent url"
              fieldName="parentUrl"
              infoText="An optional parameter. If provided, it makes this navigation link a child (sub link) of the navigation link with this url. If both this and parentDisplayName are provided, it searches for a link that matches both to be the parent."
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDToggle
              {...props}
              label="Is parent web relative"
              fieldName="isParentUrlWebRelative"
              infoText="An optional parameter. true if the link is web relative; otherwise, false. The default is false."
            />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
