import * as React from 'react';
import {  addSiteColumnToTree } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css"
import NodeContainer from '../../../components/nodes/node-container';

export default function NodeSiteColumns(props : INodeProps) {
    var {treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addSiteColumnToTree(treeData,setTreeAndScriptData),
        title: "Add a new site column"
    };
    var containerProps = {...props, actionProps, title:"Site columns"}
    return <NodeContainer {...containerProps}/>
}