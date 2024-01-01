<script>
import axios from 'axios'

export default {
  name: 'signUp',
  data() {
    return {
      name: '',
      email: '',
      age: 0,
      password: ''
    }
  },
  methods: {
    async submitSignUp() {
      await axios.post('http://localhost:3000/users', {
        name: this.name,
        age: this.age,
        email: this.email,
        password: this.password
      })
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
