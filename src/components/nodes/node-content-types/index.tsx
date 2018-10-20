import * as React from 'react';
import { addContentTypeToTree} from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css"
import NodeContainer from '../../../components/nodes/node-container';

export  function NodeContentTypes(props : INodeProps) {
    var {treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addContentTypeToTree(treeData,setTreeAndScriptData),
        title: "Add a new content type"
    };
    var containerProps = {...props, actionProps, title:"Content types"}
    return <NodeContainer {...containerProps}/>
}