import * as React from 'react';
import NodeWrapper from '../../../components/nodes/node-wrapper';
import { getNodeKey, getChildrenAmount } from '../../../helpers';
import { INodeProps } from '../../../types';

export interface INodeContainerProps extends INodeProps {
    actionProps:any;
    title:string;
}
export default function NodeContainer(props : INodeContainerProps) {
    var {path, treeData}=props

    const childrenAmount = getChildrenAmount(treeData, path, getNodeKey);
    return <NodeWrapper actionProps={props.actionProps} menuClass="sd_site_hierarchy_node_menu_container">
        <div className="sd_site_hierarchy_node_title">{props.title} {childrenAmount>0 && <div className="numberCircle">{childrenAmount}</div>}</div>
    </NodeWrapper>;
}