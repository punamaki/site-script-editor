import * as React from 'react';
import { INodeProps } from '../../../types';
import './node-list-view-command-sets.css';
import { addListViewCommandSet } from '../../../helpers';
import NodeContainer from '../../../components/nodes/node-container';

export function NodeListViewCommandSets(props: INodeProps) {
    const { path, treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newListViewCommandSet',
                    name: 'Add a list view command set',
                    onClick: () => addListViewCommandSet(path, treeData, setTreeAndScriptData),
                }
            ]
        },

    };
    const containerProps = { ...props, actionProps, title: "View command sets" };
    return <NodeContainer {...containerProps} />;
} 
