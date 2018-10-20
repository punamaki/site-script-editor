import * as React from 'react';
import {INodeProps} from '../../../types';
import './node-list-content-types.css'
import { addContentTypeToList, addContentTypeDeletionToList } from '../../../helpers';
import NodeContainer from '../../../components/nodes/node-container';

export  function NodeListContentTypes(props : INodeProps) {
    var {path,treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newContentType',
                    name: 'Add a content type',
                    onClick: () => addContentTypeToList(path,treeData,setTreeAndScriptData),
                },
                {
                    key: 'newContentTypeDeletion',
                    name: 'Add a default content type removal',
                    onClick: () => addContentTypeDeletionToList(path,treeData,setTreeAndScriptData),
                }
            ]
        },

    };
    var containerProps = {...props, actionProps, title:"Content types"}
    return <NodeContainer {...containerProps}/>
} 
