import { h, render } from './vdom'

h(
  'div',
  { id: 'wrapper', a: 1 },
  h('span', { style: {color: 'red'} }, 'hello'),
  'myhahaha'
)

render(vnode, app) // app为id为app的dom，在代码中可直接获取window.app