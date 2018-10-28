import * as React from 'react';
import { INodeProps } from '../../../types';
import NodeContainer from '../../../components/nodes/node-container';
import { addAssociateExtensionToTree } from '../../../helpers';

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
                    key: 'newAssociateExtension',
                    name: 'Associate extension',
                    onClick: () => addAssociateExtensionToTree(treeData,setTreeAndScriptData),
                }
            ]
        }
    };
    var containerProps = {...props, actionProps, title:"Associated extensions"}
    return <NodeContainer {...containerProps}/>
}