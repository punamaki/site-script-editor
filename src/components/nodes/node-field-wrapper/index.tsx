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
    <NodeWrapper actionProps={actionProps} smallTitle={props.smallTitle} infoText="Adds a new field.">
      <div className="sd_site_hierarchy_node_list_field">
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Field title"
              fieldName="displayName"
            />
          </div>
          <div className="sd_col_50">
            <SDComboBoxFieldType
              {...props}
              label="Field type"
              fieldName="fieldType"
              options={options}
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Internal name"
              fieldName="internalName"
            />
          </div>
          <div className="sd_col_50">
            <SDToggle
              {...props}
              label="Enforce unique"
              fieldName="enforceUnique"
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDToggle
              {...props}
              label="Add to default view"
              fieldName="addToDefaultView"
            />
          </div>
          <div className="sd_col_50">
            <SDToggle {...props} label="Is required" fieldName="isRequired" />
          </div>
        </div>
        {props.children}
      </div>
    </NodeWrapper>
  );
}
