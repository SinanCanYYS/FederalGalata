const express = require('express')
const router = express.Router()
const Purchase = require('../purchase')
const User = require('../user')
const Supplier = require('../supplier')

/* GET purcases listing. */
router.get('/', function (req, res, next) {
  res.send(Purchase.list)
})

/* Create a new purchase  . */
router.post('/', async function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user.name)
  const supplier = Supplier.list.find(supplier => supplier.name === req.body.supplier.name)
  const newPurchase = await user.purchase(supplier, req.body.date, req.body.period, req.body.purchaseItems)
  res.send(newPurchase)
})

module.exports = router
