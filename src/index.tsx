import * as React from "react";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, Action } from "redux";
import { IStoreState } from "./types";

import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Provider } from "react-redux";
import Editor from "./containers/editor";
import { rootReducer } from "./reducers";
import { initializeIcons } from "@uifabric/icons";

const loggerMiddleware = createLogger();
const store = createStore<IStoreState, Action<any>, {}, {}>(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

export interface Props {}

export interface State {}

export default class SiteScriptEditor extends React.Component<Props, State> {
  public static defaultProps: Props = {};

  constructor(props: Props) {
    super(props);
    initializeIcons(); 
  }

  render() {
    return (
      <Provider store={store}>
        <Fabric>
          <Editor />
        </Fabric>
      </Provider>
    );
  }
}
