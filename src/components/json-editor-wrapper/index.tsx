import * as React from "react";
//import JsonEditor from "@dr-kobros/react-jsoneditor";
import JsonEditorReact from "../../components/json-editor-react";
import { ISiteScript } from "../../types";
// var schema = require("../../schema/site-design-script-actions.schema.json");
import "./index.css";
// var Ajv = require('ajv');

interface IJsonEditorWrapperProps {
  currentSiteScript: ISiteScript | null | undefined;
  setSiteScript: (siteScript: ISiteScript) => void;
}

const JsonEditorWrapper: React.SFC<IJsonEditorWrapperProps> = props => {
  // Editor configuration. See jsoneditor's API.
  // var ajv = new Ajv();
  
  // ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
  // ajv.addSchema(schema, 'JSON Schema for SiteScript Extensions')
  const options = {
    mode: "code",
    // schema,
    // ajv
  };
  return (
    <JsonEditorReact
      value={props.currentSiteScript ? props.currentSiteScript : {}}
      onChange={props.setSiteScript}
      onDirty={() => {}}
      options={options}
      height="100%"
      width="100%"
    />
  );
};
export default JsonEditorWrapper;
