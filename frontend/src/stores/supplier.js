import axios from 'axios'
import { defineStore } from 'pinia'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useSupplierStore = defineStore('supplier', {
  state: () => {
    return {
      supplier: null
    }
  },
  actions: {
    async fetchSuppliers() {
      return (await axios.get('/suppliers')).data
    },
    async fetchSupplier(supplierId) {
      this.supplier = (await axios.get(`/suppliers/${supplierId}`)).data
    },
    async addNewSupplier(name, contact, email) {
      return await axios.post('suppliers', { name, contact, email })
    }
  }
})
