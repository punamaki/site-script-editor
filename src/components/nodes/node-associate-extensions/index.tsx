import * as React from 'react';
import {  addSiteColumnToTree, addSiteColumnXMLToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import NodeContainer from '../../../components/nodes/node-container';

export  function NodeAssociateExtensions(props : INodeProps) {
    var {treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newSiteColumn',
                    name: 'Add a new site column',
                    onClick: () => addSiteColumnToTree(treeData,setTreeAndScriptData),
                },
                {
                    key: 'newViewDeletion',
                    name: 'Add a new XML site column',
                    onClick: () => addSiteColumnXMLToTree(treeData,setTreeAndScriptData),
                }
            ]
        }
    };
    var containerProps = {...props, actionProps, title:"Associated extensions"}
    return <NodeContainer {...containerProps}/>
}