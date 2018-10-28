import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";
import SDTextField from "../../../components/sd-text-field";
import SDComboBox from "../../../components/sd-combo-box";

interface INodeWrapperProps extends INodeProps {}

export function NodeAssociateExtension(props: INodeWrapperProps) {
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
      key: "Web",
      text: "Web"
    },
    {
      key: "Site",
      text: "Site"
    }
  ];
  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="Associate extension"
      infoText="Use the associateExtension action to register a deployed SharePoint Framework extension from the tenant app catalog."
    >
      <div className="sd_site_hierarchy_node_type_siteColumn">
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Title"
              fieldName="title"
              infoText="The title of the extension in the app catalog."
            />
          </div>
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Location"
              fieldName="location"
              infoText="Used to specify the extension type. If it is used to create commands, then where the command would be displayed; otherwise this should be set to ClientSideExtension.ApplicationCustomizer."
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Client side component id"
              fieldName="clientSideComponentId"
              infoText="The identifier (GUID) of the extension in the app catalog. This property value can be found in the manifest.json file or in the elements.xml file."
            />
          </div>
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Client side component props"
              fieldName="clientSideComponentProperties"
              infoText="An optional parameter, which can be used to provide properties for the extension instance."
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Registration id"
              fieldName="registrationId"
              infoText="An optional parameter, which indicates the type of the list the extension is associated to (if it is a list extension)."
            />
          </div>
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Registration type"
              fieldName="registrationType"
              infoText="An optional parameter, which should be specified if the extension is associated with a list."
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDComboBox
              {...props}
              label="Scope"
              fieldName="scope"
              options={options}
              allowFreeform={false}
            />
          </div>
          <div className="sd_col_50" />
        </div>
      </div>
    </NodeWrapper>
  );
}
