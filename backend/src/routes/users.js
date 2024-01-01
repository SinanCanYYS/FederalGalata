var express = require('express')
var router = express.Router()
const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const user = await User.find()
  res.send(user)
})

/* GET user detail */
router.get('/:id', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  res.send(user)
})

/* Create a new users  . */
router.post('/', async function (req, res, next) {
  const newUser = await User.create({ name: req.body.name, age: req.body.age })
  res.send(newUser)
})

router.post('/stock-control', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  user.stockCheckForList(req.body.stockListToCheck, req.body.period)
  res.send('Stock Control OK')
})

module.exports = router
