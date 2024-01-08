import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null
    }
  },
  actions: {
    async fetchUser(userId) {
      this.user = (await axios.get(`/users/${userId}`)).data
    },
    async signUp(name, age, email, password) {
      this.user = (
        await axios.post('/users', {
          name,
          age,
          email,
          password
        })
      ).data
    }
  }
})
