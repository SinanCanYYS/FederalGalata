<script>
import axios from 'axios'
import { mapState, mapActions } from 'pinia'
import { useSupplierStore } from '@/stores/supplier'

export default {
  name: 'supplierView',
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions(useSupplierStore, ['fetchSupplier'])
  },
  computed: {
    ...mapState(useSupplierStore, ['supplier'])
  },
  async created() {
    this.isLoading = true
    await this.fetchSupplier(this.$route.params.id)
    this.isLoading = false
  }
}
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="!isLoading">
    <h2>Supplier Detail</h2>
    <h3>Name: {{ supplier.name }}</h3>
    <h3>Contact : {{ supplier.contact }}</h3>
    <h3>E-mail : {{ supplier.email }}</h3>
  </div>
</template>
