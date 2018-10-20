import * as React from 'react';
import {removeNodeAtPath} from 'react-sortable-tree';
import {getNodeKey} from '../../../helpers';
import {INodeProps} from '../../../types';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import './node-nav-link.css'
import SDToggle from '../../../components/sd-toggle';

export  function NodeNavLink(props : INodeProps) {
    var {path, treeData, setTreeAndScriptData} = props;
    var actionProps = {
        iconProps: {
            iconName: 'Delete'
        },
        onClick: () => setTreeAndScriptData(removeNodeAtPath({treeData, path, getNodeKey})),
        title: "Remove the navigation link"
    };

    return <NodeWrapper actionProps={actionProps} smallTitle="Navigation link" menuClass="sd_site_hierarchy_node_menu_regular" infoText="Use the addNavLink verb to add a new navigation link to the site.">
        <div className="sd_site_hierarchy_node_nav_link">
            <div><SDTextField {...props} label="Display name" fieldName="displayName"/></div>
            <div><SDTextField {...props} label="Url" fieldName="url"/></div>
            <div><SDToggle {...props} label="Is web relative" fieldName="isWebRelative"/></div>
        </div>
    </NodeWrapper>;
}
