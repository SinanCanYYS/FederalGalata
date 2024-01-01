import axios from 'axios'
import { defineStore } from 'pinia'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null
    }
  },
  // state: () =>({
  //     user: null
  // }),
  actions: {
    async fetchUser(userId) {
      this.user = (await axios.get(`/users/${userId}`)).data
    }
  }
})
