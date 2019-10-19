import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";
import SDTextField from "../../../components/sd-text-field";
import SDToggle from "../../../components/sd-toggle";
import SDComboBox from "../../../components/sd-combo-box";

interface INodeWrapperProps extends INodeProps {

}

export  function NodeSiteColumn(props: INodeWrapperProps) {
  var { path, treeData, setTreeAndScriptData } = props;

  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the field"
  };
  var options = [
    {
      key: "Text",
      text: "Text"
    },
    {
      key: "Number",
      text: "Number"
    },
    {
      key: "Note",
      text: "Note"
    },
    {
      key: "User",
      text: "User"
    },
    {
      key: "Boolean",
      text: "Boolean"
    },
    {
      key: "DateTime",
      text: "Date/Time"
    }
  ];
  return (
    <NodeWrapper actionProps={actionProps} smallTitle="Site Column" infoText="Use the createSiteColumn verb to define a new site column that can then be associated to a list directly or by using the addContentType action.">
      <div className="sd_site_hierarchy_node_type_siteColumn">
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Display name"
              fieldName="displayName"
              infoText="The display name of the site column."
            />
          </div>
          <div className="sd_col_50">
            <SDComboBox
              {...props}
              label="Field type"
              fieldName="fieldType"
              options={options}
              infoText="The type of column to add. Supported values - like SPField - are Text, Note, Number, Boolean, User, and DateTime. For other data types, refer to the addSPFieldXml script action."
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Internal name"
              fieldName="internalName"
              infoText="The internal name of the site column."
            />
          </div>
          <div className="sd_col_25">
            <SDToggle {...props} label="Is required" fieldName="isRequired" infoText="True if this field is required to contain information; otherwise, false." />
          </div>
          <div className="sd_col_25">
          <SDToggle {...props} label="Enforce unique" fieldName="enforceUnique" infoText="An optional attribute that defaults to false. If true, all values for this field must be unique."/>
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Group"
              fieldName="group"
              infoText="An optional attribute to designate the column group."
            />
          </div>
          <div className="sd_col_50">
          <SDTextField
              {...props}
              label="Id"
              fieldName="id"
              infoText="An optional attribute. If provided, specifies the id of the field. It needs to be a unique, randomly generated GUID. Providing a value for this is strongly recommended to ensure the field is not added multiple times if the script is re-run."
            />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
