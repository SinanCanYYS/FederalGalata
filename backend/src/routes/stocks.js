const express = require('express')
const router = express.Router()
const Stock = require('../models/stock')
const User = require('../models/user')

/* GET stock listing. */
router.get('/', function (req, res, next) {
  res.send(Stock.list)
})

/* Add a new stock data  . */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const newStockData = await user.addStock(req.body.period, req.body.stockData)
  res.send(newStockData)
})

module.exports = router
