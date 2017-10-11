<template>
  <div>
    <div class="panel panel-primary" v-for="product in showProducts">
      <div class="panel-heading">
        <h3 class="panel-title">{{ product.title }}</h3>
        <h3 class="panel-title">{{ product.author }}</h3>
      </div>
      <div class="panel-body">
        {{ product.product }}
        <div class="" style="text-align: right">
          <router-link :to="'/' + product.slug">
            <button type="button" name="button"class="btn btn-warning" >
              <span class="glyphicon glyphicon-eye-open"></span> View Detail
            </button>
          </router-link>
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
      'deleteProduct'
    ]),
    ...mapState([
      'productsdata'
    ])
  },
  created () {
    this.productsdata()
  }
}
</script>

<style lang="css">
</style>
