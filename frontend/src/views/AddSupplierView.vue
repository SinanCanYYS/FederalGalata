<script>
import { mapActions } from 'pinia'
import { useSupplierStore } from '@/stores/supplier'

export default {
  name: 'AddSupplierView',
  data() {
    return {
      name: null,
      contact: null,
      email: null
    }
  },
  methods: {
    ...mapActions(useSupplierStore, ['addNewSupplier']),
    async addSupplier() {
      await this.addNewSupplier(this.name, this.contact, this.email)
      this.$router.push('/suppliers')
    }
  }
}
</script>

<template>
  <div class="supplierForm">
    <h2>Add New Supplier</h2>
    <form @submit.prevent="addSupplier">
      <table>
        <tbody>
          <tr>
            <td>
              <label for="name">Name</label>
            </td>
            <td>
              <input id="name" type="text" v-model="name" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="contact">Conatct</label>
            </td>
            <td>
              <input id="contact" type="text" v-model="contact" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="email">E-mail</label>
            </td>
            <td>
              <input id="email" type="text" v-model="email" />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Add Supplier</button>
    </form>
  </div>
</template>

<style scoped>
.supplierForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  background-color: rgb(202, 202, 160);
  display: flex;
  flex-direction: column;
  flex: 0.5;
  align-items: center;
  justify-content: space-evenly;
}
button {
  width: 50%;
}
</style>
