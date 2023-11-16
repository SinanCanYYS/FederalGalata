class Recipe {
  constructor(product, ingredients) {
    this.product = product
    this.ingredients = ingredients
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
