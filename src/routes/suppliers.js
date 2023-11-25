const express = require('express')
const router = express.Router()
const Supplier = require('../supplier')

/* GET supplier listing. */
router.get('/', function (req, res, next) {
  res.send(Supplier.list)
})

/* Create a new supplier  . */
router.post('/', async function (req, res, next) {
  const newSupplier = await Supplier.create({ name: req.body.name, contact: req.body.contact, email: req.body.email })
  res.send(newSupplier)
})

module.exports = router
