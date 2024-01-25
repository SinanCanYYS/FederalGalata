<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'

export default {
  name: 'AddProductView',
  data() {
    return {
      name: null,
      category: null,
      subCategory: null,
      price: null,
      // categoryList: [],
      // subCategoryList: [],
      categoryId: null
    }
  },
  computed: {
    ...mapState(useCategoryStore, ['categoryList', 'subCategoryList'])
  },
  methods: {
    ...mapActions(useProductStore, ['addProduct']),
    ...mapActions(useCategoryStore, ['fetchCategoryList', 'fetchSubCategoryList']),

    async addItem() {
      await this.addProduct(this.name, this.category, this.subCategory, this.price)
      this.$router.push('/products')
    },
    // async getSubCategoryList(categoryId) {
    //   this.subCategoryList = await this.fetchSubCategoryList(categoryId)
    // },
    async onCategoryChange() {
      if (this.category) {
        // Fetch subcategory list based on the selected category
        await this.fetchSubCategoryList(this.category)
      }
    }
  },
  watch: {
    category: {
      immediate: true, // Trigger the handler immediately when the component is created
      handler: async function () {
        await this.onCategoryChange()
      }
    }
  },

  async created() {
    await this.fetchCategoryList('product')
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
              <select id="category" v-model="category">
                <option value="" disabled>Select a category</option>
                <option v-for="cat in categoryList" :key="cat._id" :value="cat._id">
                  {{ cat.name }}
                </option>
              </select>
              <!-- <input id="category" type="text" v-model="category" /> -->
            </td>
          </tr>
          <tr class="line">
            <td>
              <label for="subCategory">Subcategory</label>
            </td>
            <td>
              <select id="subCategory" v-model="subCategory">
                <option value="" disabled>Select a subcategory</option>
                <option v-for="subCat in subCategoryList" :key="subCat._id" :value="subCat._id">
                  {{ subCat.name }}
                </option>
              </select>
              <!-- <input id="subCategory" type="text" v-model="subCategory" /> -->
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
