import { ISiteScriptContainer, IAction } from "../types";
import { TreeItem } from "react-sortable-tree";
import { escapeJSON } from "../helpers";

export function convertSiteHierarchyToJson(
  siteScriptContainer: TreeItem[]
): ISiteScriptContainer {
  var returnObj: ISiteScriptContainer = {
    title: "New Site Script",
    id: "new",
    siteScript: {
      $schema: "schema.json",
      actions: [],
      bindata: {},
      version: 1
    }
  };
  var actions: IAction[] = [];
  if (siteScriptContainer[0].data.themeName) {
    var themeAction = {
      verb: "applyTheme",
      themeName: siteScriptContainer[0].data.themeName
    };
    actions.push(themeAction);
  }
  if (
    siteScriptContainer[0].data.timeZone ||
    siteScriptContainer[0].data.locale ||
    siteScriptContainer[0].data.sortOrder ||
    siteScriptContainer[0].data.hourFormat
  ) {
    var regionalSettingsction = {
      verb: "setRegionalSettings",
      timeZone: siteScriptContainer[0].data.timeZone,
      locale: siteScriptContainer[0].data.locale,
      sortOrder: siteScriptContainer[0].data.sortOrder,
      hourFormat: siteScriptContainer[0].data.hourFormat
    };
    actions.push(regionalSettingsction);
  }
  if (siteScriptContainer[0].data.hubSiteId) {
    var hubSiteAction = {
      verb: "joinHubSite",
      hubSiteId: siteScriptContainer[0].data.hubSiteId
    };
    actions.push(hubSiteAction);
  }
  if (siteScriptContainer[0].data.url) {
    var siteLogoAction = {
      verb: "setSiteLogo",
      url: siteScriptContainer[0].data.url
    };
    actions.push(siteLogoAction);
  }
  if (siteScriptContainer[0].data.capability) {
    var externalSharingAction = {
      verb: "setSiteExternalSharingCapability",
      capability: siteScriptContainer[0].data.capability
    };
    actions.push(externalSharingAction);
  }
  if (siteScriptContainer[0] && siteScriptContainer[0].children) {
    siteScriptContainer[0].children!.forEach(child => {
      switch (child.type) {
        case "lists":
          actions = actions.concat(actionCreateSPList(child.children));
          break;
        case "navLinks":
          actions = actions.concat(actionCreateNavLinks(child.children));
          break;
        case "removeNavLinks":
          actions = actions.concat(actionCreateRemoveNavLinks(child.children));
          break;
        case "addUsers":
          actions = actions.concat(actionAddUsers(child.children));
          break;
        case "siteColumns":
          actions = actions.concat(actionCreateSiteColumns(child.children));
          break;
        case "contentTypes":
          actions = actions.concat(actionCreateContentTypes(child.children));
          break;
        case "installSolutions":
          actions = actions.concat(
            actionCreateInstallSolutions(child.children)
          );
          break;
        case "associateExtensions":
          actions = actions.concat(
            actionCreateAssociateExtension(child.children)
          );
          break;
        case "triggerFlow":
          var triggerFlowAction = {
            verb: "triggerFlow",
            url: child.data.url,
            name: child.data.name,
            parameters: child.data.parameters
          };
          actions = actions.concat(triggerFlowAction);
          break;
        default:
          break;
      }
    });
  }
  if (actions) {
    returnObj.siteScript.actions = actions;
  }
  return returnObj;
}
function actionCreateSPList(children: TreeItem[] | undefined): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      let subactions: IAction[] = [];
      if (child.children) {
        child.children.forEach(child2 => {
          switch (child2.type) {
            case "listFields":
              subactions = subactions.concat(
                actionCreateSPFields(child2.children)
              );
              break;
            case "listContentTypes":
              subactions = subactions.concat(
                actionCreateListContentTypes(child2.children)
              );
              break;
            case "listSiteColumns":
              subactions = subactions.concat(
                actionCreateListSiteColumns(child2.children)
              );
              break;
            case "columnFormatters":
              subactions = subactions.concat(
                actionCreateColumnFormatters(child2.children)
              );
              break;
            case "listViews":
              subactions = subactions.concat(
                actionCreateListViews(child2.children)
              );
              break;
            case "listFieldCustomizers":
              subactions = subactions.concat(
                actionCreateFieldCustomizers(child2.children)
              );
              break;
            case "listViewCommandSets":
              subactions = subactions.concat(
                actionCreateListViewCommandSets(child2.children)
              );
              break;
            default:
              break;
          }
        });
      }
      let listAction = {
        verb: "createSPList",
        listName: child.data.listName,
        templateType: child.data.templateType,
        subactions: subactions
      };
      if (child.data.listDescription) {
        let listDescriptionAction = {
          verb: "setDescription",
          description: child.data.listDescription
        };
        listAction.subactions.push(listDescriptionAction);
      }
      if (child.data.listTitle) {
        let listTitleAction = {
          verb: "setTitle",
          title: child.data.listTitle
        };
        listAction.subactions.push(listTitleAction);
      }
      return listAction;
    });
  }

  return listActions;
}
function actionCreateListContentTypes(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      switch (child.type) {
        case "listContentType":
          return { verb: "addContentType", name: child.data.name };
        case "listContentTypeDeletion":
          return { verb: "removeContentType", name: child.data.name };
        default:
          return { verb: "" };
      }
    });
  }
  return listActions;
}
function actionCreateListSiteColumns(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      switch (child.type) {
        case "listSiteColumn":
          return { verb: "addSiteColumn", internalName: child.data.internalName, addToDefaultView: child.data.addToDefaultView };
        default:
          return { verb: "" };
      }
    });
  }
  return listActions;
}

