import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Redirect, Switch } from './react-router-dom';
import reactDom from 'react-dom';

import Canvas from './pages/Canvas'
import Profile from './pages/Profile'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/canvas">Canvas</Link>
          <Link to="/profile">profile</Link>
        </div>

        <Switch>
          <Route path='/canvas/123' component={Canvas} />
          <Route path='/canvas' exact={true} component={Canvas} />
          <Route path='/profile' component={Profile} />
          <Redirect to='/canvas' />
        </Switch>

      </Router>
    )
  }
}

export default reactDom.render(<App />, document.getElementById('root'))