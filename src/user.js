const Recipe = require('./recipe')
const Product = require('./product')
const Rawmaterial = require('./rawmaterial')
const Purchase = require('./purchase')

class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  createRecipe(product, ingredients) {
    const recipe = new Recipe(product, ingredients)
    // const recipe = {
    //   product,
    //   ingredients,
    // }
    product.recipes.push(recipe)
    return recipe
  }

  createProduct(name, category, subCategory, price) {
    const product = new Product(name, category, subCategory, price)
    return product
  }

  createRawmaterial(name, category, subCategory, price, stockControl, unit) {
    const rawMaterial = new Rawmaterial(name, category, subCategory, price, stockControl, unit)
    return rawMaterial
  }

  purchase(supplier, date, purchaseItems) {
    const purchase = new Purchase(supplier, date, purchaseItems)
    return purchase
  }
}

module.exports = User
