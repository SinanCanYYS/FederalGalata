<script>
import { mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'
import { useRawMaterialStore } from '@/stores/rawMaterial'

export default {
  name: 'RecipeDetailView',
  props: {
    productId: String,
    recipeId: String
  },
  data() {
    return {
      isLoading: false,
      recipe: null,
      isEditRecipeModalOpen: false,
      rawMaterials: [],
      selectedRawMaterial: null,
      selectedQty: 0,
      tempIngredients: []
    }
  },
  methods: {
    ...mapActions(useProductStore, ['fetchRecipe']),
    ...mapActions(useRawMaterialStore, ['fetchRawMaterials']),
    async openEditRecipeModal() {
      this.isEditRecipeModalOpen = true
      this.rawMaterials = await this.fetchRawMaterials()
      this.tempIngredients = this.recipe.ingredients
    },
    closeEditRecipeModal() {
      this.tempIngredients = []
      this.resetSelectedIngredient()
      this.isEditRecipeModalOpen = false
    },
    async updateRecipe() {
      // await this.createCategory(this.newCategoryName, this.newCategoryType)
      this.recipe.ingredients = this.tempIngredients
      // Close the modal after creating the category
      this.closeEditRecipeModal()
    },
    addNewIngredient() {
      this.tempIngredients.push({
        rawMaterial: this.selectedRawMaterial,
        quantity: this.selectedQty
      })
      this.resetSelectedIngredient()
    },
    resetSelectedIngredient() {
      this.selectedRawMaterial = null
      this.selectedQty = 0
    }
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
  <button @click="openEditRecipeModal">Edit Recipe</button>
  <div v-if="isEditRecipeModalOpen" class="overlay">
    <div class="dialog">
      <h1>Recipe</h1>
      <div>
        <select v-model="selectedRawMaterial" id="rawMaterial">
          <option v-for="rawMaterial in rawMaterials" :key="rawMaterial._id" :value="rawMaterial">
            {{ rawMaterial.name }}
          </option>
        </select>
        <input type="number" v-model="selectedQty" />
        <button type="button " @click.stop="addNewIngredient">Ekle</button>
      </div>
      <form @submit.prevent="updateRecipe">
        <div style="margin: 10px">
          <h3>Ingredients</h3>
          <ul>
            <li v-for="ingredient in tempIngredients" :key="ingredient._id">
              <p>{{ ingredient.rawMaterial.name }} - {{ ingredient.quantity }}</p>
            </li>
          </ul>
        </div>
        <div>
          <button type="submit" class="btn btn-primary">Update</button>
          <button type="button" class="btn btn-danger" @click="closeEditRecipeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-if="!isLoading">
    <h3>Ingredients</h3>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient._id">
        <p>{{ ingredient.rawMaterial.name }} - {{ ingredient.quantity }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  height: 60%;
  width: 60%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
