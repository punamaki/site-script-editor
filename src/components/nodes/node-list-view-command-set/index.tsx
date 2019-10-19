import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import "./node-list-view-command-set.css";
import SDComboBox from "../../../components/sd-combo-box";
import { IComboBoxOption } from "office-ui-fabric-react/lib/ComboBox";
import SDCodeField from "../../../components/sd-code-field";

export function NodeListViewCommandSet(props: INodeProps) {
  const { path, treeData, setTreeAndScriptData } = props;
  const actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the list view command set"
  };
  const options: IComboBoxOption[] = [
    {
      key: "ContextMenu",
      text: "Context menu"
    },
    {
      key: "CommandBar",
      text: "Command bar"
    }
  ];

  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="List view command set"
      menuClass="sd_site_hierarchy_node_menu_list_view_command_set"
      infoText="Associates a ListViewCommandSet to the list"
    >
      <div className="sd_site_hierarchy_node_list_view_command_set">
        <div>
          <SDTextField
            {...props}
            label="Title"
            fieldName="title"
            infoText="The title of the extension."
          />
        </div>
        <div>
          <SDComboBox
            {...props}
            label="Location"
            fieldName="location"
            options={options}
            infoText="A required parameter to specify where the command is displayed. Options are: ContextMenu or CommandBar."
          />
        </div>
        <div>
          <SDTextField
            {...props}
            label="Client side component id"
            fieldName="clientSideComponentId"
            infoText="The identifier (GUID) of the extension in the app catalog. This property value can be found in the manifest.json file or in the elements.xml file."
          />
        </div>
        <div>
          <SDCodeField
            {...props}
            label="Client side component properties"
            fieldName="clientSideComponentProperties"
            infoText="An optional parameter, which can be used to provide properties (json) for the field customizer extension instance."
          />
        </div>
      </div>
    </NodeWrapper>
  );
}
