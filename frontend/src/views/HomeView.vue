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
      this.$router.push('/menu')
    }
  }
}
</script>
<template>
  <div class="loginForm">
    <h2>Login View</h2>
    <form @submit.prevent="doLogin">
      <table>
        <tbody>
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
      <button type="submit">Login</button>
    </form>
    <RouterLink v-if="!user" to="/signup">New User</RouterLink>
  </div>
</template>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form {
  display: flex;
  flex: 0.5;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

form button {
  width: 50%;
}

table {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.line {
  margin: 30px;
}
</style>
