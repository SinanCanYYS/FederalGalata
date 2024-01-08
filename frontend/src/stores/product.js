import axios from 'axios'
import { defineStore } from 'pinia'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      product: null
    }
  },
  actions: {
    async fetchProducts() {
      return (await axios.get('/products')).data
    },
    async fetchProduct(productId) {
      this.product = (await axios.get(`/products/${productId}`)).data
    }
  }
})
