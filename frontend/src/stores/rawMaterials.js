import axios from 'axios'
import { defineStore } from 'pinia'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useRawMaterialStore = defineStore('rawMaterials', {
  state: () => {
    return {
      rawMaterial: null
    }
  },
  actions: {
    async fetchRawMaterials() {
      return (await axios.get('/raw-materials')).data
    },
    async fetchRawMaterial(rawMaterialId) {
      this.rawMaterial = (await axios.get(`/raw-materials/${rawMaterialId}`)).data
    }
  }
})
