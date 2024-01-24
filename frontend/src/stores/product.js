import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

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
    },
    async addProduct(name, category, subCategory, price) {
      return await axios.post('/products', {
        name,
        category,
        subCategory,
        price
      })
    },
    async fetchRecipe(productId, recipeId) {
      return (await axios.get(`/products/${productId}/recipes/${recipeId}`)).data
    }
  }
})
