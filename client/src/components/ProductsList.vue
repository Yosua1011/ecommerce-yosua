<template>
  <div class="col-md-8">
    <product-summary/>
  </div>
</template>

<script>
import ProductSummary from '@/components/ProductSummary'
import { mapActions } from 'vuex'
export default {
  components: {
    ProductSummary
  },
  methods: {
    ...mapActions([
      'getAllProduct'
    ])
  },
  created () {
    this.getAllProduct()
  }
}
</script>

<style lang="css">
</style>
