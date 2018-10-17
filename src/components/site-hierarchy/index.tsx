import * as React from "react";
import "./site-hierarchy.css";
import SortableTree, {
  TreeItem,
  ExtendedNodeData,
  PreviousAndNextLocation,
  NodeData
} from "react-sortable-tree";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import {
  ISiteScriptContainer,
  INodeProps,
  TSetNodeTypeProps,
  INodeTypeProps,
  IDictionary
} from "../../types";
import { convertJsonToSiteHierarchy } from "../../converters";
import "react-sortable-tree/style.css";
import NodeList from "../../components/nodes/node-list";
import NodeLists from "../../components/nodes/node-lists";
import NodeRoot from "../../components/nodes/node-root";
import NodeFieldText from "../../components/nodes/node-field-text";
import NodeFieldUser from "../../components/nodes/node-field-user";
import NodeFieldNumber from "../../components/nodes/node-field-number";
import NodeFieldNote from "../../components/nodes/node-field-note";
import NodeFieldBoolean from "../../components/nodes/node-field-boolean";
import NodeFieldDateTime from "../../components/nodes/node-field-date-time";
import NodeFields from "../../components/nodes/node-fields";
import { autobind } from "@uifabric/utilities";
import NodeFieldDeletion from "../../components/nodes/node-field-deletion";
import NodeListContentType from "../../components/nodes/node-list-content-type";
import NodeListContentTypes from "../../components/nodes/node-list-content-types";
import NodeListContentTypeDeletion from "../../components/nodes/node-list-content-type-deletion";
import NodeColumnFormatter from "../../components/nodes/node-column-formatter";
import NodeColumnFormatters from "../../components/nodes/node-column-formatters";
import NodeNavLinks from "../../components/nodes/node-nav-links";
import NodeNavLink from "../../components/nodes/node-nav-link";
import NodeTriggerFlow from "../../components/nodes/node-trigger-flow";
import NodeListViews from "../../components/nodes/node-list-views";
import NodeListView from "../../components/nodes/node-list-view";
import NodeListViewDeletion from "../../components/nodes/node-list-view-deletion";
import NodeListViewFields from "../../components/nodes/node-list-view-fields";
import NodeListViewField from "../../components/nodes/node-list-view-field";
import NodeFieldXML from "../../components/nodes/node-field-xml";
import NodeListFieldCustomizers from "../../components/nodes/node-list-field-customizers";
import NodeListFieldCustomizer from "../../components/nodes/node-list-field-customizer";
import NodeListViewCommandSets from "../../components/nodes/node-list-view-command-sets";
import NodeListViewCommandSet from "../../components/nodes/node-list-view-command-set";
import NodeFieldLookupXML from "../../components/nodes/node-field-lookup-xml";
import NodeSiteColumns from "../nodes/node-site-columns";
import NodeSiteColumn from "../../components/nodes/node-site-column";
import NodeSiteColumnXML from "../../components/nodes/node-site-column-xml";
import NodeContentTypes from "../nodes/node-content-types";
import NodeContentType from "../../components/nodes/node-content-type";
import NodeContentTypeSiteColumns from "../nodes/node-content-type-site-columns";
import NodeContentTypeSiteColumn from "../nodes/node-content-type-site-column";
import samples from "../../samples";
import NodeInstallSolutions from "../../components/nodes/node-install-solutions";
import NodeInstallSolution from "../../components/nodes/node-install-solution";
import NodeAddUsers from "../nodes/node-users";
import NodeAddUser from "../nodes/node-user";
interface ISiteHierarchyProps {
  setSiteScriptContainer: (siteScriptContainer: ISiteScriptContainer) => void;
  setTreeAndScriptData: (treeData: TreeItem[]) => void;
  treeData: TreeItem[];
  setSample: (key: string) => void;
  setNodeTypeProps: TSetNodeTypeProps;
  nodeTypesProps: IDictionary<INodeTypeProps>;
  reloadTree: () => void;
}

