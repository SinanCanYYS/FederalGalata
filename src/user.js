const Recipe = require('./recipe')
const Product = require('./product')
const Rawmaterial = require('./rawmaterial')
const Purchase = require('./purchase')
const Stock = require('./stock')
const Sales = require('./sales')

class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  createRecipe(product, ingredients) {
    const recipe = Recipe.create({ product, ingredients })
    // const recipe = {
    //   product,
    //   ingredients,
    // }
    product.recipes.push(recipe)
    return recipe
  }

  createProduct(name, category, subCategory, price) {
    const product = Product.create({ name, category, subCategory, price })
    return product
  }

  createRawmaterial(name, category, subCategory, price, stockControl, unit) {
    const rawmaterial = Rawmaterial.create({ name, category, subCategory, price, stockControl, unit })
    return rawmaterial
  }

  purchase(supplier, date, purchaseItems) {
    const purchase = Purchase.create({ supplier, date, purchaseItems })
    return purchase
  }

  addStock(period, stockList) {
    const monthlyStock = Stock.create({ period, stockList })
    return monthlyStock
  }

  addSales(period, salesList) {
    const monthlySales = Sales.create({ period, salesList })
    return monthlySales
  }
  static create({ name, age }) {
    const newUser = new User(name, age)
    User.list.push(newUser)
    return newUser
  }
  static list = []
}

module.exports = User
