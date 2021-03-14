import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./node-field-wrapper.css";
import SDTextField from "../../../components/sd-text-field";
import SDToggle from "../../../components/sd-toggle";
import SDComboBoxFieldType from "../../../components/sd-combo-box-field-type";

interface INodeWrapperProps extends INodeProps {
  smallTitle: string;
}

export default function NodeFieldWrapper(props: INodeWrapperProps) {
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
    <NodeWrapper
      actionProps={actionProps}
      smallTitle={props.smallTitle}
      infoText="Adds a new field."
    >
      <div className="sd_site_hierarchy_node_list_field">
        <div className="sd_row">
            <SDTextField
              {...props}
              label="Field title"
              fieldName="displayName"
              infoText={"The display name of the field."}
            />
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Internal name"
              fieldName="internalName"
              infoText={
                "An optional attribute. If provided, specifies the internal name of the field. If not provided, the internal name is based on the display name."
              }
            />
          </div>
          <div className="sd_col_50">
          <SDComboBoxFieldType
              {...props}
              label="Field type"
              fieldName="fieldType"
              options={options}
              infoText={
                "The field type can be set to Text, Note, Number, Boolean, User, or DateTime. For other data types, see the addSPFieldXml action."
              }
            />

          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
          <SDTextField
              {...props}
              label="Id"
              fieldName="id"
              infoText={
                "An optional attribute. If provided, specifies the id of the field. It needs to be a unique, randomly generated GUID. Providing a value for this is strongly recommended to ensure the field is not added multiple times if the script is re-run."
              }
            />
          </div>
          <div className="sd_col_50">
            <SDToggle
              {...props}
              label="Is required"
              fieldName="isRequired"
              infoText={"True if this field is required to contain information; otherwise, false."}
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDToggle
              {...props}
              label="Add to default view"
              fieldName="addToDefaultView"
              infoText={"True if the field will be added to the default view; otherwise, false."}
            />
          </div>
          <div className="sd_col_50">
          <SDToggle
              {...props}
              label="Enforce unique"
              fieldName="enforceUnique"
              infoText={"An optional attribute that defaults to false. If true, all values for this field must be unique."}
            />
          </div>
        </div>
        {props.children}
      </div>
    </NodeWrapper>
  );
}
