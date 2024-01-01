<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import CounterFromStore from '../components/CounterFromStore.vue'
import Counter from '../components/Counter.vue'

export default {
  name: 'UserDetail',
  // data() {
  //   return {

  //   }
  // },
  components: {
    CounterFromStore,
    Counter
  },
  computed: {
    ...mapState(useUserStore, ['user'])
  },
  methods: {
    ...mapActions(useUserStore, ['fetchUser'])
  },
  async created() {
    await this.fetchUser(this.$route.params.id)
    // this.user = user
  }
}
</script>
<template lang="pug">
div(v-if="user")
  CounterFromStore
  Counter(name="Wine")
  h1 User Page
  h2 Name {{ user.name }}
  h2 Age {{ user.age }}
  h2 Id {{ user._id }}
  router-link(:to='{ path: "/users" }') All Users
</template>
