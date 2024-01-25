const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['product', 'rawMaterial'],
    required: true,
  },
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
