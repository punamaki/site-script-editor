import * as React from 'react';
import { addNavLinkToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./node-nav-links.css";
import NodeContainer from '../../../components/nodes/node-container';

export function NodeNavLinks(props: INodeProps) {
    const { treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addNavLinkToTree(treeData, setTreeAndScriptData),
        title: "Add a new navigation link"
    };

    const containerProps = { ...props, actionProps, title: "Nav links" };
    return <NodeContainer {...containerProps} />;
}