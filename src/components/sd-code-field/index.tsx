import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { TreeItem, changeNodeAtPath } from "react-sortable-tree";
import "./sd-code-field.css";
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
interface ISDCodeFieldState {
  isValid: boolean;
  fieldValue: string;
}
export default class SDCodeField extends React.Component<ISDCodeFieldProps, ISDCodeFieldState> {
  constructor(props: ISDCodeFieldProps) {
    super(props);
    this.state = { isValid: true, fieldValue: "" };
  }

  render() {
    const getNodeKey = ({ treeIndex }: any) => treeIndex;
    const { node, path, setTreeAndScriptData, treeData, label } = this.props;

    return (
      <TextField
        onChange={(e, fieldValue) => {
          const newNode = {
            ...node
          };
          let jsonData = {};
          try {
            jsonData = JSON.parse(fieldValue!);
            newNode.data[this.props.fieldName] = jsonData;
            setTreeAndScriptData(
              changeNodeAtPath({ treeData, path, getNodeKey, newNode })
            );
            this.setState({ isValid: true });
          } catch (e) {
            this.setState({ isValid: false, fieldValue:fieldValue! });
          }
        }}
        borderless={true}
        value={
          this.state.isValid
            ? JSON.stringify(this.props.node.data[this.props.fieldName])
            : this.state.fieldValue
        }
        className={
          "sd_site_hierarchy_field sd_site_hierarchy_code_field" +
          (this.state.isValid ? "" : " sd_site_hierarchy_code_field_not_valid")
        }
        label={label}
        multiline={true}
        onRenderLabel={(fieldProps)=>renderLabel(this.props.label, this.props.infoText)}
        rows={4}
      />
    );
  }
}
