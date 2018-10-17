import * as React from 'react';
//import JsonEditor from "@dr-kobros/react-jsoneditor";
import JsonEditorReact from '../../components/json-editor-react'
import {ISiteScript} from '../../types';
import  './index.css';

interface IJsonEditorWrapperProps {
  currentSiteScript : ISiteScript|null|undefined;
  setSiteScript : (siteScript : ISiteScript) => void;
}

const JsonEditorWrapper : React.SFC < IJsonEditorWrapperProps > = (props) => {

  // Editor configuration. See jsoneditor's API.
  const options = {

    mode: 'code',
    modes: [
      'code',  'text', 'tree'
    ],
  };
  return <JsonEditorReact
    value={props.currentSiteScript?props.currentSiteScript:{}}
    onChange={props.setSiteScript}
    onDirty={()=> { }}  
    options={options}
    height="100%"
    width="100%"/>;
};
export default JsonEditorWrapper;