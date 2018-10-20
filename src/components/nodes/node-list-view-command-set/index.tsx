import * as React from 'react';
import {removeNodeAtPath} from 'react-sortable-tree';
import {getNodeKey} from '../../../helpers';
import {INodeProps} from '../../../types';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import SDTextField from '../../../components/sd-text-field';
import './node-list-view-command-set.css'
import SDComboBox from '../../../components/sd-combo-box';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';

export  function NodeListViewCommandSet(props : INodeProps) {
    var {path, treeData, setTreeAndScriptData} = props;
    var actionProps = {
        iconProps: {
            iconName: 'Delete'
        },
        onClick: () => setTreeAndScriptData(removeNodeAtPath({treeData, path, getNodeKey})),
        title: "Remove the list view command set"
    };
    var options: IComboBoxOption[] =  [
        {
            key: 'ContextMenu',
            text: 'Context menu'
        },
        {
            key: 'CommandBar',
            text: 'Command bar'
        }
    ];
    return <NodeWrapper actionProps={actionProps} smallTitle="List view command set" menuClass="sd_site_hierarchy_node_menu_list_view_command_set" infoText="Associates a ListViewCommandSet to the list">
        <div className="sd_site_hierarchy_node_list_view_command_set">
            <div><SDTextField {...props} label="Title" fieldName="title"/></div>
            <div><SDComboBox
                {...props}
                label="Location"
                fieldName="location"
                options={options}/></div>
            <div><SDTextField {...props} label="Client side component id" fieldName="clientSideComponentId"/></div>
            <div><SDTextField {...props} label="Client side component properties" fieldName="clientSideComponentProperties"/></div>
        </div>
    </NodeWrapper>;
}
