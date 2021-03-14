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
  infoText?: string;
}

export default function SDComboBoxFieldType(props: ISDTextFieldProps) {
  var getNodeKey = ({ treeIndex }: any) => treeIndex;
  var { node, path, setTreeAndScriptData, treeData } = props;
  var onChanged = (e:any, option: IComboBoxOption, index?: number, value?: string) => {
    var newNode = { ...node };
    newNode.data[props.fieldName] = option.key;
    newNode.type = "field" + option.key;
    setTreeAndScriptData(
      changeNodeAtPath({
        treeData,
        path,
        getNodeKey,
        newNode
      })
    );
  };

  return (
    <div>
      <label className="sd_site_hierarchy_combo_box_label">
        {renderLabel(props.label, props.infoText)}
      </label>
      <ComboBox
        selectedKey={props.node.data[props.fieldName]}
        id="Basicdrop1"
        ariaLabel="Basic ComboBox example"
        autoComplete="on"
        className={"sd_site_hierarchy_field sd_site_hierarchy_combo_box "}
        options={props.options}
        onMenuOpen={() => console.log("ComboBox menu opened")}
        onChange={onChanged}
      />
    </div>
  );
}
