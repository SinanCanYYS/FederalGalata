<script>
import { mapActions } from 'pinia'
import { usePurchaseStore } from '@/stores/purchase'
import { useSupplierStore } from '@/stores/supplier'

export default {
  name: 'purchaseView',
  data() {
    return {
      purchases: []
    }
  },
  methods: {
    ...mapActions(usePurchaseStore, ['fetchPurchases'])
  },
  async created() {
    this.purchases = await this.fetchPurchases()
  }
}
</script>
<template>
  <div>
    <h2>Purchases Page</h2>
    <Router-link to="/purchases/newpurchase">
      <button>New Purchase</button>
    </Router-link>
    <ul>
      <li v-for="purchase in purchases" :key="purchase._id">
        <router-link :to="`/purchases/${purchase._id}`">
          {{ purchase.date }}- {{ purchase.supplier.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
