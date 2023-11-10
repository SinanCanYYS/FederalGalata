const Supplier = require('./supplier')
const User = require('./user')

const sinan = new User('Sinan', 50)
const numan = new User('Numan', 30)

const fcc = new Supplier('fcc', 'Levent bey', 'fcc@gmail.com')

const americano = sinan.createProduct('Americano', 'Drink', 'Coffee', 80)
const latte = sinan.createProduct('Latte', 'Drink', 'Coffee', 90)

const coffeeBean = sinan.createRawmaterial('Coffee Bean', 'Drink', 'Coffee', 250, true, 'kg')
const milk = sinan.createRawmaterial('Milk', 'Drink', 'Coffee', 35, true, 'lt')

const americanoRecipe = sinan.createRecipe(americano, [
  { rawMaterial: coffeeBean, quantity: 22 },
  { rawMaterial: milk, quantity: 200 },
])

const purchase1 = sinan.purchase(fcc, '01.11.2023', [
  { rawMaterial: coffeeBean, quantity: 15, price: 300 },
  { rawMaterial: milk, quantity: 20, price: 30 },
])

// console.log('Americano Recipe : ', americanoRecipe)
// console.log('Latte : ', latte)
// console.log('Milk : ', milk)
// console.log('FCC : ', fcc)

console.log(purchase1)
console.log(purchase1.purchaseItems[0].quantity)
console.log(purchase1.purchaseItems[0].price)
console.log(purchase1.totalCost)
