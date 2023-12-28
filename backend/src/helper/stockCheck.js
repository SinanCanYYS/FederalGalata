const Stock = require('../models/stock')
const Purchase = require('../models/purchase')
const Sales = require('../models/sales')

async function getItemStockQty(targetRawMaterialId, period) {
  const stock = await Stock.findOne({ period: period })
  return stock?.stockList.find(item => item.rawMaterial._id.equals(targetRawMaterialId))?.quantity || 0
}

async function getTotalPurchasedQuantity(targetRawMaterialId, targetPeriod) {
  const filteredPurchases = await Purchase.find({ period: targetPeriod })
  return filteredPurchases.reduce((sum, purchase) => {
    const purchaseItem = purchase.purchaseItems.find(item => item.rawMaterial._id.equals(targetRawMaterialId))
    return sum + (purchaseItem ? purchaseItem.quantity : 0)
  }, 0)
}

async function getRecipeConsumption(targetRawMaterialId, targetPeriod) {
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

module.exports = {
  getItemStockQty,
  getTotalPurchasedQuantity,
  getRecipeConsumption,
}
