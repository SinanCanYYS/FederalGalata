var express = require('express')
var router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')
const Rawmaterial = require('../models/rawmaterial')
const Supplier = require('../models/supplier')
const Recipe = require('../models/recipe')
const Purchase = require('../models/purchase')
const Stock = require('../models/stock')
const Sales = require('../models/sales')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/delete', async (req, res) => {
  await User.deleteMany()
  await Supplier.deleteMany()
  await Product.deleteMany()
  await Rawmaterial.deleteMany()
  await Recipe.deleteMany()
  await Purchase.deleteMany()
  await Stock.deleteMany()
  await Sales.deleteMany()
  res.send('Deleted')
})

module.exports = router
