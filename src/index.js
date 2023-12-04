const Stock = require('./models/stock')
const Sales = require('./models/sales')
const Supplier = require('./models/supplier')
const User = require('./models/user')
const Purchase = require('./models/purchase')
const Rawmaterial = require('./models/rawmaterial')
const Product = require('./models/product')
const Recipe = require('./models/recipe')
const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  // create a user with axios
  await axios.post('/users', {
    name: 'Tete',
    age: 20,
  })
  const sinan = (
    await axios.post('/users', {
      name: 'Sinan',
      age: 50,
    })
  ).data

  const numan = (
    await axios.post('/users', {
      name: 'Numan',
      age: 30,
    })
  ).data

  // fetch users with Axios
  // await axios.get('/users').then(response => {
  //   console.log(response.data)
  // })
  const allUserList = await axios.get('/users')

  // Creating Suppliers with axios
  const fcc = (await axios.post('/suppliers', { name: 'fcc', contact: 'Levent bey', email: 'fcc@gmail.com' })).data

  // defining products and raw materials with axios
  const americano = (
    await axios.post('/products', {
      user: sinan._id,
      name: 'Americano',
      category: 'Drink',
      subCategory: 'Coffee',
      price: 80,
    })
  ).data

  const latte = (
    await axios.post('/products', {
      user: sinan._id,
      name: 'Latte',
      category: 'Drink',
      subCategory: 'Coffee',
      price: 90,
    })
  ).data

  const chocolateLatte = (
    await axios.post('/products', {
      user: sinan._id,
      name: 'Chocolate Latte',
      category: 'Drink',
      subCategory: 'Coffee',
      price: 120,
    })
  ).data

  // const latte = sinan.createProduct('Latte', 'Drink', 'Coffee', 90)
  // const chocolateLatte = sinan.createProduct('Chocolate Latte', 'Drink', 'Coffee', 120)
  const coffeeBean = (
    await axios.post('/raw-materials', {
      user: sinan._id,
      name: 'Coffee Bean',
      category: 'Drink',
      subCategory: 'Coffee',
      price: 250,
      stockControl: true,
      unit: 'kg',
    })
  ).data

  const milk = (
    await axios.post('/raw-materials', {
      user: sinan._id,
      name: 'Milk',
      category: 'Drink',
      subCategory: 'Coffee',
      price: 35,
      stockControl: true,
      unit: 'lt',
    })
  ).data

  const syrup = (
    await axios.post('/raw-materials', {
      user: sinan._id,
      name: 'Syrup',
      category: 'Drink',
      subCategory: 'Coffee',
      price: 400,
      stockControl: true,
      unit: 'lt',
    })
  ).data
  // const coffeeBean = sinan.createRawmaterial('Coffee Bean', 'Drink', 'Coffee', 250, true, 'kg')
  // const milk = sinan.createRawmaterial('Milk', 'Drink', 'Coffee', 35, true, 'lt')
  // const syrup = sinan.createRawmaterial('Syrup', 'Drink', 'Coffee', 400, true, 'lt')

  // defining recipes with axios
  const americanoRecipe = await axios.post('/products/Americano/recipes', {
    user: sinan._id,
    ingredients: [{ rawMaterial: coffeeBean, quantity: 20 }],
  })

  const latteRecipe = await axios.post('/products/Latte/recipes', {
    user: sinan._id,
    ingredients: [
      { rawMaterial: coffeeBean, quantity: 11 },
      { rawMaterial: milk, quantity: 200 },
    ],
  })

  const chocolateLatteRecipe = await axios.post('/products/Chocolate Latte/recipes', {
    user: sinan._id,
    ingredients: [
      { rawMaterial: coffeeBean, quantity: 5 },
      { rawMaterial: milk, quantity: 100 },
      { rawMaterial: syrup, quantity: 5 },
    ],
  })

  // purchases with axios

  const purchase1 = await axios.post('/purchases', {
    user: sinan._id,
    supplier: fcc._id,
    date: '01.02.2023',
    period: '02.23',
    purchaseItems: [
      { rawMaterial: coffeeBean, quantity: 15, price: 300 },
      { rawMaterial: milk, quantity: 20, price: 30 },
      { rawMaterial: syrup, quantity: 10, price: 400 },
    ],
  })

  const purchase2 = await axios.post('/purchases', {
    user: sinan._id,
    supplier: fcc._id,
    date: '01.02.2023',
    period: '02.23',
    purchaseItems: [{ rawMaterial: coffeeBean, quantity: 5, price: 300 }],
  })

  const purchase3 = await axios.post('/purchases', {
    user: sinan._id,
    supplier: fcc._id,
    date: '01.02.2023',
    period: '02.23',
    purchaseItems: [{ rawMaterial: coffeeBean, quantity: 15, price: 300 }],
  })

  const purchase4 = await axios.post('/purchases', {
    user: sinan._id,
    supplier: fcc._id,
    date: '01.02.2023',
    period: '02.23',
    purchaseItems: [
      { rawMaterial: coffeeBean, quantity: 8, price: 300 },
      { rawMaterial: milk, quantity: 60, price: 30 },
      { rawMaterial: syrup, quantity: 5, price: 400 },
    ],
  })

  // stock data entry with axios
  const januaryStock = await axios.post('/stocks', {
    user: sinan._id,
    period: '01.23',
    stockData: [
      { rawMaterial: coffeeBean, quantity: 30 },
      { rawMaterial: milk, quantity: 15 },
      { rawMaterial: syrup, quantity: 5 },
    ],
  })

  const februaryStock = await axios.post('/stocks', {
    user: sinan._id,
    period: '02.23',
    stockData: [
      { rawMaterial: coffeeBean, quantity: 45 },
      { rawMaterial: milk, quantity: 18 },
      { rawMaterial: syrup, quantity: 7 },
    ],
  })

  // sales data entry with axios
  const februarySales = await axios.post('/sales', {
    user: sinan._id,
    period: '02.23',
    salesData: [
      { product: americano, quantity: 1000 },
      { product: latte, quantity: 650 },
      { product: chocolateLatte, quantity: 50 },
    ],
  })

  const marchSales = await axios.post('/sales', {
    user: sinan._id,
    period: '03.23',
    salesData: [
      { product: americano, quantity: 1200 },
      { product: latte, quantity: 750 },
      { product: chocolateLatte, quantity: 80 },
    ],
  })

  // stock check with axios
  await axios.post('/users/stock-control', {
    user: sinan._id,
    stockListToCheck: [coffeeBean, milk, syrup],
    period: '02.23',
  })

  await axios.post('/users/stock-control', {
    user: sinan._id,
    stockListToCheck: [coffeeBean],
    period: '03.23',
  })

  // // sinan.stockCheck(milk, '02.23')
  // sinan.stockCheckForList([coffeeBean, milk, syrup], '02.23')
}

main()
