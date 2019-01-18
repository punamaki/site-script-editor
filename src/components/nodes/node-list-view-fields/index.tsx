import * as React from "react";
import { INodeProps } from "../../../types";
import "./node-list-view-fields.css";
import { addViewFieldToView } from "../../../helpers";
import NodeContainer from "../../../components/nodes/node-container";

export function NodeListViewFields(props: INodeProps) {
  const { path, treeData, setTreeAndScriptData } = props;
  const actionProps = {
    iconProps: {
      iconName: "Add"
    },
    menuProps: {
      shouldFocusOnMount: true,
      items: [
        {
          key: "newViewField",
          name: "Add a view field",
          onClick: () => addViewFieldToView(path, treeData, setTreeAndScriptData)
        }
      ]
    }
  };

  const containerProps = { ...props, actionProps, title: "View fields" };
  return <NodeContainer {...containerProps} />;
}
