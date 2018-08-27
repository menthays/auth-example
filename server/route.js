const Router = require('koa-router')

const utils = require('./utils') 
const router = new Router()

router.prefix('/api')

router.get('/', async(ctx, next) => {
  ctx.redirect('https://google.com')
})

router.post('/login', async ctx => {
  const {username, password} = ctx.request.body
  try {
    if (username === 'ccz' && password === 'cyy') {
      ctx.body = {
        code: 200,
        message: 'Login success!',
        username,
        token: utils.signToken({
          username
        })
      }
    } else {
      ctx.throw(423, 'Login info error!')
    }
  } catch (e) {
    ctx.throw(e)
  }
})

router.post('/userinfo', async ctx => {
  const user = utils.checkToken(ctx)

  ctx.body = {
    code: 200,
    message: 'Get user info successfully!',
    username: user.username,
    token: utils.signToken(user)
  }
});

module.exports = router;
