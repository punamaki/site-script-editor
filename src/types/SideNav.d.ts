declare module 'react-sidenav' {
    import * as react from 'react';
    export default class SideNav extends React.Component < SideNavProps,
    any > {}
    export interface SideNavProps {
        defaultSelected?: string;
        selected?: string;
        onItemSelection?:any;
        highlightColor?: string,
        highlightBgColor?: string,
        hoverBgColor?: string,
        hoverColor?: string
    }
    export class Nav extends React.Component < NavProps,
    any > {}
    export interface NavProps {
        children?: any,
        highlightColor?: string,
        highlightBgColor?: string,
        isHighlighted?: boolean,
        id: string | number,
        onClick?: any,
        onNavClick?: any,
        highlightedId?: string | number,
        renderSubNavIndicator?: any
        hoverBgColor?: string,
        hoverColor?: string,
        expanded?: boolean,
        collapseIndicatorSize?: string
    }
    export const NavIcon:React.SFC;
    export const NavText:React.SFC;
}