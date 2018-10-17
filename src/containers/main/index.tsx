import * as React from 'react';
import * as actions from 'actions';
import {connect} from 'react-redux';
import {IMessage} from 'types';
import './main.css';
import Header from 'components/header';
import Routes from 'components/routes';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {initializeIcons} from '@uifabric/icons';
import SplitPane from 'react-split-pane';
import {load} from 'webfontloader';
import * as ReactGA from 'react-ga';

export interface IConnectedDispatch {}
export interface IMainState {
    messageList : IMessage[];
}
export function mapStateToProps({messageList} : IMainState) {
    return {messageList};
}
export function mapDispatchToProps(dispatch : any) : IConnectedDispatch {
    return {
        removemessage: (id : string) => {
            dispatch(actions.removemessage(id));
        },
        addmessage: (message : IMessage) => {
            dispatch(actions.addmessage(message));
        }
    };
}

class Main extends React.Component < IMainState & IConnectedDispatch & RouteComponentProps < {} > > {
    constructor(props : IMainState & IConnectedDispatch & RouteComponentProps < {} >) {
        super(props);
        initializeIcons();
        ReactGA.initialize('UA-78686970-3');
        ReactGA.pageview(window.location.pathname + window.location.search);
        load({
            google: {
              families: ['Work Sans']
            }
          });
    }

    render() {
        return <div className="sd_main">
            <SplitPane split="horizontal" minSize={50} allowResize={false} pane1Style={{backgroundColor:"rgb(0,0,0)"}}>
                <header className="sd_header_container"><Header/></header>
                <div className="sd_body">
                    <Routes/>
                </div>
                <footer/>
            </SplitPane>
        </div>;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));