import * as React from "react";
import * as ReactDOM from "react-dom";

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
ReactDOM.render(
  <SiteScriptEditor siteScriptContainer={siteScriptContainer} />,
  document.getElementById("root") as HTMLElement
);
