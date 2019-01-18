import * as React from 'react';
import { addInstallSolutionToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css";
import NodeContainer from '../../../components/nodes/node-container';

export function NodeInstallSolutions(props: INodeProps) {
    const { treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addInstallSolutionToTree(treeData, setTreeAndScriptData),
        title: "Install solutions"
    };
    const containerProps = { ...props, actionProps, title: "Install solutions" };
    return <NodeContainer {...containerProps} />;
}