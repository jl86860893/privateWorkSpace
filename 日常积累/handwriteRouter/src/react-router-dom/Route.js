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
                        let keys = []
                        const reg = pathToReg(path, keys, {end: exact});
                        keys = keys.map(item => item.name)
                        const result = pathname.match(reg)
                        let [url, ...values] = result;
                        let props = {
                            location: state.location,
                            history: state.history,
                            match: {
                                params: keys.reduce((obj,current, idx) => {
                                    obj[current] = values[idx]
                                    return obj
                                }, {})
                            }
                        }
                        if(result) {
                            return <Component {...props}></Component>
                        }
                        console.log(state)
                        return null;
                    }
                }
            </Consumer>
        )
    }
}