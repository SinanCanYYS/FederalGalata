const express = require('express')
const router = express.Router()
const Stock = require('../stock')
const User = require('../user')

/* GET stock listing. */
router.get('/', function (req, res, next) {
  res.send(Stock.list)
})

/* Add a new stock data  . */
router.post('/', async function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user.name)
  const newStockData = await user.addStock(req.body.period, req.body.stockData)
  res.send(newStockData)
})

module.exports = router
