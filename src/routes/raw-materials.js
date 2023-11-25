const express = require('express')
const router = express.Router()
const RawMaterial = require('../rawmaterial')
const User = require('../user')

/* GET RawMaterial list. */
router.get('/', function (req, res, next) {
  res.send(RawMaterial.list)
})

/* Create a new raw material  . */
router.post('/', async function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user.name)
  const newRawMaterial = await user.createRawmaterial({
    name: req.body.name,
    category: req.body.category,
    subCategory: req.body.subCategory,
    price: req.body.price,
    stockControl: req.body.stockControl,
    unit: req.body.unit,
  })
  res.send(newRawMaterial)
})

module.exports = router
