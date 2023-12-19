const express = require('express')
const router = express.Router()
const Purchase = require('../models/purchase')
const User = require('../models/user')
const Supplier = require('../models/supplier')

/* GET purcases listing. */
router.get('/', function (req, res, next) {
  res.send(Purchase.list)
})

/* Create a new purchase  . */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const supplier = await Supplier.findById(req.body.supplier)
  // const newPurchase = await user.purchase(supplier, req.body.date, req.body.period, req.body.purchaseItems)
  const newPurchase = await user.purchase(supplier, req.body.date, req.body.purchaseItems)
  res.send(newPurchase)
})

module.exports = router
