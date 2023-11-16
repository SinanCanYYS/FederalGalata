class Supplier {
  constructor(name, contact, email) {
    this.name = name
    this.contact = contact
    this.email = email
  }
  static create({ name, contact, email }) {
    const newSupplier = new Supplier(name, contact, email)
    Supplier.list.push(newSupplier)
    return newSupplier
  }
  static list = []
}

module.exports = Supplier
