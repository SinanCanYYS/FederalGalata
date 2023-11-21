const Stock = require('./stock')
const Sales = require('./sales')
const Supplier = require('./supplier')
const User = require('./user')
const Purchase = require('./purchase')
const Rawmaterial = require('./rawmaterial')
const Product = require('./product')
const Recipe = require('./recipe')

// Creating Users
const sinan = User.create({ name: 'Sinan', age: 50 })
const numan = User.create({ name: 'Numan', age: 30 })

// Creating Suppliers
const fcc = Supplier.create({ name: 'fcc', contact: 'Levent bey', email: 'fcc@gmail.com' })

// Describing Produckts and Raw Materials
const americano = sinan.createProduct('Americano', 'Drink', 'Coffee', 80)
const latte = sinan.createProduct('Latte', 'Drink', 'Coffee', 90)
const chocolateLatte = sinan.createProduct('Chocolate Latte', 'Drink', 'Coffee', 120)

const coffeeBean = sinan.createRawmaterial('Coffee Bean', 'Drink', 'Coffee', 250, true, 'kg')
const milk = sinan.createRawmaterial('Milk', 'Drink', 'Coffee', 35, true, 'lt')
const syrup = sinan.createRawmaterial('Syrup', 'Drink', 'Coffee', 400, true, 'lt')

// Describing Recipes
const americanoRecipe = sinan.createRecipe(americano, [{ rawMaterial: coffeeBean, quantity: 20 }])

const latteRecipe = sinan.createRecipe(latte, [
  { rawMaterial: coffeeBean, quantity: 11 },
  { rawMaterial: milk, quantity: 200 },
])

const chocolateLatteRecipe = sinan.createRecipe(chocolateLatte, [
  { rawMaterial: coffeeBean, quantity: 5 },
  { rawMaterial: milk, quantity: 100 },
  { rawMaterial: syrup, quantity: 5 },
])

// Purchases
const purchase1 = sinan.purchase(fcc, '01.02.2023', '02.23', [
  { rawMaterial: coffeeBean, quantity: 15, price: 300 },
  { rawMaterial: milk, quantity: 20, price: 30 },
  { rawMaterial: syrup, quantity: 10, price: 400 },
])
const purchase2 = sinan.purchase(fcc, '01.02.2023', '02.23', [{ rawMaterial: coffeeBean, quantity: 5, price: 300 }])
const purchase3 = sinan.purchase(fcc, '01.03.2023', '02.23', [{ rawMaterial: coffeeBean, quantity: 15, price: 300 }])
const purchase4 = sinan.purchase(fcc, '01.02.2023', '02.23', [
  { rawMaterial: coffeeBean, quantity: 8, price: 300 },
  { rawMaterial: milk, quantity: 60, price: 30 },
  { rawMaterial: syrup, quantity: 5, price: 400 },
])

// Stock Data entry
const januaryStock = sinan.addStock('01.23', [
  { rawMaterial: coffeeBean, quantity: 30 },
  { rawMaterial: milk, quantity: 15 },
  { rawMaterial: syrup, quantity: 5 },
])

const februaryStock = sinan.addStock('02.23', [
  { rawMaterial: coffeeBean, quantity: 45 },
  { rawMaterial: milk, quantity: 18 },
  { rawMaterial: syrup, quantity: 7 },
])

// Sales Data entry
const februarySales = sinan.addSales('02.23', [
  { product: americano, quantity: 1000 },
  { product: latte, quantity: 650 },
  { product: chocolateLatte, quantity: 50 },
])

// Specify the target Period and Raw Material for stock ckeck
const targetPeriod = '02.23'
const previousPeriod = '01.23'
const targetRawMaterial = coffeeBean

// Actual Stock Consumption Calculations
const previousStock =
  Stock.list
    .find(stock => stock.period === previousPeriod)
    ?.stockList.find(item => item.rawMaterial === targetRawMaterial)?.quantity || 0

const actualStock =
  Stock.list
    .find(stock => stock.period === targetPeriod)
    ?.stockList.find(item => item.rawMaterial === targetRawMaterial)?.quantity || 0

// Filter purchases for the specific date
const filteredPurchases = Purchase.list.filter(purchase => purchase.period === targetPeriod)
// Sum up the values in Filtered purchases for the specified Raw Material
const totalPurchasedQuantity = filteredPurchases.reduce((sum, purchase) => {
  const purchaseItem = purchase.purchaseItems.find(item => item.rawMaterial === targetRawMaterial)
  return sum + (purchaseItem ? purchaseItem.quantity : 0)
}, 0)

console.log('Starting Stock : ', previousStock)
console.log('Finishing Stock : ', actualStock)
console.log('Purchased Quantity : ', totalPurchasedQuantity)

const calculatedConsumption = previousStock + totalPurchasedQuantity - actualStock

console.log('Total Qty Consumed : ', calculatedConsumption)

// Finding the target period Sales Data
const salesData = Sales.list.find(salesData => salesData.period === targetPeriod)

// Sum up the total consumption of the target raw material
const totalRecipeConsumption = salesData.salesList.reduce((sum, sale) => {
  const recipe = sale.product.recipes.find(recipe =>
    recipe.ingredients.some(ingredient => ingredient.rawMaterial === targetRawMaterial)
  )

  if (recipe) {
    const ingredient = recipe.ingredients.find(ingredient => ingredient.rawMaterial === targetRawMaterial)
    if (ingredient) {
      sum += sale.quantity * ingredient.quantity
    }
  }

  return sum
}, 0)

// Output the result
console.log(
  `Total consumption of ${targetRawMaterial.name} in period '${targetPeriod}': ${totalRecipeConsumption / 1000} kg`
) // console.log(februarySalesData.salesList.reduce((sum, salesRecord) =>  sum + salesRecord.price)
