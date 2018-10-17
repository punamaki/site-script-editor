import * as React from 'react';
import {NavLink} from 'react-router-dom';
import './navigation.css';

export default function Navigation() {
    return <div className="sd_navigation">
        <nav>
            <ul>
                <li>
                    <NavLink exact={true} to='/' activeClassName="active" >Home</NavLink>
                </li>
                <li>
                    <NavLink to='/about' activeClassName="active" >About</NavLink>
                </li>
            </ul>
        </nav>
    </div>;
}