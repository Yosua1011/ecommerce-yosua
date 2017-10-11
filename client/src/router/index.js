import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ProductsList from '@/components/ProductsList'
import NewProduct from '@/components/NewProduct'
import ProductDetail from '@/components/ProductDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/newProduct',
      component: NewProduct
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          component: ProductsList
        },
        {
          path: ':slug',
          component: ProductDetail,
          props: true
        }
      ]
    }
  ]
})
