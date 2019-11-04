import { IAction, ISiteScriptContainer } from "../types";
import { TreeItem } from "react-sortable-tree";
import { ensureChildNode, unescapeJSON } from "../helpers";

export function convertJsonToSiteHierarchy(
  siteScriptContainer: ISiteScriptContainer
): TreeItem[] {
  let children: TreeItem[] = [];
  let returnObj = {
    title: siteScriptContainer.title,
    expanded: true,
    children: children,
    type: "root",
    data: {}
  };
  if (siteScriptContainer && siteScriptContainer.siteScript) {
    let siteScript = siteScriptContainer.siteScript;
    let actions = siteScript.actions;
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
          let listsNode = ensureChildNode("lists", children);
          let list = createSPList(action);
          listsNode.children!.push(list);
          break;
        case "addNavLink":
          let navLinksNode = ensureChildNode("navLinks", children);
          let navLink = createNavLink(action);
          navLinksNode.children!.push(navLink);
          break;
        case "removeNavLink":
          let removeNavLinksNode = ensureChildNode("removeNavLinks", children);
          let removeNavLink = createRemoveNavLink(action);
          removeNavLinksNode.children!.push(removeNavLink);
          break;
        case "addPrincipalToSPGroup":
          let addUsersNode = ensureChildNode("addUsers", children);
          let addUser = createAddUser(action);
          addUsersNode.children!.push(addUser);
          break;
        case "createSiteColumn":
          let siteColumnsNode = ensureChildNode("siteColumns", children);
          let siteColumn = createSiteColumn(action);
          siteColumnsNode.children!.push(siteColumn);
          break;
        case "createSiteColumnXml":
          let siteColumnsXmlNode = ensureChildNode("siteColumns", children);
          let siteColumnXml = createSiteColumnXml(action);
          siteColumnsXmlNode.children!.push(siteColumnXml);
          break;
        case "createContentType":
          let contentTypesNode = ensureChildNode("contentTypes", children);
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
          let installSolutionNode = ensureChildNode(
            "installSolutions",
            children
          );
          let installSolution = createInstallSolution(action);
          installSolutionNode.children!.push(installSolution);
          break;
        case "associateExtension":
          let associateExtensionNode = ensureChildNode(
            "associateExtensions",
            children
          );
          let associateExtension = createAssociateExtension(action);
          associateExtensionNode.children!.push(associateExtension);
          break;
        case "setSiteBranding":
          let siteBranding = createSiteBranding(action);
          children.push(siteBranding);
          break;
        default:
          break;
      }
    });
    return [returnObj];
  }
  return [];
  function createTriggerFlow(action: IAction) {
    let { url, name, parameters } = action;
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
  function createSiteBranding(action: IAction) {
    let { navigationLayout, headerLayout, headerBackground, showFooter } = action;
    const item: TreeItem = {
      children: [],
      type: "siteBranding",
      expanded: true,
      data: {
        navigationLayout,
        headerLayout,
        headerBackground,
        showFooter
      }
    };
    return item;
  }
  function createNavLink(action: IAction) {
    let { verb, ...jsonData } = action;
    return {
      children: [],
      type: "navLink",
      expanded: true,
      data: {
        ...jsonData
      }
    };
  }
  function createRemoveNavLink(action: IAction) {
    let { verb, ...jsonData } = action;
    return {
      children: [],
      type: "removeNavLink",
      expanded: true,
      data: {
        ...jsonData
      }
    };
  }
  function createAddUser(action: IAction) {
    let { principal, group } = action;
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
    let { id, name } = action;
    const returnObj: TreeItem = {
      children: [],
      type: "installSolution",
      expanded: true,
      data: {
        id,
        name
      }
    };
    return returnObj;
  }
  function createAssociateExtension(action: IAction) {
    let {
      title,
      location,
      clientSideComponentId,
      clientSideComponentProperties,
      registrationId,
      registrationType,
      scope
    } = action;
    const returnObj: TreeItem = {
      children: [],
      type: "associateExtension",
      expanded: true,
      data: {
        title,
        location,
        clientSideComponentId,
        clientSideComponentProperties,
        registrationId,
        registrationType,
        scope
      }
    };
    return returnObj;
  }
  function createSiteColumn(action: IAction) {
    let {
      fieldType,
      internalName,
      displayName,
      isRequired,
      group,
      enforceUnique,
      id
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
        enforceUnique,
        id
      }
    };
    return siteColumn;
  }
  function createSiteColumnXml(action: IAction) {
    let { schemaXml, pushChanges } = action;
    const siteColumn: TreeItem = {
      children: [],
      type: "siteColumnXML",
      expanded: true,
      data: {
        schemaXml,
        pushChanges
      }
    };
    return siteColumn;
  }
  function createListSiteColumn(action: IAction) {
    let { internalName, addToDefaultView } = action;

    const item: TreeItem = {
      children: [],
      type: "listSiteColumn",
      expanded: true,
      data: {
        internalName, addToDefaultView
      }
    };
    return item;
  }
  function createContentType(action: IAction) {
    let { name, parentName, parentId, id, hidden, description } = action;
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
    let siteColsNode = ensureContentTypeSiteColumnsNode(contentType);
    if (action.subactions) {
      let subactions = action.subactions;
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
    ensureListSubNodes(list);
    if (action.subactions) {
      let subactions = action.subactions;
      let columnNode: TreeItem | null;
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
              columnNode = ensureFieldsNode(list);
              let addToDefaultView = subaction.addToDefaultView
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
          case "addSPLookupFieldXml":
            if (list.children) {
              columnNode = ensureFieldsNode(list);
              let addToDefaultView = subaction.addToDefaultView
                ? subaction.addToDefaultView
                : false;
              if (columnNode) {
                columnNode.children!.push({
                  type: "fieldLookupXML",
                  data: {
                    schemaXml: subaction.schemaXml,
                    addToDefaultView,
                    targetListName: subaction.targetListName,
                    targetListUrl: subaction.targetListUrl
                  },
                  expanded: true
                });
              }
            }
            break;
          case "addSPField":
            if (list.children) {
              columnNode = ensureFieldsNode(list);
              let isRequired = subaction.isRequired
                ? subaction.isRequired
                : false;
              let addToDefaultView = subaction.addToDefaultView
                ? subaction.addToDefaultView
                : false;
              let enforceUnique = subaction.enforceUnique
                ? subaction.enforceUnique
                : false;
              let fieldType = subaction.fieldType;
              let data = {
                displayName: subaction.displayName,
                internalName: subaction.internalName,
                isRequired,
                addToDefaultView,
                fieldType,
                enforceUnique,
                id: subaction.id
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
              columnNode = ensureFieldsNode(list);
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
              columnNode = ensureListContentTypesNode(list);
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
              columnNode = ensureListContentTypesNode(list);
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
              columnNode = ensureColumnFormattersNode(list);
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
              columnNode = ensureFieldCustomizersNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listFieldCustomizer",
                  data: {
                    internalName: subaction.internalName,
                    clientSideComponentId: subaction.clientSideComponentId,
                    clientSideComponentProperties:
                      unescapeJSON(subaction.clientSideComponentProperties)
                  },
                  expanded: true
                });
              }
            }
            break;
          case "associateListViewCommandSet":
            if (list.children) {
              columnNode = ensureListViewCommandSetsNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listViewCommandSet",
                  data: {
                    title: subaction.title,
                    location: subaction.location,
                    clientSideComponentId: subaction.clientSideComponentId,
                    clientSideComponentProperties:
                      unescapeJSON(subaction.clientSideComponentProperties)
                  },
                  expanded: true
                });
              }
            }
            break;
          case "addSPView":
            if (list.children) {
              columnNode = ensureViewsNode(list);
              if (columnNode) {
                columnNode.children!.push({
                  type: "listView",
                  data: {
                    name: subaction.name,
                    rowLimit: subaction.rowLimit,
                    isPaged: subaction.isPaged,
                    makeDefault: subaction.makeDefault,
                    query: subaction.query,
                    scope: subaction.scope,
                    formatterJSON: unescapeJSON(subaction.formatterJSON)
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
              columnNode = ensureViewsNode(list);
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
          case "addSiteColumn":
            if (list.children) {
              let siteColumnsNode = ensureListSiteColumnsNode(list);
              let siteColumn = createListSiteColumn(subaction);
              siteColumnsNode!.children!.push(siteColumn);
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

function ensureFieldsNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(child => child.type === "listFields");
    if (!columnNode) {
      columnNode = {
        title: "Fields",
        children: [],
        type: "listFields",
        expanded: false
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
        expanded: false
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
        expanded: false
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
        expanded: false
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
        expanded: false
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
        expanded: false
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
        expanded: false
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
function ensureListSiteColumnsNode(list: TreeItem) {
  if (list.children) {
    let columnNode = list.children.find(child => child.type === "listSiteColumns");
    if (!columnNode) {
      columnNode = {
        title: "Site Columns",
        children: [],
        type: "listSiteColumns",
        expanded: false
      };
      list.children.push(columnNode);
    }
    return columnNode;
  }
  return null;
}
export function ensureListSubNodes(list: TreeItem) {
  ensureFieldsNode(list);
  ensureListContentTypesNode(list);
  ensureColumnFormattersNode(list);
  ensureViewsNode(list);
  ensureFieldCustomizersNode(list);
  ensureListViewCommandSetsNode(list);
  ensureListViewCommandSetsNode(list);
  ensureListSiteColumnsNode(list);
}
