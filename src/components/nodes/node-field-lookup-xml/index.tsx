import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./node-field-xml.css";
import SDCamlField from "../../../components/sd-caml-field";
import SDToggle from "../../../components/sd-toggle";
import SDTextField from "../../../components/sd-text-field";

export function NodeFieldLookupXML(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the field"
  };

  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="Lookup XML Field"
      infoText="Enables defining lookup fields and their dependent lists element using Collaborative Application Markup Language (CAML)."
    >
      <div className="sd_site_hierarchy_node_field_lookup_xml">
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Target list name"
              fieldName="targetListName"
              infoText="he name that identifies the list this lookup field is referencing. Provide either this or targetListUrl."
            />
          </div>
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Target list url"
              fieldName="targetListUrl"
              infoText="A web-relative URL that identifies the list this lookup field is referencing. Provide either this or targetListName."
            />
          </div>
        </div>
        <div className="sd_row">
          <SDToggle
            {...props}
            label="Add to default view"
            fieldName="addToDefaultView"
            infoText="True if the field will be added to the default view; otherwise, false."
          />
        </div>
        <div className="sd_row">
          <SDCamlField
            {...props}
            label="XML"
            fieldName="schemaXml"
            infoText="The CAML block to define the field."
          />
        </div>
      </div>
    </NodeWrapper>
  );
}
