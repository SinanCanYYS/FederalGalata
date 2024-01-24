<script>
import { mapActions } from 'pinia'
import { usePurchaseStore } from '@/stores/purchase'

export default {
  name: 'purchaseDetailView',
  data() {
    return {
      purchase: null
    }
  },
  methods: {
    ...mapActions(usePurchaseStore, ['fetchPurchase'])
  },
  async created() {
    this.purchase = await this.fetchPurchase(this.$route.params.id)
  }
}
</script>

<template>
  <div v-if="purchase">
    <h2>Purchase Detail</h2>
    <h3>{{ purchase.date }}</h3>
    <h3>{{ purchase.supplier }}</h3>
    <ul>
      <li v-for="purchaseItem in purchase.purchaseItems" :key="purchaseItem._id">
        {{ purchaseItem.rawMaterial }} - {{ purchaseItem.quantity }} - {{ purchaseItem.price }}
      </li>
    </ul>
  </div>
</template>
