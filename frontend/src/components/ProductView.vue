<script>
import axios from 'axios'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'

export default {
  name: 'productView',
  props: {
    product: Object // Product details received as a prop
  },
  methods: {
    showRecipeDetails(recipeId) {
      this.$emit('showRecipeDetails', recipeId) // Emit an event to the parent component
    }
  }
  // data() {
  //   return {
  //     isLoading: false
  //   }
  // }
  // methods: {
  //   ...mapActions(useProductStore, ['fetchProduct'])
  // },
  // computed: {
  //   ...mapState(useProductStore, ['product'])
  // },
  // async created() {
  //   this.isLoading = true
  //   await this.fetchProduct(this.$route.params.id)
  //   this.isLoading = false
  // }
}
</script>
<template>
  <!-- <div v-if="isLoading">Loading...</div> -->
  <div v-if="product">
    <h4>Name: {{ product.name }}</h4>
    <h4>Price : {{ product.price }}</h4>
    <h4>Category : {{ product.category }}</h4>
    <h4>Sub-Category : {{ product.subCategory }}</h4>

    <button @click="showRecipeDetails(product.recipes._id)">Recipe</button>
    <!-- <ul> -->
    <!-- <li v-for="recipe in product.recipes" :key="recipe._id"> -->
    <!-- <button @click="showRecipeDetails(recipe._id)">{{ recipe._id }}</button> -->
    <!-- <router-link :to="`/products/${product._id}/recipes/${recipe._id}`">{{
          recipe._id
        }}</router-link> -->
    <!-- </li> -->
    <!-- </ul> -->
  </div>
  <div v-else>
    <!-- Render something when product is null -->
    Loading...
  </div>
</template>
