import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provide, Provider } from './context';
export default class HashRouter extends Component {
    state = {
        location: {
            pathname: window.location.hash.slice(1) || '/',
        }
    }
    componentDidMount() {
        // 默认hash没有时跳转到"/""
        window.location.hash = window.location.hash || '/';
        // 监听hash值变化
        window.addEventListener('hashchange', () => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname: window.location.hash.slice(1) || '/',
                }
            })
        })
    }

    render() {
        let value = {
            location: this.state.location,
            history: {
                push(to) {
                    window.location.hash = to
                },
            }
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}