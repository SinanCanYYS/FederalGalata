const Recipe = require('./recipe')
const Product = require('./product')
const Rawmaterial = require('./rawmaterial')
const Purchase = require('./purchase')
const Stock = require('./stock')
const Sales = require('./sales')
const getPreviousPeriod = require('../helper/get-previous-period')

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  age: String,
})

class User {
  // constructor(name, age) {
  //   this.name = name
  //   this.age = age
  // }
  async createRecipe({ product, ingredients }) {
    const recipe = await Recipe.create({ product, ingredients })
    product.recipes.push(recipe)
    await product.save()
    return recipe
  }

  async createProduct({ name, category, subCategory, price }) {
    const product = await Product.create({ name, category, subCategory, price })
    return product
  }

  async createRawmaterial({ name, category, subCategory, price, stockControl, unit }) {
    const rawmaterial = await Rawmaterial.create({ name, category, subCategory, price, stockControl, unit })
    return rawmaterial
  }

  async purchase(supplier, date, period, purchaseItems) {
    const purchase = await Purchase.create({ supplier, date, period, purchaseItems })
    return purchase
  }

  async addStock(period, stockList) {
    const monthlyStock = await Stock.create({ period, stockList })
    return monthlyStock
  }

  async addSales(period, salesList) {
    const monthlySales = await Sales.create({ period, salesList })
    return monthlySales
  }

  async getItemStockQty(targetRawMaterialId, period) {
    const stock = await Stock.findOne({ period: period })
    return stock?.stockList.find(item => item.rawMaterial._id.equals(targetRawMaterialId))?.quantity || 0
  }

  async getTotalPurchasedQuantity(targetRawMaterialId, targetPeriod) {
    const filteredPurchases = await Purchase.find({ period: targetPeriod })
    return filteredPurchases.reduce((sum, purchase) => {
      const purchaseItem = purchase.purchaseItems.find(item => item.rawMaterial._id.equals(targetRawMaterialId))
      return sum + (purchaseItem ? purchaseItem.quantity : 0)
    }, 0)
  }

  async getRecipeConsumption(targetRawMaterialId, targetPeriod) {
    // Finding the target period Sales Data
    const salesData = await Sales.findOne({ period: targetPeriod })
    // Sum up the total consumption of the target raw material
    return salesData.salesList.reduce((sum, sale) => {
      const product = sale.product
      const recipe = product.recipes.find(recipe =>
        recipe.ingredients.some(ingredient => ingredient.rawMaterial.equals(targetRawMaterialId))
      )

      if (recipe) {
        const ingredient = recipe.ingredients.find(ingredient => ingredient.rawMaterial.equals(targetRawMaterialId))
        if (ingredient) {
          sum += sale.quantity * ingredient.quantity
        }
      }

      return sum
    }, 0)
  }

  async stockCheck(targetRawMaterialId, targetPeriod) {
    const previousPeriod = getPreviousPeriod(targetPeriod)
    const targetRawMaterial = await Rawmaterial.findById(targetRawMaterialId)

    // Actual Stock Consumption Calculations
    const previousItemStockQty = await this.getItemStockQty(targetRawMaterialId, previousPeriod)
    const actualItemStockQty = await this.getItemStockQty(targetRawMaterialId, targetPeriod)
    const totalPurchasedQuantity = await this.getTotalPurchasedQuantity(targetRawMaterialId, targetPeriod)
    const calculatedConsumption = previousItemStockQty + totalPurchasedQuantity - actualItemStockQty
    const totalRecipeConsumption = await this.getRecipeConsumption(targetRawMaterialId, targetPeriod)

    // Output the result
    console.log('=============================================')
    console.log(`Stock analysis for ${targetRawMaterial.name} in period ${targetPeriod}`)
    console.log('Starting Stock : ', previousItemStockQty)
    console.log('Finishing Stock : ', actualItemStockQty)
    console.log('Purchased Quantity : ', totalPurchasedQuantity)
    console.log('---------------------------------------------')
    console.log('Total Qty Consumed : ', calculatedConsumption)
    console.log(`Calculated Recipe consumption': ${totalRecipeConsumption / 1000} kg`)
    console.log('---------------------------------------------')

    const stockDiff = totalRecipeConsumption / 1000 - calculatedConsumption

    if (stockDiff > 0) {
      console.log(`Consumption is ${stockDiff.toFixed(2)} kg plus`)
    } else {
      console.log(`Consumption is ${-1 * stockDiff.toFixed(2)} kg minus`)
    }
  }

  // stockCheckForList(targetRawMaterialsIds, targetPeriod) {
  //   targetRawMaterialsIds.forEach(async rawMaterialId => {
  //     await this.stockCheck(rawMaterialId, targetPeriod)
  //   })
  // }
  async stockCheckForList(targetRawMaterialsIds, targetPeriod) {
    for (const rawMaterialId of targetRawMaterialsIds) {
      await this.stockCheck(rawMaterialId, targetPeriod)
    }
  }

  // static create({ name, age }) {
  //   const newUser = new User(name, age)
  //   User.list.push(newUser)
  //   return newUser
  // }
  // static list = []
}

// module.exports = User

userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
