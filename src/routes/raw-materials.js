const express = require('express')
const router = express.Router()
const RawMaterial = require('../models/rawmaterial')
const User = require('../models/user')

/* GET RawMaterial list. */
router.get('/', async function (req, res, next) {
  const rawMaterialList = await RawMaterial.find()
  res.send(rawMaterialList)
})

/* Create a new raw material  . */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
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
