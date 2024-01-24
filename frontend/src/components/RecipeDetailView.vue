<script>
import { mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'

export default {
  name: 'RecipeDetailView',
  props: {
    productId: String,
    recipeId: String
  },
  data() {
    return {
      isLoading: false,
      recipe: null
    }
  },
  methods: {
    ...mapActions(useProductStore, ['fetchRecipe'])
  },
  async created() {
    this.isLoading = true
    this.recipe = await this.fetchRecipe(this.productId, this.recipeId)
    // this.recipe = await this.fetchRecipe(this.$route.params.productId, this.$route.params.recipeId)
    this.isLoading = false
  }
}
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="!isLoading">
    <h2>Recipe Detail</h2>
    <h3>Name: {{ recipe._id }}</h3>

    <h3>Ingredients</h3>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient._id">
        <p>{{ ingredient.rawMaterial.name }} - {{ ingredient.quantity }}</p>
      </li>
    </ul>
  </div>
</template>
