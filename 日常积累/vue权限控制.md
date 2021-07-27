# 按钮权限控制
vue自定义指令
```js
directives: {
  'hasPermission': {
    inserted: function (el, binding, vnode) {
      console.log('TCL: binding', binding.value)
      console.log('TCL: vnode', vnode.context)
      let types= vnode.context.$route.meta.types
      let values = binding.value
      let flag = true
      for (let v of values) {
        if (!types.includes(v)) {
          flag = false
        }
      }
      if (!flag) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
```


router
    module
    index.js
    routers.js

```js
// index.js
import store from '@/store'
// import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import routes from './routers'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router(routes)

// 1. 基于角色的路由守卫
// 2. 组件级的权限控制 -> directive

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    // method 1
    // const payload = jwt.decode(token)
    // method 2
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取localStorage里面缓存的token信息 + 用户信息
      // 8-24小时， refresh token 1个月
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
      if (!store.state.ws) {
        store.commit('initWebSocket', {})
      }
    } else {
      localStorage.clear()
    }
  }
  // to and from are Route Object,next() must be called to resolve the hook
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登录的页面进行区别
    if (isLogin) {
      // 已经登录的状态
      // 权限判断，meta元数据
      next()
    } else {
      // 未登录的状态
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router

```
```js
// routers.js

import Home from '@/views/Home.vue'

import users from './modules/user'
import login from './modules/login'
import content from './modules/content'

const Index = () =>
  import(/* webpackChunkName: 'index' */ '@/views/channels/Index.vue')
const Template1 = () =>
  import(/* webpackChunkName: 'template1' */ '@/views/channels/Template1.vue')
const NoFound = () =>
  import(/* webpackChunkName: 'notfound' */ '@/views/NotFound.vue')

export default {
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    ...content,
    ...login,
    ...users,
    {
      path: '/404',
      name: '404',
      component: NoFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
}

```

```js
// modules/content.js
const Add = () =>
  import(/* webpackChunkName: 'add' */ '@/components/contents/Add.vue')
const Edit = () =>
  import(/* webpackChunkName: 'edit' */ '@/components/contents/Edit.vue')
const Detail = () =>
  import(/* webpackChunkName: 'detail' */ '@/components/contents/Detail.vue')

export default [
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:tid',
    props: true,
    name: 'edit',
    component: Edit,
    meta: { requiresAuth: true },
    beforeEnter (to, from, next) {
      // 正常的情况 detail
      if (
        ['detail', 'mypost'].indexOf(from.name) !== -1 &&
        to.params.page &&
        to.params.page.isEnd === '0'
      ) {
        next()
      } else {
        // 用户在edit页面刷新的情况
        const editData = localStorage.getItem('editData')
        if (editData && editData !== '') {
          const editObj = JSON.parse(editData)
          if (editObj.isEnd === '0') {
            next()
          } else {
            next('/')
          }
        } else {
          next('/')
        }
      }
    }
  },
  {
    path: '/detail/:tid',
    name: 'detail',
    props: true,
    component: Detail,
    meta: {
      // 通过后台接口动态添加到路由 addRoutes
      types: ['get', 'add', 'delete']
    }
  }
]

```
通过自定义指令中的值与meta信息作比较控制
```html
<div v-hasPermission="['add', 'edit']">hahah</div>
```

# 菜单表设计
字段 | 类型 |  空 | 默认 | 注释  
-|-|-|-|-
mid | ObjectId | 否 |  | MongoDB自动产生 
name | String | 否 |  | 菜单名称
path | String | 否 |  | 资源路径
component | String | 否 |  | 前段组建
hideInBread | Number| 否 |  | 在面包屑中是否隐藏，0-否，1-隐藏
hideInMenu | Number | 是 |  | 在菜单中是否隐藏，0-否，1-隐藏
notChache | Number | 否 | 0 | 0-页面会缓存，1-页面不会使用缓存
icon | String | 是 |  | 默认的图标
sort | Number | 是 |  | 默认排名
redirect | String | 是 |  | 路由重定向
children | Array | 是 |  | 子路由
type | String | 是 | menu | menu-目录， resource-资源-》api
operations | Array | 是 | [] | 资源目录，资源访问信息

operations：  
字段 | 类型 |  空 | 默认 | 注释  
-|-|-|-|-
opid | int(10) | 否 |  | 
name | String | 否 |  | 资源名称
method | string | 否 | 
type | String | 否 |  | 资源类型，btn-按钮，api-资源类型
path | String | 否 |  | 资源路径->api请求路径
remark | String | 是 |  | 资源路描述

# 权限数据表

字段 | 类型 |  空 | 默认 | 注释  
-|-|-|-|-
uid | int(10) | 否 |  | 
name | String | 否 |  | 角色名称
desc | String | 否 |  | 角色描述
menu | Array | 是 |  | 菜单-操作权限

menu为子菜单信息，与菜单表对应一致



