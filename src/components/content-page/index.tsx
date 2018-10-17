import * as React from 'react';
import './index.css';

interface IContentPageProps {

}

const ContentPage : React.SFC < IContentPageProps > = (props) => {
    return <div className="sd_content_page">    
        {props.children}
    </div>;
}
export default ContentPage;