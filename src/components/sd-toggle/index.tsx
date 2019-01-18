
import * as React from 'react';
import { TreeItem, changeNodeAtPath } from 'react-sortable-tree';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import './sd-toggle.css';

interface ISDTextFieldProps {
    node: TreeItem;
    path: string[] | number[];
    setTreeAndScriptData: (treeData: TreeItem[]) => void;
    treeData: TreeItem[];
    label: string;
    fieldName: string;
}

export default function SDToggle(props: ISDTextFieldProps) {
    const getNodeKey = ({ treeIndex }: any) => treeIndex;
    const { node, path, setTreeAndScriptData, treeData, label, fieldName } = props;

    return <Toggle
        checked={node.data[fieldName]}
        label={label}
        onText='On'
        offText='Off'
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
        className="sd_site_hierarchy_field sd_site_hierarchy_toggle"
        onChanged={(toggleValue: boolean) => {
            var newNode = { ...node };
            // newNode.action[fieldName]= toggleValue;
            newNode.data[fieldName] = toggleValue;

            setTreeAndScriptData(changeNodeAtPath({
                treeData,
                path,
                getNodeKey,
                newNode
            }));
        }}
    />;
}