var express = require('express')
var router = express.Router()
const User = require('../user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})

/* Create a new users  . */
router.post('/', async function (req, res, next) {
  const newUser = await User.create({ name: req.body.name, age: req.body.age })
  res.send(newUser)
})

module.exports = router
