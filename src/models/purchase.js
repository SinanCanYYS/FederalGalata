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

// // Use a setter for the 'period' field
// purchaseSchema.path('period').set(function (value) {
//   const dateParts = this.date.split('.')
//   return `${dateParts[1]}.${dateParts[2].substring(2, 4)}`
// })

purchaseSchema.pre('save', function (next) {
  // Compute and set the 'period' before saving
  const dateParts = this.date.split('.')
  this.period = `${dateParts[1]}.${dateParts[2].substring(2, 4)}`
  next()
})

// Define a custom setter for the 'date' field to automatically update the 'period' field
// purchaseSchema.path('date').set(function (value) {
//   // Assuming that the 'date' field is in the format 'DD.MM.YYYY'
//   const dateParts = value.split('.')
//   const monthYear = `${dateParts[1]}.${dateParts[2].substring(2, 4)}`

//   // Updating the 'period' field
//   this.period = monthYear

//   return value
// })

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

  // get period() {
  //   // Directly set this._period to avoid infinite loop
  //   const dateParts = this.date.split('.')
  //   const period = `${dateParts[1]}.${dateParts[2].substring(2, 4)}`
  //   return period
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
