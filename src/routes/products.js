const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')

/* GET Product list. */
router.get('/', function (req, res, next) {
  res.send(Product.list)
  // res.send(
  //   Product.list.map(product => ({
  //     name: product.name,
  //     price: product.price,
  //     recipes: product.recipes.map(recipe => recipe.toJSON()),
  //   }))
  // )
})

/* Create a new product  . */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  console.log('The User: ', user)
  // const user = User.list.find(user => user.name === req.body.user.name)
  const newProduct = await user.createProduct({
    name: req.body.name,
    category: req.body.category,
    subCategory: req.body.subCategory,
    price: req.body.price,
  })
  res.send(newProduct)
})

// Creating a recipe for a product //
router.post('/:productID/recipes', async function (req, res, next) {
  const product = Product.list.find(product => product.name === req.params.productID)
  const user = await User.findById(req.body.user)
  const newRecipe = await user.createRecipe({ product: product, ingredients: req.body.ingredients })
  res.send(newRecipe)
  // res.send({ product: { name: product.name, price: product.price }, ingredients: newRecipe.ingredients })
})

router.get('/:productID/recipes', async function (req, res, next) {
  const product = Product.list.find(product => product.name === req.params.productID)
  res.send(product.recipes)
})

module.exports = router
