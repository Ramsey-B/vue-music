import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'


vue.use(vuex)
//itunes
var itunes = axios.create({
  baseURL: 'https://itunes.apple.com/search?term=',
  timeout: 3000
})

var server = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
  withCredentials: true,
})

export default new vuex.Store({
  state: {
    user: {},
    songs: [],
    playlists: [],
    activeList: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSongs(state, songs) {
      state.songs = songs
    },
    setPlaylists(state, playlists) {
      state.playlists = playlists
    },
    setActiveList(state, list){
      state.activeList = list
    }
  },
  actions: {
    login({ dispatch, commit }, user) {
      server.post('/login', user)
        .then(res => {
          console.log(res.data.data)
          commit('setUser', res.data.data)
          router.push('/')
        })
        .catch(err => {
          console.error(err)
        })
    },
    register({dispatch, commit}, user) {
      server.post('/register', user)
        .then(res => {
          commit('setUser', res.data)
          router.push('/')
        })
        .catch(err => {
          console.error(err)
        })
    },
    getSongs({dispatch, commit}, payload) {
      itunes.get(''+payload)
      .then(res => {
        console.log(res)
        commit('setSongs', res.data.results)
      })
    },
    getPlaylists({dispatch,commit, state}) {
      server.get('/playlists/')
       .then(res => {
         var playlists = res.data.sort((a, b) => {
          return b.songs.length - a.songs.length
         })
         commit('setPlaylists', playlists)
       })
    },
    createPlaylist({dispatch, commit, state}, payload) {
      server.post('/new-playlist', payload)
       .then(res => {
         dispatch('getPlaylists')
       })
    },
    editList({dispatch, commit}, list){
      server.put('/playlist/' + list._id, list)
       .then(res => {
         console.log(res)
       })
    },
    getPlaylist({dispatch, commit}, id) {
      server.get('/playlist/' +id) 
        .then(res => {
          commit('setActiveList', res.data)
        })
    },
    signOut({dispatch, commit, state}) {
      server.delete('/logout')
       .then(mess => {
        commit('setUser', {})
        router.push('/')
       })
    }
  }
})