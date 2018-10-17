import * as React from "react";
import { TreeItem } from "react-sortable-tree";
import "./sd-picker-field.css";
import { TagPicker } from "office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker";
import { Label } from 'office-ui-fabric-react/lib/Label';

interface ISDPickerFieldProps {
  node: TreeItem;
  path: string[] | number[];
  setTreeAndScriptData: (treeData: TreeItem[]) => void;
  treeData: TreeItem[];
  label: string;
  simple?: boolean;
  fieldName: string;
}

export default function SDPickerField(props: ISDPickerFieldProps) {
  // THIS IS JUST FOR TESTING PURPOSES
  // NOT READY!!
  var {  label } = props;
  var simpleClass = props.simple ? "sd_site_hierarchy_edit_field_simple" : "";
  const _testTags = [
    "black",
    "blue",
    "brown",
    "cyan",
    "green",
    "magenta",
    "mauve",
    "orange",
    "pink",
    "purple",
    "red",
    "rose",
    "violet",
    "white",
    "yellow"
  ].map(item => ({ key: item, name: item }));

  var _onFilterChangedNoFilter = (
    filterText: string,
    tagList: { key: string; name: string }[]
  ): { key: string; name: string }[] => {
    return filterText
      ? _testTags.filter(
          tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0
        )
      : [];
  };

  var _onItemSelected = (item: {
    key: string;
    name: string;
  }): { key: string; name: string } => {
    return item;
  };
  var _getTextFromItem = (item: any): any => {
    return item.name;
  };
  return <div className="sd_site_hierarchy_picker_field">
      <Label>{label}</Label>
    <TagPicker
      onResolveSuggestions={_onFilterChangedNoFilter}
      onItemSelected={_onItemSelected}
      getTextFromItem={_getTextFromItem}
      pickerSuggestionsProps={{
        suggestionsHeaderText: "Suggested Tags",
        noResultsFoundText: "No Color Tags Found"
      }}
      className={
        "sd_site_hierarchy_field sd_site_hierarchy_edit_field " + simpleClass
      }
      inputProps={{
        onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
          console.log("onBlur called"),
        onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
          console.log("onFocus called"),
        "aria-label": "Tag Picker"
      }}
    />
  </div>;
}
