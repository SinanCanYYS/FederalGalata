<script>
import { mapState, mapActions } from 'pinia'
import { useRawMaterialStore } from '@/stores/rawMaterial'

export default {
  name: 'AddNewRecipe',
  data() {
    return {
      ingredients: []
    }
  },
  methods: {
    ...mapActions(useRawMaterialStore, ['fetchRawMaterials'])
  },
  async mounted() {
    await this.fetchRawMaterials()
  }
}
</script>
<template>
  <h3>New Recipe</h3>
</template>
