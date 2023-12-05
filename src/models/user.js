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
    const purchase = await Purchase.create(supplier, date, period, purchaseItems)
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

  stockCheck(targetRawMaterial, targetPeriod) {
    const previousPeriod = getPreviousPeriod(targetPeriod)

    // Actual Stock Consumption Calculations
    const previousStock =
      Stock.list
        .find(stock => stock.period === previousPeriod)
        ?.stockList.find(item => item.rawMaterial.name === targetRawMaterial.name)?.quantity || 0

    const actualStock =
      Stock.list
        .find(stock => stock.period === targetPeriod)
        ?.stockList.find(item => item.rawMaterial.name === targetRawMaterial.name)?.quantity || 0

    // Filter purchases for the specific date
    const filteredPurchases = Purchase.list.filter(purchase => purchase.period === targetPeriod)
    // Sum up the values in Filtered purchases for the specified Raw Material
    const totalPurchasedQuantity = filteredPurchases.reduce((sum, purchase) => {
      const purchaseItem = purchase.purchaseItems.find(item => item.rawMaterial.name === targetRawMaterial.name)
      return sum + (purchaseItem ? purchaseItem.quantity : 0)
    }, 0)
    console.log('=============================================')
    console.log(`Stock analysis for ${targetRawMaterial.name} in period ${targetPeriod}`)
    console.log('Starting Stock : ', previousStock)
    console.log('Finishing Stock : ', actualStock)
    console.log('Purchased Quantity : ', totalPurchasedQuantity)
    console.log('---------------------------------------------')

    const calculatedConsumption = previousStock + totalPurchasedQuantity - actualStock

    console.log('Total Qty Consumed : ', calculatedConsumption)

    // Finding the target period Sales Data
    const salesData = Sales.list.find(salesData => salesData.period === targetPeriod)

    // Sum up the total consumption of the target raw material
    const totalRecipeConsumption = salesData.salesList.reduce((sum, sale) => {
      const productN = Product.list.find(product => product.name === sale.product.name)
      const recipe = productN.recipes.find(recipe =>
        recipe.ingredients.some(ingredient => ingredient.rawMaterial.name === targetRawMaterial.name)
      )

      if (recipe) {
        const ingredient = recipe.ingredients.find(ingredient => ingredient.rawMaterial.name === targetRawMaterial.name)
        if (ingredient) {
          sum += sale.quantity * ingredient.quantity
        }
      }

      return sum
    }, 0)

    // Output the result
    console.log(`Calculated Recipe consumption': ${totalRecipeConsumption / 1000} kg`) // console.log(februarySalesData.salesList.reduce((sum, salesRecord) =>  sum + salesRecord.price)
    console.log('---------------------------------------------')

    const stockDiff = totalRecipeConsumption / 1000 - calculatedConsumption

    if (stockDiff > 0) {
      console.log(`Consumption is ${stockDiff.toFixed(2)} kg plus`)
    } else {
      console.log(`Consumption is ${-1 * stockDiff.toFixed(2)} kg minus`)
    }
  }

  stockCheckForList(targetRawMaterials, targetPeriod) {
    console.log('xxxx :', targetRawMaterials)
    targetRawMaterials.forEach(rawMaterial => {
      this.stockCheck(rawMaterial, targetPeriod)
    })
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
