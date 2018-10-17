import * as React from 'react';
import {addColumnFormatter } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./node-column-formatters.css"
import NodeContainer from '../../../components/nodes/node-container';

export default function NodeColumnFormatters(props : INodeProps) {
    var {path,treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newColumnFormatter',
                    name: 'Add a column formatter',
                    onClick: () => addColumnFormatter(path,treeData,setTreeAndScriptData),
                }
            ]
        },
        title: "Add a new field"
    };
    var containerProps = {...props, actionProps, title:"Column formatters"}
    return <NodeContainer {...containerProps}/>
}