<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav class="navbar navbar-light top-header" style="background: #333399; color: white;">
      <div>
        <a class="navbar-brand" @click="home">Home</a>
        <router-link :to="{ name: 'Playlists'}" class="navbar-brand" style="color: white" v-if="user._id" @click="getPosts">
          Playlists
        </router-link>
      </div>
      <div class="page-title">
        <h1>PlayTunes</h1>
      </div>
      <div>
        <a class="navbar-brand" @click="login" v-if="!(user._id)">Sign up/Login</a>
        <div v-if="user._id" class="d-flex flex-column">
          <a class="navbar-brand">User: {{user.displayName}}</a>
          <a class="navbar-brand" @click="signOut">Sign out</a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      user() {
        console.log(this.$store.state.user, 'app user')
        return this.$store.state.user
      }
    },
    mounted() {
      if (!this.$store.state.user._id) {
        this.$router.push({ name: 'Auth' })
      }
    },
    created() {
      window.addEventListener('beforeunload', () => {
        if (this.$store.state.user.email == 'demo@demo.com') {
          this.$store.dispatch('endDemo')
        }
      })
    },
    methods: {
      getPosts() {
        this.$store.dispatch('getPlaylists')
        this.$router.push('playlists')
      },
      login() {
        this.$router.push('login')
      },
      signOut() {
        this.$store.dispatch('signOut')
      },
      getFavs() {
        this.$router.push('favs')
        this.$store.dispatch('getFavs')
      },
      home() {
        this.$router.push('/')
      },
      signOut() {
        this.$store.dispatch('signOut')
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* The image used */
    background-image: url("assets/forrest.jpg");
    min-height: 500vh;
    /* Set a specific height */
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .play-title {
    margin-left: 100vh;
  }
</style>