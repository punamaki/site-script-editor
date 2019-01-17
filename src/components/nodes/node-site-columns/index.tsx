import * as React from 'react';
import { addSiteColumn, addSiteColumnXML } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css";
import NodeContainer from '../../../components/nodes/node-container';

export  function NodeSiteColumns(props : INodeProps) {
    var {treeData, setTreeAndScriptData, path}=props;
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
                    onClick: () => addSiteColumn(path, treeData,setTreeAndScriptData),
                },
                {
                    key: 'newViewDeletion',
                    name: 'Add a new XML site column',
                    onClick: () => addSiteColumnXML(path, treeData,setTreeAndScriptData),
                }
            ]
        }
    };
    var containerProps = {...props, actionProps, title:"Site columns"};
    return <NodeContainer {...containerProps}/>;
}