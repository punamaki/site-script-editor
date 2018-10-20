import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";
import SDCamlField from "../../../components/sd-caml-field";
import SDToggle from "../../../components/sd-toggle";

interface INodeWrapperProps extends INodeProps {}

export  function NodeSiteColumnXML(props: INodeWrapperProps) {
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
      smallTitle="Site Column XML"
      infoText="Use the createSiteColumnXml verb to define a new site column for those complex data types not supported by createSiteColumn. These columns can then be associated to a list directly or by using the addContentType action."
    >
      <div className="sd_site_hierarchy_node_type_siteColumnXML">
        <div className="sd_row">
          <SDCamlField {...props} label="XML" fieldName="schemaXml" />
        </div>
        <div className="sd_row">
          <SDToggle {...props} label="Push changes" fieldName="pushChanges" />
        </div>
      </div>
    </NodeWrapper>
  );
}
