import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      user: null
    }
  },
  actions: {
    async fetchUser() {
      this.user = (await axios.get('/accounts/session')).data
    },
    async login(email, password) {
      this.user = (
        await axios.post('/accounts/session', {
          email,
          password
        })
      ).data
    },
    async logout() {
      await axios.delete('/accounts/session')
      this.user = null
    }
  }
})
