<script>
import { mapActions } from 'pinia'
import { usePurchaseStore } from '@/stores/purchase'
import { useSupplierStore } from '@/stores/supplier'
import { useRawMaterialStore } from '@/stores/rawMaterial'

export default {
  name: 'NewPurchaseView',
  data() {
    return {
      selectedSupplier: null,
      selectedItem: null,
      selectedQty: 1,
      selectedPrice: 0,
      date: null,
      cart: [],
      supplierList: [],
      rawMaterialList: []
    }
  },
  async mounted() {
    this.rawMaterialList = await this.fetchRawMaterials()
    this.supplierList = await this.fetchSuppliers()
  },
  methods: {
    ...mapActions(usePurchaseStore, ['addNewPurchase']),
    ...mapActions(useSupplierStore, ['fetchSuppliers']),
    ...mapActions(useRawMaterialStore, ['fetchRawMaterials']),
    async addPurchase() {
      await this.addNewPurchase(this.selectedSupplier, this.date, this.cart)
      this.$router.push('/purchases')
    },
    addToCart() {
      const rawMaterial = this.rawMaterialList.find((item) => item._id === this.selectedItem)
      this.cart.push({
        rawMaterial,
        quantity: this.selectedQty,
        price: this.selectedPrice
      })
    }
  }
}
</script>
<template>
  <div class="purchaseForm">
    <h2>New Purchase</h2>
    <form @submit.prevent="addPurchase">
      <table>
        <tbody>
          <tr>
            <td>
              <label for="supplier">Supplier</label>
            </td>
            <td>
              <select id="supplier" v-model="selectedSupplier">
                <option v-for="supplier in supplierList" :key="supplier._id" :value="supplier._id">
                  {{ supplier.name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="date">Date</label>
            </td>
            <td>
              <input id="date" type="date" v-model="date" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="purchaseCart">Purchase Cart</label>
            </td>
            <td>
              <select id="purchaseCart" v-model="selectedItem">
                <option v-for="item in rawMaterialList" :key="item._id" :value="item._id">
                  {{ item.name }}
                </option>
              </select>
              <input type="number" v-model="selectedQty" placeholder="Quantity" />
              <input type="number" v-model="selectedPrice" placeholder="Price" />
              <button @click.prevent="addToCart">Add to Cart</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Add Purchase</button>
    </form>
    <div class="Cart">
      <h3>Cart</h3>
      <ul>
        <li v-for="cartItem in cart" :key="cartItem.rawMaterial._id">
          {{ cartItem.rawMaterial.name }} - Quantity: {{ cartItem.quantity }} - Price:{{
            cartItem.price
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.purchaseForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  background-color: rgb(202, 202, 160);
  display: flex;
  flex: 0.5;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

button {
  width: 50%;
}
</style>
