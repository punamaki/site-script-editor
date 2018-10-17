import * as React from 'react';
import './node-wrapper.css'
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

interface INodeWrapperProps {
    children?: React.ReactNode;
    actionProps?:object | null;
    smallTitle?:string;
    menuClass?:string;
    infoText?:string;
}
export default function NodeWrapper(props : INodeWrapperProps) {

    const info = props.infoText? <TooltipHost content={props.infoText} calloutProps={{ gapSpace: 0 }}><Icon iconName="Info" className="sd_site_hierarchy_node_info_icon" /></TooltipHost>:"";
    return <div className="sd_site_hierarchy_node">
        <div className="sd_site_hierarchy_node_container">
            {props.smallTitle?<div className="sd_site_hierarchy_node_header">{props.smallTitle}{info}</div>:<div></div>}
            <div className="sd_site_hierarchy_node_content">
                {props.children}
            </div>
        </div>
        {props.actionProps?<div className={"sd_site_hierarchy_node_menu_launcher " + props.menuClass}><IconButton {...props.actionProps}/></div>:<div></div>
        }
        
    </div>;
}