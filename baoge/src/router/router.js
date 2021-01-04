import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/HelloWorld'
import Index from '../pages/index'
import UserCenter from '../pages/userCenter'
import UserInfo from '../pages/UserInfo'
import Vehiclelist from '../pages/vehiclelist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/vehiclelist',
      name: 'vehiclelist',
      component: Vehiclelist
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: UserCenter,
      children: [
        {
          path: 'userInfo',
          name: 'userInfo',
          component: UserInfo
        }
      ]
    }
  ]
})
