import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//ramsey-playtunes.herokuapp.com/' : '//localhost:3000/';

vue.use(vuex)

var server = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})

//itunes
var itunes = axios.create({
  baseURL: 'https://itunes.apple.com/search?term=',
  timeout: 3000
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
        res.data.results.forEach((song) => {
          song.artworkUrl100 = 'background-image: url(' + song.artworkUrl100 + ');'
        });
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
         console.log(res.data)
         commit('setActiveList', res.data)
       })
       .catch(err => {
         console.log(err)
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
    },
    authenticate({commit, dispatch}){
      server.get('/authenticate')
        .then(res=>{
          commit('setUser', res.data.data)
          router.push({name: 'Home'})
        })
        .catch(res=>{
          console.log(res.data)
        })
    },
    startDemo({ dispatch, commit }) {
      var demoUser = {
        email: 'demo@demo.com',
        password: 'demo'
      }
      dispatch('login', demoUser)
    },
    endDemo({ dispatch, commit, state }) {
      server.delete('/end-demo/' + state.user._id)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})