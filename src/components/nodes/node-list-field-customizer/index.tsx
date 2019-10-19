import * as React from 'react';
import { removeNodeAtPath } from 'react-sortable-tree';
import { getNodeKey } from '../../../helpers';
import { INodeProps } from '../../../types';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import './node-list-field-customizer.css';
import SDCodeField from '../../../components/sd-code-field';

export function NodeListFieldCustomizer(props: INodeProps) {
    const { path, treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Delete'
        },
        onClick: () => setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
        title: "Remove the content type"
    };

    return <NodeWrapper actionProps={actionProps} smallTitle="Field customizer" menuClass="sd_site_hierarchy_node_menu_list_field_customizer" infoText="Registers field extension for a list field.">
        <div className="sd_site_hierarchy_node_list_field_customizer">
            <div><SDTextField {...props} label="Internal name" fieldName="internalName" infoText="The internal name of the field to operate on."/></div>
            <div><SDTextField {...props} label="Client side component id" fieldName="clientSideComponentId" infoText="The identifier (GUID) of the extension in the app catalog. This property value can be found in the manifest.json file or in the elements.xml file."/></div>
            <div><SDCodeField {...props} label="Client side component properties" fieldName="clientSideComponentProperties" infoText="An optional parameter, which can be used to provide properties (json) for the field customizer extension instance."/></div>
        </div>
    </NodeWrapper>;
}
