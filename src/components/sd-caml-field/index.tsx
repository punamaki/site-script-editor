import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { TreeItem, changeNodeAtPath } from 'react-sortable-tree';
import './sd-caml-field.css';
import { renderLabel } from "../../helpers";

interface ISDCodeFieldProps {
    node: TreeItem;
    path: string[] | number[];
    setTreeAndScriptData: (treeData: TreeItem[]) => void;
    treeData: TreeItem[];
    label: string;
    fieldName: string;
    infoText?:string;
}

export default class SDCamlField extends React.Component<ISDCodeFieldProps> {
    constructor(props: ISDCodeFieldProps) {
        super(props);
        this.state = { isValid: true, fieldValue: "" };
    }

    render() {
        const getNodeKey = ({ treeIndex }: any) => treeIndex;
        const { node, path, setTreeAndScriptData, treeData, label } = this.props;

        return <TextField
            onChange={(e,fieldValue) => {
                var newNode = { ...node };
                newNode.data[this.props.fieldName] = fieldValue;
                setTreeAndScriptData(changeNodeAtPath({
                    treeData,
                    path,
                    getNodeKey,
                    newNode
                }));
            }}
            borderless={true}
            value={this.props.node.data[this.props.fieldName]}
            className={'sd_site_hierarchy_field sd_site_hierarchy_caml_field'}
            label={label}
            multiline={true}
            onRenderLabel={(fieldProps)=>renderLabel(this.props.label, this.props.infoText)}
            rows={4} />;
    }

}