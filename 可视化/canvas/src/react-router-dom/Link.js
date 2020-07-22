import React, { Component } from 'react'
import { Consumer } from './context';

export default class Link extends Component {
    render() {
        const { to } = this.props;
        return (
            <Consumer>
                {
                    state => {
                        return <a onClick={() => {
                            state.history.push(to)
                        }}>{this.props.children}</a>
                    }
                }
            </Consumer>
        )
    }
}