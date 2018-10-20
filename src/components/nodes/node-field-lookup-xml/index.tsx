import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./node-field-xml.css";
import SDCamlField from "../../../components/sd-caml-field";
import SDToggle from "../../../components/sd-toggle";

export  function NodeFieldLookupXML(props: INodeProps) {
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
    <NodeWrapper actionProps={actionProps} smallTitle="Lookup XML Field" infoText="Enables defining lookup fields and their dependent lists element using Collaborative Application Markup Language (CAML).">
      <div className="sd_site_hierarchy_node_field_lookup_xml">
      <div className="sd_row">
          <SDToggle
            {...props}
            label="Add to default view"
            fieldName="addToDefaultView"
          />
        </div>
        <div className="sd_row">
          <SDCamlField {...props} label="XML" fieldName="schemaXml" />
        </div>
      </div>
    </NodeWrapper>
  );
}
