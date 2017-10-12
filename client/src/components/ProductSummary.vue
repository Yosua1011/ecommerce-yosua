<template>
  <div>
    <div class="panel panel-primary" v-for="product in showProducts">
      <div class="panel-heading">
        <h3 class="panel-title">Nama Produk: {{ product.title }}</h3>
        <h3 class="panel-title">Penjual: {{ product.author }}</h3>
      </div>
      <div class="panel-body">
        Price: IDR {{ product.product }}
        <div class="" style="text-align: right">
          <router-link :to="'/' + product.slug">
            <button type="button" name="button"class="btn btn-warning" >
              <span class="glyphicon glyphicon-eye-open"></span> View Detail
            </button>
          </router-link>
          <button type="button" name="button"class="btn btn-warning" @click="addToCart(product)">
            <span class="glyphicon glyphicon-shopping-cart"></span> Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['products'],
  computed: {
    showProducts () {
      return this.productsdata()
    }
  },
  methods: {
    ...mapActions([
      'deleteProduct',
      'addToCart'
    ]),
    ...mapState([
      'productsdata',
      'cart'
    ]),
    showAlertCart (msg) {
      // Use sweetalret2
      this.$swal(`${msg}`)
    }
  },
  created () {
    this.productsdata()
  }
}
</script>

<style lang="css">
</style>
