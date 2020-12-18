const router = require('express').Router();
const bcrypt = require("bcryptjs")

const Users = require("./auth-model")
const { isValid, makeToken } = require("./auth-helper")


router.post('/register', isValid, async (req, res) => {
  const credentials = req.body
  const rounds = 10
  const hash = bcrypt.hashSync(credentials.password, rounds)

  credentials.password = hash

  try {
    const newUser = await Users.addUser(credentials)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json("Error in try block")
  }
});

router.post('/login', async (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(401).json("username and password required")
  } else {
    const [user] = await Users.getUserByUsername(req.body.username)
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = makeToken(user)
      res.status(200).json({
        message: `welcome, ${user.username}`,
        token
      })
    } else {
      res.status(401).json("invalid credentials")
    }
  }
});

module.exports = router;
