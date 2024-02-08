import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categoryList: [],
      subCategoryList: []
    }
  },
  actions: {
    async fetchCategoryList(type) {
      const list = (await axios.get('/category')).data
      this.categoryList = list.filter((item) => item.type === type)
    },
    async fetchSubCategoryList(categoryId) {
      this.subCategoryList = (await axios.get(`/category/${categoryId}/subcategory`)).data
    },
    async createCategory(name, type) {
      return await axios.post('/category', {
        name,
        type
      })
    },
    async createSubCategory(name, categoryId) {
      return await axios.post(`/category/${categoryId}/subcategory`, {
        name
      })
    }
  }
})
