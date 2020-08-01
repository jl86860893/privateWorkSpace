const koa = require('koa')
const path = require('path')
const koaBody = require('koa-body')
const koaCors = require('@koa/cors')
const koaJson = require('koa-json')
const helmet = require('koa-helmet')
const statics = require('koa-static')
const router = require('./routes/index')

const app = new koa();

app.use(helmet())
app.use(statics(__dirname, path.join('../public')))
app.use(router())

app.use(koaBody())
app.use(koaCors())
app.use(koaJson({ pretty: false, param: 'pretty' }))

app.listen(3000)