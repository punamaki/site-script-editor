import { IAction, ISiteScriptContainer } from "../types";
import { TreeItem } from "react-sortable-tree";
import {
  ensureNavLinksNode,
  ensureSiteColumnsNode,
  ensureContentTypesNode,
  ensureInstallSolutionsNode,
  ensureAddUsersNode,
  ensureRemoveNavLinksNode
} from "../helpers";

export function convertJsonToSiteHierarchy(
  siteScriptContainer: ISiteScriptContainer
): TreeItem[] {
  var children: TreeItem[] = [];
  var returnObj = {
    title: siteScriptContainer.title,
    expanded: true,
    children: children,
    type: "root",
    data: {}
  };
  if (siteScriptContainer && siteScriptContainer.siteScript) {
    var siteScript = siteScriptContainer.siteScript;
    var actions = siteScript.actions;
    actions.forEach(action => {
      switch (action.verb) {
        case "applyTheme":
          returnObj.data["themeName"] = action.themeName;
          break;
        case "setSiteLogo":
          returnObj.data["url"] = action.url;
          break;
        case "setSiteExternalSharingCapability":
          returnObj.data["capability"] = action.capability;
          break;
        case "setRegionalSettings":
          returnObj.data["timeZone"] = action.timeZone;
          returnObj.data["locale"] = action.locale;
          returnObj.data["sortOrder"] = action.sortOrder;
          returnObj.data["hourFormat"] = action.hourFormat;
          break;
        case "createSPList":
          let listsNode = ensureListsNode(children);
          let list = createSPList(action);
          listsNode.children!.push(list);
          break;
        case "addNavLink":
          let navLinksNode = ensureNavLinksNode(children);
          let navLink = createNavLink(action);
          navLinksNode.children!.push(navLink);
          break;
        case "removeNavLink":
          let removeNavLinksNode = ensureRemoveNavLinksNode(children);
          let removeNavLink = createRemoveNavLink(action);
          removeNavLinksNode.children!.push(removeNavLink);
          break;
        case "addPrincipalToSPGroup":
          let addUsersNode = ensureAddUsersNode(children);
          let addUser = createAddUser(action);
          addUsersNode.children!.push(addUser);
          break;
        case "createSiteColumn":
          let siteColumnsNode = ensureSiteColumnsNode(children);
          let siteColumn = createSiteColumn(action);
          siteColumnsNode.children!.push(siteColumn);
          break;
        case "createContentType":
          let contentTypesNode = ensureContentTypesNode(children);
          let contentType = createContentType(action);
          contentTypesNode.children!.push(contentType);
          break;
        case "triggerFlow":
          let triggerFlow = createTriggerFlow(action);
          children!.push(triggerFlow);
          break;
        case "joinHubSite":
          returnObj.data["hubSiteId"] = action.hubSiteId;
          break;
        case "installSolution":
          let installSolutionNode = ensureInstallSolutionsNode(children);
          let installSolution = createInstallSolution(action);
          installSolutionNode.children!.push(installSolution);
          break;
        default:
          break;
      }
    });
    return [returnObj];
  }
  return [];
  function createTriggerFlow(action: IAction) {
    var { url, name, parameters } = action;
    const item: TreeItem = {
      children: [],
      type: "triggerFlow",
      expanded: true,
      data: {
        url,
        name,
        parameters
      }
    };
    return item;
  }
  function createNavLink(action: IAction) {
    var { url, displayName, isWebRelative } = action;
    const navLink: TreeItem = {
      children: [],
      type: "navLink",
      expanded: true,
      data: {
        url,
        displayName,
        isWebRelative
      }
    };
    return navLink;
  }
  function createRemoveNavLink(action: IAction) {
    var {displayName, isWebRelative } = action;
    const removeNavLink: TreeItem = {
      children: [],
      type: "removeNavLink",
      expanded: true,
      data: {
        displayName,
        isWebRelative
      }
    };
    return removeNavLink;
  }
  function createAddUser(action: IAction) {
    var { principal, group } = action;
    const addUser: TreeItem = {
      children: [],
      type: "addUser",
      expanded: true,
      data: {
        principal,
        group
      }
    };
    return addUser;
  }
  function createInstallSolution(action: IAction) {
    var { id } = action;
    const navLink: TreeItem = {
      children: [],
      type: "installSolution",
      expanded: true,
      data: {
        id
      }
    };
    return navLink;
  }
  function createSiteColumn(action: IAction) {
    var {
      fieldType,
      internalName,
      displayName,
      isRequired,
      group,
      enforceUnique
    } = action;
    const siteColumn: TreeItem = {
      children: [],
      type: "siteColumn",
      expanded: true,
      data: {
        fieldType,
        internalName,
        displayName,
        isRequired,
        group,
        enforceUnique
      }
    };
    return siteColumn;
  }
  function createContentType(action: IAction) {
    var { name, parentName, parentId, id, hidden, description } = action;
    const contentType: TreeItem = {
      children: [],
      type: "contentType",
      expanded: true,
      data: {
        name,
        parentName,
        parentId,
        id,
        hidden,
        description
      }
    };
    var siteColsNode = ensureContentTypeSiteColumnsNode(contentType);
    if (action.subactions) {
      var subactions = action.subactions;
      subactions.forEach(subaction => {
        if (siteColsNode) {
          let data = { internalName: subaction.internalName };
          siteColsNode.children!.push({
            type: "contentTypeSiteColumn",
            data,
            expanded: true
          });
        }
      });
    }

    return contentType;
  }
  function createSPList(action: IAction): TreeItem {
    const list: TreeItem = {
      children: [],
      type: "list",
      expanded: true,
      data: {
        listName: action.listName,
        templateType: action.templateType
      }
    };
    ensureFieldsNode(list);
    ensureListContentTypesNode(list);
    ensureColumnFormattersNode(list);
    ensureViewsNode(list);
    ensureFieldCustomizersNode(list);
    ensureListViewCommandSetsNode(list);
    if (action.subactions) {
      var subactions = action.subactions;
      subactions.forEach(subaction => {
        switch (subaction.verb) {
          case "setDescription":
            list.data.listDescription = subaction.description;
            break;
          case "setTitle":
            list.data.listTitle = subaction.title;
            break;
          case "addSPFieldXml":
            if (list.children) {
              var columnNode = ensureFieldsNode(list);
              var addToDefaultView = subaction.addToDefaultView
                ? subaction.addToDefaultView
                : false;
              if (columnNode) {
                columnNode.children!.push({
                  type: "fieldXML",
                  data: {
                    schemaXml: subaction.schemaXml,
                    addToDefaultView
                  },
                  expanded: true
                });
              }
            }
            break;
          case "addSPField":
            if (list.children) {
              var columnNode = ensureFieldsNode(list);
              var isRequired = subaction.isRequired
                ? subaction.isRequired
                : false;
              var addToDefaultView = subaction.addToDefaultView
                ? subaction.addToDefaultView
                : false;
              var enforceUnique = subaction.enforceUnique
                ? subaction.enforceUnique
                : false;
              var fieldType = subaction.fieldType;
              var data = {
                displayName: subaction.displayName,
                internalName: subaction.internalName,
                isRequired,
                addToDefaultView,
                fieldType,
                enforceUnique
              };
              if (columnNode) {
                columnNode.children!.push({
                  type: "field" + subaction.fieldType,
                  data,
                  expanded: true
                });
              }
            }
            break;
          case "deleteSPField":
            if (list.children) {
              var columnNode = ensureFieldsNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "fieldDeletion",
                  data: {
                    displayName: subaction.displayName
                  },
                  expanded: true
                });
              }
            }
            break;
          case "addContentType":
            if (list.children) {
              var columnNode = ensureListContentTypesNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listContentType",
                  data: {
                    name: subaction.name
                  },
                  expanded: true
                });
              }
            }
            break;
          case "removeContentType":
            if (list.children) {
              var columnNode = ensureListContentTypesNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listContentTypeDeletion",
                  data: {
                    name: subaction.name
                  },
                  expanded: true
                });
              }
            }
            break;
          case "setSPFieldCustomFormatter":
            if (list.children) {
              var columnNode = ensureColumnFormattersNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "columnFormatter",
                  data: {
                    fieldDisplayName: subaction.fieldDisplayName,
                    formatterJSON: subaction.formatterJSON
                  },
                  expanded: true
                });
              }
            }
            break;
          case "associateFieldCustomizer":
            if (list.children) {
              var columnNode = ensureColumnFormattersNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listFieldCustomizer",
                  data: {
                    internalName: subaction.internalName,
                    clientSideComponentId: subaction.clientSideComponentId,
                    clientSideComponentProperties:
                      subaction.clientSideComponentProperties
                  },
                  expanded: true
                });
              }
            }
            break;
          case "associateListViewCommandSet":
            if (list.children) {
              var columnNode = ensureListViewCommandSetsNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listViewCommandSet",
                  data: {
                    title: subaction.title,
                    location: subaction.location,
                    clientSideComponentId: subaction.clientSideComponentId,
                    clientSideComponentProperties:
                      subaction.clientSideComponentProperties
                  },
                  expanded: true
                });
              }
            }
            break;
          case "addSPView":
            if (list.children) {
              var columnNode = ensureViewsNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listView",
                  data: {
                    name: subaction.name,
                    rowLimit: subaction.rowLimit,
                    isPaged: subaction.isPaged,
                    makeDefault: subaction.makeDefault,
                    query: subaction.query
                  },
                  expanded: true,
                  children: [
                    {
                      title: "View Fields",
                      children: subaction.viewFields.map(
                        (viewField: string) => ({
                          type: "listViewField",
                          data: {
                            viewField
                          }
                        })
                      ),
                      type: "listViewFields",
                      expanded: true
                    }
                  ]
                });
              }
            }
            break;
          case "removeSPView":
            if (list.children) {
              var columnNode = ensureViewsNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listViewDeletion",
                  data: {
                    name: subaction.name
                  },
                  expanded: true
                });
              }
            }
            break;
          default:
            break;
        }
      });
    }
    return list;
  }
}