function actionCreateSPFields(children: TreeItem[] | undefined): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      let verb;
      switch (child.type) {
        case "fieldDeletion":
          verb = "deleteSPField";
          break;
        case "fieldXML":
          verb = "addSPFieldXml";
          break;
        case "fieldLookupXML":
          verb = "addSPLookupFieldXml";
          break;
        default:
          verb = "addSPField";
      }
      return { ...child.data, verb };
    });
  }
  return listActions;
}
function actionCreateColumnFormatters(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      return {
        verb: "setSPFieldCustomFormatter",
        fieldDisplayName: child.data.fieldDisplayName,
        formatterJSON: child.data.formatterJSON
      };
    });
  }
  return listActions;
}
function actionCreateFieldCustomizers(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      return { ...child.data, verb: "associateFieldCustomizer", clientSideComponentProperties: escapeJSON(child.data.clientSideComponentProperties) };
    });
  }
  return listActions;
}
function actionCreateListViewCommandSets(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      return { ...child.data, verb: "associateListViewCommandSet", clientSideComponentProperties: escapeJSON(child.data.clientSideComponentProperties) };
    });
  }
  return listActions;
}
function actionCreateListViews(children: TreeItem[] | undefined): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      switch (child.type) {
        case "listViewDeletion":
          return {
            verb: "removeSPView",
            name: child.data.name
          };
        default:
          const viewFields =
            child.children &&
              child.children.length > 0 &&
              child.children[0].children
              ? child.children![0].children!.map(
                fieldObj => fieldObj.data.viewField
              )
              : [];
          return {
            verb: "addSPView",
            name: child.data.name,
            query: child.data.query,
            rowLimit: Number(child.data.rowLimit),
            isPaged: child.data.isPaged,
            makeDefault: child.data.makeDefault,
            scope: child.data.scope,
            formatterJSON: escapeJSON(child.data.formatterJSON),
            viewFields
          };
      }
    });
  }
  return listActions;
}
function actionCreateNavLinks(children: TreeItem[] | undefined): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      return {
        verb: "addNavLink",
        displayName: child.data.displayName,
        isWebRelative: child.data.isWebRelative,
        url: child.data.url
      };
    });
  }
  return listActions;
}
function actionCreateRemoveNavLinks(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      return {
        verb: "removeNavLink",
        displayName: child.data.displayName,
        isWebRelative: child.data.isWebRelative
      };
    });
  }
  return listActions;
}
function actionCreateSiteColumns(children: TreeItem[] | undefined): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      switch (child.type) {
        case "siteColumn":
          return {
            verb: "createSiteColumn",
            fieldType: child.data.fieldType,
            internalName: child.data.internalName,
            displayName: child.data.displayName,
            isRequired: child.data.isRequired,
            group: child.data.group,
            enforceUnique: child.data.enforceUnique,
            id:child.data.id
          };
        default:
          return {
            verb: "createSiteColumnXml",
            schemaXml: child.data.schemaXml,
            pushChanges: child.data.pushChanges
          };
      }
    });
  }
  return listActions;
}
function actionCreateContentTypes(children: TreeItem[] | undefined): IAction[] {
  var listActions: IAction[] = [];
  let subactions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      if (child.children) {
        child.children.forEach(child2 => {
          switch (child2.type) {
            case "contentTypeSiteColumns":
              subactions = subactions.concat(
                actionCreateContentTypeSiteColumns(child2.children)
              );
              break;

            default:
              break;
          }
        });
      }
      return {
        verb: "createContentType",
        name: child.data.name,
        description: child.data.description,
        parentName: child.data.parentName,
        parentId: child.data.parentId,
        id: child.data.id,
        hidden: child.data.hidden,
        subactions
      };
    });
  }
  return listActions;
}
function actionCreateContentTypeSiteColumns(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      return { verb: "addSiteColumn", internalName: child.data.internalName };
    });
  }
  return listActions;
}
function actionCreateInstallSolutions(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      return {
        verb: "installSolution",
        id: child.data.id,
        name: child.data.name
      };
    });
  }
  return listActions;
}
function actionCreateAssociateExtension(
  children: TreeItem[] | undefined
): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      let {
        title,
        location,
        clientSideComponentId,
        clientSideComponentProperties,
        registrationId,
        registrationType,
        scope
      } = child.data;
      return {
        verb: "associateExtension",
        title,
        location,
        clientSideComponentId,
        clientSideComponentProperties,
        registrationId,
        registrationType,
        scope
      };
    });
  }
  return listActions;
}
function actionAddUsers(children: TreeItem[] | undefined): IAction[] {
  var listActions: IAction[] = [];
  if (children) {
    listActions = children.map(child => {
      return {
        verb: "addPrincipalToSPGroup",
        principal: child.data.principal,
        group: child.data.group
      };
    });
  }
  return listActions;
}
