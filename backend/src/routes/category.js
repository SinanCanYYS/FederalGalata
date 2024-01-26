const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const SubCategory = require('../models/subCategory')

/* Create a Category */
router.post('/', async function (req, res, next) {
  const newCategory = await Category.create({ name: req.body.name, type: req.body.type })
  res.send(newCategory)
})

/* Create a SubCategory */
router.post('/:categoryId/subcategory', async function (req, res, next) {
  const newSubCategory = await SubCategory.create({ name: req.body.name, category: req.body.category })
  res.send(newSubCategory)
})
/* GET Category List */
router.get('/', async function (req, res, next) {
  const categoryList = await Category.find()
  res.send(categoryList)
})

/* GET SubCategory List */
router.get('/:categoryID/subcategory', async function (req, res, next) {
  const subCategoryList = await SubCategory.find({ category: req.params.categoryID })
  res.send(subCategoryList)
})

module.exports = router
