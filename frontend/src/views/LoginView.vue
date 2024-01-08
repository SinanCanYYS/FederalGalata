<script>
import { useAccountStore } from '@/stores/account'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login(this.email, this.password)
    }
  }
}
</script>
<template>
  <h1>Login View</h1>
  <form @submit.prevent="doLogin">
    <label for="email">E-mail</label>
    <input id="email" type="text" v-model="email" />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>
