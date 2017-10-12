<template>
  <div class="">
    <form @submit.prevent='doRegister ()'>
      <div class="modal-dialog" id="product-form" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <router-link :to="'/home'"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></router-link>
               <h4 class="modal-title" id="myModalLabel">Product Form</h4>
            </div>
            <div class="modal-body">
               <label id="username">Product :</label><br>
               <input type="text"  name="userRegister" value="" class="form-control" v-model="newPost.title"><br>
               <label id="password">Price :</label><br>
               <textarea type="text"  name="passRegister" value="" class="form-control" v-model="newPost.product"></textarea><br>
            </div>
            <div class="modal-footer">
               <router-link :to="'/'"><a class="btn btn-default">Cancel</a></router-link>
               <a type="submit" class="btn btn-primary" @click="postProductNew()">Submit</a>
            </div>
         </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      newPost: {
        title: '',
        product: ''
      },
      pesan: ''
    }
  },
  methods: {
    ...mapActions([
      'postNewProduct'
    ]),
    clearMe () {
      this.pesan = 'Product posted'
    },
    postProductNew () {
      this.postNewProduct(this.newPost)
    }
  }
}
</script>

<style lang="css">
#product-form: {
  width: 100%;
}
</style>
