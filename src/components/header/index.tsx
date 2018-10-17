import * as React from 'react';
import './index.css';
import Navigation from '../../components/navigation';

export default function Header() {
    return <div className="sd_header">    
            <div className="sd_title">SharePoint Site Designer Beta</div>
            <div className="sd_navigation_container"><Navigation/></div>
    </div>;
}
