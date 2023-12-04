const express = require('express')
const router = express.Router()
const Supplier = require('../models/supplier')

/* GET supplier listing. */
router.get('/', async function (req, res, next) {
  const supplier = await Supplier.find()
  res.send(supplier)
})

/* Create a new supplier  . */
router.post('/', async function (req, res, next) {
  const newSupplier = await Supplier.create({ name: req.body.name, contact: req.body.contact, email: req.body.email })
  res.send(newSupplier)
})

module.exports = router
