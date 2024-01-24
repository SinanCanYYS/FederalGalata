<script>
import { mapActions } from 'pinia'
import { useRawMaterialStore } from '@/stores/rawMaterial'

export default {
  name: 'rawMaterialsView',
  data() {
    return {
      rawMaterials: []
    }
  },
  methods: {
    ...mapActions(useRawMaterialStore, ['fetchRawMaterials'])
  },
  async created() {
    this.rawMaterials = await this.fetchRawMaterials()
  }
}
</script>
<template lang="pug">
div(v-if="rawMaterials")
  h1 Raw Material List
  Router-link(to="/rawmaterials/newrawmaterial")
    Button Add New Raw Material
  ul
    li(v-for="rawMaterial in rawMaterials" :key="rawMaterial._id")
         router-link(:to='`/rawmaterials/${rawMaterial._id}`') {{ rawMaterial.name }}
</template>
