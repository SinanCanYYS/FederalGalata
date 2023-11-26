class Recipe {
  constructor(productName, ingredients) {
    this.productName = productName
    this.ingredients = ingredients
  }
  // toJSON() {
  //   // Exclude circular references when converting to JSON
  //   return {
  //     product: this.product.toJSON(), // Call toJSON for the associated product
  //     ingredients: this.ingredients,
  //   }
  // }
  get cost() {}

  static create({ productName, ingredients }) {
    const newRecipe = new Recipe(productName, ingredients)
    Recipe.list.push(newRecipe)
    return newRecipe
  }
  static list = []
}

module.exports = Recipe
