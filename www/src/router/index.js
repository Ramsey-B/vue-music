import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import Playlists from '@/components/Playlists'
import ListDetails from '@/components/ListDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/playlists',
      name: 'Playlists',
      component: Playlists
    },
    {
      path: '/playlist/:id',
      name: 'listDetails',
      component: ListDetails
    }
  ]
})
