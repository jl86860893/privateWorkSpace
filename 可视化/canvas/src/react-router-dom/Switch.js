import React, { Component } from 'react'
import { Consumer } from './context';

const { pathToRegexp } = require('path-to-regexp');

export default class Switch extends Component {
    render() {
        return (
            <Consumer>
                {
                    state => {
                        let pathname = state.location.pathname;
                        let children = this.props.children;
                        for(var i = 0; i < children.length; i++) {
                            let child = children[i];
                            // redirect 可能没有path属性
                            let path = child.props.path || '';
                            let reg = pathToRegexp(path, [], {end:false})
                            // switch 匹配成功了
                            if(reg.test(pathname)) {
                                return child; // 把匹配到的组件返回即可
                            }
                        }
                        return null;
                    }
                }
            </Consumer>
        )
    }
}