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

const americanoRecipe = sinan.createRecipe(americano, [{ rawMaterial: coffeeBean, quantity: 22 }])

const latteRecipe = sinan.createRecipe(latte, [
  { rawMaterial: coffeeBean, quantity: 22 },
  { rawMaterial: milk, quantity: 200 },
])

const chocolateLatteRecipe = sinan.createRecipe(chocolateLatte, [
  { rawMaterial: coffeeBean, quantity: 22 },
  { rawMaterial: milk, quantity: 200 },
  { rawMaterial: syrup, quantity: 5 },
])

const purchase1 = sinan.purchase(fcc, '01.02.2023', [
  { rawMaterial: coffeeBean, quantity: 15, price: 300 },
  { rawMaterial: milk, quantity: 20, price: 30 },
  { rawMaterial: syrup, quantity: 10, price: 400 },
])

const purchase2 = sinan.purchase(fcc, '01.02.2023', [{ rawMaterial: coffeeBean, quantity: 5, price: 300 }])

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

const februarySales = sinan.addSales('02.23', [
  { product: americano, quantity: 1000 },
  { product: latte, quantity: 650 },
  { product: chocolateLatte, quantity: 50 },
])

// console.log(purchase1)

// const coffeeBeanJanuaryStock = januaryStock.stockList.find(
//   element => element.rawMaterial.name === coffeeBean.name
// ).quantity

const coffeeBeanJanuaryStock = Stock.list
  .filter(stock => {
    return stock.period === '01.23'
  })[0]
  .stockList.filter(item => item.rawMaterial.name === coffeeBean.name)[0].quantity

const coffeeBeanJanuaryStock2 =
  Stock.list.find(stock => stock.period === '01.23')?.stockList.find(item => item.rawMaterial.name === coffeeBean.name)
    ?.quantity || 0

const coffeeBeanFebruaryStock2 =
  Stock.list.find(stock => stock.period === '02.23')?.stockList.find(item => item.rawMaterial.name === coffeeBean.name)
    ?.quantity || 0

const coffeeBeanFebruaryStock = februaryStock.stockList.find(
  element => element.rawMaterial.name === coffeeBean.name
).quantity

// console.log(januaryStock)
// console.log(Stock.list)
console.log(coffeeBeanJanuaryStock, coffeeBeanJanuaryStock2)
console.log(coffeeBeanFebruaryStock, coffeeBeanFebruaryStock2)

// const coffeeBeanFebruaryPurcase =
// console.log(coffeeBeanJanuaryStock)
// console.log(coffeeBeanFebruaryStock)

// const coffeBeanFebruaryCalculatedConsumption =
//   coffeeBeanFebruaryStock - coffeeBeanJanuaryStock + coffeeBeanFebruaryPurchase

// console.log(januaryStock)
// console.log(februaryStock.stockList)

// console.log(sinan)
// console.log(Recipe.list)
