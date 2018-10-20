import {
  IStoreState,
  IMessage,
  ISiteScriptContainer,
  IDictionary,
  INodeTypeProps
} from "../types";
import { combineReducers, Reducer } from "redux";
import { TreeItem } from "react-sortable-tree";

export function messageList(state: IMessage[] = [], action: any) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.message];
    case "REMOVE_MESSAGE":
      return state.filter(message => message.id !== action.id);
    case "FADEOUT_MESSAGE":
      return state.map(message => {
        if (message.id === action.id) {
          return {
            ...message,
            fadeout: true
          };
        }
        return message;
      });
    default:
      return state;
  }
}
export function currentSiteScriptContainer(
  state: ISiteScriptContainer | null = null,
  action: any
) {
  switch (action.type) {
    case "SET_SITE_SCRIPT":
      return action.siteScriptContainer;
    default:
      return state;
  }
}
export function treeData(state: TreeItem[] = [], action: any) {
  switch (action.type) {
    case "SET_TREE_DATA":
      return [...action.treeData];
    default:
      return state;
  }
}
export function nodeTypesProps(
  state: IDictionary<INodeTypeProps> = {},
  action: any
) {
  switch (action.type) {
    case "SET_NODE_TYPE_PROPS":
      var returnObj = { ...state };
      returnObj[action.nodeType] = action.nodeTypeProps;
      return returnObj;
    case "SET_ALL_NODE_TYPE_PROPS":
      return action.allProps
    default:
      return state;
  }
}
export const rootReducer: Reducer<IStoreState> = combineReducers<IStoreState>({
  messageList,
  currentSiteScriptContainer,
  treeData,
  nodeTypesProps
});
