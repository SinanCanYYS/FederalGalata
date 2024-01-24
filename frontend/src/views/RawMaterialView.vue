<script>
import { mapState, mapActions } from 'pinia'
import { useRawMaterialStore } from '@/stores/rawMaterial'

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
    <h2>Raw Material Detail</h2>
    <h3>Name: {{ rawMaterial.name }}</h3>
    <h3>Price : {{ rawMaterial.price }}</h3>
  </div>
</template>
