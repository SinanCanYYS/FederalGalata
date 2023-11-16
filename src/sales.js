class Sales {
  constructor(period, salesList) {
    this.period = period
    this.salesList = salesList
  }
  static create({ period, salesList }) {
    const newSales = new Sales(period, salesList)
    Sales.list.push(newSales)
    return newSales
  }
  static list = []
}

module.exports = Sales
