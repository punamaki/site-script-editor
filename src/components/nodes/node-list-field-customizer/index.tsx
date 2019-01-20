import * as React from 'react';
import { removeNodeAtPath } from 'react-sortable-tree';
import { getNodeKey } from '../../../helpers';
import { INodeProps } from '../../../types';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import './node-list-field-customizer.css';

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
            <div><SDTextField {...props} label="Internal name" fieldName="internalName" /></div>
            <div><SDTextField {...props} label="Client side component id" fieldName="clientSideComponentId" /></div>
            <div><SDTextField {...props} label="Client side component properties" fieldName="clientSideComponentProperties" /></div>
        </div>
    </NodeWrapper>;
}
