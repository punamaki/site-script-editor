import * as React from 'react';
import {ComboBox, IComboBoxOption} from 'office-ui-fabric-react/lib/ComboBox';
import {TreeItem, changeNodeAtPath} from 'react-sortable-tree';
import './sd-combo-box.css';


interface ISDTextFieldProps {
    node : TreeItem;
    path : string[] | number[];
    setTreeAndScriptData : (treeData : TreeItem[]) => void;
    treeData : TreeItem[];
    label : string;
    fieldName : string;
    options:IComboBoxOption[];

}

export default function SDComboBoxFieldType(props : ISDTextFieldProps) {

    var getNodeKey = ({treeIndex} : any) => treeIndex;
    var {node, path, setTreeAndScriptData, treeData, label} = props;
    var onChanged = (option: IComboBoxOption, index?: number, value?: string) => {
        var newNode = {...node};
        newNode.data[props.fieldName] = option.key;
        newNode.type = "field"+ option.key;
        setTreeAndScriptData(changeNodeAtPath({
            treeData,
            path,
            getNodeKey,
            newNode
        }));
    }

    return <ComboBox
        selectedKey={props.node.data[props.fieldName]}
        label={label}
        id='Basicdrop1'
        ariaLabel='Basic ComboBox example'
        autoComplete='on'
        className={'sd_site_hierarchy_field sd_site_hierarchy_combo_box '}
        options={props.options}
        onMenuOpen={() => console.log('ComboBox menu opened')}
        onChanged={onChanged}
        />
}