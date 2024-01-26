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
      newSubCategoryType: '',
      isCreateCategoryModalOpen: false
    }
  },
  computed: {
    ...mapState(useCategoryStore, ['subCategoryList'])
  },
  methods: {
    ...mapActions(useCategoryStore, ['fetchSubCategoryList']),
    async onCategoryChange() {
      await this.fetchSubCategoryList(this.categoryId)
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
    <h2>Sub-Category</h2>
    <ul>
      <li v-for="subCat in subCategoryList" :key="subCat._id">{{ subCat.name }}</li>
    </ul>
  </div>
</template>
