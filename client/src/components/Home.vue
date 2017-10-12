<template lang="html">
  <div class="container">
    <h1 class="text-center">Welcome to Ecommerce <span v-if="loginstate">{{ head }}</span></h1>
    <div class="row menu">
      <div class="col-md-6">
        <router-link :to="'/'">
          <button type="button" name="button" class="btn btn-primary">Dashboard</button>
        </router-link>
        <router-link :to="'/newProduct'">
          <button type="button" name="button" class="btn btn-primary" v-if="loginstate === true">New Product</button>
        </router-link>
        <button type="button" name="button" class="btn btn-primary" v-if="loginstate === true" data-toggle="modal" data-target="#myCart">Cart {{cart.length}} {{word}} </button>
        <button type="button" name="button" class="btn btn-primary" v-if="loginstate === true" data-toggle="modal" data-target="#myTransaction">Transaction</button>
        <div class="modal fade" id="myCart">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Cart List</h4>
              </div>
              <form class="">
              <div class="modal-body" v-for="belanja in cart">
                <ul>
                  <p>Nama Produk: {{belanja.title}}</p>
                  <p>Price: IDR {{belanja.product}}</p>
                </ul>
              </div>
              <ul>Total Price: {{totalPrice}} </ul>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="postCartToDB()">Checkout</button>
              </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal fade" id="myTransaction">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Transaction Detail</h4>
              </div>
              <form class="">
              <div class="modal-body" v-for="belanja in transactions">
                <ul>
                  <li>belanja</li>
                </ul>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Checkout</button>
              </div>
              </form>
            </div>
          </div>
        </div>
        <router-link :to="'/login'"><a class="btn btn-default" v-if="loginstate === false">Login</a></router-link>
        <button type="button" name="button" class="btn btn-danger" @click="doLogout" v-if="loginstate === true">Logout</button>
      </div>
    </div>
    <div class="row">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'container',
  data () {
    return {
      loginstate: false,
      head: null,
      word: 'item'
    }
  },
  computed: {
    ...mapState([
      'cart',
      'totalPrice',
      'transactions'
    ])
  },
  methods: {
    ...mapActions([
      'getUser',
      'showTransaction'
    ]),
    doLogout () {
      localStorage.clear()
      this.loginstate = false
      this.showAlert('Selamat anda sudah logout')
      this.checkLogin()
    },
    checkLogin () {
      console.log('check login')
      if (localStorage.getItem('token') === null) {
        console.log('tak ada token')
        this.loginstate = false
        this.head = null
      } else {
        console.log('ada token')
        this.loginstate = true
        this.head = localStorage.getItem('username')
      }
    },
    showAlert (msg) {
      // Use sweetalret2
      this.$swal(`${msg}`)
    },
    postCartToDB () {
      this.$http.post(`/transactions`, {
        product: this.cart,
        totalPrice: this.totalPrice
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        // this.$http.push('/')
        console.log('bisa ngepost')
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    // this.headline()
    this.checkLogin()
  }
}
</script>

<style lang="css">
.menu {
  padding: 16px 0;
}
</style>
