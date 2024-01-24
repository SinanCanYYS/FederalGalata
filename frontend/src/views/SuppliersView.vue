<script>
import { useSupplierStore } from '@/stores/supplier'
import { mapActions } from 'pinia'

export default {
  name: 'suppliersView',
  data() {
    return {
      suppliers: []
    }
  },
  methods: {
    ...mapActions(useSupplierStore, ['fetchSuppliers'])
  },
  async created() {
    this.suppliers = await this.fetchSuppliers()
  }
}
</script>

<template>
  <div>
    <h1>Suppliers View</h1>
    <Router-link to="/suppliers/newsupplier">
      <button>Add New Supplier</button>
    </Router-link>
    <ul>
      <li v-for="supplier in suppliers" :key="supplier._id">
        <router-link :to="`/suppliers/${supplier._id}`"
          >{{ supplier.name }} - {{ supplier.contact }}</router-link
        >
      </li>
    </ul>
  </div>
</template>
