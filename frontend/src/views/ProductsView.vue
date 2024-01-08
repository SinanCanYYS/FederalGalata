<script>
import { mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'

export default {
  name: 'productsView',
  data() {
    return {
      products: []
    }
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProducts'])
  },
  async created() {
    this.products = await this.fetchProducts()
  }
}
</script>
<template lang="pug">
div(v-if="products")
  h1 Product List
  ul
    li(v-for="product in products" :key="product._id")
         router-link(:to='`/products/${product._id}`') {{ product.name }}
</template>
