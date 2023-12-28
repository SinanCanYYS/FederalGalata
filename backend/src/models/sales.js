const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const salesSchema = new mongoose.Schema({
  period: String,
  salesList: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        autopopulate: true,
      },
      quantity: Number,
    },
  ],
})

// class Sales {
//   constructor(period, salesList) {
//     this.period = period
//     this.salesList = salesList
//   }
//   static create({ period, salesList }) {
//     const newSales = new Sales(period, salesList)
//     Sales.list.push(newSales)
//     return newSales
//   }
//   static list = []
// }

salesSchema.plugin(autopopulate)
module.exports = mongoose.model('Sales', salesSchema)
// module.exports = Sales
