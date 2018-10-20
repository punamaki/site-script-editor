import * as React from 'react';
import {removeNodeAtPath} from 'react-sortable-tree';
import {getNodeKey} from '../../../helpers';
import { INodeProps } from '../../../types';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import SDCodeField from '../../sd-code-field';
import './node-column-formatter.css'


export function NodeColumnFormatter(props : INodeProps) {
    var {path, treeData, setTreeAndScriptData} = props;

    var actionProps = {
        iconProps: {
            iconName: 'Delete'
        },
        onClick: () => setTreeAndScriptData(removeNodeAtPath({treeData, path, getNodeKey})),
        title: "Remove the column formatter"
    };
    return <NodeWrapper actionProps={actionProps} smallTitle="Column formatter" menuClass="sd_site_hierarchy_node_menu_regular" infoText="Sets column formatting for a field.">
    <div className="sd_site_hierarchy_node_column_formatter">
        <div><SDTextField {...props} label="Field display name" fieldName="fieldDisplayName"/></div>
        <div><SDCodeField {...props} label="Formatter JSON" fieldName="formatterJSON"/></div>
    </div>
</NodeWrapper>;
}