import React from 'react';
import ReactDOM from 'react-dom';
import pathToReg from 'path-to-regexp';
import { Consumer } from './context';

export default class Route extends React.Component {
    render() {
        return (
            <Consumer>
                {
                    state => {
                        let { path, component: Component, exact=false } = this.props;
                        let pathname = state.location.pathname;
                        const reg = pathToReg(path, [], {end: exact});
                        const result = pathname.match(reg)
                        if(result) {
                            return <Component></Component>
                        }
                        console.log(state)
                        return null;
                    }
                }
            </Consumer>
        )
    }
}