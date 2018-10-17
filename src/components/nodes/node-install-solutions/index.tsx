import * as React from 'react';
import { addInstallSolutionToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css"
import NodeContainer from '../../../components/nodes/node-container';

export default function NodeInstallSolutions(props : INodeProps) {
    var {treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addInstallSolutionToTree(treeData,setTreeAndScriptData),
        title: "Install solutions"
    };
    var containerProps = {...props, actionProps, title:"Install solutions"}
    return <NodeContainer {...containerProps}/>
}