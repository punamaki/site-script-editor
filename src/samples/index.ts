var sample1Json = require("./install-appcat-solution.json");
var sample2Json = require("./site-create-lists-add-to-site-nav.json");
var sample3Json = require("./site-script-column-row-formatting-on-list.json");
var sample4Json = require("./applyCompanyTheme.json");
var sample5Json = require("./apply-external-sharing-capability.json");
var sample6Json = require("./applyJoinHubSite.json");
var sample7Json = require("./apply-principal-to-spgroup.json");
var sample8Json = require("./apply-regional-settings.json");
var sample9Json = require("./remove-default-team-template-links.json");
 const samples = [
    {
        id:"install-appcat-solution",
        title: "Install SharePoint Framework solution",
        description:"The installSolution allows you to install a solution you have deployed to the tenant app catalog and enabled using the new ALM APIs.",
        siteScript: sample1Json
    },
    {
        id:"site-create-lists-add-to-site-nav",
        title: "Create lists with specific schema",
        description:"site-create-lists-add-to-site-nav",
        siteScript: sample2Json
    },
    {
        id:"site-apply-column-and-row-formatting",
        title: "Apply Custom Column and View formatting to a list",
        description:"site-apply-column-and-row-formatting",
        siteScript: sample3Json
    },
    {
        id:"applyCompanyTheme",
        title: "Applying custom theme",
        description:"You can use a site script to apply a company theme to a modern site. The following example uses the applyTheme action to set a pre-loaded company theme after site creation. This action requires simply referencing a company theme name, so one must be first installed to your tenant gallery. For more details on this check out https://aka.ms/spsitetheming - and if you need help creating a theme be sure to check out the theme generator at https://aka.ms/spthemebuilder.",
        siteScript: sample4Json
    },
    {
        id:"apply-external-sharing-capability",
        title: "Configure external sharing setting",
        description:"You can use the setSiteExternalSharingCapability action to configure the external sharing settings of the site.",
        siteScript: sample5Json
    },
    {
        id:"applyJoinHubSite",
        title: "Joining site to a hub site",
        description:"You can use the setSiteExternalSharingCapability action to configure the external sharing settings of the site.",
        siteScript: sample6Json
    },
    {
        id:"apply-principal-to-spgroup",
        title: "Adding  users and groups to the site",
        description:"You can use the addPrincipaltoSPGroup action to add other users and groups to the site SharePoint groups. Note: not O365 Groups.",
        siteScript: sample7Json
    },
    {
        id:"apply-regional-settings",
        title: "Configure Regional Settings for site",
        description:"You can use the setRegionalSettings action to configure the regional settings of the site (/_layouts/15/regionalsetng.aspx)",
        siteScript: sample8Json
    },
    {
        id:"remove-default-team-template-links",
        title: "Remove links from the site navigation list",
        description:"You can use the removeNavLink script action to remove links from the site navigation list. This can be especially useful for removing links that are added by default with the collaboration and communication templates.",
        siteScript: sample9Json
    }
]
export default samples;