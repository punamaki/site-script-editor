import * as React from 'react';
import { addUserToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css"
import NodeContainer from '../../../components/nodes/node-container';

export default function NodeAddUsers(props : INodeProps) {
    var {treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addUserToTree(treeData,setTreeAndScriptData),
        title: "Add a new list"
    };
    var containerProps = {...props, actionProps, title:"Users"}
    return <NodeContainer {...containerProps}/>
}