import * as React from 'react';
import { addRemoveNavLinkToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css";
import NodeContainer from '../../../components/nodes/node-container';

export function NodeRemoveNavLinks(props: INodeProps) {
    const { treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addRemoveNavLinkToTree(treeData, setTreeAndScriptData),
        title: "Add a new navigation link removal"
    };

    const containerProps = { ...props, actionProps, title: "Nav link removals" };
    return <NodeContainer {...containerProps} />;
}