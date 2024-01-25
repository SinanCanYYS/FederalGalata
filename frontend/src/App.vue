<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAccountStore } from './stores/account'
import { mapActions, mapState } from 'pinia'
import { createApp } from 'vue'

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/')
    }
  },
  async mounted() {
    await this.fetchUser()
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div>
          <RouterLink to="/menu">Menu</RouterLink>
        </div>
        <div class="menu">
          <RouterLink to="/products">Products</RouterLink>
          <RouterLink to="/rawmaterials">Raw Materials</RouterLink>
          <RouterLink to="/purchases">Purchase</RouterLink>
          <RouterLink to="/suppliers">Supplier</RouterLink>
          <RouterLink to="/settings">Settings</RouterLink>
        </div>
        <div class="log">
          <RouterLink v-if="!user" to="/">Login</RouterLink>
          <RouterLink v-if="!user" to="/signup">Sign Up</RouterLink>
          <a v-if="user" @click="doLogout">Log out</a>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
  <footer>logged in user {{ user?.name }}</footer>
</template>

<style scoped>
/* .wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
} */

main {
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: beige;
}

footer {
  position: sticky;
  background-color: blanchedalmond;
  margin-top: auto;
}
nav {
  width: 100%;
  font-size: 1em;
  /* text-align: center; */
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}

nav a {
  text-decoration: underline;
  color: blue;
}

@media (max-width: 700px) {
  nav,
  .menu {
    flex-direction: column;
    align-items: center;
    margin: 30px;
  }
}
.menu {
  border: 1px solid;
  flex: 1;
  max-width: 50%;
  display: flex;
  justify-content: space-evenly;
}
.log {
  width: 20%;
  border: 1px solid;
  display: flex;
  justify-content: space-evenly;
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
