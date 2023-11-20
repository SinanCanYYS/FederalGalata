const Stock = require('./stock')
const Sales = require('./sales')
const Supplier = require('./supplier')
const User = require('./user')
const Purchase = require('./purchase')
const Rawmaterial = require('./rawmaterial')
const Product = require('./product')
const Recipe = require('./recipe')

const sinan = User.create({ name: 'Sinan', age: 50 })
const numan = User.create({ name: 'Numan', age: 30 })

const fcc = Supplier.create({ name: 'fcc', contact: 'Levent bey', email: 'fcc@gmail.com' })

const americano = sinan.createProduct('Americano', 'Drink', 'Coffee', 80)
const latte = sinan.createProduct('Latte', 'Drink', 'Coffee', 90)
const chocolateLatte = sinan.createProduct('Chocolate Latte', 'Drink', 'Coffee', 120)

const coffeeBean = sinan.createRawmaterial('Coffee Bean', 'Drink', 'Coffee', 250, true, 'kg')
const milk = sinan.createRawmaterial('Milk', 'Drink', 'Coffee', 35, true, 'lt')
const syrup = sinan.createRawmaterial('Syrup', 'Drink', 'Coffee', 400, true, 'lt')

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
const purchase1 = sinan.purchase(fcc, '01.02.2023', [
  { rawMaterial: coffeeBean, quantity: 15, price: 300 },
  { rawMaterial: milk, quantity: 20, price: 30 },
  { rawMaterial: syrup, quantity: 10, price: 400 },
])
const purchase2 = sinan.purchase(fcc, '01.02.2023', [{ rawMaterial: coffeeBean, quantity: 5, price: 300 }])
const purchase3 = sinan.purchase(fcc, '01.03.2023', [{ rawMaterial: coffeeBean, quantity: 15, price: 300 }])
const purchase4 = sinan.purchase(fcc, '01.02.2023', [
  { rawMaterial: coffeeBean, quantity: 8, price: 300 },
  { rawMaterial: milk, quantity: 60, price: 30 },
  { rawMaterial: syrup, quantity: 5, price: 400 },
])

// Stock Data
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

// Sales Data
const februarySales = sinan.addSales('02.23', [
  { product: americano, quantity: 1000 },
  { product: latte, quantity: 650 },
  { product: chocolateLatte, quantity: 50 },
])

// Actual Stock Consumption Calculations
const coffeeBeanJanuaryStock =
  Stock.list.find(stock => stock.period === '01.23')?.stockList.find(item => item.rawMaterial.name === coffeeBean.name)
    ?.quantity || 0

const coffeeBeanFebruaryStock =
  Stock.list.find(stock => stock.period === '02.23')?.stockList.find(item => item.rawMaterial.name === coffeeBean.name)
    ?.quantity || 0

// Specify the target date and product
const targetDate = '01.02.2023'
const targetProduct = coffeeBean
// Filter purchases for the specific date
const filteredPurchases = Purchase.list.filter(purchase => purchase.date === targetDate)
// Sum up the values in purchaseItems for the specified product
const totalPurchasedQuantity = filteredPurchases.reduce((sum, purchase) => {
  const purchaseItem = purchase.purchaseItems.find(item => item.rawMaterial === targetProduct)
  return sum + (purchaseItem ? purchaseItem.quantity : 0)
}, 0)

console.log('January Stock : ', coffeeBeanJanuaryStock)
console.log('February Stock : ', coffeeBeanFebruaryStock)
console.log('Purchase Quantity : ', totalPurchasedQuantity)

const coffeBeanFebruaryCalculatedConsumption = coffeeBeanFebruaryStock - coffeeBeanJanuaryStock + totalPurchasedQuantity

console.log('Total Qty Consumed : ', coffeBeanFebruaryCalculatedConsumption)

const februarySalesData = Sales.list.find(salesData => salesData.period === '02.23')

// Specify the target raw material
const targetRawMaterial = syrup

// Sum up the total consumption of the target raw material
const totalRecipeConsumption = februarySalesData.salesList.reduce((sum, sale) => {
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
console.log(`Total consumption of ${targetRawMaterial.name} in February: ${totalRecipeConsumption / 1000} kg`) // console.log(februarySalesData.salesList.reduce((sum, salesRecord) =>  sum + salesRecord.price)
