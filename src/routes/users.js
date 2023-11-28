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

router.post('/stock-control', async function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user.name)
  user.stockCheckForList(req.body.stockListToCheck, req.body.period)
  res.send('Stock Control OK')
})

module.exports = router
