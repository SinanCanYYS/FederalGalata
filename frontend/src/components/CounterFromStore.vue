<script>
import { useCounterStore } from '@/stores/counter'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'CounterFromStore',
  computed: {
    ...mapState(useCounterStore, ['count', 'doubleCount'])
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'decrement'])
  }
}
</script>
<template lang="pug">
div
  h2 CounterFromStore
  p Count: {{ count }} - {{ doubleCount }}
  button(@click.prevent="increment") Increment
  button(@click.prevent="decrement") Decrement
</template>
