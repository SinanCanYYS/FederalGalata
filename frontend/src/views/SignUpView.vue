<script>
import { useUserStore } from '@/stores/user'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'SignUpView',
  data() {
    return {
      name: null,
      age: null,
      email: null,
      password: null
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signUp']),
    async submitSignUp() {
      await this.signUp(this.name, this.age, this.email, this.password)
    }
  }
}
</script>
<template>
  <h1>Sign Up Page</h1>
  <form @submit.prevent="submitSignUp">
    <label for="name">Name</label>
    <input id="name" type="text" v-model="name" />
    <label for="age">Age</label>
    <input id="age" type="number" v-model="age" />
    <label for="email">E-mail</label>
    <input id="email" type="text" v-model="email" />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <button type="submit">Sign Up</button>
  </form>
</template>
