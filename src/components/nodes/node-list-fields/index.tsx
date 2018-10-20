import * as React from 'react';
import { addFieldToList, addDeleteFieldToList, addXMLFieldToList, addLookupXMLFieldToList } from '../../../helpers';
import { INodeProps } from '../../../types';
import './node-fields.css'
import NodeContainer from '../../../components/nodes/node-container';

export  function NodeListFields(props : INodeProps) {
    var {path,treeData, setTreeAndScriptData}=props
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newField',
                    name: 'Add a normal field',
                    onClick: () => addFieldToList(path,treeData,setTreeAndScriptData),
                },{
                    key: 'newXMLField',
                    name: 'Add a XML field',
                    onClick: () => addXMLFieldToList(path,treeData,setTreeAndScriptData),
                },{
                    key: 'newLookupXMLField',
                    name: 'Add a lookup XML field',
                    onClick: () => addLookupXMLFieldToList(path,treeData,setTreeAndScriptData),
                }, {
                    key: 'newFieldDeletion',
                    name: 'Add a field deletion',
                    onClick: () => addDeleteFieldToList(path,treeData,setTreeAndScriptData),
                }
            ]
        },
        title: "Add a new field"
    };
    var containerProps = {...props, actionProps, title:"Fields"}
    return <NodeContainer {...containerProps}/>
}