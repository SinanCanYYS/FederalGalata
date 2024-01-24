import axios from 'axios'
import { defineStore } from 'pinia'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const usePurchaseStore = defineStore('purchase', {
  state: () => {
    return {
      // purchase: null
    }
  },
  actions: {
    async fetchPurchases() {
      return (await axios.get('/purchases')).data
    },
    async fetchPurchase(purchaseId) {
      return (await axios.get(`/purchases/${purchaseId}`)).data
    },
    async addNewPurchase(supplier, date, cart) {
      return await axios.post('/purchases', {
        supplier,
        date,
        purchaseItems: cart
      })
    }
  }
})
