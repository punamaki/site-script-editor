import * as React from 'react';
import { addContentTypeToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css";
import NodeContainer from '../../../components/nodes/node-container';

export function NodeContentTypes(props: INodeProps) {
    const { treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addContentTypeToTree(treeData, setTreeAndScriptData),
        title: "Add a new content type"
    };
    const containerProps = { ...props, actionProps, title: "Content types" };
    return <NodeContainer {...containerProps} />;
}