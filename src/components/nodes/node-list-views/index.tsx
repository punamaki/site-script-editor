import * as React from 'react';
import {INodeProps} from '../../../types';
import './node-list-views.css'
import { addViewToList, addViewDeletionToList } from '../../../helpers';
import NodeContainer from '../../../components/nodes/node-container';

export default function NodeListViews(props : INodeProps) {
    var {path,treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newView',
                    name: 'Add a view',
                    onClick: () => addViewToList(path,treeData,setTreeAndScriptData),
                },
                {
                    key: 'newViewDeletion',
                    name: 'Add a default view removal',
                    onClick: () => addViewDeletionToList(path,treeData,setTreeAndScriptData),
                }
            ]
        },

    };

    var containerProps = {...props, actionProps, title:"Views"}
    return <NodeContainer {...containerProps}/>
} 
