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
      this.$router.push('/')
    }
  }
}
</script>
<template>
  <div class="signupForm">
    <h2>Sign Up Page</h2>
    <form @submit.prevent="submitSignUp">
      <table>
        <tbody>
          <tr class="line">
            <td>
              <label for="name">Name</label>
            </td>
            <td>
              <input id="name" type="text" v-model="name" />
            </td>
          </tr>
          <tr class="line">
            <td>
              <label for="age">Age</label>
            </td>
            <td>
              <input id="age" type="number" v-model="age" />
            </td>
          </tr>
          <tr class="line">
            <td>
              <label for="email">E-mail</label>
            </td>
            <td>
              <input id="email" type="text" v-model="email" />
            </td>
          </tr>
          <tr class="line">
            <td>
              <label for="password">Password</label>
            </td>
            <td>
              <input id="password" type="password" v-model="password" />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<style scoped>
.signupForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  background-color: rgb(202, 202, 160);
  display: flex;
  flex: 0.5;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

button {
  width: 50%;
}
</style>
