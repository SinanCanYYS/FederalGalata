class Recipe {
  constructor(product, ingredients) {
    this.product = product
    this.ingredients = ingredients
  }
  toJSON() {
    // Exclude circular references when converting to JSON
    return {
      product: this.product.toJSON(), // Call toJSON for the associated product
      ingredients: this.ingredients,
    }
  }
  get cost() {}

  static create({ product, ingredients }) {
    const newRecipe = new Recipe(product, ingredients)
    Recipe.list.push(newRecipe)
    return newRecipe
  }
  static list = []
}

module.exports = Recipe
