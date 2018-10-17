import * as React from 'react';
import { addListToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./node-lists.css"
import NodeContainer from '../../../components/nodes/node-container';

export default function NodeLists(props : INodeProps) {
    var {treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addListToTree(treeData,setTreeAndScriptData),
        title: "Add a new list"
    };
    var containerProps = {...props, actionProps, title:"Lists"}
    return <NodeContainer {...containerProps}/>
}