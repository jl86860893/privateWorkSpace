import React, {Component} from 'react';
import { HashRouter as Router, Route, Link, Redirect, Switch} from './react-router-dom';
import reactDom from 'react-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/home">首页</Link>
                    <Link to="/profile">profile</Link>
                    <Link to="/b">b</Link>
                </div>
                <div>
                    <Switch>
                        <Route path='/home/123' component={<Home />} />
                        <Route path='/home' exact={true} component={<Home />} />
                        <Route path='/profile' component={<Profile />} />
                        <Route path='/b' component={} />
                        <Redirect to='/home' component={} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default reactDom.render(App, <div id="root"></div>)