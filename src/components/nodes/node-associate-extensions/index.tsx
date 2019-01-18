import * as React from 'react';
import { INodeProps } from '../../../types';
import NodeContainer from '../../../components/nodes/node-container';
import { addAssociateExtensionToTree } from '../../../helpers';

export function NodeAssociateExtensions(props: INodeProps) {
    const { treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newAssociateExtension',
                    name: 'Associate extension',
                    onClick: () => addAssociateExtensionToTree(treeData, setTreeAndScriptData),
                }
            ]
        }
    };
    const containerProps = { ...props, actionProps, title: "Associated extensions" };
    return <NodeContainer {...containerProps} />;
}