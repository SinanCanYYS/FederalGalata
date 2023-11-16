class Product {
  constructor(name, category, subCategory, price) {
    this.name = name
    this.category = category
    this.subCategory = subCategory
    this.price = price
    this.recipes = []
  }
  calculateCost() {}
  static create({ name, category, subCategory, price }) {
    const product = new Product(name, category, subCategory, price)
    Product.list.push(product)
    return product
  }
  static list = []
}

module.exports = Product
