import * as React from 'react';
import {removeNodeAtPath} from 'react-sortable-tree';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import {getNodeKey} from '../../../helpers';
import {INodeProps} from '../../../types';
import './node-list.css'

export  function NodeList(props : INodeProps) {
    var {path, treeData, setTreeAndScriptData} = props;
    var actionProps = {
        iconProps: {
            iconName: 'Delete'
        },
        onClick: () => setTreeAndScriptData(removeNodeAtPath({treeData, path, getNodeKey})),
        title: "Remove the list"
    };
    return <NodeWrapper actionProps={actionProps} smallTitle="List" infoText="Use the createSPList verb to create a new SharePoint list.">
        <div className="sd_site_hierarchy_node_list">
            <div><SDTextField {...props} label="List name" fieldName="listName"/></div>
            <div><SDTextField {...props} label="List title" fieldName="listTitle"/></div>
            <div><SDTextField {...props} label="Description" fieldName="listDescription"/></div>
        </div>
    </NodeWrapper>;
}
