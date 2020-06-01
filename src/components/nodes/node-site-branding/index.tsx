import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../node-wrapper";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";
import SDComboBox from "../../sd-combo-box";
import SDToggle from "../../sd-toggle";

export function NodeSiteBranding(props: INodeProps) {
  var { path, treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove branding properties"
  }; 
  var navigationLayoutOptions = [
    {key:"Cascade",text: "Cascade"},
    {key:"Megamenu",text: "Megamenu"}
  ];
  var headerLayoutOptions = [
    {key:"Standard",text: "Standard"},
    {key:"Compact",text: "Compact"}
  ];
  var headerBackgroundOptions = [
    {key:"None",text: "None"},
    {key:"Neutral",text: "Neutral"},
    {key:"Soft",text: "Soft"},
    {key:"Strong",text: "Strong"},
  ];
  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="Site Branding"
      infoText="Use the setSiteBranding verb to specify the navigation layout, the header layout and header background. Setting the navigation layout only works on the communication site template and for the hub navigation."
    >
      <div className="sd_site_hierarchy_node_siteBranding">
        <div className="sd_row">
          <div className="sd_col_50">
          <SDComboBox
              {...props}
              label="Navigation layout"
              fieldName="navigationLayout"
              options={navigationLayoutOptions}
              allowFreeform={true}
              convertToNumber={false}
              infoText="Specify the navigation layout as Cascade or Megamenu"
            />
          </div>
          <div className="sd_col_50">
          <SDComboBox
              {...props}
              label="Header layout"
              fieldName="headerLayout"
              options={headerLayoutOptions}
              allowFreeform={true}
              convertToNumber={false}
              infoText="Specify the header layout as Standard or Compact"
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
          <SDComboBox
              {...props}
              label="Header background"
              fieldName="headerBackground"
              options={headerBackgroundOptions}
              allowFreeform={true}
              convertToNumber={false}
              infoText="Specify the header background as None, Neutral, Soft or Strong"
            />
          </div>
          <div className="sd_col_50">
          <SDToggle
              {...props}
              label="Show footer"
              fieldName="showFooter"
              infoText="Specify whether site footer should show or not"
            />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
