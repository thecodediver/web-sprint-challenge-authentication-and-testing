const User = require("./auth-model")
const { jwtSecret } = require('../middleware/secret')
const jwt = require("jsonwebtoken")

const isValid = async (req, res, next) => {
  if(!req.body.username || !req.body.password) {
    res.status(401).json("username and password required")
  } else {
    const checkExists = await User.getUserByUsername(req.body.username)
    if(checkExists.length > 0) {
      res.status(401).json("username taken")
    } else {
      next()
    }
  }
}

function makeToken(user) {
  // we use a lib called jsonwebtoken
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  }
  const options = {
    expiresIn: '900s',
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = {
  isValid,
  makeToken
}