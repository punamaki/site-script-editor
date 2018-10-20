import * as React from 'react';
import {removeNodeAtPath} from 'react-sortable-tree';
import {getNodeKey} from '../../../helpers';
import {INodeProps} from '../../../types';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import './node-list-content-type-deletion.css'

export  function NodeListContentTypeDeletion(props : INodeProps) {
    var {path, treeData, setTreeAndScriptData} = props;
    var actionProps = {
        iconProps: {
            iconName: 'Delete'
        },
        onClick: () => setTreeAndScriptData(removeNodeAtPath({treeData, path, getNodeKey})),
        title: "Remove the content type deletion"
    };

    return <NodeWrapper actionProps={actionProps} smallTitle="List content type removal" menuClass="sd_site_hierarchy_node_menu_list_content_type_deletion" infoText="Removes a content type that was provided by the selected template type.">
        <div className="sd_site_hierarchy_node_list_content_type_deletion">
            <div><SDTextField {...props} label="Content type name that is removed" fieldName="name"/></div>
        </div>
    </NodeWrapper>;
}
