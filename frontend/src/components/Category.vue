<script>
import { mapState, mapActions } from 'pinia'
import { useCategoryStore } from '@/stores/category'

export default {
  name: 'categoryView',
  data() {
    return {
      catType: null,
      // categoryList: [],
      subCategoryList: [],
      newCategoryName: '',
      newCategoryType: '',
      isCreateCategoryModalOpen: false
    }
  },
  computed: {
    ...mapState(useCategoryStore, ['categoryList', 'subCategoryList'])
  },
  methods: {
    ...mapActions(useCategoryStore, ['fetchCategoryList', 'createCategory']),
    async doFetch() {
      await this.fetchCategoryList(this.catType)
    },
    openCreateCategoryModal() {
      this.isCreateCategoryModalOpen = true
    },
    closeCreateCategoryModal() {
      this.isCreateCategoryModalOpen = false
      // Clear form fields if needed
      this.newCategoryName = ''
    },
    async addNewCategory() {
      // Call the action to create a new category
      await this.createCategory(this.newCategoryName, this.newCategoryType)

      // Close the modal after creating the category
      this.closeCreateCategoryModal()
    }
  }
}
</script>
<template>
  <div class="category">
    <button @click="openCreateCategoryModal">Add New Category</button>
    <!-- Modal for creating a new category -->
    <div v-if="isCreateCategoryModalOpen" class="modal">
      <form @submit.prevent="addNewCategory">
        <label for="newCategoryName">Category Name:</label>
        <input type="text" id="newCategoryName" v-model="newCategoryName" required />

        <label for="newCategoryType">Category Type:</label>
        <select id="newCategoryType" v-model="newCategoryType" required>
          <option value="product">Product</option>
          <option value="rawMaterial">Raw Material</option>
        </select>

        <button type="submit">Create Category</button>
        <button type="button" @click="closeCreateCategoryModal">Cancel</button>
      </form>
    </div>
    <div>
      <h2>Category List</h2>
      <label for="catType">Choose Category Type</label>
      <select id="catType" v-model="catType" @change="doFetch">
        <option value="product">Product</option>
        <option value="rawMaterial">Raw Material</option>
      </select>
    </div>
    <div class="list">
      <ul v-if="catType && categoryList && categoryList.length > 0">
        <!-- Display the fetched categoryList items -->
        <li v-for="category in categoryList" :key="category._id">{{ category.name }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.category {
  display: flex;
  flex-direction: column;
}

.list {
  background-color: aqua;
}
</style>
