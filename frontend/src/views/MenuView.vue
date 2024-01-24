<script>
import { mapState, mapActions } from 'pinia'

export default {
  name: 'MenuView',
  data() {
    return {}
  },
  methods: {}
}
</script>
<template>
  <div class="mainMenu">
    <h3>Main Menu Page</h3>
    <div class="menuButtons">
      <button>
        <RouterLink to="/products">Products</RouterLink>
      </button>
      <button>
        <RouterLink to="/rawmaterials">Raw Materials</RouterLink>
      </button>
      <button>Raw Materials</button>
      <button>Stock Data Entry</button>
      <button>Sales Data Entry</button>
      <button>Purchase</button>
    </div>
  </div>
</template>

<style scoped>
.mainMenu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.menuButtons {
  display: flex;
}
button {
  width: 15%;
  height: 40px;
  margin: auto;
}
</style>
