const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
})

const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = SubCategory
