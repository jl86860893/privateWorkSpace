import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from './react-router-dom'
export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to='/home/a'>二级菜单</Link>
                    <Link to='/home/b'>二级菜单</Link>
                </div>
                <Route path='/home/a' component={<div>111</div>} />
                <Route path='/home/b' component={<div>222</div>} />
            </div>
        )
    }
}