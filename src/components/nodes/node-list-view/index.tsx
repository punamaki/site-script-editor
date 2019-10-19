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
import SDCodeField from "../../../components/sd-code-field";
import SDComboBox from "../../../components/sd-combo-box";

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
  var scopeOptions = [
    {
      key: "Default",
      text: "Default"
    },
    {
      key: "Recursive",
      text: "Recursive"
    },
    {
      key: "RecursiveAll",
      text: "RecursiveAll"
    },
    {
      key: "FilesOnly",
      text: "FilesOnly"
    }
  ];
  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="View"
      infoText="Defines and adds a view to the list. Use this action to specify the desired columns and how you want the list items displayed (using a CAML query). Action properties allow you to specify row limits, and whether the view is paged and recurses over items in nested folders. You can also designate your constructed view as the default."
    >
      <div className="sd_site_hierarchy_node_list_view">
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="View name"
              fieldName="name"
              infoText="The name of the view."
            />
          </div>
          <div className="sd_col_50">
            <SDComboBox
              {...props}
              label="Scope"
              fieldName="scope"
              options={scopeOptions}
              allowFreeform={false}
              infoText="An optional setting to specify the scope of the view. Default: Show only the files and subfolders of a specific folder. Recursive: Show all files of all folders. RecursiveAll: Show all files and all subfolders of all folders. FilesOnly Show: only the files of a specific folder."
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_33">
            <SDNumberField {...props} label="Row limit" fieldName="rowLimit" infoText="The row limit of the view."/>
          </div>
          <div className="sd_col_33">
            <SDToggle {...props} label="Is paged" fieldName="isPaged" infoText="Specifies whether the view is paged."/>
          </div>
          <div className="sd_col_33">
            <SDToggle {...props} label="Make default" fieldName="makeDefault" infoText="If true, the view will be made the default for the list; otherwise, false."/>
          </div>
        </div>
        <div>
          <SDCodeField
            {...props}
            label="JSON formatting"
            fieldName="formatterJSON"
            infoText="An optional settings to specify the JSON formatting for the view"
          />
        </div>
        <div>
          <SDCamlField {...props} label="Query" fieldName="query" infoText="A CAML query string that contains the where clause for the view's query."/>
        </div>
      </div>
    </NodeWrapper>
  );
}
