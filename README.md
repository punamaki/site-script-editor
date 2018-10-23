## Site Script Editor for SharePoint (site-script-editor)
This is a beta version from a site script editor for SharePoint. It's purpose is to help creating site scripts.

This is built as a React component, use it like this:  

```
const siteScriptContainer = {
    title: "My Site Script",
    id: "mySiteScript",
    siteScript: {
        "$schema": "schema.json",
        "actions": [
            {
            "verb": "addPrincipalToSPGroup",
            "principal": "CompanyAdmin",
            "group": "Owners"
            }
        ],
        "bindata": {},
        "version": 1
        }
}
<SiteScriptEditor siteScriptContainer={this.state.siteScriptContainer}/>
```

Site Script Editor is available online at [sitedesigner.io](https://www.sitedesigner.io "Site Designer for SharePoint") (courtesy of [Frontium.com](https://www.frontium.com "Frontium")).
Help texts are from [Microsoft docs](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-design-overview)

Created by [Mikko Punamäki](https://github.com/punamaki)