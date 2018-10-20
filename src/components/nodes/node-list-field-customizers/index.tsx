import * as React from 'react';
import {INodeProps} from '../../../types';
import './node-list-field-customizers.css'
import {  addFieldCustomizerToList} from '../../../helpers';
import NodeContainer from '../../../components/nodes/node-container';

export  function NodeListFieldCustomizers(props : INodeProps) {
    var {path,treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newfieldCustomizer',
                    name: 'Add a field customizer',
                    onClick: () => addFieldCustomizerToList(path,treeData,setTreeAndScriptData),
                }
            ]
        },

    };
    var containerProps = {...props, actionProps, title:"Field customizers"}
    return <NodeContainer {...containerProps}/>
} 
