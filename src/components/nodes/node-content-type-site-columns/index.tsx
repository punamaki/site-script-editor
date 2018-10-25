import * as React from 'react';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import { addSiteColumnToContentType } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css"
import NodeContainer from '../node-container';

export  function NodeContentTypeSiteColumns(props : INodeProps) {

    var {path, treeData, setTreeAndScriptData} = props;
    var actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addSiteColumnToContentType(path,treeData,setTreeAndScriptData),
        title: "Add a new site column reference"
    };
    var containerProps = {...props, actionProps, title:"Content types"}
    return <NodeContainer {...containerProps}/>
    return <NodeWrapper actionProps={actionProps} menuClass="sd_site_hierarchy_node_menu_container">
        <div className="sd_site_hierarchy_node_title">Site Columns</div>
    </NodeWrapper>;
}
