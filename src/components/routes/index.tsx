import {Switch, Route} from 'react-router-dom';
import * as React from 'react';
import About from '../../containers/about';
import Editor from '../../containers/editor'

interface IRoutesProps {

}
const Routes: React.SFC<IRoutesProps> = () => {
    return <Switch>
        <Route exact path='/' component={Editor}/>
        <Route path='/about' component={About}/>
    </Switch>
}

export default Routes;