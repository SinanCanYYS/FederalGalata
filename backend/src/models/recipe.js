const Product = require('./product')
const Rawmaterial = require('./rawmaterial')
const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  ingredients: [
    {
      rawMaterial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rawmaterial',
      },
      quantity: Number,
    },
  ],
})
class Recipe {
  // constructor(product, ingredients) {
  //   this.product = product
  //   this.ingredients = ingredients
  // }
  // toJSON() {
  //   // Exclude circular references when converting to JSON
  //   return {
  //     product: this.product.toJSON(), // Call toJSON for the associated product
  //     ingredients: this.ingredients,
  //   }
  // }
  get cost() {}

  // static create({ product, ingredients }) {
  //   const newRecipe = new Recipe(product, ingredients)
  //   Recipe.list.push(newRecipe)
  //   return newRecipe
  // }
  // static list = []
}

recipeSchema.loadClass(Recipe)
module.exports = mongoose.model('Recipe', recipeSchema)

// module.exports = Recipe
