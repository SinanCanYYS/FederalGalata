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
  <h1>Main Menu Page</h1>
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
</template>
