import * as React from 'react';
import ContentPage from '../../components/content-page'

export default function About() {
    const domain = "frontium.com"
    return <ContentPage>
        <h1>SharePoint Site Designer</h1>
        <p>This is a beta version from a SharePoint site designer. It's purpose is to help to build Site designs and site scripts. </p>
        <p>Created by <a href={"mailto:mikko.punamaki@"+domain}>Mikko Punamäki</a>.</p>
        <p>Site is provided by <a href="https://www.frontium.com" target="_new">Frontium</a>.</p>
        <p>Help texts are from <a href="https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-design-overview">Microsoft docs</a>, and Samples are from a Github project <a href="https://github.com/SharePoint/sp-dev-site-scripts">SharePoint Site Script samples</a>.</p>
        <p>This project is free to use for everyone. Enjoy!</p>
        Releases:
        <br/>
        <p><b>Beta 0.1.6 </b><br/>
        2018.10.07<br/>
        Support for regional settings<br/>
        Support for adding users to SharePoint groups<br/>
        Containers now show the children amount
        </p>
        <p><b>Beta 0.1.5 </b><br/>
        2018.09.30<br/>
        Support for content types<br/>
        Support for solution installations<br/>
        Added more samples<br/>
        </p>
        <p><b>Beta 0.1.4 </b><br/>
        2018.09.23<br/>
        Support for xml site columns<br/>
        </p>
        <p><b>Beta 0.1.3 </b><br/>
        2018.09.15<br/>
        Bug fixes<br/>
        Added help icons to elements<br/>
        Support for lookup fields and site columns
        </p>
        <p><b>Beta 0.1.2 </b><br/>
        2018.05.27<br/>
        Support for field customizers and list view command sets
        </p>
        <p><b>Beta 0.1.1 </b><br/>
        2018.05.20<br/>
        Support for views added, new parameters for list fields
        </p>
        <p><b>Beta 0.1.0 </b><br/>
        2018.03.27<br/>
        Support for all nodes complete (so far)
        </p>
        <p><b>Alpha 0.0.4 </b><br/>
        2018.03.26<br/>
        Added multiple nodes, hub sites, navigation links, etc
        Enhanced UI and internal structures
        </p>
        <p><b>Alpha 0.0.3 </b><br/>
        2018.03.11<br/>
        Added multiple nodes, like lists and fields
        Enhanced UI
        </p>
        <p><b>Pre-alpha 0.0.2 </b><br/>
        2018.01.20<br/>
        Tree editor enhancements
        </p>
        <p>
        <b>Initial pre-alpha 0.0.1 </b><br/>
        2018.01.14<br/>
        Layout created, started with tree and script editor
        </p>

        </ContentPage>;
}