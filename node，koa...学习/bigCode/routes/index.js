const combineRouters = require('koa-combine-routers')

const aRouter = require('./aRouter')
const bRouter = require('./bRouter')

module.exports = combineRouters(
  aRouter,
  bRouter,
)