<script>
import axios from 'axios'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'

export default {
  name: 'productView',
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProduct'])
  },
  computed: {
    ...mapState(useProductStore, ['product'])
  },
  async created() {
    this.isLoading = true
    await this.fetchProduct(this.$route.params.id)
    this.isLoading = false
  }
}
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="!isLoading">
    <h1>Product Detail</h1>
    <h2>Name: {{ product.name }}</h2>
    <h2>Price : {{ product.price }}</h2>
    <h2>Recipes</h2>
  </div>
</template>
