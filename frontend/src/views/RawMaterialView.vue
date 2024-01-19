<script>
import { mapState, mapActions } from 'pinia'
import { useRawMaterialStore } from '@/stores/rawMaterials'

export default {
  name: 'rawMaterialView',
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions(useRawMaterialStore, ['fetchRawMaterial'])
  },
  computed: {
    ...mapState(useRawMaterialStore, ['rawMaterial'])
  },
  async created() {
    this.isLoading = true
    await this.fetchRawMaterial(this.$route.params.id)
    this.isLoading = false
  }
}
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="!isLoading">
    <h1>Raw Material Detail</h1>
    <h2>Name: {{ rawMaterial.name }}</h2>
    <h2>Price : {{ rawMaterial.price }}</h2>
    <h2>Recipes</h2>
  </div>
</template>
