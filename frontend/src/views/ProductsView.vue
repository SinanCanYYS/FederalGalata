<script>
import { mapActions } from 'pinia'
import { useProductStore } from '@/stores/product'
import ProductView from '@/components/ProductView.vue'
import RecipeDetailView from '@/components/RecipeDetailView.vue' // Update the path as needed

export default {
  name: 'productsView',
  components: {
    ProductView,
    RecipeDetailView
  },
  data() {
    return {
      products: [],
      selectedProduct: null,
      selectedRecipeId: null
    }
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProducts']),
    showProductDetails(product) {
      this.selectedProduct = product
      this.selectedRecipeId = null // Reset selectedRecipeId when selecting a new product
    },
    showRecipeDetails(recipeId) {
      this.selectedRecipeId = recipeId
    }
  },
  async created() {
    this.products = await this.fetchProducts()
  }
}
</script>
<template>
  <div class="productPage">
    <div class="productList" v-if="products">
      <h1>Product List</h1>
      <Router-link to="/products/newproduct">
        <button>Add New Product</button>
      </Router-link>
      <ul>
        <li v-for="product in products" :key="product._id">
          <!-- <button @click="showProductDetails(product)">{{ product.name }}</button>-->
          <div class="link-like" @click="showProductDetails(product)">{{ product.name }}</div>
          <!-- <router-link :to="`/products/${product._id}`">{{ product.name }}</router-link> -->
        </li>
      </ul>
    </div>
    <div class="product">
      <h3>Product</h3>
      <div class="productDetail">
        <h4>Product Detail</h4>
        <product-view :product="selectedProduct" @showRecipeDetails="showRecipeDetails" />
      </div>
      <div class="recipe">
        <h4>Recipe</h4>
        <recipe-detail-view
          :productId="selectedProduct._id"
          :recipeId="selectedRecipeId"
          v-if="selectedRecipeId"
        />
        RecipeView
      </div>
    </div>
  </div>
</template>

<style scoped>
.productPage {
  display: flex;
  flex: 1;
  justify-content: center;
}

.productList {
  flex: 0.5;
  padding: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  background-color: honeydew;
}

.link-like {
  cursor: pointer;
  color: blue; /* Change the color to resemble a link */
  text-decoration: none; /* Add underline to resemble a link */
}
.link-like:hover {
  cursor: pointer;
  color: red; /* Change the color to resemble a link */
  font-weight: bold;
  text-decoration: underline; /* Add underline to resemble a link */
}
.product {
  display: flex;
  flex-direction: column;
  flex: 0.5;
  justify-content: flex-start;
  text-align: center;

  /* align-items: center; */
}
.product h3 {
  /* flex: 0.05; */
  border: 2px solid;
  background-color: aliceblue;
}
.productDetail {
  background-color: aliceblue;
  flex: 0.4;
  border: 2px solid;
}
.recipe {
  background-color: cadetblue;
  flex: 0.55;
  border: 2px solid;
}
</style>
