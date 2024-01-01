<script>
import axios from 'axios'

import Counter from '../components/Counter.vue'
import CounterOptionsApi from '../components/CounterOptionsApi.vue'
import CounterFromStore from '../components/CounterFromStore.vue'

export default {
  name: 'usersView',
  components: {
    Counter, // Register the Counter component for use in the template
    CounterOptionsApi,
    CounterFromStore
  },
  data() {
    return {
      userList: []
    }
  },
  async created() {
    this.userList = (await axios.get('http://localhost:3000/users')).data
  }
}

// const { data: userList } = await axios.get('http://api:3000/users')
// console.log(userList)
// const usersResponse = await axios.get('http://localhost:3000/users')

// const users = usersResponse.data
</script>

<template>
  <div class="users">
    <h1>Federal Galata Stock Control</h1>
    <CounterFromStore />
    <Counter name="Wine" />
    <!-- <Counter name="Beer" />
    <Counter name="Wine" />
    <CounterOptionsApi name="Rakı" />
    <CounterOptionsApi name="Ouzo" /> -->
    <ul>
      <li v-for="user in userList" :key="user._id">
        <RouterLink :to="`/users/${user._id}`"> {{ user.name }} - {{ user.age }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
