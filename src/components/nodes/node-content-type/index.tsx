import * as React from "react";
import { removeNodeAtPath } from "react-sortable-tree";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import { getNodeKey } from "../../../helpers";
import { INodeProps } from "../../../types";
import "./index.css";
import SDToggle from "../../../components/sd-toggle";
import SDTextField from "../../sd-text-field";
import SDComboBox from "../../../components/sd-combo-box";

interface INodeWrapperProps extends INodeProps {}

export default function NodeContentType(props: INodeWrapperProps) {
  var { path, treeData, setTreeAndScriptData } = props;

  var actionProps = {
    iconProps: {
      iconName: "Delete"
    },
    onClick: () =>
      setTreeAndScriptData(removeNodeAtPath({ treeData, path, getNodeKey })),
    title: "Remove the content type"
  };
  var parentNameOptions = [
    {
      key: "System",
      text: "System"
    },
    {
      key: "Item",
      text: "Item"
    },
    {
      key: "Document",
      text: "Document"
    },
    {
      key: "Event",
      text: "Event"
    },
    {
      key: "Issue",
      text: "Issue"
    },
    {
      key: "Announcement",
      text: "Announcement"
    },
    {
      key: "Link",
      text: "Link"
    },
    {
      key: "Contact",
      text: "Contact"
    },
    {
      key: "Message",
      text: "Message"
    },
    {
      key: "Task",
      text: "Task"
    },
    {
      key: "Workflow History",
      text: "Workflow History"
    },
    {
      key: "Post",
      text: "Post"
    },
    {
      key: "Comment",
      text: "Comment"
    },
    {
      key: "East Asia Contact",
      text: "East Asia Contact"
    },
    {
      key: "Folder",
      text: "Folder"
    }
  ];
  var parentIdOptions = [
    {
      key: "0x",
      text: "0x (System)"
    },
    {
      key: "0x01",
      text: "0x01 (Item)"
    },
    {
      key: "0x0101",
      text: "0x0101 (Document)"
    },
    {
      key: "0x0102",
      text: "0x0102 (Event)"
    },
    {
      key: "0x0103",
      text: "0x0103 (Issue)"
    },
    {
      key: "0x0104",
      text: "0x0104 (Announcement)"
    },
    {
      key: "0x0105",
      text: "0x0105 (Link)"
    },
    {
      key: "0x0106",
      text: "0x0106 (Contact)"
    },
    {
      key: "0x0107",
      text: "0x010 (Message)"
    },
    {
      key: "0x0108",
      text: "0x0108 (Task)"
    },
    {
      key: "0x0109",
      text: "0x0109 (Workflow History)"
    },
    {
      key: "0x0110",
      text: "0x0110 (Post)"
    },
    {
      key: "0x0111",
      text: "0x0111 (Comment)"
    },
    {
      key: "0x0116",
      text: "0x0116 (East Asia Contact)"
    },
    {
      key: "0x0120",
      text: "0x0120 (Folder)"
    }
  ];
    // name – The name of the content type to create.
    // description – The optional description of the content type.
    // parentName – Name of the parent content type.
    // parentId – ID of the parent content type.
    // id – ID of the content type.
    // hidden – Specifies whether the content type is visible or hidden.
    // subactions – Specifies subactions to run on the content type. These are used to designate the site columns to add.
  return (
    <NodeWrapper
      actionProps={actionProps}
      smallTitle="Content type"
      infoText="Use createContentType to define a new content type that can then be associated to a list by using the addContentType action."
    >
      <div className="sd_site_hierarchy_node_type_contentType">
      <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Content type name"
              fieldName="name"
            />
          </div>
          <div className="sd_col_50">
          <SDComboBox
              {...props}
              label="Parent content type name"
              fieldName="parentName"
              options={parentNameOptions}
              allowFreeform={true}
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField
              {...props}
              label="Content type id"
              fieldName="id"
            />
          </div>
          <div className="sd_col_50">
          <SDComboBox
              {...props}
              label="Parent content type id"
              fieldName="parentId"
              options={parentIdOptions}
              allowFreeform={true}
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDToggle
              {...props}
              label="Hidden"
              fieldName="hidden"
            />
          </div>
          <div className="sd_col_50">
          <SDTextField
              {...props}
              label="Description"
              fieldName="description"
            />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
