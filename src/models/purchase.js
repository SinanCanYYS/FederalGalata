const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
    },
    date: String,
    period: String,
    purchaseItems: [
      {
        rawMaterial: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rawmaterial',
        },
        quantity: Number,
        price: Number,
      },
    ],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

class Purchase {
  // constructor(supplier, date, period, purchaseItems) {
  //   this.supplier = supplier
  //   this.date = date
  //   this.period = period
  //   this.purchaseItems = purchaseItems
  //   // this.totalCost = this.purchaseItems.reduce((sum, item) => {
  //   //   sum += item.quantity * item.price
  //   //   return sum
  //   // }, 0)
  // }

  get totalCost() {
    const totalCost = this.purchaseItems.reduce((sum, item) => {
      sum += item.quantity * item.price
      return sum
    }, 0)
    return totalCost
  }
  // static create(supplier, date, period, purchaseItems) {
  //   const newPurchase = new Purchase(supplier, date, period, purchaseItems)
  //   Purchase.list.push(newPurchase)
  //   return newPurchase
  // }
  // static list = []
}

purchaseSchema.loadClass(Purchase)
module.exports = mongoose.model('Purchase', purchaseSchema)
// module.exports = Purchase
