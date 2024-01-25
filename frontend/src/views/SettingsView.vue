<script>
import { mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'
import Category from '@/components/Category.vue'
import SubCategory from '@/components/SubCategory.vue'
export default {
  name: 'settingsView',
  components: {
    Category,
    SubCategory
  },
  data() {
    return {}
  },
  methods: {},
  async created() {}
}
</script>
<template>
  <div class="settingsPage">
    <div>
      <h1>Settings</h1>
    </div>
    <div class="category">
      <Category />
    </div>
    <div class="category">
      <SubCategory />
    </div>
  </div>
</template>
<style scoped>
.settingsPage {
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  width: 50%;
}
.category {
  background-color: azure;
  border: 1px solid;
  flex: 0.3;
}
</style>
