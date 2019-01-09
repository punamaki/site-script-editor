import autobind from 'autobind-decorator';
import * as React from "react";
import * as ReactDOM from "react-dom";

import './style.css';

const isVSCode = typeof acquireVsCodeApi !== 'undefined';
let vscode: any;
if (isVSCode) {
  vscode = acquireVsCodeApi();
}

// tslint:disable:object-literal-sort-keys

import SiteScriptEditor from "site-script-editor";
import { ISiteScript, ISiteScriptContainer } from "site-script-editor/dist/types";
const siteScriptContainer: ISiteScriptContainer = {
  description: "VSCode site script",
  id: "vscode",
  siteScript: {
    $schema: "schema.json",
    actions: [],
    bindata: {},
    version: 1
  },
  title: "One list, one group"
};

interface IState {
  siteScriptsContainer?: ISiteScriptContainer
}

class Main extends React.Component<any, IState> {

  private receivedSiteScript: string = '';

  constructor(props: any) {
    super(props);

    this.state = {
      siteScriptsContainer: undefined
    }

    window.addEventListener('message', event => {
      const message = event.data;
      if (!message.command) {
        return;
      }

      switch (message.command) {
        case 'site_scripts_update':
          // make sure script is minified
          this.receivedSiteScript = JSON.stringify(JSON.parse(message.json));

          this.updateState(JSON.parse(message.json));
          break;
      }
    });
  }

  public componentDidMount() {
    if (isVSCode) {
      vscode.postMessage({
        command: 'site_scripts_ui_loaded'
      });
    }
    
    if (!isVSCode) {
      // add something to show the UI in none-vscode mode
      this.updateState({
        "$schema": "schema.json",
        "actions": [
          {
            "verb": "setRegionalSettings",
            "locale": 1033,
            "sortOrder": 25
          },
          {
            "verb": "addPrincipalToSPGroup",
            "principal": "ContosoAdmins",
            "group": "Visitors"
          },
          {
            "verb": "createSPList",
            "listName": "Employees",
            "templateType": 100,
            "subactions": [
              {
                "displayName": "Full name",
                "internalName": "fullName",
                "isRequired": false,
                "addToDefaultView": false,
                "fieldType": "Text",
                "enforceUnique": false,
                "verb": "addSPField"
              },
              {
                "verb": "setTitle",
                "title": "employees"
              }
            ]
          }
        ],
        "bindata": {},
        "version": 1
      });
    }
  }

  public render() {
    return (
      <div className="sd_main">
        <div className="sd_body">
          <div className="sd_editor_container">
            <SiteScriptEditor siteScriptContainer={this.state.siteScriptsContainer} showHelpCoachmarks={false} onSiteScriptContainerChange={this.siteScriptChanged} />
          </div>
        </div>
      </div>
    )
  }

  @autobind
  private siteScriptChanged(siteScript: ISiteScriptContainer) {
    const jsonString = JSON.stringify(siteScript.siteScript, null, 2);
    const minifiedJson = JSON.stringify(siteScript.siteScript);

    // when update goes from vscode, it always trigger siteScriptChanged event
    // that way we can prevent re-initialization back to vscode
    if (minifiedJson === this.receivedSiteScript) {
      return;
    }
    this.receivedSiteScript = minifiedJson;

    if (isVSCode) {
      vscode.postMessage({
        command: 'site_scripts_sync',
        siteScript: jsonString
      });
    }
  }

  private updateState(siteScript: ISiteScript) {
    const newScript = { ...siteScriptContainer };
    newScript.siteScript = siteScript;
    this.setState({
      siteScriptsContainer: newScript
    });
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("root") as HTMLElement
);