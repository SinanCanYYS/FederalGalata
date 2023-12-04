const express = require('express')
const router = express.Router()
const Sales = require('../models/sales')
const User = require('../models/user')

/* GET stock listing. */
router.get('/', function (req, res, next) {
  res.send(Sales.list)
})

/* Add a new stock data  . */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const newSalesData = await user.addSales(req.body.period, req.body.salesData)
  res.send(newSalesData)
})

module.exports = router
