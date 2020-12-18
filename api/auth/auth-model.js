const db = require("../../data/dbConfig")

function getUserByUsername(username) {
  return db("users").where({username})
}

function addUser(user) {
  return db("users").insert(user).then(([id]) => {
    return db("users").where({ id }).first()
  })
}


module.exports = {
  getUserByUsername,
  addUser
}