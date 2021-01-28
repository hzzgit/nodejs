import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/HelloWorld'
import Index from '../pages/index'
import UserCenter from '../pages/userCenter'
import UserInfo from '../pages/UserInfo'
import Vehiclelist from '../pages/vehiclelist'
import tangchuan from '../pages/tangchuan'
import layuilist from '../pages/layuilist'
import elementilist from '../pages/elementilist'
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
      path: '/tangchuan',
      name: 'tangchuan',
      component: tangchuan
    },
    {
      path: '/layuilist',
      name: 'layuilist',
      component: layuilist
    },
    {
      path: '/elementilist',
      name: 'elementilist',
      component: elementilist
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
