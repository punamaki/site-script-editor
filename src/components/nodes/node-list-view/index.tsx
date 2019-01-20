import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./node-list-view.css";
import SDNumberField from "../../../components/sd-number-field";
import SDToggle from "../../../components/sd-toggle";
import SDCamlField from "../../../components/sd-caml-field";

export function NodeListView(props: INodeProps) {
  const { path, treeData, setTreeAndScriptData } = props;
  const actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the list"
  };

  return (
    <NodeWrapper actionProps={actionProps} smallTitle="View" infoText="Defines and adds a view to the list. Use this action to specify the desired columns and how you want the list items displayed (using a CAML query). Action properties allow you to specify row limits, and whether the view is paged and recurses over items in nested folders. You can also designate your constructed view as the default.">
      <div className="sd_site_hierarchy_node_list_view">
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField {...props} label="View name" fieldName="name" />
          </div>
          <div className="sd_col_50">
            <SDNumberField {...props} label="Row limit" fieldName="rowLimit" />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDToggle {...props} label="Is paged" fieldName="isPaged" />
          </div>
          <div className="sd_col_50">
            <SDToggle {...props} label="Make default" fieldName="makeDefault" />
          </div>
        </div>
        <div>
          <SDCamlField {...props} label="Query" fieldName="query" />
        </div>
      </div>
    </NodeWrapper>
  );
}
