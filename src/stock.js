class Stock {
  constructor(period, stockList) {
    this.period = period
    this.stockList = stockList
  }
  static create({ period, stockList }) {
    const newStock = new Stock(period, stockList)
    Stock.list.push(newStock)
    return newStock
  }
  static list = []
}

module.exports = Stock

// class Inventory {
//   constructor() {
//     if (typeof Inventory.instance === 'object') {
//       return Inventory.instance
//     }
//     this.stockList = []

//     Inventory.instance = this
//     return this
//   }
//   addStock(stockData) {
//     this.stockList.push(stockData)
//   }
// }

// module.exports = new Inventory()
