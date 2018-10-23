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
}

export default class SiteScriptEditor extends React.Component<Props, State> {
  public static defaultProps: Props = {showHelpCoachmarks:false};

  constructor(props: Props) {
    super(props);
    this.state = { siteScriptContainerFromParent: null };
  }
  @autobind
  private setSiteScriptContainer(
    siteScriptContainer: ISiteScriptContainer | null
  ) {
    if (siteScriptContainer) {
      store.dispatch(actions.setSiteScript(siteScriptContainer));
      store.dispatch(actions.setTreeData(convertJsonToSiteHierarchy(siteScriptContainer)));
      if(this.props.showHelpCoachmarks) {
        store.dispatch(actions.showCoachmarks(this.props.showHelpCoachmarks));
      }
      this.setState({ siteScriptContainerFromParent: siteScriptContainer });
    }
  }
  public componentDidMount() {
    initializeIcons();
  }
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
          <Editor />
        </Fabric>
      </Provider>
    );
  }
}
