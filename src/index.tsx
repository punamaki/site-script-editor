import * as React from "react";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, Action } from "redux";
import { IStoreState, ISiteScriptContainer } from "./types";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Provider } from "react-redux";
import Editor from "./containers/editor";
import { rootReducer } from "./reducers";
import { initializeIcons } from "@uifabric/icons";
import * as actions from "./actions";
import { autobind } from "@uifabric/utilities";
import { convertJsonToSiteHierarchy } from "./converters";
import { setupExpansion } from './helpers';

const loggerMiddleware = createLogger();
const store = createStore<IStoreState, Action<any>, {}, {}>(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

export interface Props {
  siteScriptContainer?: ISiteScriptContainer | null;
  onSiteScriptContainerChange?:(newSiteScriptContainer:ISiteScriptContainer)=>void;
  showHelpCoachmarks?:boolean;
}

export interface State {
  siteScriptContainerFromParent: ISiteScriptContainer | null;
  siteScriptContainerOld: ISiteScriptContainer | null;
}

export default class SiteScriptEditor extends React.Component<Props, State> {
  public static defaultProps: Props = {showHelpCoachmarks:false};

  constructor(props: Props) {
    super(props);
    this.state = { siteScriptContainerFromParent: null , siteScriptContainerOld:null};
  }
  @autobind
  private setSiteScriptContainer(
    siteScriptContainer: ISiteScriptContainer | null
  ) {
    if (siteScriptContainer) {
      const oldTreeData = store.getState().treeData;
      let newTreeData = convertJsonToSiteHierarchy(siteScriptContainer);
      if(oldTreeData && oldTreeData.length > 0) {
        newTreeData = [setupExpansion(oldTreeData[0], newTreeData[0])];
      }

      store.dispatch(actions.setSiteScript(siteScriptContainer));
      store.dispatch(actions.setTreeData(newTreeData));
      if(this.props.showHelpCoachmarks) {
        store.dispatch(actions.showCoachmarks(this.props.showHelpCoachmarks));
      }
      this.setState({ siteScriptContainerFromParent: siteScriptContainer });
    }
  }
  public componentDidMount() {
    initializeIcons();
  }
  @autobind
  public componentWillReceiveProps(newProps: Props) {
    if (
      newProps.siteScriptContainer && this.state.siteScriptContainerFromParent !== newProps.siteScriptContainer
    ) {
      this.setSiteScriptContainer(newProps.siteScriptContainer);
    }



  }

  render() {
    return (
      <Provider store={store}>
        <Fabric style={{ width: "100%", height: "100%" }}>
          <Editor onSiteScriptContainerChange={this.props.onSiteScriptContainerChange}/>
        </Fabric>
      </Provider>
    );
  }
}
