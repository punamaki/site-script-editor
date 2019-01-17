import * as React from "react";
import * as ReactDOM from "react-dom";

import './style.css';

import SiteScriptEditor from "site-script-editor";
import { ISiteScriptContainer } from "site-script-editor/dist/types";
const siteScriptContainer: ISiteScriptContainer = {
  description: "Starter example",
  id: "starter",
  siteScript: {
    $schema: "schema.json",
    actions: [
      {
        locale: 1033,
        verb: "setRegionalSettings",

      },
      {
        group: "Owners",
        principal: "ContosoAdmins",
        verb: "addPrincipalToSPGroup"
      }
    ],
    bindata: {},
    version: 1
  },
  title: "One list, one group"
};

interface IState {
  siteScriptsContainer?: ISiteScriptContainer
}

class Main extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      siteScriptsContainer: undefined
    }
  }

  public componentDidMount() {
    this.setState({
      siteScriptsContainer: siteScriptContainer
    });
  }

  public render() {
    return (
      <div className="sd_main">
        <div className="sd_body">
          <div className="sd_editor_container">
            <SiteScriptEditor siteScriptContainer={this.state.siteScriptsContainer} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("root") as HTMLElement
);