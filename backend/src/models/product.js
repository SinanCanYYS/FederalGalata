const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const Recipe = require('./recipe')

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  subCategory: String,
  price: Number,
  recipes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    autopopulate: { maxDepth: 2 },
  },

  // recipes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Recipe',
  //     autopopulate: { maxDepth: 2 },
  //   },
  // ],
})
class Product {
  // constructor(name, category, subCategory, price) {
  //   this.name = name
  //   this.category = category
  //   this.subCategory = subCategory
  //   this.price = price
  //   this.recipes = []
  // }
  // toJSON() {
  //   return {
  //     name: this.name,
  //     category: this.category,
  //     subCategory: this.subCategory,
  //     price: this.price,
  //     recipes: this.recipes.map(recipe => ({
  //       product: {
  //         name: recipe.product.name,
  //         // Add other properties of the product as needed
  //       },
  //       ingredients: recipe.ingredients,
  //     })),
  //   }
  // }
  calculateCost() {}

  // static create({ name, category, subCategory, price }) {
  //   const product = new Product(name, category, subCategory, price)
  //   Product.list.push(product)
  //   return product
  // }
  // static list = []
}

productSchema.plugin(autopopulate)
productSchema.loadClass(Product)
module.exports = mongoose.model('Product', productSchema)
// module.exports = Product
