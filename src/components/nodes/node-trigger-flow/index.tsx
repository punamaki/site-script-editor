import * as React from 'react';
import {removeNodeAtPath} from 'react-sortable-tree';
import {getNodeKey} from '../../../helpers';
import { INodeProps } from '../../../types';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import SDCodeField from '../../sd-code-field';
import './node-column-formatter.css'


export  function NodeTriggerFlow(props : INodeProps) {
    var {path, treeData, setTreeAndScriptData} = props;

    var actionProps = {
        iconProps: {
            iconName: 'Delete'
        },
        onClick: () => setTreeAndScriptData(removeNodeAtPath({treeData, path, getNodeKey})),
        title: "Remove the flow trigger"
    };
    return <NodeWrapper actionProps={actionProps} smallTitle="Flow trigger" menuClass="sd_site_hierarchy_node_menu_regular">
    <div className="sd_site_hierarchy_node_flow_trigger">
        <div><SDTextField {...props} label="Flow name" fieldName="name"/></div>
        <div><SDTextField {...props} label="Flow url" fieldName="url"/></div>
        <div><SDCodeField {...props} label="Parameters" fieldName="parameters"/></div>
    </div>
</NodeWrapper>;
}