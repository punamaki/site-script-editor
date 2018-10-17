import * as React from 'react';
import {removeNodeAtPath} from 'react-sortable-tree';
import {getNodeKey} from '../../../helpers';
import {INodeProps} from '../../../types';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import './node-list-content-type.css'

export default function NodeListContentType(props : INodeProps) {
    var {path, treeData, setTreeAndScriptData} = props;
    var actionProps = {
        iconProps: {
            iconName: 'Delete'
        },
        onClick: () => setTreeAndScriptData(removeNodeAtPath({treeData, path, getNodeKey})),
        title: "Remove the content type"
    };

    return <NodeWrapper actionProps={actionProps} smallTitle="List content type" menuClass="sd_site_hierarchy_node_menu_list_content_type" infoText="Adds a content type to the list. Currently these are limited to the default content types included in the site template or ones defined in a script by using the createContentType action.">
        <div className="sd_site_hierarchy_node_list_content_type">
            <div><SDTextField {...props} label="Content type name" fieldName="name"/></div>
        </div>
    </NodeWrapper>;
}
