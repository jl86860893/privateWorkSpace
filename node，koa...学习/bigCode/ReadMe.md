## koa的运行过程
`'koa-router', 'koa', 'koa-body', 'koa-cors', 'koa-json'`  `koa-helmet, koa-static`
- 核心概念：路由， 中间件， body解析， 跨域， json格式化, 更安全的头部, 静态资源
 
示例：
```js
const koa = require('koa')
const path = require('path')
const koaRouter = require('koa-router')
const koaBody = require('koa-body')
const koaCors = require('@koa/cors')
const helmet = require('koa-helmet')
const statics = require('koa-static')
const koaJson = require('koa-json')

const app = new koa()
app.use(helmet())
app.use(statics(__dirname, path.join('../public')))
const router = new koaRouter()

router.prefix('/api')

router.get('/', ctx => {
  const { body } = ctx.request;
  ctx.body = {
    ...body,
  }
})

app.use(koaBody())
app.use(koaCors())
app.use(koaJson({ pretty: false, param: 'pretty' }))

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
```