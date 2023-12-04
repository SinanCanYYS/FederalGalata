class Rawmaterial {
  constructor(name, category, subCategory, price, stockControl, unit) {
    this.name = name
    this.category = category
    this.subCategory = subCategory
    this.price = price
    this.stockControl = stockControl
    this.unit = unit
  }
  static create({ name, category, subCategory, price, stockControl, unit }) {
    const newRawmaterial = new Rawmaterial(name, category, subCategory, price, stockControl, unit)
    Rawmaterial.list.push(newRawmaterial)
    return newRawmaterial
  }
  static list = []
}

module.exports = Rawmaterial
