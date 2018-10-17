import * as React from 'react';
import { addRemoveNavLinkToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css"
import NodeContainer from '../../../components/nodes/node-container';

export default function NodeRemoveNavLinks(props : INodeProps) {
    var {treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addRemoveNavLinkToTree(treeData,setTreeAndScriptData),
        title: "Add a new navigation link removal"
    };
    var containerProps = {...props, actionProps, title:"Nav link removals"}
    return <NodeContainer {...containerProps}/>
}