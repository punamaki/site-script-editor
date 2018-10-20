import { TreeItem } from "react-sortable-tree";

export interface IStoreState {
  messageList: IMessage[];
  currentSiteScriptContainer: ISiteScriptContainer | null;
  treeData: TreeItem[];
  nodeTypesProps: IDictionary<INodeTypeProps>;
}
export interface IDictionary<TValue> {
  [id: string]: TValue;
}
export interface INodeTypeProps {
  height: number;
  canDrag: boolean;
  canDrop: boolean;
}
export interface IMessage {
  id: string;
  info?: string;
  type?: IMessageType;
  fadeout?: boolean;
}
export enum IMessageType {
  warning,
  info,
  success,
  saving,
  internal
}
export interface ISiteScript {
  $schema: string;
  actions: IAction[];
  bindata: object;
  version: number;
}
export interface ISiteScriptContainer {
  title: string;
  siteScript: ISiteScript;
  id: string;
  description?: string;
}
export interface IAction {
  verb: string;
  [key: string]: any;
  subactions?: ISubaction[];
}
export interface ISubaction {
  verb: string;
  [key: string]: any;
}
