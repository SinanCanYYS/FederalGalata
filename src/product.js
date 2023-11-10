class Product {
  constructor(name, category, subCategory, price) {
    this.name = name
    this.category = category
    this.subCategory = subCategory
    this.price = price
    this.recipes = []
  }
  calculateCost() {}
}

module.exports = Product
