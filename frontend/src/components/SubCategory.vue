<script>
import { mapState, mapActions } from 'pinia'
import { useCategoryStore } from '@/stores/category'

export default {
  name: 'subCategoryView',
  props: {
    categoryId: String
  },
  data() {
    return {
      newSubCategoryName: '',
      newSubCategoryCat: '',
      isCreateSubCategoryModalOpen: false
    }
  },
  computed: {
    ...mapState(useCategoryStore, ['subCategoryList'])
  },
  methods: {
    ...mapActions(useCategoryStore, ['fetchSubCategoryList', 'createSubCategory']),
    async onCategoryChange() {
      await this.fetchSubCategoryList(this.categoryId)
    },
    openCreateSubCategoryModal() {
      this.isCreateSubCategoryModalOpen = true
    },
    closeCreateSubCategoryModal() {
      this.isCreateSubCategoryModalOpen = false
      // Clear form fields if needed
      this.newSubCategoryName = ''
      this.newSubCategoryCat = ''
    },
    async addNewSubCategory() {
      // Call the action to create a new sub category
      await this.createSubCategory(this.newSubCategoryName, this.categoryId)

      // Close the modal after creating the category
      this.closeCreateSubCategoryModal()
    }
  },

  async created() {
    await this.fetchSubCategoryList(this.categoryId)
  },
  watch: {
    categoryId: {
      immediate: true, // Trigger the handler immediately when the component is created
      handler: async function () {
        await this.onCategoryChange()
      }
    }
  }
}
</script>
<template>
  <div class="subCategory">
    <button @click="openCreateSubCategoryModal">Add New Sub Category</button>
    <div v-if="isCreateSubCategoryModalOpen" class="overlay">
      <div class="dialog">
        <form @submit.prevent="addNewSubCategory">
          <div>
            <label for="newSubCategoryName">SubCategory Name:</label>
            <input
              type="text"
              id="newSubCategoryName"
              v-model="newSubCategoryName"
              placeholder="Sub Cat Name"
              required
            />
          </div>
          <div>
            <button type="submit" class="btn">Create</button>
            <button type="button" class="btn" @click="closeCreateSubCategoryModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <div>
      <h2>Sub-Category</h2>
      <ul>
        <li v-for="subCat in subCategoryList" :key="subCat._id">{{ subCat.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.subCategory {
  display: flex;
  flex-direction: column;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 1000;
  border: 1px solid #ccc;
}

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
