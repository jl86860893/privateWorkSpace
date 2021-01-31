import React, { Component } from 'react'
import { Consumer } from './context';

export default class Link extends Component {
    render() {
        const { to } = this.props;
        return (
            <Consumer>
                {
                    state => {
                        state.history.push(to)
                        return null
                    }
                }
            </Consumer>
        )
    }
}
