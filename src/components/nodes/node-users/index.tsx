import * as React from 'react';
import { addUserToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css";
import NodeContainer from '../../../components/nodes/node-container';

export function NodeAddUsers(props: INodeProps) {
    const { treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addUserToTree(treeData, setTreeAndScriptData),
        title: "Add a new list"
    };
    const containerProps = { ...props, actionProps, title: "Users" };
    return <NodeContainer {...containerProps} />;
}