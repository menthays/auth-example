const jwt = require('jsonwebtoken')
const config = require('./config')

const signToken = (user) => {
  const token = jwt.sign({
      id: user.id,
      secret: user.app_secret
  }, config.jwt_secret, {expiresIn: 3600})
  return token
}


const checkToken = (ctx) => {
  return true
}

module.exports = {
  signToken, checkToken
}