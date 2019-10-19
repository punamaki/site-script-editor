import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";
import SDComboBox from "../../sd-combo-box";

export function NodeList(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the list"
  };
  var templateTypeOptions = [
    {key:"100",text: "Generic List (100)"},
    {key:"101",text: "Document Library (101)"},
    {key:"102",text: "Survey (102)"},
    {key:"103",text: "Links (103)"},
    {key:"104",text: "Announcements (104)"},
    {key:"105",text: "Contacts (105)"},
    {key:"106",text: "Events (106)"},
    {key:"107",text: "Tasks (107)"},
    {key:"108",text: "Discussion Board (108)"},
    {key:"109",text: "PictureLibrary (109)"},
    {key:"119",text: "Site Pages (119)"},
    {key:"1100",text: "Issue Tracking (1100)"}
  ];
  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="List"
      infoText="Use the createSPList verb to create a new SharePoint list."
    >
      <div className="sd_site_hierarchy_node_list">
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField {...props} label="List name" fieldName="listName" infoText="The name of the list" />
          </div>
          <div className="sd_col_50">
            <SDTextField {...props} label="List title" fieldName="listTitle" infoText="Renames the list. To create a new list with a specific name, instead of using setTitle use the listName parameter in the CreateSPList action."/>
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
          <SDComboBox
              {...props}
              label="Template type"
              fieldName="templateType"
              options={templateTypeOptions}
              allowFreeform={true}
              convertToNumber={true}
              infoText="Which template to apply to the list. Typically you would use value 100."
            />
          </div>
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Description"
              fieldName="listDescription"
              infoText={"Sets the description of the list."}
            />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
