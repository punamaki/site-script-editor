import * as React from "react";
import { ComboBox, IComboBoxOption } from "office-ui-fabric-react/lib/ComboBox";
import { TreeItem, changeNodeAtPath } from "react-sortable-tree";
import "./sd-combo-box.css";
import { renderLabel } from "../../helpers";

interface ISDTextFieldProps {
  node: TreeItem;
  path: string[] | number[];
  setTreeAndScriptData: (treeData: TreeItem[]) => void;
  treeData: TreeItem[];
  label: string;
  fieldName: string;
  options: IComboBoxOption[];
  allowFreeform?: boolean;
  convertToNumber?: boolean;
  infoText?: string;
}

export default function SDComboBox(props: ISDTextFieldProps) {
  var getNodeKey = ({ treeIndex }: any) => treeIndex;
  var { node, path, setTreeAndScriptData, treeData } = props;
  var onChanged = (
    option: IComboBoxOption,
    index?: number,
    value?: string | number
  ) => {
    var newNode = { ...node };
    var returnValue;
    if (option) {
      returnValue = option.key;
    } else {
      returnValue = value;
    }
    if (
      props.convertToNumber &&
      returnValue &&
      typeof returnValue === "string"
    ) {
      newNode.data[props.fieldName] = Number(returnValue);
    } else {
      newNode.data[props.fieldName] = returnValue;
    }

    setTreeAndScriptData(
      changeNodeAtPath({
        treeData,
        path,
        getNodeKey,
        newNode
      })
    );
  };
  function convertToText(val: any) {
    if (val && typeof val === "number") {
      return val.toString();
    } else {
      return val;
    }
  }
  return (
    <div>
      <label className="sd_site_hierarchy_combo_box_label">
        {renderLabel(props.label, props.infoText)}
      </label>
      <ComboBox
        id={props.fieldName}
        allowFreeform={props.allowFreeform ? true : false}
        autoComplete="on"
        className={"sd_site_hierarchy_field sd_site_hierarchy_combo_box "}
        options={props.options}
        onChanged={onChanged}
        text={convertToText(props.node.data[props.fieldName])}
      />
    </div>
  );
}
