<template lang="html">
  <div class="container">
    <h1 class="text-center">Welcome to Hacktiv Overflow <span v-if="loginstate">{{ head }}</span></h1>
    <div class="row menu">
      <div class="col-md-6">
        <router-link :to="'/'">
          <button type="button" name="button" class="btn btn-primary">Dashboard</button>
        </router-link>
        <router-link :to="'/newProduct'">
          <button type="button" name="button" class="btn btn-primary" v-if="loginstate === true">New Product</button>
        </router-link>
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
      head: null
    }
  },
  methods: {
    ...mapActions([
      'getUser'
    ]),
    ...mapState([
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
    }
  },
  computed: {
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
