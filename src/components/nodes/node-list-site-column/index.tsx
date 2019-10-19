import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";
import SDToggle from "../../../components/sd-toggle";

export function NodeListSiteColumn(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the column"
  };

  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="Site Column"
      infoText="Subaction to add a previously defined site column directly to a list or content type (existing or created through the site script)."
    >
      <div className="sd_site_hierarchy_node_contentTypeSiteColumn">
        <div className="sd_row">
          <div className="sd_col_60">
            <SDTextField
              {...props}
              label="Internal name"
              fieldName="internalName"
              infoText="The internal name of the site column to add."
            />
          </div>
          <div className="sd_col_40">
            <SDToggle
              {...props}
              label="Add to default view"
              fieldName="addToDefaultView"
              infoText="Optional attribute that defaults to false. If true, the newly added field will also be added to the default view."
            />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
