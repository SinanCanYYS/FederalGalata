const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  period: String,
  stockList: [
    {
      rawMaterial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rawmaterial',
      },
      quantity: Number,
    },
  ],
})

// class Stock {
//   constructor(period, stockList) {
//     this.period = period
//     this.stockList = stockList
//   }
//   static create({ period, stockList }) {
//     const newStock = new Stock(period, stockList)
//     Stock.list.push(newStock)
//     return newStock
//   }
//   static list = []
// }

module.exports = mongoose.model('Stock', stockSchema)
// module.exports = Stock
