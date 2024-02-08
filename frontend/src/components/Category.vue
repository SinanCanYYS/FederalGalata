<script>
import { mapState, mapActions } from 'pinia'
import { useCategoryStore } from '@/stores/category'
import SubCategory from '@/components/SubCategory.vue'

export default {
  name: 'categoryView',
  components: {
    SubCategory
  },
  data() {
    return {
      catType: null,
      // categoryList: [],
      // subCategoryList: [],
      selectedCategoryId: '',
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
    selectCategory(categoryId) {
      // Set selectedCategoryId when a category is clicked
      this.selectedCategoryId = categoryId
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
    <div v-if="isCreateCategoryModalOpen" class="overlay">
      <div class="dialog">
        <form @submit.prevent="addNewCategory">
          <div style="margin: 10px">
            <label for="newCategoryName">Category Name:</label>
            <input type="text" id="newCategoryName" v-model="newCategoryName" required />
          </div>
          <div style="margin: 10px">
            <label for="newCategoryType">Category Type:</label>
            <select id="newCategoryType" v-model="newCategoryType" required>
              <option value="product">Product</option>
              <option value="rawMaterial">Raw Material</option>
            </select>
          </div>
          <div>
            <button type="submit" class="btn">Create</button>
            <button type="button" class="btn" @click="closeCreateCategoryModal">Cancel</button>
          </div>
        </form>
      </div>
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
        <li
          v-for="category in categoryList"
          :key="category._id"
          @click="selectCategory(category._id)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
  </div>
  <div class="subCategory">
    <SubCategory :categoryId="selectedCategoryId" v-if="selectedCategoryId" />
  </div>
</template>
<style scoped>
.category {
  display: flex;
  flex-direction: column;
}

/* .modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 1000;
  border: 1px solid #ccc;
} */

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
  height: 20%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn {
  width: 40%;
  height: 30px;
  margin: 10px;
}
</style>
