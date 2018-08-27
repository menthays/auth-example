const koa = require('koa')
const jwt = require('koa-jwt')
const json = require('koa-json')
const cors = require('kcors')
const bodyparser = require('koa-bodyparser')

const config = require('./config')
const route = require('./route')

const app = new koa()

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(cors())
app.use(json())
app.use(jwt({
  secret: config.jwt_secret
}).unless({
  path: [/^\/api\/login/, /^\/api\/register/]
}))

app.use(async(ctx, next) => {
  try {
    await next()
  } catch (e) {
    e.code = e.code || ctx.status.code
    console.log(e)
  }
})

app.use(route.routes(), route.allowedMethods())

app.listen(8888)