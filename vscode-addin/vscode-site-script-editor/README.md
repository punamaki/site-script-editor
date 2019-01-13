from json to UI: 

const newScript = {...siteScriptContainer }

newScript.siteScript = siteScript;

this.setState({
      siteScriptsContainer: newScript
    });


from UI to json: 

editor.setSiteScriptContainer => onChange event