function ensureListsNode(children: TreeItem[]): TreeItem {
  var listsNode = children.find(child => child.type === "lists");
  if (!listsNode) {
    listsNode = {
      title: "Lists",
      children: [],
      type: "lists",
      expanded: true
    };
    children.push(listsNode);
  }
  return listsNode;
}

function ensureFieldsNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(child => child.type === "listFields");
    if (!columnNode) {
      columnNode = {
        title: "Fields",
        children: [],
        type: "listFields",
        expanded: true
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
function ensureListContentTypesNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(
      child => child.type === "listContentTypes"
    );
    if (!columnNode) {
      columnNode = {
        title: "Content types",
        children: [],
        type: "listContentTypes",
        expanded: true
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
function ensureFieldCustomizersNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(
      child => child.type === "listFieldCustomizers"
    );
    if (!columnNode) {
      columnNode = {
        children: [],
        type: "listFieldCustomizers",
        expanded: true
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
function ensureListViewCommandSetsNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(
      child => child.type === "listViewCommandSets"
    );
    if (!columnNode) {
      columnNode = {
        children: [],
        type: "listViewCommandSets",
        expanded: true
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
function ensureColumnFormattersNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(
      child => child.type === "columnFormatters"
    );
    if (!columnNode) {
      columnNode = {
        children: [],
        type: "columnFormatters",
        expanded: true
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
function ensureViewsNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(child => child.type === "listViews");
    if (!columnNode) {
      columnNode = {
        title: "Views",
        children: [],
        type: "listViews",
        expanded: true
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
function ensureContentTypeSiteColumnsNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(
      child => child.type === "contentTypeSiteColumns"
    );
    if (!columnNode) {
      columnNode = {
        title: "Site columns",
        children: [],
        type: "contentTypeSiteColumns",
        expanded: true
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
