import * as React from "react";
import {
  TextField
} from "office-ui-fabric-react/lib/TextField";
import { TreeItem, changeNodeAtPath } from "react-sortable-tree";
import "./sd-text-field.css";

import { renderLabel } from "../../helpers";

interface ISDTextFieldProps {
  node: TreeItem;
  path: string[] | number[];
  setTreeAndScriptData: (treeData: TreeItem[]) => void;
  treeData: TreeItem[];
  label: string;
  simple?: boolean;
  fieldName: string;
  infoText?: string;
}

export default function SDTextField(props: ISDTextFieldProps) {
  var getNodeKey = ({ treeIndex }: any) => treeIndex;
  var { node, path, setTreeAndScriptData, treeData, label } = props;
  var simpleClass = props.simple ? "sd_site_hierarchy_edit_field_simple" : "";

  return (
    <TextField
      onChange={(e,fieldValue) => {
        var newNode = { ...node };
        newNode.data[props.fieldName] = fieldValue;
        setTreeAndScriptData(
          changeNodeAtPath({
            treeData,
            path,
            getNodeKey,
            newNode
          })
        );
      }}
      borderless={true}
      value={props.node.data[props.fieldName]}
      className={
        "sd_site_hierarchy_field sd_site_hierarchy_edit_field " + simpleClass
      }
      label={label}
      onRenderLabel={(fieldProps)=>renderLabel(props.label, props.infoText)}
    />
  );
}
