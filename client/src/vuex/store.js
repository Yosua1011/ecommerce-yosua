import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  productsdata: [],
  log: '',
  user: '',
  loginstate: false,
  head: null,
  cart: [],
  totalPrice: 0,
  transactions: []
}

const mutations = {
  productsStateContent (state, payload) {
    console.log('mutations data ', payload)
    state.productsdata = payload
  },
  newProductContent (state, payload) {
    console.log('new product unshift data ', payload)
    state.productsdata.push(payload)
  },
  spliceQuestion (state, id) {
    let idx = state.productsdata.findIndex((product) => product._id === id)
    state.productsdata.splice(idx, 1)
  },
  errorLog (state, payload) {
    state.log = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  nambahBelanja (state, payload) {
    state.cart.push(payload)
  },
  setTotalPrice (state, payload) {
    state.totalPrice += payload
  },
  nampilinTransaksi (state, transaksi) {
    state.transactions = transaksi
  }
}

const actions = {
  getAllProduct ({commit}) {
    http.get('/products')
    .then(({data}) => {
      console.log('data products ', data)
      commit('productsStateContent', data)
      this.totalPrice = 0
    })
    .catch(err => console.log(err))
  },
  postNewProduct ({commit}, newData) {
    console.log(`ini data di postNewProduct sebelum http ${JSON.stringify(newData)}`)
    http.post('/products/post', {
      title: newData.title,
      product: newData.product
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log(`ini data di postNewProduct `, data)
      // commit('newProductContent', data)
      router.push('/')
    })
    .catch(err => console.log(err))
  },
  deleteProduct ({commit}, id) {
    console.log('product dengan akan di delete dengan id ', id)
    http.delete(`/products/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log(data)
      if (data.message !== null) {
        console.log(`${JSON.stringify(data)} ini kedelete`)
        commit('spliceProduct', id)
        router.push('/')
      } else {
        this.showAlert(data.message)
      }
    })
    .catch(err => commit('errorLog', err.message))
  },
  showAlert (msg) {
    if (msg !== null) this.$swal(`${msg}`)
    // Use sweetalret2
  },
  getUser ({commit}, token) {
    http.post(`/pemecahtoken`, {
      token: token
    })
    .then(({data}) => {
      console.log(`ini data dari getUser ${data.username}`)
      localStorage.setItem('username', data.username)
      commit('setUser', {user: data, token: token})
    })
    .catch(err => console.log(err))
  },
  editProduct ({commit}, product) {
    http.put(`/products/${product.id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('Sukses keedit')
    })
    .catch(err => console.log(err))
  },
  addToCart ({commit}, data) {
    this.totalPrice += data.product
    console.log('Nambahin belanjaan')
    console.log(data.product)
    console.log(this.totalPrice)
    commit('setTotalPrice', data.product)
    commit('nambahBelanja', data)
  },
  showTransaction ({commit}, transactions) {
    http.get('/transactions')
    .then(({data}) => {
      console.log('data transactions ', transactions)
      commit('nampilinTransaksi', transactions)
    })
    .catch(err => console.log(err))
  }
}

const store = new Vuex.Store({
  state, mutations, actions
})

export default store