export class SiteHierarchy extends React.Component<ISiteHierarchyProps, any> {
  constructor(props: ISiteHierarchyProps) {
    super(props);
    this.setNodeTypeProps("root", {
      height: 251,
      canDrag: true,
      canDrop: false
    });
    this.setNodeTypeProps("lists", {
      height: 62,
      canDrag: false,
      canDrop: true
    });
    this.setNodeTypeProps("listFields", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("list", {
      height: 195,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("fieldText", {
      height: 195,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("fieldNumber", {
      height: 195,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("fieldNote", {
      height: 195,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("fieldUser", {
      height: 195,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("fieldBoolean", {
      height: 195,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("fieldDateTime", {
      height: 195,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("fieldXML", {
      height: 195,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("fieldLookupXML", {
      height: 195,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("fieldDeletion", {
      height: 96,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("listContentTypes", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("listContentType", {
      height: 96,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("listContentTypeDeletion", {
      height: 96,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("columnFormatters", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("columnFormatter", {
      height: 200,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("listFieldCustomizers", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("listFieldCustomizer", {
      height: 192,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("navLinks", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("navLink", {
      height: 192,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("triggerFlow", {
      height: 244,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("listViews", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("listView", {
      height: 244,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("listViewFields", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("listViewField", {
      height: 96,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("listViewCommandSets", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("listViewCommandSet", {
      height: 244,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("listViewDeletion", {
      height: 96,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("siteColumns", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("siteColumn", {
      height: 200,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("siteColumnXML", {
      height: 190,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("contentTypes", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("contentType", {
      height: 205,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("contentTypeSiteColumns", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("contentTypeSiteColumn", {
      height: 96,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("installSolutions", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("installSolution", {
      height: 96,
      canDrag: true,
      canDrop: true
    });
    this.setNodeTypeProps("addUsers", {
      height: 62,
      canDrag: false,
      canDrop: false
    });
    this.setNodeTypeProps("addUser", {
      height: 149,
      canDrag: true,
      canDrop: true
    });
  }

  private setEmpty() {
    var emptyContainer = {
      title: "New Site Script",
      id: "new",
      siteScript: {
        $schema: "schema.json",
        actions: [],
        bindata: {},
        version: 1
      }
    };
    this.props.setSiteScriptContainer(emptyContainer);
    this.props.setTreeAndScriptData(convertJsonToSiteHierarchy(emptyContainer));
  }
  private setNode(nodeProps: INodeProps) {
    var returnVal;
    switch (nodeProps.node.type) {
      case "root":
        returnVal = <NodeRoot {...nodeProps} />;
        break;
      case "list":
        returnVal = <NodeList {...nodeProps} />;
        break;
      case "lists":
        returnVal = <NodeLists {...nodeProps} />;
        break;
      case "listFields":
        returnVal = <NodeFields {...nodeProps} />;
        break;
      case "fieldText":
        returnVal = <NodeFieldText {...nodeProps} />;
        break;
      case "fieldNote":
        returnVal = <NodeFieldNote {...nodeProps} />;
        break;
      case "fieldNumber":
        returnVal = <NodeFieldNumber {...nodeProps} />;
        break;
      case "fieldUser":
        returnVal = <NodeFieldUser {...nodeProps} />;
        break;
      case "fieldBoolean":
        returnVal = <NodeFieldBoolean {...nodeProps} />;
        break;
      case "fieldDateTime":
        returnVal = <NodeFieldDateTime {...nodeProps} />;
        break;
      case "fieldXML":
        returnVal = <NodeFieldXML {...nodeProps} />;
        break;
      case "fieldLookupXML":
        returnVal = <NodeFieldLookupXML {...nodeProps} />;
        break;
      case "fieldDeletion":
        returnVal = <NodeFieldDeletion {...nodeProps} />;
        break;
      case "listContentTypes":
        returnVal = <NodeListContentTypes {...nodeProps} />;
        break;
      case "listContentType":
        returnVal = <NodeListContentType {...nodeProps} />;
        break;
      case "listContentTypeDeletion":
        returnVal = <NodeListContentTypeDeletion {...nodeProps} />;
        break;
      case "columnFormatter":
        returnVal = <NodeColumnFormatter {...nodeProps} />;
        break;
      case "columnFormatters":
        returnVal = <NodeColumnFormatters {...nodeProps} />;
        break;
      case "listFieldCustomizers":
        returnVal = <NodeListFieldCustomizers {...nodeProps} />;
        break;
      case "listFieldCustomizer":
        returnVal = <NodeListFieldCustomizer {...nodeProps} />;
        break;
      case "navLinks":
        returnVal = <NodeNavLinks {...nodeProps} />;
        break;
      case "navLink":
        returnVal = <NodeNavLink {...nodeProps} />;
        break;
      case "triggerFlow":
        returnVal = <NodeTriggerFlow {...nodeProps} />;
        break;
      case "listViews":
        returnVal = <NodeListViews {...nodeProps} />;
        break;
      case "listView":
        returnVal = <NodeListView {...nodeProps} />;
        break;
      case "listViewFields":
        returnVal = <NodeListViewFields {...nodeProps} />;
        break;
      case "listViewField":
        returnVal = <NodeListViewField {...nodeProps} />;
        break;
      case "listViewCommandSets":
        returnVal = <NodeListViewCommandSets {...nodeProps} />;
        break;
      case "listViewCommandSet":
        returnVal = <NodeListViewCommandSet {...nodeProps} />;
        break;
      case "listViewDeletion":
        returnVal = <NodeListViewDeletion {...nodeProps} />;
        break;
      case "siteColumns":
        returnVal = <NodeSiteColumns {...nodeProps} />;
        break;
      case "siteColumn":
        returnVal = <NodeSiteColumn {...nodeProps} />;
        break;
      case "siteColumnXML":
        returnVal = <NodeSiteColumnXML {...nodeProps} />;
        break;
      case "contentTypes":
        returnVal = <NodeContentTypes {...nodeProps} />;
        break;
      case "contentType":
        returnVal = <NodeContentType {...nodeProps} />;
        break;
      case "contentTypeSiteColumns":
        returnVal = <NodeContentTypeSiteColumns {...nodeProps} />;
        break;
      case "contentTypeSiteColumn":
        returnVal = <NodeContentTypeSiteColumn {...nodeProps} />;
        break;
      case "installSolutions":
        returnVal = <NodeInstallSolutions {...nodeProps} />;
        break;
      case "installSolution":
        returnVal = <NodeInstallSolution {...nodeProps} />;
        break;
      case "addUsers":
        returnVal = <NodeAddUsers {...nodeProps} />;
        break;
      case "addUser":
        returnVal = <NodeAddUser {...nodeProps} />;
        break;
      default:
        returnVal = <NodeList {...nodeProps} />;
        break;
    }
    return returnVal;
  }

  @autobind
  private calcRowHeight(data: any) {
    if (
      this.props.nodeTypesProps &&
      this.props.nodeTypesProps[data.node.type]
    ) {
      return this.props.nodeTypesProps[data.node.type].height;
    }
    return 72;
  }
  @autobind
  private canDrag(data: ExtendedNodeData) {
    if (
      this.props.nodeTypesProps &&
      this.props.nodeTypesProps[data.node.type]
    ) {
      return this.props.nodeTypesProps[data.node.type].canDrag;
    }
    return false;
  }
  @autobind
  private canDrop(data: PreviousAndNextLocation & NodeData) {
    if (
      this.props.nodeTypesProps &&
      this.props.nodeTypesProps[data.node.type]
    ) {
      return this.props.nodeTypesProps[data.node.type].canDrop;
    }
    return false;
  }
  @autobind
  private setNodeTypeProps(nodeType: string, nodeTypeProps: INodeTypeProps) {
    if (!this.props.nodeTypesProps[nodeType]) {
      this.props.setNodeTypeProps(nodeType, nodeTypeProps);
    }
  }
  private getSamples() {
    return samples.map(sample => ({
      key: sample.id,
      text: sample.title,
      onClick: () => {
        this.props.setSample(sample.id);
      }
    }));
  }

  public render() {
    var { treeData, setTreeAndScriptData, reloadTree } = this.props;
    var commandItems = [
      {
        key: "1",
        name: "Open",
        subMenuProps: {
          items: [
            {
              key: "newItem",
              name: "New",
              onClick: this.setEmpty.bind(this)
            },
            {
              key: "Samples",
              name: "samples",
              items: this.getSamples()
            }
          ]
        }
      }
    ];

    return (
      <div
        style={{
          height: "100%",
          overflowY: "auto"
        }}
      >
        <CommandBar items={commandItems} />
        <div className="sd_site_hierarchy_tree">
          <SortableTree
            treeData={treeData}
            onChange={data => {
              setTreeAndScriptData(data);
              reloadTree();
            }}
            rowHeight={this.calcRowHeight}
            generateNodeProps={({ node, path }) => ({
              title: this.setNode({
                node,
                path,
                setTreeAndScriptData,
                treeData
              }),
              className: classType(node)
            })}
            canDrag={this.canDrag}
            canDrop={this.canDrop}
          />
        </div>
      </div>
    );

    function classType(node: TreeItem): string {
      var type = "";
      if (node.type) {
        type = " sd_site_hierarchy_node_type_" + node.type;
      }
      return "sd_site_hierarchy_node_wrapper" + type;
    }
  }
}
