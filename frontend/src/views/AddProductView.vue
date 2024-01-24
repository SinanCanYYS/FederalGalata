<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'

export default {
  name: 'AddProductView',
  data() {
    return {
      name: null,
      category: null,
      subCategory: null,
      price: null
    }
  },
  methods: {
    ...mapActions(useProductStore, ['addProduct']),
    async addItem() {
      await this.addProduct(this.name, this.category, this.subCategory, this.price)
      this.$router.push('/products')
    }
  }
}
</script>
<template>
  <div class="productForm">
    <h2>Add a new Product</h2>
    <form @submit.prevent="addItem">
      <table>
        <tbody>
          <tr class="line">
            <td>
              <label for="name">Name</label>
            </td>
            <td>
              <input id="name" type="text" v-model="name" />
            </td>
          </tr>
          <tr class="line">
            <td>
              <label for="category">Category</label>
            </td>
            <td>
              <input id="category" type="text" v-model="category" />
            </td>
          </tr>
          <tr class="line">
            <td>
              <label for="subCategory">Subcategory</label>
            </td>
            <td>
              <input id="subCategory" type="text" v-model="subCategory" />
            </td>
          </tr>
          <tr class="line">
            <td>
              <label for="price">Price</label>
            </td>
            <td>
              <input id="price" type="number" v-model="price" />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<style scoped>
.productForm {
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
