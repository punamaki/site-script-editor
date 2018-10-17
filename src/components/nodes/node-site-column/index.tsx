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

export default function NodeSiteColumn(props: INodeWrapperProps) {
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
            />
          </div>
          <div className="sd_col_50">
            <SDComboBox
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
            <SDToggle {...props} label="Is required" fieldName="isRequired" />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Group"
              fieldName="group"
            />
          </div>
          <div className="sd_col_50">
            <SDToggle {...props} label="Enforce unique" fieldName="enforceUnique" />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
